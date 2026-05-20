import React from 'react';
import { motion } from 'framer-motion';
import {
  Map,
  Compass,
  MapPin,
  Activity,
  Layers,
  FileText,
  Boxes,
  TrendingDown,
  Mountain,
  Plane,
  ChevronRight
} from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      icon: <Map className="h-6 w-6" />,
      title: 'Levantamientos Topográficos',
      desc: 'Determinación exacta de la configuración del terreno (alturas, relieves, linderos y detalles naturales o artificiales) para proyectos de ingeniería.',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Replanteo de Obras',
      desc: 'Traslado exacto de los planos de diseño al terreno real, marcando ejes, niveles y límites estructurales para la correcta construcción.',
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: 'Georreferenciación',
      desc: 'Establecimiento de coordenadas geográficas de alta precisión vinculadas a la red geodésica nacional (IGN) usando equipos GNSS satelitales.',
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Control Topográfico de Obra',
      desc: 'Supervisión constante y control geométrico continuo en obra civil, previniendo desviaciones críticas en estructuras, túneles y cimentaciones.',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Curvas de Nivel',
      desc: 'Representación gráfica detallada del relieve del terreno mediante isolíneas que conectan puntos de igual altitud, ideal para modelado 3D.',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Planos Topográficos',
      desc: 'Dibujo y digitalización en CAD/GIS de planos catastrales, altimétricos, perfiles longitudinales y secciones transversales bajo normas oficiales.',
    },
    {
      icon: <Boxes className="h-6 w-6" />,
      title: 'Cubicación',
      desc: 'Cálculo exacto del volumen de materiales acumulados (acopios, canteras, acopios mineros) para un inventariado riguroso.',
    },
    {
      icon: <TrendingDown className="h-6 w-6" />,
      title: 'Movimiento de Tierras',
      desc: 'Cuantificación y replanteo en excavaciones, rellenos y terraplenes. Control mensual de avance volumétrico en obras viales y civiles.',
    },
    {
      icon: <Mountain className="h-6 w-6" />,
      title: 'Topografía Minera',
      desc: 'Control topográfico en interior mina (subterránea) y tajo abierto, galerías, chimeneas, control de botaderos y taludes inestables.',
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: 'Fotogrametría con Dron',
      desc: 'Captura aérea masiva para generación de Ortomosaicos de alta resolución, Modelos Digitales de Terreno (MDT) y Nubes de Puntos densas.',
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-brand-light relative overflow-hidden bg-topo-grid bg-topo-contour">
      {/* Light decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-light/90 to-brand-light z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-green uppercase mb-3"
          >
            NUESTROS SERVICIOS
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Soluciones Geoespaciales y Topografía Especializada
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            Cubrimos todas las necesidades de medición, mapeo y control geométrico en campo con precisión milimétrica y procesamiento digital avanzado.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-premium hover:shadow-premium-hover hover:border-brand-green/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-brand-petrol/5 text-brand-petrol flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-petrol font-outfit leading-tight group-hover:text-brand-green transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-sans">
                  {service.desc}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Código de Servicio: MT-0{index + 1}
                </span>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-light text-brand-petrol hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 group-hover:translate-x-1"
                  title="Solicitar cotización de este servicio"
                >
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
