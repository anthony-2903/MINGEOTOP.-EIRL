import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  MapPin,
  MessageCircle,
  Play,
  Ruler,
  ShieldCheck,
  X,
} from 'lucide-react';

import { getPublishedProjects, type Project } from '../lib/projects';

type MediaOrientation = 'unknown' | 'vertical' | 'horizontal';

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
        data-gsap-parallax="10"
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  if (project.image) {
    return <img src={project.image} alt={project.title} className={className} data-gsap-parallax="10" loading="lazy" />;
  }

  return <div className={`${className} bg-gradient-to-br ${project.color}`} />;
}

function ProjectMasonrySkeleton() {
  return (
    <div className="flex gap-5 overflow-hidden pb-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="relative h-[500px] w-[82vw] shrink-0 overflow-hidden rounded-lg border border-brand-petrol/10 bg-white shadow-premium sm:w-[320px] lg:w-[306px]"
        >
          <div className="skeleton-shimmer absolute inset-0 bg-gray-100" />
          <div className="absolute bottom-7 left-5 h-6 w-3/5 rounded-sm bg-white/80" />
          <div className="absolute bottom-16 left-5 h-4 w-24 rounded-sm bg-brand-yellow/40" />
        </div>
      ))}
    </div>
  );
}

function getProjectIcon(category: string) {
  if (category === 'dron' || category === 'catastro') return <Layers className="h-6 w-6" />;
  if (category === 'vias') return <Ruler className="h-6 w-6" />;
  if (category === 'mineria') return <ShieldCheck className="h-6 w-6" />;
  return <Compass className="h-6 w-6" />;
}

function getProjectTags(project: Project) {
  return [project.catName, project.location, project.precision].filter(Boolean).slice(0, 3);
}

function getProjectBenefits(project: Project) {
  return [
    `Especialidad: ${project.catName}`,
    `Ubicacion: ${project.location}`,
    `Control tecnico: ${project.precision}`,
  ];
}

function buildWhatsappUrl(project: Project) {
  return `https://wa.me/51913386354?text=${encodeURIComponent(
    `Hola MINGEOTOP, deseo consultar por el proyecto "${project.title}" y un servicio similar.`,
  )}`;
}

function getMediaOrientation(width: number, height: number): MediaOrientation {
  if (!width || !height) return 'unknown';
  return height > width ? 'vertical' : 'horizontal';
}

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMediaOrientation, setSelectedMediaOrientation] = useState<MediaOrientation>('unknown');
  const carouselRef = useRef<HTMLDivElement | null>(null);

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
  const hasProjects = filteredProjects.length > 0;

  const openProject = (project: Project) => {
    setSelectedMediaOrientation('unknown');
    setSelectedProject(project);
  };

  const scrollCarousel = (direction: 'previous' | 'next') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const distance = Math.min(carousel.clientWidth * 0.88, 980);
    carousel.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
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

  const isSelectedMediaVertical = selectedMediaOrientation === 'vertical';

  return (
    <>
      <section id="proyectos" className="relative overflow-hidden bg-white py-24 text-brand-petrol lg:py-28">
        <div className="absolute inset-0 bg-topo-grid opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,92,0,0.08),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(45,91,55,0.09),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-brand-petrol/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-petrol/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="reveal-item mb-3 text-xs font-extrabold uppercase tracking-[0.32em] text-brand-yellow sm:text-sm"
                data-gsap-title
              >
                Nuestro portafolio
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.08 }}
                className="max-w-4xl font-outfit text-4xl font-light leading-[1.02] text-brand-petrol sm:text-5xl lg:text-6xl"
                data-gsap-title
              >
                Proyectos con <span className="font-extrabold">precision tecnica</span>
              </motion.h2>
            </div>
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.16 }}
                className="reveal-item border-l border-brand-yellow pl-5 text-sm leading-relaxed text-gray-600 sm:text-base"
              >
                Cada proyecto funciona como evidencia independiente, pero gana valor cuando se lee
                como parte de una vision integrada: campo, georreferenciacion, control de obra,
                fotogrametria y documentacion tecnica al servicio de decisiones precisas.
              </motion.p>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 border-y border-brand-petrol/10 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`rounded-full px-4 py-2.5 font-outfit text-xs font-extrabold uppercase tracking-[0.12em] transition-all duration-300 sm:text-sm ${
                    filter === category.id
                      ? 'bg-brand-petrol text-white shadow-[0_18px_34px_-22px_rgba(21,23,28,0.85)]'
                      : 'border border-brand-petrol/10 bg-brand-light text-brand-petrol hover:border-brand-yellow/60 hover:bg-white hover:text-brand-yellow'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-400">
                {isLoadingProjects ? 'Cargando' : `${filteredProjects.length} proyectos`}
              </span>
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollCarousel('previous')}
                  disabled={isLoadingProjects || !hasProjects}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-petrol/10 bg-white text-brand-petrol shadow-premium transition-all duration-300 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ver proyectos anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('next')}
                  disabled={isLoadingProjects || !hasProjects}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-petrol/10 bg-white text-brand-petrol shadow-premium transition-all duration-300 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Ver siguientes proyectos"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {isLoadingProjects ? (
            <ProjectMasonrySkeleton />
          ) : !hasProjects ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-brand-petrol/20 bg-brand-light px-6 text-center">
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
              ref={carouselRef}
              layout
              className="project-carousel-viewport -mx-4 grid auto-cols-[82vw] grid-flow-col gap-5 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:auto-cols-[320px] sm:px-6 lg:-mx-8 lg:auto-cols-[306px] lg:px-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={`${project.id}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 30, clipPath: 'inset(12% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.035 }}
                    className="reveal-item portfolio-project-frame group relative h-[500px] cursor-pointer snap-start overflow-hidden rounded-lg border border-brand-petrol/10 bg-brand-dark text-left text-white shadow-premium outline-none transition-all duration-500 hover:-translate-y-1 hover:border-brand-yellow/70 hover:shadow-[0_30px_80px_-36px_rgba(21,23,28,0.85)] focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
                    data-gsap-mask
                    role="button"
                    tabIndex={0}
                    onClick={() => openProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openProject(project);
                      }
                    }}
                  >
                    <ProjectMedia
                      project={project}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.075]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,17,0.08)_0%,rgba(12,14,17,0.42)_38%,rgba(12,14,17,0.97)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,92,0,0.2)_0%,transparent_34%,rgba(45,91,55,0.34)_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                    <div className="portfolio-technical-grid absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-55" />
                    <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-brand-yellow/80 transition-all duration-500 group-hover:left-3 group-hover:top-3" />
                    <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-brand-yellow/80 transition-all duration-500 group-hover:bottom-3 group-hover:right-3" />

                    <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="border-l border-brand-yellow bg-brand-petrol-dark/60 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-brand-yellow backdrop-blur-sm">
                          PR-{String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-brand-yellow/40 bg-brand-petrol-dark/60 text-brand-yellow backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                          {project.video ? <Play className="h-6 w-6 fill-current" /> : getProjectIcon(project.category)}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {getProjectTags(project).map((tag, tagIndex) => (
                            <span
                              key={`${tag}-${tagIndex}`}
                              className="max-w-[10rem] truncate rounded-sm border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="line-clamp-2 max-w-2xl font-outfit text-2xl font-extrabold leading-tight text-white">
                          {project.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-white">
                          {project.specs}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 rounded-sm border border-brand-yellow bg-brand-yellow px-4 py-2.5 font-outfit text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition-all duration-300 group-hover:bg-transparent group-hover:text-brand-yellow">
                          Ver detalles
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-petrol-dark/80 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className={`relative grid max-h-[92dvh] w-full overflow-hidden rounded-sm border border-white/15 shadow-2xl ${
                isSelectedMediaVertical
                  ? 'max-w-6xl bg-brand-petrol-dark lg:grid-cols-[minmax(280px,0.88fr)_minmax(330px,0.55fr)]'
                  : 'max-w-6xl bg-white'
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-sm bg-brand-petrol-dark/75 text-white backdrop-blur-md transition-colors duration-300 hover:bg-brand-yellow hover:text-brand-dark"
                aria-label="Cerrar proyecto"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={`relative overflow-hidden bg-brand-dark ${
                  isSelectedMediaVertical
                    ? 'min-h-[420px] lg:h-[92dvh] lg:max-h-[92dvh]'
                    : 'h-[56dvh] min-h-[280px] max-h-[620px]'
                }`}
              >
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    poster={selectedProject.poster}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    onLoadedMetadata={(event) => {
                      const video = event.currentTarget;
                      setSelectedMediaOrientation(getMediaOrientation(video.videoWidth, video.videoHeight));
                    }}
                  />
                ) : (
                  selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="h-full w-full object-contain"
                      onLoad={(event) => {
                        const image = event.currentTarget;
                        setSelectedMediaOrientation(getMediaOrientation(image.naturalWidth, image.naturalHeight));
                      }}
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${selectedProject.color}`} />
                  )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-petrol-dark via-brand-petrol-dark/45 to-transparent" />
                <div className="portfolio-technical-grid absolute inset-0 opacity-30" />
                <div className="absolute bottom-5 left-5 right-16 text-white sm:bottom-7 sm:left-7">
                  <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-brand-yellow">
                    Proyecto destacado
                  </span>
                  <h3 className="mt-2 font-outfit text-3xl font-extrabold leading-tight sm:text-4xl">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div
                className={`overflow-y-auto p-5 sm:p-7 ${
                  isSelectedMediaVertical
                    ? 'max-h-[48dvh] bg-white text-brand-dark lg:max-h-[92dvh]'
                    : 'max-h-[36dvh] text-brand-dark'
                }`}
              >
                <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-petrol">
                  <MapPin className="h-4 w-4 text-brand-yellow" />
                  {getProjectTags(selectedProject).map((tag, tagIndex) => (
                    <span key={`${tag}-${tagIndex}`} className="rounded-sm bg-brand-light px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-base leading-relaxed text-gray-600">{selectedProject.specs}</p>

                <div className={`mt-6 grid gap-3 ${isSelectedMediaVertical ? 'grid-cols-1' : 'sm:grid-cols-3'}`}>
                  {getProjectBenefits(selectedProject).map((benefit) => (
                    <div key={benefit} className="rounded-sm border border-gray-200 bg-brand-light p-4">
                      <Check className="mb-3 h-5 w-5 text-brand-yellow" />
                      <p className="text-sm font-semibold leading-relaxed text-brand-petrol">{benefit}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={buildWhatsappUrl(selectedProject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-yellow px-5 py-3.5 font-outfit text-sm font-extrabold text-brand-dark shadow-lg shadow-brand-yellow/20 transition-all duration-300 hover:bg-brand-yellow-light sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
