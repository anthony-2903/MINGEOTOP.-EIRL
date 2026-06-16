import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
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

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'mineria', name: 'Minería' },
  { id: 'construccion', name: 'Construcción' },
  { id: 'vias', name: 'Carreteras' },
  { id: 'dron', name: 'Drones & Catastro' },
];

const projectLayoutClasses = [
  'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[520px]',
  'lg:col-span-1 min-h-[360px]',
  'lg:col-span-1 min-h-[360px]',
  'lg:col-span-1 min-h-[420px]',
  'md:col-span-2 lg:col-span-2 min-h-[420px]',
  'lg:col-span-1 min-h-[360px]',
  'lg:col-span-1 min-h-[360px]',
  'md:col-span-2 lg:col-span-2 min-h-[460px]',
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[180px] lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.06] ${
            projectLayoutClasses[index % projectLayoutClasses.length]
          }`}
        >
          <div className="skeleton-shimmer absolute inset-0 bg-white/10" />
          <div className="absolute bottom-5 left-5 h-5 w-3/5 rounded-sm bg-white/20" />
          <div className="absolute bottom-12 left-5 h-4 w-24 rounded-sm bg-brand-yellow/40" />
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
    `Ubicación: ${project.location}`,
    `Control técnico: ${project.precision}`,
  ];
}

function buildWhatsappUrl(project: Project) {
  return `https://wa.me/51913386354?text=${encodeURIComponent(
    `Hola MINGEOTOP, deseo consultar por el proyecto "${project.title}" y un servicio similar.`,
  )}`;
}

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <section id="proyectos" className="relative overflow-hidden bg-brand-petrol-dark py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-topo-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,92,0,0.16),transparent_34%),radial-gradient(circle_at_80%_34%,rgba(63,122,74,0.14),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="reveal-item mb-4 text-xs font-extrabold uppercase tracking-[0.34em] text-brand-yellow sm:text-sm"
                data-gsap-title
              >
                Nuestro portafolio
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.08 }}
                className="max-w-4xl font-outfit text-4xl font-extrabold leading-[0.98] text-white sm:text-5xl lg:text-6xl"
                data-gsap-title
              >
                Cinco capacidades. Una sola visión.
              </motion.h2>
            </div>
            <div className="lg:col-span-4">
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.16 }}
                className="reveal-item border-l border-brand-yellow/60 pl-5 text-sm leading-relaxed text-gray-300 sm:text-base"
              >
                Cada proyecto funciona como evidencia independiente, pero gana valor cuando se lee
                como parte de una visión integrada: campo, georreferenciación, control de obra,
                fotogrametría y documentación técnica al servicio de decisiones precisas.
              </motion.p>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-2 border-y border-white/10 py-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`rounded-sm px-4 py-2.5 font-outfit text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-300 sm:text-sm ${
                  filter === category.id
                    ? 'bg-brand-yellow text-brand-dark shadow-[0_14px_30px_-18px_rgba(255,92,0,0.9)]'
                    : 'border border-white/10 bg-white/[0.04] text-gray-300 hover:border-brand-yellow/50 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {isLoadingProjects ? (
            <ProjectMasonrySkeleton />
          ) : !hasProjects ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-sm border border-dashed border-white/20 bg-white/[0.04] px-6 text-center">
              <div className="max-w-md">
                <p className="font-outfit text-xl font-extrabold text-white">
                  No hay proyectos publicados
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Los proyectos creados desde el panel aparecerán aquí cuando tengan estado published.
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              key={filter}
              layout
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[180px] lg:grid-cols-3"
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
                    className={`reveal-item portfolio-project-frame group relative cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-brand-dark text-left text-white outline-none transition-all duration-500 hover:-translate-y-1 hover:border-brand-yellow/70 hover:shadow-[0_28px_80px_-32px_rgba(0,0,0,0.9)] focus-visible:ring-4 focus-visible:ring-brand-yellow/40 ${
                      projectLayoutClasses[index % projectLayoutClasses.length]
                    }`}
                    data-gsap-mask
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                  >
                    <ProjectMedia
                      project={project}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.075]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,17,0.1)_0%,rgba(12,14,17,0.42)_42%,rgba(12,14,17,0.96)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,17,0.74)_0%,transparent_52%)] opacity-80 transition-opacity duration-500 group-hover:opacity-55" />
                    <div className="portfolio-technical-grid absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-75" />
                    <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-brand-yellow/80 transition-all duration-500 group-hover:left-3 group-hover:top-3" />
                    <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-brand-yellow/80 transition-all duration-500 group-hover:bottom-3 group-hover:right-3" />

                    <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-5 sm:p-6">
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
                        <h3 className="line-clamp-2 max-w-2xl font-outfit text-2xl font-extrabold leading-tight text-white md:text-3xl">
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
              className="relative max-h-[92dvh] w-full max-w-5xl overflow-hidden rounded-sm border border-white/15 bg-white shadow-2xl"
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

              <div className="relative h-60 overflow-hidden bg-brand-dark sm:h-80">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    poster={selectedProject.poster}
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <ProjectMedia project={selectedProject} className="h-full w-full object-cover" />
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

              <div className="max-h-[50dvh] overflow-y-auto p-5 sm:p-7">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-petrol">
                  <MapPin className="h-4 w-4 text-brand-yellow" />
                  {getProjectTags(selectedProject).map((tag, tagIndex) => (
                    <span key={`${tag}-${tagIndex}`} className="rounded-sm bg-brand-light px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-base leading-relaxed text-gray-600">{selectedProject.specs}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
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
