import { Button } from "@/components/ui/button";
import { Tv, Film, Clapperboard, Baby, Dumbbell, Users } from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Filmes incríveis",
    description: "Assista a clássicos, lançamentos e grandes produções vencedoras de prêmios, tudo em alta definição.",
  },
  {
    icon: Clapperboard,
    title: "Séries Imperdíveis",
    description: "Descubra séries aclamadas e sucessos do momento, com temporadas completas disponíveis.",
  },
  {
    icon: Users,
    title: "Animes Crunchyroll",
    description: "Possuímos uma lista enorme com todos os animes do momento atualizados e em qualidade HD.",
  },
  {
    icon: Baby,
    title: "Canais infantis",
    description: "Toda a lista para a criançada se divertir além de Disney Plus e muito mais!",
  },
  {
    icon: Dumbbell,
    title: "Esportes ao vivo",
    description: "Literalmente todos os acessos dos canais de esporte, futebol, artes marciais e muito mais!",
  },
  {
    icon: Tv,
    title: "2000+ Canais",
    description: "Canais abertos e fechados, Netflix, Amazon Prime, Disney+, Max, Globoplay e muito mais!",
  },
];

const FeaturesSection = () => {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-2">
            Seus filmes, séries e animes favoritos, com a experiência que você merece
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            <span className="gradient-text">
              A televisão do futuro é pela internet,
            </span>
            <br />
            <span className="text-foreground">sem antenas e sem decodificadores</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card-streaming p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={scrollToPlans}
            className="gradient-button px-8 py-6 rounded-full text-lg"
            size="lg"
          >
            ADQUIRA O SEU AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;