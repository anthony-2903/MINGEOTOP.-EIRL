import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import estacionTotalImg from '../assets/estacion-total-.webp';
import imgHero2 from '../assets/imghero2.webp';
import imgHero3 from '../assets/imghero3.webp';

const heroImages = [
  estacionTotalImg,
  imgHero2,
  imgHero3,
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [loadSlides, setLoadSlides] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const slideTimer = window.setInterval(() => {
      setLoadSlides(true);
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-brand-petrol text-white bg-topo-grid bg-topo-contour"
    >
      <div className="absolute inset-0 z-0 bg-brand-petrol">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center hero-bg-m transition-opacity duration-[1400ms] ease-in-out ${
              index === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: index === 0 || loadSlides ? `url(${image})` : undefined }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(12,14,17,0.97)_0%,rgba(12,14,17,0.86)_42%,rgba(12,14,17,0.22)_100%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_42%,rgba(255,92,0,0.22)_0%,rgba(45,91,55,0.16)_34%,transparent_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-petrol/10 via-brand-petrol/35 to-brand-petrol z-0" />
      <div className="absolute inset-0 bg-topo-grid opacity-30 z-0" />

      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 bg-brand-petrol-dark/80 border border-brand-yellow/30 px-4 py-2 rounded-full mb-6 hover:border-brand-yellow/60 transition-colors duration-300"
            >
              <Logo iconOnly={true} className="w-6 h-6 animate-soft-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-yellow uppercase">
                Topografía, geodesia y control de obra
              </span>
            </m.div>

            <div className="space-y-4">
              <m.h1
                initial={false}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-outfit"
              >
                <span className="block text-white tracking-wider uppercase">
                  <span className="text-brand-yellow font-extrabold">MINGEO</span>TOP
                  <span className="text-lg sm:text-xl font-semibold text-brand-yellow ml-1">E.I.R.L.</span>
                </span>
                <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-3 font-light leading-snug">
                  Medición en campo y entregables técnicos para obra
                </span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                Levantamientos, replanteos, cubicaciones, planos DWG/PDF, ortomosaicos y control topográfico para minería, construcción e infraestructura en todo el Perú.
              </m.p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                id="btn-hero-cotizar"
                href="#contacto"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-4 rounded-xl font-outfit font-bold transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 transform hover:-translate-y-1 hover-glow-yellow"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                id="btn-hero-servicios"
                href="#proyectos"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 text-white border-2 border-brand-green/80 hover:border-brand-green px-8 py-3.5 rounded-xl font-outfit font-semibold transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 transform hover:-translate-y-1"
              >
                <span>Ver Proyectos</span>
              </a>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md sm:max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-yellow font-outfit">99.9%</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">Precisión Técnica</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left border-x border-white/10 px-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-yellow font-outfit">+150</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">Proyectos Exitosos</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-yellow font-outfit">100%</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">Garantía en Plazos</span>
              </div>
            </m.div>
          </div>

          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
