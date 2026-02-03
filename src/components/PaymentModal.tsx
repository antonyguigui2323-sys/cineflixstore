import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Loader2, QrCode, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

interface PixData {
  qrCode: string;
  qrCodeBase64: string;
  copyPaste: string;
  expiresAt: string;
}

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plan) return;

    // Validate CPF
    const cpfNumbers = formData.cpf.replace(/\D/g, "");
    if (cpfNumbers.length !== 11) {
      toast.error("CPF inválido. Digite um CPF com 11 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-pix-payment", {
        body: {
          amount: plan.price,
          planId: plan.id,
          planName: plan.name,
          customer: {
            name: formData.name,
            email: formData.email,
            cpf: cpfNumbers,
          },
        },
      });

      if (error) throw error;

      if (data.success) {
        setPixData(data.pix);
        setStep("payment");
        toast.success("PIX gerado com sucesso!");
      } else {
        throw new Error(data.error || "Erro ao gerar PIX");
      }
    } catch (error) {
      console.error("Error creating PIX:", error);
      toast.error("Erro ao gerar pagamento PIX. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = async () => {
    if (!pixData?.copyPaste) return;

    try {
      await navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Erro ao copiar. Copie manualmente.");
    }
  };

  const handleClose = () => {
    setStep("form");
    setPixData(null);
    setFormData({ name: "", email: "", cpf: "" });
    setCopied(false);
    onClose();
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center font-heading text-2xl">
            {step === "form" ? (
              <>
                Finalize sua compra do{" "}
                <span className="gradient-text">{plan.name}</span>
              </>
            ) : (
              <>
                Pague com <span className="gradient-text">PIX</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="text-center mb-6 p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">Valor:</p>
              <p className="text-3xl font-heading font-bold gradient-text">
                R$ {plan.price.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm text-muted-foreground">{plan.period}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) =>
                  setFormData({ ...formData, cpf: formatCPF(e.target.value) })
                }
                required
                className="bg-muted border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-button py-6 rounded-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando PIX...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar QR Code PIX
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6 mt-4">
            {pixData ? (
              <>
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-xl">
                    {pixData.qrCodeBase64 ? (
                      <img
                        src={pixData.qrCodeBase64}
                        alt="QR Code PIX"
                        className="w-48 h-48"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center bg-muted rounded">
                        <QrCode className="w-24 h-24 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Copy paste code */}
                <div className="space-y-2">
                  <Label>Código Copia e Cola:</Label>
                  <div className="relative">
                    <Input
                      value={pixData.copyPaste}
                      readOnly
                      className="pr-12 bg-muted border-border text-xs font-mono"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={handleCopyPix}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleCopyPix}
                  className="w-full gradient-button py-6 rounded-full"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar código PIX
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Abra o app do seu banco e escaneie o QR Code</p>
                  <p>ou cole o código na opção "PIX Copia e Cola"</p>
                </div>

                {pixData.expiresAt && (
                  <div className="flex items-center justify-center gap-2 text-sm text-yellow-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      Expira em: {new Date(pixData.expiresAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Carregando...</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;