import { Mail, Phone, MapPin, Shield } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linksEmpresa = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Sectores", href: "#sectores" },
    { name: "Equipos", href: "#equipos" },
  ];

  const linksServicios = [
    { name: "Levantamiento Topográfico", href: "#servicios" },
    { name: "Georreferenciación GNSS", href: "#servicios" },
    { name: "Fotogrametría Aérea", href: "#servicios" },
    { name: "Replanteo de Obras", href: "#servicios" },
    { name: "Cubicación de Tierras", href: "#servicios" },
  ];

  return (
    <footer className="bg-brand-dark text-gray-400 relative overflow-hidden border-t border-brand-green/20">
      {/* Decorative contours */}
      <div className="absolute inset-0 bg-topo-grid opacity-5 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Logo & Description Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#inicio"
              className="inline-block transition-transform duration-300 active:scale-95"
            >
              <Logo textColor="light" />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed font-sans pt-2">
              MINGEOTOP E.I.R.L brinda servicios topográficos e ingeniería
              geoespacial especializada en el Perú, aplicando tecnología de alta
              precisión, drones profesionales y procesamiento CAD/GIS de
              vanguardia.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/gimatc.2023"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-brand-green hover:text-white flex items-center justify-center transition-all"
                aria-label="Ir a Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-brand-green hover:text-white flex items-center justify-center transition-all"
                aria-label="Ir a LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mingeotop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-brand-green hover:text-white flex items-center justify-center transition-all"
                aria-label="Ir a TikTok"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.94 2.94 0 0 1 .88.13V9.4a6.3 6.3 0 0 0-.88-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.56a8.16 8.16 0 0 0 4.77 1.52V6.69a4.8 4.8 0 0 1-1.04 0Z" />
                </svg>
              </a>
              <div className="text-[10px] font-semibold text-brand-green-light border border-brand-green/30 bg-brand-green/5 px-2.5 py-1 rounded-md uppercase flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Empresa Certificada</span>
              </div>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-widest text-xs">
              Nuestra Empresa
            </h4>
            <ul className="space-y-2.5 text-sm">
              {linksEmpresa.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2 opacity-50" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-widest text-xs">
              Servicios Destacados
            </h4>
            <ul className="space-y-2.5 text-sm">
              {linksServicios.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2 opacity-50" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact coordinates summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-widest text-xs">
              Información de Registro
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-brand-green mt-0.5" />
                <span className="leading-snug">
                  Av. Principal 123, Of. 402, Lima, Perú
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-brand-green" />
                <span>+51 913 386 354</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-brand-green" />
                <span>mingeotop@gmail.com</span>
              </div>
              <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px] text-gray-500">
                <div>**RUC:** 20600000000</div>
                <div>**Razón Social:** MINGEOTOP E.I.R.L.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {currentYear} MINGEOTOP E.I.R.L 
          </div>
          <div className="flex items-center space-x-4">
            <a href="#contacto" className="hover:text-white transition-colors">
              Términos de Servicio
            </a>
            <span>•</span>
            <a href="#contacto" className="hover:text-white transition-colors">
              Política de Privacidad
            </a>
            <span>•</span>
            <a
              href="#contacto"
              className="hover:text-white transition-colors font-semibold text-brand-yellow"
            >
              Libro de Reclamaciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
