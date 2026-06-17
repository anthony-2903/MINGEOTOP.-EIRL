import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Grid3X3,
  Infinity as InfinityIcon,
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
type PortfolioViewMode = 'carousel' | 'gallery';

const categories = [
  { id: 'todos', name: 'Todos los sectores' },
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

function ProjectCarouselSkeleton() {
  return (
    <div className="flex gap-7 overflow-hidden px-[max(1rem,calc((100vw-1120px)/2))] py-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative h-[520px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] bg-white shadow-premium sm:w-[380px]"
        >
          <div className="skeleton-shimmer absolute inset-0 bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

function getProjectIcon(category: string) {
  if (category === 'dron' || category === 'catastro') return <Layers className="h-5 w-5" />;
  if (category === 'vias') return <Ruler className="h-5 w-5" />;
  if (category === 'mineria') return <ShieldCheck className="h-5 w-5" />;
  return <Compass className="h-5 w-5" />;
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
  const [viewMode, setViewMode] = useState<PortfolioViewMode>('carousel');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);
  const isCarouselPausedRef = useRef(false);
  const [carouselStep, setCarouselStep] = useState(0);

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
  const activeCategory = categories.find((category) => category.id === filter) ?? categories[0];
  const maxCarouselIndex = Math.max(filteredProjects.length - visibleCards, 0);
  const safeCarouselIndex = Math.min(currentIndex, maxCarouselIndex);

  const openProject = (project: Project) => {
    setSelectedMediaOrientation('unknown');
    setSelectedProject(project);
  };

  const selectCategory = (categoryId: string) => {
    setFilter(categoryId);
    setCurrentIndex(0);
    setIsFilterOpen(false);
  };

  const scrollCarousel = (direction: 'previous' | 'next') => {
    setCurrentIndex((index) => {
      if (direction === 'next') {
        return index >= maxCarouselIndex ? 0 : index + 1;
      }

      return index <= 0 ? maxCarouselIndex : index - 1;
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

  useEffect(() => {
    const updateVisibleCards = () => {
      let nextVisibleCards = 3;

      if (window.innerWidth <= 600) {
        nextVisibleCards = 1;
      } else if (window.innerWidth <= 900) {
        nextVisibleCards = 2;
      }

      const gap = 24;
      const viewportWidth = carouselViewportRef.current?.clientWidth ?? 0;
      const cardWidth = viewportWidth > 0
        ? (viewportWidth - gap * (nextVisibleCards - 1)) / nextVisibleCards
        : 0;

      setVisibleCards(nextVisibleCards);
      setCarouselStep(cardWidth + gap);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (viewMode !== 'carousel') return;

    const measure = window.setTimeout(() => {
      let nextVisibleCards = 3;

      if (window.innerWidth <= 600) {
        nextVisibleCards = 1;
      } else if (window.innerWidth <= 900) {
        nextVisibleCards = 2;
      }

      const gap = 24;
      const viewportWidth = carouselViewportRef.current?.clientWidth ?? 0;
      const cardWidth = viewportWidth > 0
        ? (viewportWidth - gap * (nextVisibleCards - 1)) / nextVisibleCards
        : 0;

      setVisibleCards(nextVisibleCards);
      setCarouselStep(cardWidth + gap);
    }, 0);

    return () => window.clearTimeout(measure);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'carousel' || !hasProjects || selectedProject) return;

    const interval = window.setInterval(() => {
      if (!isCarouselPausedRef.current) {
        setCurrentIndex((index) => (index >= maxCarouselIndex ? 0 : index + 1));
      }
    }, 3600);

    return () => window.clearInterval(interval);
  }, [viewMode, hasProjects, maxCarouselIndex, selectedProject]);

  const isSelectedMediaVertical = selectedMediaOrientation === 'vertical';

  return (
    <>
      <section id="proyectos" className="relative overflow-hidden bg-white py-24 text-brand-petrol lg:py-28">
        <div className="absolute inset-0 bg-topo-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,92,0,0.08),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(45,91,55,0.08),transparent_30%)]" />

        <div className="relative z-10 mx-auto mb-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
            className="mx-auto max-w-4xl font-outfit text-4xl font-light leading-[1.04] text-brand-petrol sm:text-5xl lg:text-6xl"
            data-gsap-title
          >
            Proyectos con <span className="font-extrabold">precision tecnica</span>
          </motion.h2>
        </div>

        <div className="relative z-10 mb-12 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
          <div className="flex rounded-2xl border border-brand-petrol/10 bg-brand-light p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300 ${
                viewMode === 'carousel'
                  ? 'bg-brand-petrol text-white shadow-lg shadow-brand-petrol/20'
                  : 'text-gray-400 hover:text-brand-petrol'
              }`}
            >
              <InfinityIcon className="h-4 w-4" />
              Carrusel
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.16em] transition-all duration-300 ${
                viewMode === 'gallery'
                  ? 'bg-brand-petrol text-white shadow-lg shadow-brand-petrol/20'
                  : 'text-gray-400 hover:text-brand-petrol'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              Galeria
            </button>
          </div>

          <div className="relative z-[90]">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              className="inline-flex min-w-[240px] items-center justify-between gap-6 rounded-2xl border border-brand-petrol/10 bg-white px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-petrol shadow-sm transition-colors duration-300 hover:border-brand-yellow/60"
              aria-expanded={isFilterOpen}
            >
              {activeCategory.name}
              <ChevronDown className={`h-4 w-4 text-brand-yellow transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute left-0 top-full z-[100] w-full pt-2">
                <div className="overflow-hidden rounded-2xl border border-brand-petrol/10 bg-white p-2 shadow-2xl">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => selectCategory(category.id)}
                      className={`block w-full rounded-xl px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-[0.16em] transition-colors duration-200 ${
                        filter === category.id
                          ? 'bg-brand-yellow text-brand-dark'
                          : 'text-brand-petrol hover:bg-brand-light'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <button
            type="button"
            onClick={() => scrollCarousel('previous')}
            disabled={isLoadingProjects || !hasProjects}
            className={`absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-petrol/10 bg-white/95 text-brand-petrol shadow-xl transition-all duration-300 hover:bg-brand-yellow hover:text-brand-dark disabled:opacity-30 ${viewMode === 'carousel' ? 'hidden lg:flex' : 'hidden'}`}
            aria-label="Ver proyectos anteriores"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('next')}
            disabled={isLoadingProjects || !hasProjects}
            className={`absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-petrol/10 bg-white/95 text-brand-petrol shadow-xl transition-all duration-300 hover:bg-brand-yellow hover:text-brand-dark disabled:opacity-30 ${viewMode === 'carousel' ? 'hidden lg:flex' : 'hidden'}`}
            aria-label="Ver siguientes proyectos"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {isLoadingProjects ? (
            <ProjectCarouselSkeleton />
          ) : !hasProjects ? (
            <div className="mx-auto flex min-h-[320px] max-w-3xl items-center justify-center rounded-[2rem] border border-dashed border-brand-petrol/20 bg-brand-light px-6 text-center shadow-sm">
              <div className="max-w-md">
                <p className="font-outfit text-xl font-extrabold text-brand-petrol">
                  No hay proyectos publicados
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Los proyectos creados desde el panel apareceran aqui cuando tengan estado published.
                </p>
              </div>
            </div>
          ) : viewMode === 'carousel' ? (
            <div
              className="mx-auto max-w-6xl px-10 sm:px-12 lg:px-14"
              onMouseEnter={() => {
                isCarouselPausedRef.current = true;
              }}
              onMouseLeave={() => {
                isCarouselPausedRef.current = false;
              }}
              onPointerDown={() => {
                isCarouselPausedRef.current = true;
              }}
              onPointerUp={() => {
                isCarouselPausedRef.current = false;
              }}
            >
              <div ref={carouselViewportRef} className="overflow-hidden pb-10 pt-4">
                <motion.div
                  key={filter}
                  ref={carouselRef}
                  layout
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${safeCarouselIndex * carouselStep}px)` }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.article
                      key={`${project.id}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 30, clipPath: 'inset(10% 0 0 0)' }}
                      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.035 }}
                      className="group relative h-[520px] cursor-pointer overflow-hidden rounded-[2rem] bg-brand-petrol text-left text-white shadow-[0_24px_70px_-38px_rgba(21,23,28,0.85)] outline-none transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_90px_-36px_rgba(21,23,28,0.95)] focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
                      style={{
                        flex: `0 0 calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})`,
                      }}
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
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.065]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,17,0.04)_0%,rgba(12,14,17,0.16)_32%,rgba(12,14,17,0.92)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,92,0,0.18)_0%,transparent_34%,rgba(45,91,55,0.3)_100%)]" />
                    <div className="portfolio-technical-grid absolute inset-0 opacity-18 transition-opacity duration-500 group-hover:opacity-45" />

                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-petrol shadow-sm backdrop-blur-sm">
                      <span className="text-brand-yellow">{getProjectIcon(project.category)}</span>
                      {project.catName}
                    </div>
                    {project.video && (
                      <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-brand-dark shadow-lg">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {getProjectTags(project).slice(1).map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="max-w-[10rem] truncate rounded-full bg-white/16 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-outfit text-3xl font-extrabold italic leading-[0.98] text-white sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-200">
                        {project.specs}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-outfit text-sm font-extrabold text-brand-yellow underline decoration-brand-yellow/50 underline-offset-4">
                        Ver proyecto
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              key={`${filter}-gallery`}
              layout
              className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={`${project.id}-${index}-gallery`}
                    layout
                    initial={{ opacity: 0, y: 30, clipPath: 'inset(10% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.035 }}
                    className="group relative h-[520px] cursor-pointer overflow-hidden rounded-[2rem] bg-brand-petrol text-left text-white shadow-[0_24px_70px_-38px_rgba(21,23,28,0.85)] outline-none transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_90px_-36px_rgba(21,23,28,0.95)] focus-visible:ring-4 focus-visible:ring-brand-yellow/40"
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
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.065]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,17,0.04)_0%,rgba(12,14,17,0.16)_32%,rgba(12,14,17,0.92)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,92,0,0.18)_0%,transparent_34%,rgba(45,91,55,0.3)_100%)]" />
                    <div className="portfolio-technical-grid absolute inset-0 opacity-18 transition-opacity duration-500 group-hover:opacity-45" />

                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-petrol shadow-sm backdrop-blur-sm">
                      <span className="text-brand-yellow">{getProjectIcon(project.category)}</span>
                      {project.catName}
                    </div>
                    {project.video && (
                      <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-brand-dark shadow-lg">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {getProjectTags(project).slice(1).map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="max-w-[10rem] truncate rounded-full bg-white/16 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-outfit text-3xl font-extrabold italic leading-[0.98] text-white sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-200">
                        {project.specs}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-outfit text-sm font-extrabold text-brand-yellow underline decoration-brand-yellow/50 underline-offset-4">
                        Ver proyecto
                        <ChevronRight className="h-4 w-4" />
                      </span>
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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-petrol-dark/86 px-3 py-4 backdrop-blur-lg sm:px-4 sm:py-6"
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
              className={`portfolio-modal-frame relative grid max-h-[92dvh] w-full overflow-hidden rounded-lg border border-brand-yellow/35 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] ${
                isSelectedMediaVertical
                  ? 'max-w-6xl bg-brand-petrol-dark lg:grid-cols-[minmax(280px,0.9fr)_minmax(330px,0.55fr)]'
                  : 'max-w-6xl bg-white'
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 bg-gradient-to-r from-brand-yellow via-brand-green-light to-brand-yellow" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-brand-petrol-dark/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
                aria-label="Cerrar proyecto"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={`relative overflow-hidden bg-brand-petrol-dark ${
                  isSelectedMediaVertical
                    ? 'min-h-[420px] lg:h-[92dvh] lg:max-h-[92dvh]'
                    : 'h-[56dvh] min-h-[280px] max-h-[620px]'
                }`}
              >
                <div className="pointer-events-none absolute inset-3 z-10 rounded-md border border-white/10" />
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-petrol-dark via-brand-petrol-dark/18 to-transparent" />
                <div className="portfolio-technical-grid pointer-events-none absolute inset-0 opacity-22" />
                <div className="absolute bottom-5 left-5 right-16 z-20 border-l-2 border-brand-yellow bg-brand-petrol-dark/45 p-4 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:max-w-2xl">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-brand-yellow sm:text-xs">
                    Proyecto destacado
                  </span>
                  <h3 className="mt-2 font-outfit text-2xl font-extrabold leading-tight sm:text-4xl">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div
                className={`overflow-y-auto p-5 sm:p-7 ${
                  isSelectedMediaVertical
                    ? 'max-h-[48dvh] bg-white text-brand-dark lg:max-h-[92dvh] lg:border-l lg:border-brand-petrol/10'
                    : 'max-h-[36dvh] border-t border-brand-petrol/10 text-brand-dark'
                }`}
              >
                <div className="mb-5 border-b border-brand-petrol/10 pb-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-petrol">
                    <MapPin className="h-4 w-4 text-brand-yellow" />
                    {getProjectTags(selectedProject).map((tag, tagIndex) => (
                      <span key={`${tag}-${tagIndex}`} className="rounded-sm bg-brand-light px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-brand-yellow">
                    Ficha tecnica del proyecto
                  </p>
                </div>

                <p className="text-base leading-relaxed text-gray-600">{selectedProject.specs}</p>

                <div className={`mt-6 grid gap-3 ${isSelectedMediaVertical ? 'grid-cols-1' : 'sm:grid-cols-3'}`}>
                  {getProjectBenefits(selectedProject).map((benefit) => (
                    <div key={benefit} className="rounded-md border border-brand-petrol/10 bg-brand-light p-4 shadow-sm">
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/12 text-brand-yellow">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold leading-relaxed text-brand-petrol">{benefit}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={buildWhatsappUrl(selectedProject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-yellow px-5 py-3.5 font-outfit text-sm font-extrabold text-brand-dark shadow-lg shadow-brand-yellow/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-yellow-light sm:w-auto"
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
