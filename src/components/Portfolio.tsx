import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, MapPin, Play, ShieldCheck, X } from 'lucide-react';

import minaTajoAbiertoImg from '../assets/mina_tajo_abierto.png';
import tunelSubterraneoImg from '../assets/tunel_subterraneo.png';
import { getPublishedProjects, type Project } from '../lib/projects';

const fallbackProjects: Project[] = [
  {
    id: 'fallback-mineria-1',
    title: 'Control Volumetrico y Taludes',
    category: 'mineria',
    catName: 'Mineria',
    location: 'Pasco, Peru',
    specs:
      'Cubicacion mensual de stock, control de estabilidad de botaderos y levantamiento topografico en zona minera.',
    precision: '+/-2 cm instrumental',
    color: 'from-brand-petrol via-brand-petrol-dark to-brand-green',
    image: minaTajoAbiertoImg,
  },
  {
    id: 'fallback-dron-1',
    title: 'Levantamiento Catastral y Ortomosaico',
    category: 'dron',
    catName: 'Drones & Catastro',
    location: 'Lima Provincias, Peru',
    specs:
      'Fotogrametria con dron, generacion de ortofoto digital, curvas de nivel y documentacion tecnica del terreno.',
    precision: 'GSD 3.2 cm/px',
    color: 'from-brand-green via-[#1f3a3a] to-brand-yellow/30',
  },
  {
    id: 'fallback-construccion-1',
    title: 'Replanteo de Ejes y Verticalidad',
    category: 'construccion',
    catName: 'Construccion Civil',
    location: 'Lima Metropolitana',
    specs:
      'Control geometrico de cimentaciones, colocacion de pernos de anclaje y verificacion de verticalidad estructural.',
    precision: '+/-1.5 mm angular',
    color: 'from-brand-petrol via-[#1c3842] to-brand-yellow/40',
  },
  {
    id: 'fallback-dron-2',
    title: 'Red Geodesica de Apoyo WGS84',
    category: 'dron',
    catName: 'Drones & Catastro',
    location: 'Huancavelica, Peru',
    specs:
      'Monumentacion, enlace y validacion de puntos geodesicos para servir como base de control en campo.',
    precision: 'Horizontal < 5 mm',
    color: 'from-brand-dark via-brand-petrol to-brand-green',
  },
  {
    id: 'fallback-vias-1',
    title: 'Levantamiento y Trazo Vial',
    category: 'vias',
    catName: 'Carreteras',
    location: 'Junin, Peru',
    specs:
      'Topografia del eje de via, perfiles longitudinales, secciones transversales y metrados de corte y relleno.',
    precision: '+/-1 cm altimetrica',
    color: 'from-[#D97706] via-brand-petrol to-brand-green',
  },
  {
    id: 'fallback-mineria-2',
    title: 'Topografia Subterranea y Galerias',
    category: 'mineria',
    catName: 'Mineria',
    location: 'Arequipa, Peru',
    specs:
      'Registro tecnico de tuneles, galerias y frentes de avance para control de obra y seguimiento de produccion.',
    precision: '+/-1 mm nube de puntos',
    color: 'from-brand-petrol via-brand-dark to-brand-yellow/30',
    image: tunelSubterraneoImg,
  },
];

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'mineria', name: 'Mineria' },
  { id: 'construccion', name: 'Construccion' },
  { id: 'vias', name: 'Carreteras' },
  { id: 'dron', name: 'Drones & Catastro' },
];

function ProjectMedia({ project, className }: { project: Project; className: string }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.poster}
        className={className}
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  if (project.image) {
    return <img src={project.image} alt={project.title} className={className} loading="lazy" />;
  }

  return <div className={`${className} bg-gradient-to-br ${project.color}`} />;
}

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState('');

  useEffect(() => {
    let mounted = true;

    getPublishedProjects().then((supabaseProjects) => {
      if (mounted && supabaseProjects.length > 0) {
        setProjects(supabaseProjects);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects =
    filter === 'todos'
      ? projects
      : projects.filter((project) => project.category === filter);
  const carouselProjects =
    filteredProjects.length > 0 ? [...filteredProjects, ...filteredProjects] : [];

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
      <section id="proyectos" className="relative overflow-hidden bg-white bg-topo-contour py-24 lg:py-28">
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-gray-200/60 -z-10" />

        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
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
              Proyectos ejecutados con precision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base text-gray-500 sm:text-lg"
            >
              Una muestra visual de trabajos realizados en mineria, infraestructura vial,
              construccion y saneamiento tecnico de terrenos.
            </motion.p>
          </div>

          <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 sm:mb-12">
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

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />

          <motion.div
            key={filter}
            layout
            className="project-carousel-track grid h-[720px] w-max auto-cols-[90vw] grid-flow-col-dense grid-rows-3 gap-2 pb-5 sm:h-[560px] sm:auto-cols-[320px] sm:gap-2.5 lg:h-[620px] lg:auto-cols-[360px] xl:h-[680px] xl:auto-cols-[410px]"
          >
            <AnimatePresence mode="popLayout">
              {carouselProjects.map((project, index) => {
                const layoutId = `project-card-${project.id}-${index}`;

                return (
                <motion.div
                  key={`${project.id}-${index}`}
                  layout
                  layoutId={layoutId}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedLayoutId(layoutId);
                    setSelectedProject(project);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedLayoutId(layoutId);
                      setSelectedProject(project);
                    }
                  }}
                  className="group relative size-full cursor-pointer overflow-hidden rounded-md border border-brand-green/20 bg-brand-dark text-left text-white shadow-premium outline-none transition-shadow duration-300 nth-[1]:row-span-2 nth-[3n+2]:col-span-2 nth-[4n+1]:snap-center nth-[6]:row-span-2 nth-[13]:row-span-2 focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
                >
                  <ProjectMedia
                    project={project}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-topo-grid opacity-10 pointer-events-none" />

                  <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between gap-2">
                    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-brand-dark/65 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-brand-yellow backdrop-blur-md">
                      <Compass className="h-3 w-3" />
                      <span className="truncate">{project.catName}</span>
                    </span>
                    {project.video && (
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/15 text-white backdrop-blur-md">
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                    )}
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-dark/75 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={selectedLayoutId}
              className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-brand-dark text-white shadow-2xl"
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

              <div className="relative flex h-[52dvh] min-h-0 items-center justify-center overflow-hidden bg-brand-dark sm:h-[58dvh] lg:h-[76dvh]">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    poster={selectedProject.poster}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <motion.div
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <ProjectMedia project={selectedProject} className="h-full w-full object-contain" />
                  </motion.div>
                )}

                <div className="absolute inset-0 bg-topo-grid opacity-10 pointer-events-none" />

                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-5 sm:p-8 lg:block"
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
                      <span>Precision: {selectedProject.precision}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="max-h-[38dvh] overflow-y-auto border-t border-white/10 bg-brand-dark px-4 py-4 sm:px-5 lg:hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.08, duration: 0.3 }}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-green-light">
                    <span className="inline-flex items-center gap-1.5 text-brand-yellow">
                      <Compass className="h-3.5 w-3.5" />
                      {selectedProject.catName}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                      {selectedProject.location}
                    </span>
                  </div>
                  <h3 className="font-outfit text-2xl font-extrabold leading-tight text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-100">
                    {selectedProject.specs}
                  </p>
                  <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-[11px] font-bold uppercase tracking-wider text-brand-green-light">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Precision: {selectedProject.precision}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
