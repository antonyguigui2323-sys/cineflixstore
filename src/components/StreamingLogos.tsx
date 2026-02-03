const logos = [
  { name: "Netflix", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG1.webp?fit=240%2C240&ssl=1" },
  { name: "Disney+", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG2.webp?fit=240%2C240&ssl=1" },
  { name: "Prime Video", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG3.webp?fit=240%2C240&ssl=1" },
  { name: "HBO Max", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG4.webp?fit=240%2C240&ssl=1" },
  { name: "Globoplay", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG5.webp?fit=240%2C240&ssl=1" },
  { name: "Sky", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/SKY-APP.webp?fit=240%2C240&ssl=1" },
  { name: "Paramount+", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG7.webp?fit=240%2C240&ssl=1" },
  { name: "Star+", url: "https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/IMG8.webp?fit=240%2C240&ssl=1" },
];

const StreamingLogos = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-center mb-10">
          Tenha acesso ao conteúdo de{" "}
          <span className="gradient-text">vários serviços de streaming</span>{" "}
          em uma única plataforma!
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 max-w-4xl mx-auto">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden bg-card p-2 flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamingLogos;