import HeroSection from "@/components/HeroSection";
import ContentCarousel from "@/components/ContentCarousel";
import FeaturesSection from "@/components/FeaturesSection";
import StreamingLogos from "@/components/StreamingLogos";
import PricingSection from "@/components/PricingSection";
import ComparisonSection from "@/components/ComparisonSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const moviesImages = [
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2269.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2262.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2263.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2265.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2267.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2268.webp?fit=800%2C420&ssl=1",
];

const seriesImages = [
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2284.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2280.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2281.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2282.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2283.webp?fit=800%2C420&ssl=1",
];

const animesImages = [
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2285.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2289.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2288.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2287.webp?fit=800%2C420&ssl=1",
  "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/image-2286.webp?fit=800%2C420&ssl=1",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <ContentCarousel
        title="Filmes incríveis"
        subtitle="Assista a clássicos, lançamentos e grandes produções"
        images={moviesImages}
      />
      
      <ContentCarousel
        title="Séries Imperdíveis"
        subtitle="Temporadas completas disponíveis para maratonar"
        images={seriesImages}
      />
      
      <ContentCarousel
        title="Animes Crunchyroll"
        subtitle="Todos os animes do momento em qualidade HD"
        images={animesImages}
      />
      
      <FeaturesSection />
      
      <StreamingLogos />
      
      <ComparisonSection />
      
      <PricingSection />
      
      <GuaranteeSection />
      
      <FAQSection />
      
      <Footer />
    </div>
  );
};

export default Index;