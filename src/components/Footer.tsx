import { Play, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">
                cineflix
              </span>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-2">Suporte ao cliente</h4>
            <a
              href="mailto:suporte@cineflix.com"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              suporte@cineflix.com
            </a>
          </div>

          {/* Payment methods */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-2">Formas de Pagamento</h4>
            <img
              src="https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/FORMAS-DE-PAGAMENTO.webp?fit=715%2C155&ssl=1"
              alt="Formas de pagamento"
              className="max-w-[200px] mx-auto md:ml-auto md:mr-0 opacity-70"
            />
          </div>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <img
            src="https://i0.wp.com/www.acessocineflix.vip/wp-content/uploads/2026/01/SELO-SITE-SEGURO.webp?fit=800%2C137&ssl=1"
            alt="Site Seguro"
            className="h-8 opacity-60"
          />
        </div>

        {/* Legal disclaimer */}
        <div className="text-center text-xs text-muted-foreground max-w-3xl mx-auto">
          <p className="mb-2">
            Esta página não tem qualquer vínculo com o Facebook S/A e suas empresas, apenas usamos a plataforma para promover os nossos produtos. Ao sair da plataforma toda responsabilidade sobre produtos vendidos e ofertados é de inteira responsabilidade da nossa empresa, bem como se houver quaisquer eventualidades legais.
          </p>
          <p>
            Declaramos que o Facebook S/A não tem qualquer vínculo de associação em processos cíveis ou criminais.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cineflix. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;