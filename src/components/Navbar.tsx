import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Menu, PhoneCall, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sectores', href: '#sectores' },
    { name: 'Equipos', href: '#equipos' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 top-0 z-50 w-full transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-500 ${
        isScrolled
          ? 'border-b border-brand-green/20 bg-brand-petrol/95 py-3 shadow-premium backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <a href="#inicio" className="min-w-0 shrink transition-transform duration-300 active:scale-95">
            <Logo textColor="light" />
          </a>

          <div className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative px-2.5 py-2 text-[13px] font-semibold text-gray-300 transition-colors duration-300 hover:text-white 2xl:px-3 2xl:text-sm"
              >
                {link.name}
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] origin-center scale-x-0 bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100 2xl:left-3 2xl:right-3" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <a
              id="btn-admin-nav"
              aria-label="Abrir administrador"
              href="/admin"
              className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2.5 font-outfit text-sm font-semibold text-gray-200 transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 hover:bg-white/10 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden 2xl:inline">Admin</span>
            </a>
            <a
              id="btn-cotizar-nav"
              href="#contacto"
              className="flex items-center gap-2 rounded-md bg-brand-yellow px-3.5 py-2.5 font-outfit text-sm font-semibold text-brand-dark transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand-yellow-light hover-glow-yellow 2xl:px-5"
            >
              <PhoneCall className="h-4 w-4" />
              <span className="hidden sm:inline">Cotizar</span>
              <span className="hidden 2xl:inline"> Ahora</span>
            </a>
          </div>

          <div className="xl:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-gray-200 transition-colors hover:bg-brand-petrol-light hover:text-white focus:outline-none"
              aria-label="Abrir menú"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="hidden text-sm font-semibold sm:inline">Menú</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed left-0 w-full border-b border-brand-green/20 bg-brand-petrol/98 backdrop-blur-lg transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 ease-in-out xl:hidden ${
          isOpen
            ? 'top-[72px] visible max-h-[calc(100dvh-72px)] overflow-y-auto py-5 opacity-100 shadow-2xl'
            : 'top-[-620px] invisible max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-brand-green/20 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 grid gap-3 border-t border-brand-green/20 pt-5 sm:grid-cols-2">
            <a
              id="btn-admin-mobile"
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 py-3.5 font-outfit text-base font-bold text-gray-100 transition-colors hover:bg-white/10"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Panel Admin</span>
            </a>
            <a
              id="btn-cotizar-mobile"
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-yellow py-3.5 font-outfit text-base font-bold text-brand-dark transition-colors hover:bg-brand-yellow-light"
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
