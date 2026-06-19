import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardCheck, Database, FileDigit, Map, Ruler, Satellite } from 'lucide-react';

import totalStationImg from '../assets/equipment_total_station_real.jpg';
import gnssRtkImg from '../assets/equipment_gnss_real.jpg';
import opticalLevelImg from '../assets/equipment_level_real.jpg';
import droneSurveyImg from '../assets/equipment_drone_real.jpg';

const instruments = [
  {
    code: 'EQ-01',
    name: 'Estación total electrónica',
    image: totalStationImg,
    use: 'Replanteo, control estructural, poligonales y levantamientos de detalle.',
    specs: ['Medición angular de precisión', 'EDM con y sin prisma', 'Compensador de doble eje'],
  },
  {
    code: 'EQ-02',
    name: 'GNSS diferencial RTK',
    image: gnssRtkImg,
    use: 'Control geodésico, puntos base, catastro, vías y redes de apoyo.',
    specs: ['Multiconstelación satelital', 'Corrección en tiempo real', 'Precisión centimétrica'],
  },
  {
    code: 'EQ-03',
    name: 'Nivel automático de precisión',
    image: opticalLevelImg,
    use: 'Nivelación geométrica, control de cotas y verificación de asentamientos.',
    specs: ['Aumento óptico 32x', 'Lectura estable en campo', 'Control altimétrico fino'],
  },
  {
    code: 'EQ-04',
    name: 'Dron para fotogrametría',
    image: droneSurveyImg,
    use: 'Ortomosaicos, modelos digitales, cubicaciones y registro visual de obra.',
    specs: ['Captura RGB de alta resolución', 'Planificación de vuelo', 'Modelos 2D y 3D'],
  },
];

const workflow = [
  { label: 'Captura', value: 'Campo', icon: <Satellite className="h-4 w-4" /> },
  { label: 'Control', value: 'Geodesia', icon: <Ruler className="h-4 w-4" /> },
  { label: 'Proceso', value: 'CAD / GIS', icon: <Database className="h-4 w-4" /> },
  { label: 'Entrega', value: 'Planos', icon: <FileDigit className="h-4 w-4" /> },
];

const software = [
  'AutoCAD',
  'Civil 3D',
  'ArcGIS / QGIS',
  'Pix4D / Agisoft',
  'Reportes técnicos',
  'Planos DWG / PDF',
];

export default function Equipment() {
  const featured = instruments[0];

  return (
    <section id="equipos" className="section-fade-to-petrol relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gray-200" />
      <div className="absolute inset-0 bg-topo-grid opacity-35" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow sm:text-sm"
            >
              Equipos y tecnología
            </motion.h3>
            <h2
              className="font-outfit text-3xl font-extrabold leading-tight text-brand-petrol sm:text-4xl md:text-5xl"
              data-gsap-title
            >
              Instrumental técnico y procesamiento digital
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base"
          >
            Trabajamos con instrumental topográfico, control geodésico y gabinete digital para
            convertir datos de campo en planos, modelos, metrados y documentación técnica verificable.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="overflow-hidden border border-gray-200 bg-brand-light"
            data-gsap-mask
          >
            <div className="grid min-h-[520px] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[300px] bg-brand-petrol">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                  data-gsap-parallax="12"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-petrol/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 border-l-2 border-brand-yellow pl-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-yellow">
                    Equipo destacado
                  </span>
                  <h3 className="mt-2 font-outfit text-2xl font-extrabold">{featured.name}</h3>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 sm:p-7">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 border border-brand-petrol/10 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-petrol">
                    <ClipboardCheck className="h-4 w-4 text-brand-yellow" />
                    Registro técnico de equipo
                  </div>

                  <p className="text-sm leading-relaxed text-gray-600">{featured.use}</p>

                  <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
                    {featured.specs.map((spec) => (
                      <div key={spec} className="flex items-start gap-3 py-3 text-sm text-brand-petrol">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {workflow.map((item) => (
                    <div key={item.label} className="border border-gray-200 bg-white p-3">
                      <div className="mb-2 text-brand-yellow">{item.icon}</div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {item.label}
                      </p>
                      <p className="mt-1 font-outfit text-sm font-bold text-brand-petrol">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {instruments.slice(1).map((item) => (
              <article
                key={item.code}
                className="grid grid-cols-[116px_1fr] overflow-hidden border border-gray-200 bg-white transition-colors duration-300 hover:border-brand-yellow/50 sm:grid-cols-[150px_1fr]"
                data-gsap-mask
              >
                <img src={item.image} alt={item.name} className="h-full min-h-[150px] w-full object-cover" data-gsap-parallax="10" loading="lazy" />
                <div className="p-4 sm:p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="bg-brand-petrol px-2 py-1 text-[10px] font-black tracking-wider text-white">
                      {item.code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow">
                      Instrumental
                    </span>
                  </div>
                  <h3 className="font-outfit text-lg font-extrabold leading-tight text-brand-petrol">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid gap-6 border border-brand-petrol/10 bg-brand-petrol p-5 text-white sm:p-7 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="border-l-2 border-brand-yellow pl-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-yellow">
              Gabinete digital
            </span>
            <h3 className="mt-2 font-outfit text-2xl font-extrabold">Procesamiento y entrega técnica</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              La medición no termina en campo. Ordenamos, validamos y entregamos información lista
              para expedientes, construcción, control minero o gestión territorial.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {software.map((item) => (
              <div key={item} className="flex min-h-20 items-center gap-3 bg-brand-petrol-dark px-4 py-3">
                <Map className="h-4 w-4 shrink-0 text-brand-yellow" />
                <span className="text-sm font-semibold text-gray-100">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
