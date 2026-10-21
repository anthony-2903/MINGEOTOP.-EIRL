import React from 'react';
import { m } from 'framer-motion';
import { ShieldAlert, Award, Clock, Users } from 'lucide-react';

export default function Benefits() {
  const benefitsList = [
    {
      title: 'Precisión Técnica Absoluta',
      desc: 'Nuestros equipos de medición y satelitales pasan por calibraciones periódicas certificadas. Reducimos el margen de error a tolerancias milimétricas homologadas.',
      icon: <Award className="h-6 w-6" />,
      tag: 'Tolerancia Mínima',
    },
    {
      title: 'Cumplimiento de Plazos Riguroso',
      desc: 'El tiempo es dinero en obras y minería. Planificamos y movilizamos nuestras cuadrillas ágilmente, asegurando informes de gabinete en los plazos acordados.',
      icon: <Clock className="h-6 w-6" />,
      tag: 'Entrega Puntual',
    },
    {
      title: 'Experiencia Profesional en Campo',
      desc: 'Nuestros especialistas están habituados a condiciones climáticas y geográficas difíciles (altura, frío extremo y desierto) operando con absoluta seguridad.',
      icon: <ShieldAlert className="h-6 w-6" />,
      tag: 'Cero Accidentes',
    },
    {
      title: 'Atención 100% Personalizada',
      desc: 'Nos adaptamos a los estándares del cliente. Ofrecemos asesoramiento continuo, formatos editables a medida (DWG, KML, SHP) y soporte post-entrega.',
      icon: <Users className="h-6 w-6" />,
      tag: 'Soporte Continuo',
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-brand-dark text-white relative overflow-hidden bg-topo-contour">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-petrol-dark/90 z-0" />

      {/* Decorative SVG circles */}
      <svg
        className="absolute top-10 right-10 w-64 h-64 text-brand-green/10 -z-10 opacity-70 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            NUESTRAS VENTAJAS
          </m.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-outfit"
            data-gsap-title
          >
            ¿Por Qué Elegir a MINGEOTOP E.I.R.L.?
          </h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-sans"
          >
            Garantizamos confianza, respaldo de ingeniería e informes precisos para dar solidez estructural a sus inversiones.
          </m.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefitsList.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-brand-dark/40 border border-brand-green/20 hover:border-brand-yellow/40 p-8 rounded-3xl transition-[border-color] duration-300 group flex flex-col sm:flex-row gap-6 items-start backdrop-blur-sm"
              data-gsap-mask
            >
              {/* Icon Holder */}
              <div className="w-14 h-14 rounded-2xl bg-brand-green text-white flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors duration-300 shadow-md">
                {benefit.icon}
              </div>

              <div className="space-y-3 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold font-outfit text-white group-hover:text-brand-yellow transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <span className="text-[9px] font-bold tracking-widest text-brand-green-light border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded-full uppercase w-fit">
                    {benefit.tag}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic call to action row */}
        <div className="mt-16 bg-gradient-to-r from-brand-petrol-light/40 to-brand-green/20 border border-brand-green/30 p-8 rounded-3xl text-center flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="text-left space-y-2">
            <h4 className="text-lg font-bold font-outfit text-white">¿Necesitas una propuesta técnica formal para tu proyecto?</h4>
            <p className="text-sm text-gray-300 font-sans">Envíanos las coordenadas o términos de referencia (TDR) para cotizar.</p>
          </div>
          <a
            id="btn-beneficios-cotizar"
            href="#contacto"
            className="w-full md:w-auto bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-3.5 rounded-xl font-outfit font-bold transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 transform hover:-translate-y-0.5 hover-glow-yellow text-sm sm:text-base flex items-center justify-center"
          >
            Solicitar Presupuesto Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
