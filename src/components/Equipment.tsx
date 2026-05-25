import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Disc, Zap, Plane, Code, MonitorDot, Database, Layers } from 'lucide-react';

import totalStationImg from '../assets/equipment_total_station_real.jpg';
import gnssRtkImg from '../assets/equipment_gnss_real.jpg';
import opticalLevelImg from '../assets/equipment_level_real.jpg';
import droneSurveyImg from '../assets/equipment_drone_real.jpg';

export default function Equipment() {
  const hardware = [
    {
      name: 'Estación Total Electrónica',
      image: totalStationImg,
      specs: 'Medición angular milimétrica y EDM de gran alcance (hasta 5000m sin prisma). Ideal para replanteos estructurales e instrumentación de presas.',
      icon: <Compass className="h-6 w-6 text-brand-yellow group-hover:text-brand-dark transition-colors duration-300" />,
      features: ['Precisión angular de 1"', 'Medición sin prisma', 'Compensador de doble eje'],
    },
    {
      name: 'GPS Diferencial GNSS RTK',
      image: gnssRtkImg,
      specs: 'Receptores multiconstelación de triple frecuencia (GPS, GLONASS, Galileo, BeiDou) con precisión centimétrica en tiempo real.',
      icon: <Layers className="h-6 w-6 text-brand-yellow group-hover:text-brand-dark transition-colors duration-300" />,
      features: ['Estación Base y Móvil', 'Precisión H: 8mm, V: 15mm', 'Enlace radio UHF y GSM'],
    },
    {
      name: 'Nivel Automático de Precisión',
      image: opticalLevelImg,
      specs: 'Instrumental óptico de alta gama para nivelación geométrica diferencial y control de asentamientos estructurales.',
      icon: <Disc className="h-6 w-6 text-brand-yellow group-hover:text-brand-dark transition-colors duration-300" />,
      features: ['Aumento de 32x', 'Desviación estándar de 0.7mm/km', 'Compensador automático de aire'],
    },
    {
      name: 'Drones para Fotogrametría',
      image: droneSurveyImg,
      specs: 'Drones profesionales multiespectrales y RGB de alta resolución para cartografía, catastro y modelos 3D volumétricos.',
      icon: <Plane className="h-6 w-6 text-brand-yellow group-hover:text-brand-dark transition-colors duration-300" />,
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
    <section id="equipos" className="py-24 bg-brand-light relative overflow-hidden bg-topo-contour">
      {/* Light contour overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-topo-grid opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
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

        {/* Enhanced Hardware Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {hardware.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-brand-yellow/30 hover-glow-yellow transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Container with scanner HUD shimmer sweep */}
              <div className="h-60 sm:h-64 relative overflow-hidden bg-brand-petrol w-full">
                {/* Tech Scan Sweep Overlay */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out z-20" />
                
                {/* Contour background details over image */}
                <div className="absolute inset-0 bg-topo-grid opacity-5 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-petrol/55 via-transparent to-transparent z-10" />

                {/* Professional survey image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Floating Technical Icon Badge */}
                <div className="absolute bottom-4 left-4 z-10 w-12 h-12 rounded-xl bg-brand-petrol/90 border border-brand-yellow/30 text-white flex items-center justify-center shadow-lg group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Text specifications container */}
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between bg-white">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-petrol font-outfit leading-tight group-hover:text-brand-yellow transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-sans">
                    {item.specs}
                  </p>
                </div>

                {/* Features Technical Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs font-bold bg-brand-light border border-gray-200/60 text-brand-petrol px-3 py-1.5 rounded-lg"
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
        <div className="bg-brand-petrol text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-brand-green/20 shadow-xl">
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
                  className="bg-brand-petrol-dark/60 border border-brand-green/20 p-4 rounded-xl flex items-center space-x-3 hover:border-brand-yellow/50 transition-colors duration-300 group"
                >
                  <div className="bg-brand-yellow p-2.5 rounded-lg text-brand-petrol group-hover:scale-110 transition-transform duration-300">
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
