import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                cineflix
              </h1>
            </div>

            {/* Main headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2 leading-tight">
              Conteúdo ilimitado por{" "}
              <span className="gradient-text">
                um valor que cabe no seu bolso!
              </span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl mt-6 mb-8 max-w-xl mx-auto lg:mx-0">
              Tenha acesso a mais de 2 mil canais, incluindo Netflix, Disney+, HBO Max e mais, por um preço acessível! Com a Cineflix, você economiza e assiste com qualidade, estabilidade e suporte dedicado.
            </p>

            <Button
              onClick={scrollToPlans}
              className="cta-button text-lg md:text-xl px-10 py-7 rounded-full"
              size="lg"
            >
              ADQUIRA O SEU AGORA
            </Button>
          </div>

          {/* Right content - Poster grid */}
          <div className="hidden lg:grid grid-cols-3 gap-4 max-w-lg ml-auto">
            {[
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Jurassic-World-Rebirth.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Libertadores-1.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Wandinha.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Lilo-e-Stich.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Chamnpions-League.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Genv.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Como-treinar-seu-dragao.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/ufc-1.webp?fit=335%2C496&ssl=1",
              "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/Dexter.webp?fit=335%2C496&ssl=1",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-xl overflow-hidden card-streaming group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img
                  src={src}
                  alt={`Conteúdo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;