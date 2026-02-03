import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Precisa de Internet para funcionar?",
    answer: "Sim, o App Cineflix precisa de internet para o seu funcionamento, mas devido o sinal potencializado de nosso satélite próprio, uma internet básica é mais que o suficiente para rodar videos 4k. Temos clientes que usam conectados na internet 4g do celular e funciona normalmente sem travas.",
  },
  {
    question: "Precisa de especialista para configurar?",
    answer: "NÃO, nosso sistema é muito simples de instalar, ensinamos passo a passo detalhado pra você conseguir acompanhar e colocar tudo para funcionar.",
  },
  {
    question: "O pagamento é mensal?",
    answer: "Sim, nós trabalhamos com vários planos: Mensal (R$ 20), Semestral (R$ 69,90) e Anual (R$ 97). Você escolhe o que melhor se adapta às suas necessidades.",
  },
  {
    question: "Moro em zona rural, funciona pra mim?",
    answer: "Sim! Funciona em toda zona rural do Brasil, com uma internet básica, ou até mesmo 3g, 4g do celular você consegue assistir normalmente sem travamentos.",
  },
  {
    question: "Cineflix funciona em Angola?",
    answer: "Sim! Cineflix funciona em toda Angola e todas as províncias, você vai assistir sem travamentos e a milhares de conteúdos.",
  },
  {
    question: "Quantos canais são liberados?",
    answer: "Você vai ter acesso a mais de 2 mil canais abertos e fechados, Netflix, Amazon Prime, Disney+, Max, Globoplay, e muito mais!",
  },
  {
    question: "Como vou receber o acesso?",
    answer: "Imediatamente! Após o pagamento ser confirmado, nossa plataforma enviará no seu e-mail o acesso para a plataforma, e todos os tutoriais de como usar em qualquer aparelho.",
  },
  {
    question: "Em quantos aparelhos posso usar?",
    answer: "Nossos planos tem capacidade para até 4 telas simultâneas, dependendo do plano escolhido.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ainda com dúvidas?{" "}
            <span className="gradient-text">Temos a resposta.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Não encontrou a sua dúvida? Nossa equipe está a disposição para tirar a sua dúvida!
          </p>
          <Button className="gradient-button px-8 py-6 rounded-full">
            <MessageCircle className="w-5 h-5 mr-2" />
            FALAR COM SUPORTE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;