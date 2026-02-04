interface ContentCarouselProps {
  title: string;
  subtitle?: string;
  images: string[];
}

const ContentCarousel = ({ title, subtitle, images }: ContentCarouselProps) => {
  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mb-8">
        {subtitle && (
          <p className="text-muted-foreground text-center mb-2">{subtitle}</p>
        )}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-center">
          <span className="gradient-text">{title}</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="carousel-track">
          {duplicatedImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-56 md:w-72 lg:w-80 mx-2"
            >
              <div className="aspect-video rounded-xl overflow-hidden card-streaming group cursor-pointer">
                <img
                  src={src}
                  alt={`Conteúdo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;