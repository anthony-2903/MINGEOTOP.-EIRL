import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Cpu, FileCheck, Navigation, Ruler, Satellite } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Evaluación del requerimiento',
    tag: 'Alcance técnico',
    desc: 'Revisamos planos base, condiciones del terreno, tolerancias solicitadas y entregables esperados para definir metodología, plazos y equipo de trabajo.',
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    num: '02',
    title: 'Levantamiento en campo',
    tag: 'Cuadrilla y control',
    desc: 'Ejecutamos monumentación, medición con estación total, GNSS, nivelación, dron o escáner según el tipo de proyecto y su precisión requerida.',
    icon: <Navigation className="h-5 w-5" />,
  },
  {
    num: '03',
    title: 'Procesamiento técnico',
    tag: 'Gabinete CAD / GIS',
    desc: 'Depuramos datos, compensamos poligonales, validamos puntos de control, calculamos volúmenes y generamos modelos, planos o bases geoespaciales.',
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    num: '04',
    title: 'Entrega y respaldo',
    tag: 'Dossier final',
    desc: 'Entregamos archivos editables, reportes, planos, nube de puntos, ortomosaicos o documentación firmada, con trazabilidad del trabajo ejecutado.',
    icon: <FileCheck className="h-5 w-5" />,
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-brand-petrol py-24 text-white">
      <div className="absolute inset-0 bg-topo-grid opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow sm:text-sm"
            >
              Nuestro proceso
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="font-outfit text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
            >
              Metodología técnica de campo a gabinete
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base"
          >
            Cada proyecto se controla como una secuencia verificable: alcance, captura,
            procesamiento y entrega. Así mantenemos precisión, trazabilidad y orden documental
            desde el primer punto levantado hasta el expediente final.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55 }}
            className="relative min-h-[460px] overflow-hidden rounded-lg border border-white/10 bg-brand-dark"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-transparent to-brand-yellow/10" />

            <div className="absolute left-5 top-5 z-10 border-l-2 border-brand-yellow pl-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-yellow">
                Plano de control
              </p>
              <h3 className="mt-2 font-outfit text-2xl font-extrabold">Ruta operativa MINGEOTOP</h3>
            </div>

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 520 460"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M72 330 C150 240 188 298 238 210 C296 108 360 146 448 78"
                stroke="#FF5C00"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="10 10"
              />
              <path
                d="M92 376 L206 318 L322 360 L434 286"
                stroke="#3F7A4A"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>

            {[
              { label: 'Base GNSS', x: '16%', y: '72%' },
              { label: 'Punto control', x: '39%', y: '62%' },
              { label: 'Zona trabajo', x: '60%', y: '43%' },
              { label: 'Entrega', x: '78%', y: '22%' },
            ].map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.08 }}
                className="absolute z-10"
                style={{ left: point.x, top: point.y }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-brand-yellow/20 blur-md" />
                  <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-dark">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                  </span>
                  <span className="mt-2 block whitespace-nowrap rounded-md border border-white/10 bg-brand-petrol/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-100 backdrop-blur">
                    {point.label}
                  </span>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { icon: <Satellite className="h-4 w-4" />, label: 'GNSS / RTK' },
                { icon: <Ruler className="h-4 w-4" />, label: 'CAD / GIS' },
                { icon: <FileCheck className="h-4 w-4" />, label: 'Entregables' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-gray-200 backdrop-blur"
                >
                  <span className="text-brand-yellow">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-3">
            {steps.map((step, index) => (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group grid gap-4 border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-brand-yellow/40 hover:bg-white/[0.07] sm:grid-cols-[88px_1fr] sm:p-5"
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="flex h-12 w-12 items-center justify-center border border-brand-yellow/50 bg-brand-yellow text-sm font-black text-brand-dark">
                    {step.num}
                  </span>
                  <div className="mt-0 text-brand-yellow sm:mt-4">{step.icon}</div>
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="font-outfit text-xl font-extrabold leading-tight text-white">
                      {step.title}
                    </h3>
                    <span className="border-l border-white/15 pl-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green-light">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">{step.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
