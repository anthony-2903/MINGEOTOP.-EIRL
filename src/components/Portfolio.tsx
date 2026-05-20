import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, ArrowUpRight, ShieldCheck } from 'lucide-react';

import minaTajoAbiertoImg from '../assets/mina_tajo_abierto.png';
import tunelSubterraneoImg from '../assets/tunel_subterraneo.png';

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'mineria', name: 'Minería' },
    { id: 'construccion', name: 'Construcción' },
    { id: 'vias', name: 'Carreteras' },
    { id: 'dron', name: 'Drones & Catastro' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Control Volumétrico y Taludes',
      category: 'mineria',
      catName: 'Minería',
      client: 'Consorcio Minero del Centro',
      location: 'Pasco, Perú (4,300 msnm)',
      specs: 'Cubicación mensual de stock, control de estabilidad estructural de botaderos y levantamiento subterráneo.',
      precision: '±2 cm instrumental',
      coords: 'Lat: 10°41\'S / Lon: 76°15\'O',
      color: 'from-brand-petrol via-brand-petrol-dark to-brand-green',
      image: minaTajoAbiertoImg,
    },
    {
      id: 2,
      title: 'Levantamiento Catastral y Ortomosaico',
      category: 'dron',
      catName: 'Drones & Catastro',
      client: 'Municipalidad Distrital',
      location: 'Lima Provincias, Perú',
      specs: 'Fotogrametría con dron de 450 hectáreas, ortofoto digital de 3cm GSD y curvas de nivel cada 1m.',
      precision: 'GSD 3.2 cm/px',
      coords: 'Lat: 11°56\'S / Lon: 76°45\'O',
      color: 'from-brand-green via-[#1f3a3a] to-brand-yellow/30',
    },
    {
      id: 3,
      title: 'Replanteo de Ejes y Verticalidad',
      category: 'construccion',
      catName: 'Construcción Civil',
      client: 'Constructora Alfa',
      location: 'Lima Metropolitana',
      specs: 'Control geométrico de cimentaciones profundas, pilotes, colocación de pernos de anclaje y verticalidad estructural.',
      precision: '±1.5 mm angular',
      coords: 'Lat: 12°04\'S / Lon: 77°02\'O',
      color: 'from-brand-petrol via-[#1c3842] to-brand-yellow/40',
    },
    {
      id: 4,
      title: 'Red Geodésica de Apoyo WGS84',
      category: 'dron',
      catName: 'Drones & Catastro',
      client: 'Empresa Hidroeléctrica',
      location: 'Huancavelica, Perú',
      specs: 'Monumentación y enlace de 8 puntos geodésicos de orden "C" homologados ante el Instituto Geográfico Nacional (IGN).',
      precision: 'Horizontal < 5mm',
      coords: 'Lat: 12°31\'S / Lon: 74°58\'O',
      color: 'from-brand-dark via-brand-petrol to-brand-green',
    },
    {
      id: 5,
      title: 'Levantamiento y Trazo Vial de 42km',
      category: 'vias',
      catName: 'Carreteras',
      client: 'Consorcio Vial Andino',
      location: 'Junín, Perú',
      specs: 'Topografía del eje de la vía, perfiles longitudinales, secciones transversales y cubicación de corte/relleno en roca.',
      precision: '±1 cm altimétrica',
      coords: 'Lat: 11°08\'S / Lon: 75°59\'O',
      color: 'from-[#D97706] via-brand-petrol to-brand-green',
    },
    {
      id: 6,
      title: 'Topografía Subterránea y Galerías',
      category: 'mineria',
      catName: 'Minería',
      client: 'Compañía Minera Beta',
      location: 'Arequipa, Perú',
      specs: 'Levantamiento 3D de alta precisión con escáner láser de túneles, galerías y frentes de avance para control de sobre-rotura.',
      precision: '±1 mm nube de puntos',
      coords: 'Lat: 15°24\'S / Lon: 71°32\'O',
      color: 'from-brand-petrol via-brand-dark to-brand-yellow/30',
      image: tunelSubterraneoImg,
    },
  ];

  const filteredProjects =
    filter === 'todos'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="proyectos" className="py-24 bg-white relative overflow-hidden bg-topo-contour">
      {/* Visual top bar styling */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200/60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            NUESTRO PORTAFOLIO
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Proyectos de Precisión Ejecutados con Éxito
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            Conoce algunos de nuestros trabajos más emblemáticos en minería, infraestructura vial y saneamiento legal de tierras.
          </motion.p>
        </div>

        {/* Filters Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full font-outfit font-semibold text-xs sm:text-sm transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-brand-petrol text-white shadow-premium'
                  : 'bg-brand-light text-brand-petrol hover:bg-brand-petrol/5 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-dark text-white rounded-3xl overflow-hidden border border-brand-green/20 shadow-premium group flex flex-col justify-between relative min-h-[380px]"
              >
                {/* Visual technical background gradient or Image */}
                {project.image ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/40 transition-colors duration-500" />
                  </div>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 z-0 group-hover:opacity-60 transition-opacity duration-300`} />
                )}
                
                <div className="absolute inset-0 bg-topo-grid opacity-10 z-0 pointer-events-none" />

                {/* Card Header (Specs badge & Coords) */}
                <div className="p-6 relative z-10 flex items-center justify-between border-b border-white/10 bg-brand-dark/20 backdrop-blur-xs">
                  <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest flex items-center space-x-1">
                    <Compass className="h-3 w-3 text-brand-yellow" />
                    <span>{project.catName}</span>
                  </span>
                  <span className="text-[9px] font-mono text-gray-400">
                    {project.coords}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 relative z-10 space-y-4 flex-grow flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-extrabold font-outfit text-white tracking-tight leading-tight group-hover:text-brand-yellow transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans line-clamp-3">
                    {project.specs}
                  </p>

                  <div className="space-y-2 pt-2 text-[11px] sm:text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-brand-green-light font-bold">Cliente:</span>
                      <span className="text-gray-300">{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-brand-green-light font-bold">Lugar:</span>
                      <span className="text-gray-300 flex items-center space-x-1">
                        <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                        <span>{project.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 relative z-10 border-t border-white/10 flex items-center justify-between bg-brand-dark/40 backdrop-blur-xs">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="h-4 w-4 text-brand-green-light" />
                    <span className="text-[10px] font-bold tracking-wider text-brand-green-light uppercase">
                      Precisión: {project.precision}
                    </span>
                  </div>
                  <a
                    href="#contacto"
                    className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-all duration-300"
                    title="Consultar por un proyecto similar"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
