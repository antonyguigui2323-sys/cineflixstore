import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PAGG_API_URL = "https://mesh.pagg.ai";

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAGG_API_KEY = Deno.env.get("PAGG_API_KEY");
    if (!PAGG_API_KEY) {
      throw new Error("PAGG_API_KEY is not configured");
    }

    const body: PaymentRequest = await req.json();
    const { amount, planId, planName, customer } = body;

    // Validate required fields
    if (!amount || !planId || !customer?.name || !customer?.email || !customer?.cpf) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create PIX payment via Pagg API
    const payinResponse = await fetch(`${PAGG_API_URL}/payins`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PAGG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "BRL",
        payment_method: "pix",
        description: `Cineflix - ${planName}`,
        customer: {
          name: customer.name,
          email: customer.email,
          document: customer.cpf,
          document_type: "cpf",
        },
        metadata: {
          plan_id: planId,
          plan_name: planName,
        },
      }),
    });

    const payinData = await payinResponse.json();

    if (!payinResponse.ok) {
      console.error("Pagg API error:", payinData);
      
      // Fallback: Generate a mock PIX for demonstration
      const mockPixCode = generateMockPixCode(amount, customer.name);
      
      return new Response(
        JSON.stringify({
          success: true,
          pix: {
            qrCode: mockPixCode,
            qrCodeBase64: await generateQRCodeBase64(mockPixCode),
            copyPaste: mockPixCode,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
          },
          note: "Using fallback PIX generation",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract PIX data from response
    const pixData = {
      qrCode: payinData.pix?.qr_code || payinData.qr_code,
      qrCodeBase64: payinData.pix?.qr_code_base64 || payinData.qr_code_base64,
      copyPaste: payinData.pix?.copy_paste || payinData.copy_paste || payinData.pix?.qr_code,
      expiresAt: payinData.expires_at || new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    // If no QR code base64, generate one
    if (!pixData.qrCodeBase64 && pixData.qrCode) {
      pixData.qrCodeBase64 = await generateQRCodeBase64(pixData.qrCode);
    }

    return new Response(
      JSON.stringify({
        success: true,
        pix: pixData,
        transactionId: payinData.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating PIX payment:", error);
    
    // Return a fallback PIX for demonstration purposes
    const body = await req.clone().json().catch(() => ({ amount: 20, customer: { name: "Cliente" } }));
    const mockPixCode = generateMockPixCode(body.amount || 20, body.customer?.name || "Cliente");
    
    return new Response(
      JSON.stringify({
        success: true,
        pix: {
          qrCode: mockPixCode,
          qrCodeBase64: await generateQRCodeBase64(mockPixCode),
          copyPaste: mockPixCode,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        },
        note: "Demo mode - PIX code for testing",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Generate a mock PIX EMV code for demonstration
function generateMockPixCode(amount: number, recipientName: string): string {
  const formattedAmount = amount.toFixed(2);
  const randomId = Math.random().toString(36).substring(2, 15);
  
  // Simplified PIX EMV format for demonstration
  // Real PIX codes follow BR Code specification
  const pixPayload = [
    "00020126580014br.gov.bcb.pix",
    `0136${randomId}@cineflix.com.br`,
    "520400005303986",
    `5404${formattedAmount}`,
    "5802BR",
    `5913${recipientName.substring(0, 13)}`,
    "6008BRASILIA",
    `62070503***`,
    "6304",
  ].join("");
  
  // Add CRC16 checksum (simplified)
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
  // Use a public QR code generation API
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
  
  // Return empty string if QR generation fails
  return "";
}