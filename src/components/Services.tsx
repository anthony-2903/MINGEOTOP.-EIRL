import React from 'react';
import { m } from 'framer-motion';
import {
  Activity,
  Boxes,
  ChevronRight,
  Compass,
  FileText,
  Layers,
  Map,
  MapPin,
  Mountain,
  Plane,
  TrendingDown,
} from 'lucide-react';

const servicesList = [
  {
    icon: <Map className="h-6 w-6" />,
    title: 'Levantamientos topográficos',
    desc: 'Nube de puntos, plano topográfico, curvas de nivel y registro de detalles del terreno para diseño, obra o expediente técnico.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Replanteo de obras',
    desc: 'Marcación de ejes, niveles, límites, puntos de control y elementos estructurales para ejecutar la obra según planos aprobados.',
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: 'Georreferenciación',
    desc: 'Coordenadas precisas vinculadas a red geodésica, con puntos de control, reporte técnico y respaldo para compatibilidad GIS.',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: 'Control topográfico de obra',
    desc: 'Seguimiento de avances, verificación de cotas, control geométrico, reportes periódicos y alertas de desviación.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Curvas de nivel',
    desc: 'Curvas, perfiles y superficies digitales para plataformas, drenajes, vías, explanaciones y movimiento de tierras.',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Planos topográficos',
    desc: 'Planos DWG/PDF, perfiles longitudinales, secciones transversales, cuadros de coordenadas y documentación lista para expediente.',
  },
  {
    icon: <Boxes className="h-6 w-6" />,
    title: 'Cubicación',
    desc: 'Volúmenes de acopios, cortes, rellenos, canteras o botaderos con reporte comparativo y soporte para valorizaciones.',
  },
  {
    icon: <TrendingDown className="h-6 w-6" />,
    title: 'Movimiento de tierras',
    desc: 'Control de excavaciones, rellenos, plataformas y terraplenes mediante metrados, superficies comparativas y reportes de avance.',
  },
  {
    icon: <Mountain className="h-6 w-6" />,
    title: 'Topografía minera',
    desc: 'Levantamiento de galerías, frentes, taludes, botaderos y zonas operativas para control de producción y seguridad.',
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: 'Fotogrametría con dron',
    desc: 'Ortomosaicos, modelos 3D, MDT, MDS, nube de puntos y registro visual de obra para análisis técnico.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-fade-to-dark relative overflow-hidden bg-brand-light bg-topo-grid bg-topo-contour py-24">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-brand-light/90 to-brand-light" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow sm:text-sm"
          >
            Nuestros servicios
          </m.p>
          <h2
            className="font-outfit text-3xl font-extrabold text-brand-petrol sm:text-4xl md:text-5xl"
            data-gsap-title
          >
            Servicios topográficos con entregables listos para obra
          </h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-gray-500 sm:text-lg"
          >
            Medimos, procesamos y entregamos información técnica en formatos útiles para diseño,
            construcción, minería, catastro y control de avance.
          </m.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, index) => (
            <div
              key={service.title}
              data-gsap-mask
            >
              <div className="h-full group relative flex flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-premium transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 hover:border-brand-yellow/40 hover:shadow-premium-hover sm:p-7 transform hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-petrol transition-colors duration-300 group-hover:bg-brand-yellow" />
              <div className="space-y-4">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-petrol/5 text-brand-petrol shadow-sm transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 group-hover:bg-brand-yellow group-hover:text-brand-dark">
                  {service.icon}
                </div>
                <h3 className="relative z-10 font-outfit text-lg font-bold leading-tight text-brand-petrol transition-colors duration-300 group-hover:text-brand-yellow sm:text-xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{service.desc}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Servicio MT-{String(index + 1).padStart(2, '0')}
                </span>
                <a
                  href="#contacto"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-brand-petrol transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
                  title="Solicitar cotización de este servicio"
                >
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
