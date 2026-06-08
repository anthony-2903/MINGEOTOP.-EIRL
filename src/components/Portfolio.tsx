import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, MapPin, Pause, Play, ShieldCheck, X } from 'lucide-react';

import { getPublishedProjects, type Project } from '../lib/projects';

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

function ProjectMasonrySkeleton() {
  return (
    <div className="grid h-[720px] auto-cols-[90vw] grid-flow-col-dense grid-rows-3 gap-2 pb-6 sm:h-[560px] sm:auto-cols-[320px] sm:gap-2.5 lg:h-[620px] lg:auto-cols-[360px] xl:h-[680px] xl:auto-cols-[410px]">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="relative size-full overflow-hidden rounded-md border border-gray-200 bg-gray-100 nth-[1]:row-span-2 nth-[3n+2]:col-span-2 nth-[6]:row-span-2 nth-[13]:row-span-2"
        >
          <div className="skeleton-shimmer absolute inset-0 bg-gray-100" />
          <div className="absolute left-3 top-3 h-7 w-24 rounded-md bg-white/75" />
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState('');
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isUserInteractingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    getPublishedProjects()
      .then((supabaseProjects) => {
        if (mounted) {
          setProjects(supabaseProjects);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoadingProjects(false);
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
  const hasProjects = filteredProjects.length > 0;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || filteredProjects.length < 2) return;

    let animationFrame = 0;
    let lastTimestamp = performance.now();
    const speed = 42;

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (isAutoScrollEnabled && !isUserInteractingRef.current && !selectedProject) {
        const halfScrollWidth = carousel.scrollWidth / 2;
        carousel.scrollLeft += (speed * delta) / 1000;

        if (halfScrollWidth > 0 && carousel.scrollLeft >= halfScrollWidth) {
          carousel.scrollLeft -= halfScrollWidth;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    carousel.scrollLeft = 0;
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [filter, filteredProjects.length, isAutoScrollEnabled, selectedProject]);

  const scrollCarousel = (direction: 'previous' | 'next') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    isUserInteractingRef.current = true;
    const distance = Math.min(carousel.clientWidth * 0.86, 720);
    carousel.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });

    window.setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 1100);
  };

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
              Experiencia comprobada en campo
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base text-gray-500 sm:text-lg"
            >
              Una muestra visual de trabajos realizados en mineria, infraestructura vial,
              construccion y saneamiento tecnico de terrenos. Cada proyecto documenta
              entregables reales: planos, control de campo, cubicaciones, modelos y registro tecnico.
            </motion.p>
          </div>

          <div className="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-center gap-2 sm:mb-10">
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

          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              {isLoadingProjects ? 'Cargando portafolio' : 'Desliza para explorar'}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoadingProjects || !hasProjects}
                onClick={() => setIsAutoScrollEnabled((current) => !current)}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-xs font-bold uppercase tracking-wider text-brand-petrol shadow-sm transition hover:border-brand-yellow hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={isAutoScrollEnabled ? 'Pausar carrusel' : 'Reproducir carrusel'}
              >
                {isAutoScrollEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="hidden sm:inline">{isAutoScrollEnabled ? 'Pausar' : 'Reproducir'}</span>
              </button>
              <button
                type="button"
                disabled={isLoadingProjects || !hasProjects}
                onClick={() => scrollCarousel('previous')}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-brand-petrol shadow-sm transition hover:border-brand-yellow hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Ver proyectos anteriores"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={isLoadingProjects || !hasProjects}
                onClick={() => scrollCarousel('next')}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-brand-petrol shadow-sm transition hover:border-brand-yellow hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Ver siguientes proyectos"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="project-carousel-viewport relative overflow-x-auto overflow-y-hidden overscroll-x-contain"
            onPointerDown={() => {
              isUserInteractingRef.current = true;
            }}
            onPointerUp={() => {
              window.setTimeout(() => {
                isUserInteractingRef.current = false;
              }, 900);
            }}
            onPointerCancel={() => {
              isUserInteractingRef.current = false;
            }}
            onTouchStart={() => {
              isUserInteractingRef.current = true;
            }}
            onTouchEnd={() => {
              window.setTimeout(() => {
                isUserInteractingRef.current = false;
              }, 900);
            }}
            onWheel={() => {
              isUserInteractingRef.current = true;
              window.setTimeout(() => {
                isUserInteractingRef.current = false;
              }, 900);
            }}
          >
          {isLoadingProjects ? (
            <ProjectMasonrySkeleton />
          ) : !hasProjects ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-md border border-dashed border-gray-200 bg-white/75 px-6 text-center">
              <div className="max-w-md">
                <p className="font-outfit text-xl font-extrabold text-brand-petrol">
                  No hay proyectos publicados
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Los proyectos creados desde el panel apareceran aqui cuando tengan estado published.
                </p>
              </div>
            </div>
          ) : (
          <motion.div
            key={filter}
            layout
            className="project-carousel-track grid h-[720px] w-max auto-cols-[90vw] grid-flow-col-dense grid-rows-3 gap-2 pb-6 sm:h-[560px] sm:auto-cols-[320px] sm:gap-2.5 lg:h-[620px] lg:auto-cols-[360px] xl:h-[680px] xl:auto-cols-[410px]"
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
                  className="group relative size-full cursor-pointer snap-start overflow-hidden rounded-md border border-brand-green/20 bg-brand-dark text-left text-white shadow-premium outline-none transition-all duration-300 hover:border-brand-yellow/45 hover:shadow-premium-hover nth-[1]:row-span-2 nth-[3n+2]:col-span-2 nth-[4n+1]:snap-center nth-[6]:row-span-2 nth-[13]:row-span-2 focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
                >
                  <ProjectMedia
                    project={project}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
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
          )}
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
