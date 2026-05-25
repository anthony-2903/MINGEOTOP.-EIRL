import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Compass, MapPin, ShieldCheck, X } from 'lucide-react';

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
      location: 'Pasco, Perú',
      specs:
        'Cubicación mensual de stock, control de estabilidad de botaderos y levantamiento topográfico en zona minera.',
      precision: '±2 cm instrumental',
      color: 'from-brand-petrol via-brand-petrol-dark to-brand-green',
      image: minaTajoAbiertoImg,
    },
    {
      id: 2,
      title: 'Levantamiento Catastral y Ortomosaico',
      category: 'dron',
      catName: 'Drones & Catastro',
      location: 'Lima Provincias, Perú',
      specs:
        'Fotogrametría con dron, generación de ortofoto digital, curvas de nivel y documentación técnica del terreno.',
      precision: 'GSD 3.2 cm/px',
      color: 'from-brand-green via-[#1f3a3a] to-brand-yellow/30',
    },
    {
      id: 3,
      title: 'Replanteo de Ejes y Verticalidad',
      category: 'construccion',
      catName: 'Construcción Civil',
      location: 'Lima Metropolitana',
      specs:
        'Control geométrico de cimentaciones, colocación de pernos de anclaje y verificación de verticalidad estructural.',
      precision: '±1.5 mm angular',
      color: 'from-brand-petrol via-[#1c3842] to-brand-yellow/40',
    },
    {
      id: 4,
      title: 'Red Geodésica de Apoyo WGS84',
      category: 'dron',
      catName: 'Drones & Catastro',
      location: 'Huancavelica, Perú',
      specs:
        'Monumentación, enlace y validación de puntos geodésicos para servir como base de control en campo.',
      precision: 'Horizontal < 5 mm',
      color: 'from-brand-dark via-brand-petrol to-brand-green',
    },
    {
      id: 5,
      title: 'Levantamiento y Trazo Vial',
      category: 'vias',
      catName: 'Carreteras',
      location: 'Junín, Perú',
      specs:
        'Topografía del eje de vía, perfiles longitudinales, secciones transversales y metrados de corte y relleno.',
      precision: '±1 cm altimétrica',
      color: 'from-[#D97706] via-brand-petrol to-brand-green',
    },
    {
      id: 6,
      title: 'Topografía Subterránea y Galerías',
      category: 'mineria',
      catName: 'Minería',
      location: 'Arequipa, Perú',
      specs:
        'Registro técnico de túneles, galerías y frentes de avance para control de obra y seguimiento de producción.',
      precision: '±1 mm nube de puntos',
      color: 'from-brand-petrol via-brand-dark to-brand-yellow/30',
      image: tunelSubterraneoImg,
    },
  ];

  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[number]>(null);

  const filteredProjects =
    filter === 'todos'
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
    <section id="proyectos" className="relative overflow-hidden bg-white bg-topo-contour py-24">
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gray-200/60 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow sm:text-sm"
          >
            Nuestro portafolio
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-3xl font-extrabold text-brand-petrol sm:text-4xl md:text-5xl"
          >
            Proyectos ejecutados con precisión
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-gray-500 sm:text-lg"
          >
            Una muestra visual de trabajos realizados en minería, infraestructura vial,
            construcción y saneamiento técnico de terrenos.
          </motion.p>
        </div>

        <div className="mx-auto mb-16 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`rounded-full px-5 py-2.5 font-outfit text-xs font-semibold transition-all duration-300 sm:text-sm ${
                filter === category.id
                  ? 'bg-brand-petrol text-white shadow-premium'
                  : 'border border-gray-200 bg-brand-light text-brand-petrol hover:bg-brand-petrol/5'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                layoutId={`project-card-${project.id}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-brand-green/20 bg-brand-dark text-left text-white shadow-premium outline-none transition-shadow duration-300 focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/30 to-transparent" />
                <div className="absolute inset-0 bg-topo-grid opacity-10 pointer-events-none" />

                <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-yellow backdrop-blur-md">
                    <Compass className="h-3 w-3" />
                    {project.catName}
                  </span>
                  <a
                    href="#contacto"
                    onClick={(event) => event.stopPropagation()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:bg-brand-yellow hover:text-brand-dark"
                    title="Consultar por un proyecto similar"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <div className="space-y-3 rounded-xl border border-white/15 bg-brand-dark/30 p-5 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-brand-dark/45">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-green-light">
                      <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-outfit text-xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-brand-yellow">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-200">
                      {project.specs}
                    </p>
                    <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] font-bold uppercase tracking-wider text-brand-green-light">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Precisión: {project.precision}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>

    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/75 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            layoutId={`project-card-${selectedProject.id}`}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-brand-dark text-white shadow-2xl"
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark/70 text-white backdrop-blur-md transition-colors duration-300 hover:bg-brand-yellow hover:text-brand-dark"
              aria-label="Cerrar proyecto"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] max-h-[78vh] w-full overflow-hidden">
              {selectedProject.image ? (
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.04 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${selectedProject.color}`} />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-transparent" />
              <div className="absolute inset-0 bg-topo-grid opacity-10 pointer-events-none" />

              <motion.div
                className="absolute inset-x-0 bottom-0 p-5 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.12, duration: 0.35 }}
              >
                <div className="max-w-3xl space-y-4 rounded-xl border border-white/15 bg-brand-dark/35 p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green-light">
                    <span className="inline-flex items-center gap-1.5 text-brand-yellow">
                      <Compass className="h-3.5 w-3.5" />
                      {selectedProject.catName}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                      {selectedProject.location}
                    </span>
                  </div>
                  <h3 className="font-outfit text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-100 sm:text-base">
                    {selectedProject.specs}
                  </p>
                  <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] font-bold uppercase tracking-wider text-brand-green-light">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Precisión: {selectedProject.precision}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
