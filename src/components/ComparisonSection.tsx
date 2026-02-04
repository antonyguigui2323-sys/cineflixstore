import { Button } from "@/components/ui/button";

const streamingPrices = [
  { name: "Netflix", price: "59,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C1-1.webp?fit=400%2C225&ssl=1" },
  { name: "HBO Max", price: "55,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C6.webp?fit=400%2C225&ssl=1" },
  { name: "Globoplay", price: "19,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C4.webp?fit=400%2C225&ssl=1" },
  { name: "Disney+", price: "62,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C1-2.webp?fit=400%2C225&ssl=1" },
  { name: "Prime Video", price: "21,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C7-1.webp?fit=400%2C225&ssl=1" },
  { name: "Star+", price: "29,90", logo: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/C8.webp?fit=400%2C225&ssl=1" },
];

const ComparisonSection = () => {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4">
            Isso é o que você pagaria se assinasse{" "}
            <span className="gradient-text">todas as plataformas:</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
          {streamingPrices.map((streaming, i) => (
            <div key={i} className="card-streaming p-4 text-center">
              <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-muted">
                <img
                  src={streaming.logo}
                  alt={streaming.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-lg font-semibold text-foreground">
                R$ {streaming.price}/mês
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Ao todo você pagaria
            </p>
            <p className="text-3xl md:text-4xl font-heading font-bold text-destructive line-through">
              R$ 514,85 por mês
            </p>
          </div>

          <div className="py-6 px-8 bg-primary/10 rounded-2xl inline-block">
            <p className="text-xl md:text-2xl text-foreground mb-2">
              Já com a <span className="gradient-text font-bold">CINEFLIX</span> você paga apenas
            </p>
            <p className="text-4xl md:text-5xl font-heading font-bold gradient-text">
              R$ 20/mês!!
            </p>
          </div>

          <Button
            onClick={scrollToPlans}
            className="cta-button px-10 py-7 rounded-full text-lg md:text-xl"
            size="lg"
          >
            ADQUIRA O SEU AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;