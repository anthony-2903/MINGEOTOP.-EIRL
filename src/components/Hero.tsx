import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Target, Award } from 'lucide-react';
import surveyorImg from '../assets/surveyor.png';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-brand-petrol text-white bg-topo-grid bg-topo-contour"
    >
      {/* Visual background overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-petrol/60 via-brand-petrol/90 to-brand-petrol z-0" />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center lg:justify-start space-x-2 bg-brand-green/20 border border-brand-green/30 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-green-light uppercase">
                Tecnología Geoespacial de Vanguardia
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-outfit"
              >
                <span className="block text-brand-yellow">MINGEOTOP E.I.R.L.</span>
                <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2 font-normal">
                  Ingeniería Topográfica con Precisión Milimétrica
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                Soluciones integrales de topografía, geodesia y fotogrametría con drones para proyectos mineros, de construcción civil, rurales, urbanos e industriales en todo el Perú.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                id="btn-hero-cotizar"
                href="#contacto"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-4 rounded-xl font-outfit font-bold transition-all duration-300 transform hover:-translate-y-1 hover-glow-yellow"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                id="btn-hero-servicios"
                href="#servicios"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 text-white border-2 border-brand-green/80 hover:border-brand-green px-8 py-3.5 rounded-xl font-outfit font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Ver Servicios</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
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
            </motion.div>
          </div>

          {/* Graphical/Image Content */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* SVG Background Contour Accent */}
            <svg
              className="absolute -top-10 -left-10 w-40 h-40 text-brand-green/20 animate-spin-slow opacity-60 hidden md:block"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="35" />
              <circle cx="50" cy="50" r="25" strokeDasharray="6 6" />
              <path d="M50 0 V100 M0 50 H100" strokeWidth="0.2" />
            </svg>

            {/* Main Image Card with glow and float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden border-2 border-brand-green/40 shadow-2xl p-2 bg-brand-petrol-dark/80 backdrop-blur-sm max-w-sm sm:max-w-md w-full animate-float"
            >
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img
                  src={surveyorImg}
                  alt="Topógrafo MINGEOTOP E.I.R.L. con estación total"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                {/* Tech overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-petrol/90 via-transparent to-transparent" />
                
                {/* Measuring details */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-petrol-dark/90 backdrop-blur-md p-3 rounded-lg border border-brand-green/30">
                  <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-brand-yellow font-bold uppercase tracking-widest">
                    <Compass className="h-4 w-4 text-brand-yellow animate-spin-slow" />
                    <span>Control de Puntos de Apoyo (GNSS)</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
                    <span>Lat: 12° 02' 36" S</span>
                    <span>Lon: 77° 01' 42" O</span>
                    <span>Elev: 3450 msnm</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Abstract floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute -bottom-6 -left-6 bg-brand-dark/95 border border-brand-green/30 p-4 rounded-xl shadow-xl flex items-center space-x-3 hidden sm:flex"
            >
              <div className="bg-brand-green p-2.5 rounded-lg text-white">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Certificación</h4>
                <p className="text-sm font-extrabold text-white mt-1">Georreferenciación WGS84</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
