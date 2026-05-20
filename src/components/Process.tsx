import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Navigation, Cpu, FileCheck } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Evaluación del Requerimiento',
      desc: 'Analizamos las necesidades del proyecto, planos base y especificaciones técnicas. Definimos la metodología óptima, plazos de entrega y equipos a desplegar.',
      icon: <ClipboardList className="h-6 w-6" />,
    },
    {
      num: '02',
      title: 'Trabajo de Campo',
      desc: 'Nuestras cuadrillas topográficas se trasladan a la zona de estudio para la monumentación de hitos, medición con estación total, GNSS satelital y levantamiento con drones.',
      icon: <Navigation className="h-6 w-6" />,
    },
    {
      num: '03',
      title: 'Procesamiento Técnico',
      desc: 'En gabinete descargamos la información, realizamos el ajuste geodésico, compensación de poligonales, cálculo volumétrico y modelado técnico en software CAD y GIS.',
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      num: '04',
      title: 'Entrega de Resultados',
      desc: 'Suministramos planos detallados en formatos editables (DWG, PDF, SHP), base de datos de puntos de control, modelos 3D y dossier técnico debidamente firmado por especialista.',
      icon: <FileCheck className="h-6 w-6" />,
    },
  ];

  return (
    <section id="proceso" className="py-24 bg-brand-light relative overflow-hidden bg-topo-grid bg-topo-contour">
      {/* Visual background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-light/80 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            NUESTRO PROCESO
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Metodología Rigurosa de Principio a Fin
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            Garantizamos la máxima precisión técnica estructurando nuestro flujo de trabajo bajo controles de calidad normados e ininterrumpidos.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical / Horizontal Connector Line with animated glow */}
          <div className="absolute left-[39px] lg:left-1/2 lg:-translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-brand-petrol via-brand-green to-brand-yellow rounded-full -z-10 opacity-70" />
          {/* Animated tracing dot */}
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            className="absolute left-[39px] lg:left-1/2 lg:-translate-x-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-brand-yellow to-transparent rounded-full -z-10 blur-sm"
          />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-start ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  } relative`}
                >
                  {/* Bullet Marker (Middle) with Pulse */}
                  <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 top-1.5 flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-brand-petrol flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-brand-yellow transition-all duration-300 relative">
                      <span className="text-xs font-black font-outfit text-brand-petrol group-hover:text-brand-yellow transition-colors duration-300">{step.num}</span>
                      {/* Pulse effect */}
                      <span className="absolute inset-0 rounded-full border border-brand-yellow animate-ping opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Empty space for grid on large screens */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="w-full lg:w-1/2 pl-16 lg:pl-0 lg:px-12"
                  >
                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 group hover:border-brand-yellow/30 hover-glow-yellow">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-petrol/5 text-brand-petrol group-hover:bg-brand-yellow group-hover:text-brand-dark flex items-center justify-center transition-colors duration-300 flex-shrink-0 relative z-10 group-hover:shadow-[0_0_15px_rgba(255,92,0,0.4)]">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-brand-petrol font-outfit leading-tight group-hover:text-brand-yellow transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
