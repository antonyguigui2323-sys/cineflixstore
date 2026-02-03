import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const GuaranteeSection = () => {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container max-w-4xl">
        <div className="card-streaming p-8 md:p-12 text-center relative overflow-hidden">
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Experimente sem riscos por{" "}
              <span className="gradient-text">7 dias</span> e só então decida se quer continuar
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Sem letras miúdas no contrato: você pode experimentar a{" "}
              <strong className="text-foreground">Cineflix</strong> e todos os conteúdos dela{" "}
              <strong className="text-foreground">durante 7 dias.</strong>
            </p>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Se dentro desse período você decidir não continuar com a{" "}
              <strong className="text-foreground">Cineflix</strong>, por qualquer motivo que seja, é só entrar em contato e nós devolveremos todo o seu dinheiro – sem fazer nenhuma pergunta.
            </p>

            <p className="text-lg font-semibold text-foreground mb-8">
              A partir de agora, você não tem nada a perder.
            </p>

            <Button
              onClick={scrollToPlans}
              className="gradient-button px-8 py-6 rounded-full text-lg"
              size="lg"
            >
              ADQUIRA O SEU AGORA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;