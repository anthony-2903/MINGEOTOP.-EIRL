import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Compass,
  HardHat,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function AboutUs() {
  const pillars = [
    {
      icon: <Target className="h-6 w-6 text-brand-yellow" />,
      title: "Nuestra Misión",
      desc: "Proporcionar servicios topográficos y geodésicos especializados de alta precisión mediante tecnología avanzada y metodologías rigurosas, garantizando el éxito técnico de proyectos de infraestructura, minería y saneamiento.",
    },
    {
      icon: <Compass className="h-6 w-6 text-brand-yellow" />,
      title: "Nuestra Visión",
      desc: "Ser el socio estratégico de ingeniería geoespacial preferido a nivel nacional, reconocidos por nuestra precisión milimétrica, puntualidad rigurosa en plazos y adaptabilidad en los terrenos más difíciles del país.",
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-yellow" />,
      title: "Valores Clave",
      desc: "Basamos nuestro actuar en la precisión absoluta, la seguridad operacional en campo, el cumplimiento ético de estándares internacionales y un trato personalizado que se traduce en confianza a largo plazo.",
    },
  ];

  const sectors = [
    {
      name: "Proyectos Mineros",
      desc: "Control de taludes, cubicaciones, topografía subterránea y tajo abierto.",
    },
    {
      name: "Construcción Civil",
      desc: "Edificaciones, habilitación urbana y replanteo estructural de precisión.",
    },
    {
      name: "Carreteras e Infraestructura",
      desc: "Trazados viales, control de movimiento de tierras y perfiles longitudinales.",
    },
    {
      name: "Catastro y Predios Rurales",
      desc: "Georreferenciación con fines de saneamiento y delimitación de linderos.",
    },
    {
      name: "Montaje Industrial",
      desc: "Alineación de ejes de maquinaria, control de deformaciones y estructuras metálicas.",
    },
  ];

  return (
    <section
      id="nosotros"
      className="py-24 bg-white relative overflow-hidden bg-topo-contour"
    >
      {/* Topographic accent shape */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-light/30 rounded-bl-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            SOBRE NOSOTROS
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Comprometidos con la Precisión, Tecnología y Experiencia en Campo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            En MINGEOTOP E.I.R.L aportamos soluciones de ingeniería e
            instrumental topográfico de última generación para proyectos de alta
            complejidad técnica y logística.
          </motion.p>
        </div>

        {/* Brand pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-brand-light border border-gray-200/60 p-8 rounded-2xl hover:border-brand-yellow/30 hover:bg-white hover:shadow-premium hover-glow-yellow transition-all duration-300 group flex flex-col items-center text-center md:items-start md:text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="bg-brand-petrol p-4 rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-petrol font-outfit mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two-column layout for details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content & Sectors list */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-brand-petrol font-outfit">
              Servicios Especializados Multidisciplinarios
            </h3>
            <p className="text-gray-600 leading-relaxed font-sans text-sm sm:text-base">
              Con años de experiencia en el terreno, apoyamos el planeamiento y
              ejecución de obras civiles e industriales. Entendemos que en
              topografía, un milímetro marca la diferencia; por ello, combinamos
              rigurosa experiencia en campo con herramientas CAD/GIS de primer
              nivel para proporcionar planos de alta fidelidad y cubicaciones
              exactas.
            </p>

            <div className="space-y-4 pt-4">
              {sectors.map((sec, idx) => (
                <div key={idx} className="flex items-start space-x-3 group">
                  <div className="mt-1 bg-brand-green/10 text-brand-green p-1 rounded-md group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors duration-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-brand-petrol text-base leading-snug group-hover:text-brand-yellow transition-colors duration-300">
                      {sec.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-petrol to-brand-green rounded-3xl opacity-10 blur-xl -z-10" />

            <div className="gradient-petrol-green text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-brand-green/30 group">
              {/* Pattern curves */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-xl" />
              
              {/* Animated Radar Scanning Overlay */}
              <motion.div 
                initial={{ top: '-50%' }}
                animate={{ top: '150%' }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-brand-yellow/10 to-transparent blur-md pointer-events-none"
              />

              <h3 className="text-2xl font-bold font-outfit mb-6 pb-4 border-b border-white/10">
                Nuestra Cobertura Nacional
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed mb-6 font-sans">
                Operamos en todo el territorio nacional, superando retos
                climáticos, geográficos y de altitud (desde desiertos costeros
                hasta operaciones mineras a más de 4,800 m.s.n.m.).
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-xl text-brand-yellow">
                    <HardHat className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold font-outfit text-white leading-none">
                      Seguridad Primero
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      Cumplimiento riguroso de normativas mineras OHSAS/ISO.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-xl text-brand-yellow">
                    <Compass className="h-6 w-6 animate-soft-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold font-outfit text-white leading-none font-sans">
                      Sistemas de Referencia
                    </h4>
                    <p className="text-xs text-gray-300 mt-1">
                      Soporte geodésico WGS84, SIRGAS y PSAD56.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-yellow uppercase tracking-widest font-bold">
                    Respuesta Técnica
                  </span>
                  <span className="text-base font-extrabold text-white mt-0.5">
                    Menos de 24 Horas
                  </span>
                </div>
                <a
                  href="#contacto"
                  className="flex items-center space-x-1.5 text-xs font-bold text-brand-yellow hover:text-white transition-colors duration-300 font-outfit uppercase tracking-wider"
                >
                  <span>Iniciar Proyecto</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
