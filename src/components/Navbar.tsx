import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sectores', href: '#sectores' },
    { name: 'Equipos', href: '#equipos' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-petrol/95 backdrop-blur-md py-3 shadow-premium border-b border-brand-green/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex items-center space-x-2 group">
            <div className="bg-brand-yellow p-2 rounded-lg text-brand-petrol transition-transform duration-300 group-hover:rotate-45">
              <Compass className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-2xl tracking-wider text-white leading-none">
                MINGEOTOP
              </span>
              <span className="text-[10px] text-brand-yellow font-semibold tracking-[0.2em] uppercase leading-none mt-1">
                Ingeniería & Topografía
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden lg:block">
            <a
              id="btn-cotizar-nav"
              href="#contacto"
              className="flex items-center space-x-2 bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-5 py-2.5 rounded-lg font-outfit font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 hover-glow-yellow"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Cotizar Ahora</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-petrol-light focus:outline-none transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed left-0 w-full bg-brand-petrol/98 backdrop-blur-lg border-b border-brand-green/20 transition-all duration-300 ease-in-out ${
          isOpen ? 'top-[72px] opacity-100 visible h-auto py-6 shadow-2xl' : 'top-[-500px] opacity-0 invisible h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-brand-green/20 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-green/20 mt-4 px-4">
            <a
              id="btn-cotizar-mobile"
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark w-full py-3.5 rounded-lg font-outfit font-bold text-base transition-colors"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Cotizar Ahora</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
