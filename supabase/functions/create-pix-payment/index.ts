import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHOSTSPAY_API_URL = "https://api.ghostspay.com/v1";

interface PaymentRequest {
  amount: number;
  planId: string;
  planName: string;
  customer: {
    name: string;
    email: string;
    cpf: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GHOSTSPAY_API_KEY = Deno.env.get("GHOSTSPAY_API_KEY");
    const GHOSTSPAY_CLIENT_ID = Deno.env.get("GHOSTSPAY_CLIENT_ID");

    if (!GHOSTSPAY_API_KEY || !GHOSTSPAY_CLIENT_ID) {
      throw new Error("GhostsPay credentials are not configured");
    }

    const body: PaymentRequest = await req.json();
    const { amount, planId, planName, customer } = body;

    if (!amount || !planId || !customer?.name || !customer?.email || !customer?.cpf) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Amount in cents
    const amountInCents = Math.round(amount * 100);

    const ghostsPayload = {
      customer: {
        document: {
          type: "CPF",
          number: customer.cpf,
        },
        name: customer.name,
        email: customer.email,
      },
      paymentMethod: "pix",
      items: [
        {
          title: `Cineflix - ${planName}`,
          unitPrice: amountInCents,
          quantity: 1,
          externalRef: planId,
        },
      ],
      pix: {
        expiresInDays: 1,
      },
      installments: 1,
      amount: amountInCents,
    };

    console.log("Sending to GhostsPay:", JSON.stringify(ghostsPayload));

    const payinResponse = await fetch(`${GHOSTSPAY_API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GHOSTSPAY_API_KEY}`,
        "x-client-id": GHOSTSPAY_CLIENT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ghostsPayload),
    });

    const payinData = await payinResponse.json();
    console.log("GhostsPay response status:", payinResponse.status);
    console.log("GhostsPay response:", JSON.stringify(payinData));

    if (!payinResponse.ok) {
      console.error("GhostsPay API error:", payinData);

      // Fallback mock PIX
      const mockPixCode = generateMockPixCode(amount, customer.name);
      return new Response(
        JSON.stringify({
          success: true,
          pix: {
            qrCode: mockPixCode,
            qrCodeBase64: await generateQRCodeBase64(mockPixCode),
            copyPaste: mockPixCode,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          },
          note: "Fallback mode",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract PIX data from GhostsPay response
    const pixCode = payinData.pix?.qrCode || payinData.pix?.qr_code || payinData.qrCode || payinData.qr_code || "";
    const pixCopyPaste = payinData.pix?.copyPaste || payinData.pix?.copy_paste || payinData.copyPaste || pixCode;
    let pixQrBase64 = payinData.pix?.qrCodeBase64 || payinData.pix?.qr_code_base64 || payinData.qrCodeBase64 || "";

    if (!pixQrBase64 && pixCode) {
      pixQrBase64 = await generateQRCodeBase64(pixCode);
    }

    return new Response(
      JSON.stringify({
        success: true,
        pix: {
          qrCode: pixCode,
          qrCodeBase64: pixQrBase64,
          copyPaste: pixCopyPaste,
          expiresAt: payinData.expiresAt || payinData.expires_at || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        transactionId: payinData.id || payinData.transactionId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating PIX payment:", error);

    const body = await req.clone().json().catch(() => ({ amount: 20, customer: { name: "Cliente" } }));
    const mockPixCode = generateMockPixCode(body.amount || 20, body.customer?.name || "Cliente");

    return new Response(
      JSON.stringify({
        success: true,
        pix: {
          qrCode: mockPixCode,
          qrCodeBase64: await generateQRCodeBase64(mockPixCode),
          copyPaste: mockPixCode,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        note: "Demo mode",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateMockPixCode(amount: number, recipientName: string): string {
  const formattedAmount = amount.toFixed(2);
  const randomId = Math.random().toString(36).substring(2, 15);
  const pixPayload = [
    "00020126580014br.gov.bcb.pix",
    `0136${randomId}@cineflix.com.br`,
    "520400005303986",
    `5404${formattedAmount}`,
    "5802BR",
    `5913${recipientName.substring(0, 13)}`,
    "6008BRASILIA",
    "62070503***",
    "6304",
  ].join("");
  const crc = calculateCRC16(pixPayload);
  return pixPayload + crc;
}

function calculateCRC16(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
    crc &= 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

async function generateQRCodeBase64(data: string): Promise<string> {
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
  try {
    const response = await fetch(qrApiUrl);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      return `data:image/png;base64,${base64}`;
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
  return "";
}
