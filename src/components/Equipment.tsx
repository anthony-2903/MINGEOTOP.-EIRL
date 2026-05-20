import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Disc, Zap, Plane, Code, MonitorDot, Database, Layers } from 'lucide-react';

export default function Equipment() {
  const hardware = [
    {
      name: 'Estación Total Electrónica',
      specs: 'Medición angular milimétrica y EDM de gran alcance (hasta 5000m sin prisma). Ideal para replanteos estructurales e instrumentación de presas.',
      icon: <Compass className="h-6 w-6 text-brand-yellow animate-spin-slow" />,
      features: ['Precisión angular de 1"', 'Medición sin prisma', 'Compensador de doble eje'],
    },
    {
      name: 'GPS Diferencial GNSS RTK',
      specs: 'Receptores multiconstelación de triple frecuencia (GPS, GLONASS, Galileo, BeiDou) con precisión centimétrica en tiempo real.',
      icon: <Layers className="h-6 w-6 text-brand-yellow" />,
      features: ['Estación Base y Móvil', 'Precisión H: 8mm, V: 15mm', 'Enlace radio UHF y GSM'],
    },
    {
      name: 'Nivel Automático de Precisión',
      specs: 'Instrumental óptico de alta gama para nivelación geométrica diferencial y control de asentamientos estructurales.',
      icon: <Disc className="h-6 w-6 text-brand-yellow" />,
      features: ['Aumento de 32x', 'Desviación estándar de 0.7mm/km', 'Compensador automático de aire'],
    },
    {
      name: 'Drones para Fotogrametría',
      specs: 'Drones profesionales multiespectrales y RGB de alta resolución para cartografía, catastro y modelos 3D volumétricos.',
      icon: <Plane className="h-6 w-6 text-brand-yellow" />,
      features: ['Cámara de 45 MP con obturador mecánico', 'Módulo RTK integrado', 'Planificación automática de vuelos'],
    },
  ];

  const softwares = [
    { name: 'AutoCAD', category: 'Dibujo CAD Técnico', icon: <Code className="h-5 w-5" /> },
    { name: 'Civil 3D', category: 'Diseño Vial & Movimiento Tierras', icon: <MonitorDot className="h-5 w-5" /> },
    { name: 'ArcGIS / QGIS', category: 'Sistemas de Información Geográfica (GIS)', icon: <Database className="h-5 w-5" /> },
    { name: 'Pix4D / Agisoft', category: 'Procesamiento Fotogramétrico Dron', icon: <Zap className="h-5 w-5" /> },
  ];

  return (
    <section id="equipos" className="py-24 bg-white relative overflow-hidden bg-topo-contour">
      {/* Light contour overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-topo-grid opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-green uppercase mb-3"
          >
            EQUIPOS Y TECNOLOGÍA
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Instrumental de Alta Gama y Procesamiento Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            Invertimos continuamente en la calibración y renovación de nuestros equipos de campo y herramientas de software para asegurar planos confiables y cubicaciones exactas.
          </motion.p>
        </div>

        {/* Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {hardware.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-light border border-gray-200/60 hover:border-brand-green/30 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Hardware Icon Circle */}
              <div className="w-14 h-14 rounded-xl bg-brand-petrol text-white flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                {item.icon}
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-brand-petrol font-outfit leading-tight group-hover:text-brand-green transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {item.specs}
                  </p>
                </div>

                {/* Technical specs badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-white border border-gray-200 text-brand-petrol px-2.5 py-1 rounded-md"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Softwares Grid */}
        <div className="bg-brand-petrol text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-brand-green/20">
          {/* Decorative glowing lines */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title / Info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] sm:text-xs font-bold text-brand-yellow uppercase tracking-widest">
                Software & Gabinete Técnico
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit leading-tight">
                Modelado Digital de Alta Fidelidad
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                No solo medimos en campo, procesamos los datos utilizando las herramientas estándares de la industria. Generamos informes técnicos oficiales y planos certificados listos para aprobación municipal o gubernamental.
              </p>
            </div>

            {/* Software Items */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softwares.map((sw, idx) => (
                <div
                  key={idx}
                  className="bg-brand-petrol-dark/60 border border-brand-green/20 p-4 rounded-xl flex items-center space-x-3 hover:border-brand-yellow/50 transition-colors duration-300"
                >
                  <div className="bg-brand-yellow p-2 rounded-lg text-brand-petrol">
                    {sw.icon}
                  </div>
                  <div>
                    <h4 className="font-bold font-outfit text-white text-base leading-none">{sw.name}</h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">{sw.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
