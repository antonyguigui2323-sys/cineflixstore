import { Check, Star, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  screens: number;
  recommended?: boolean;
  icon: typeof Star;
  benefitsCount: number;
}

const plans: Plan[] = [
  {
    id: "start",
    name: "Plano START",
    price: 19.90,
    period: "mensal",
    screens: 2,
    icon: Zap,
    benefitsCount: 4,
  },
  {
    id: "prime",
    name: "Plano PRIME",
    price: 97.90,
    period: "anual",
    screens: 4,
    recommended: true,
    icon: Star,
    benefitsCount: 9, // all benefits
  },
  {
    id: "pro",
    name: "Plano PRO",
    price: 59.70,
    period: "semestral",
    screens: 2,
    icon: Zap,
    benefitsCount: 3,
  },
];

const benefits = [
  "Mais de 60.000 conteúdos",
  "Qualidade SD/HD/FHD/4k",
  "Guia de Programação [EPG]",
  "Assista no Smartphone/Tablet",
  "Assista no TV Box/Chromecast",
  "Assista na Smart TV",
  "Assista no Computador",
  "Programação Adultos [Opcional]",
  "Pacote Filmes e Série",
];

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="planos" className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Aproveite essa oportunidade e{" "}
            <span className="gradient-text">assine já!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.recommended ? "recommended" : ""}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="streaming-badge bg-primary text-primary-foreground px-4 py-1">
                    Recomendado
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <plan.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-muted-foreground">R$</span>
                  <span className="text-5xl font-heading font-bold gradient-text">
                    {plan.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">{plan.period}</p>
              </div>

              <p className="text-center text-sm text-muted-foreground mb-6">
                Acesso ilimitado a todos os conteúdos, a diversão é garantida.
              </p>

              <Button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full cta-button rounded-full py-6 mb-6 text-base md:text-lg ${
                  plan.recommended ? "" : ""
                }`}
              >
                COMPRAR AGORA
              </Button>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Vantagens:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Plano {plan.period.charAt(0).toUpperCase() + plan.period.slice(1)}</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Use {plan.screens} telas simultaneamente</span>
                  </li>
                  {benefits.map((benefit, i) => {
                    const isIncluded = i < plan.benefitsCount;
                    return (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {isIncluded ? (
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-destructive flex-shrink-0" />
                        )}
                        <span className={!isIncluded ? "line-through opacity-50" : ""}>{benefit}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Device compatibility */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            A Cineflix é compatível com Smart TVs, smartphones, tablets e computadores
          </p>
          <img
            src="https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/MARCAS.webp?fit=713%2C40&ssl=1"
            alt="Dispositivos compatíveis"
            className="max-w-xs mx-auto opacity-60"
          />
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
};

export default PricingSection;