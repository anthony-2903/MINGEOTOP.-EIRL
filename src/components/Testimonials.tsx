import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Ing. Carlos Mendoza',
      role: 'Residente de Obra Civil',
      company: 'Consorcio Vial Andino',
      text: 'El replanteo geométrico y control de verticalidad de MINGEOTOP en el viaducto fue impecable. Su precisión evitó desviaciones en el montaje estructural. Gran equipo humano y excelente equipamiento técnico.',
      rating: 5,
      initials: 'CM',
    },
    {
      name: 'Ing. Lucía Rivas',
      role: 'Superintendente de Planificación Minera',
      company: 'Minera del Centro S.A.',
      text: 'Llevamos más de dos años contratando a MINGEOTOP para la cubicación mensual de nuestros acopios y control de estabilidad de taludes. Sus informes son sumamente exactos, rigurosos y entregados siempre a tiempo.',
      rating: 5,
      initials: 'LR',
    },
    {
      name: 'Arq. Alejandro Torres',
      role: 'Gestor de Proyectos Inmobiliarios',
      company: 'Alfa Desarrollos',
      text: 'La georreferenciación geodésica realizada para la habilitación urbana de 80 parcelas rurales fue excepcional. Logramos la inscripción oficial ante SUNARP a la primera y sin ninguna observación de linderos.',
      rating: 5,
      initials: 'AT',
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-brand-light relative overflow-hidden bg-topo-grid bg-topo-contour">
      {/* Light background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-light/95 to-brand-light z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            TESTIMONIOS
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-petrol font-outfit"
          >
            Qué Dicen Nuestros Socios Estratégicos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 font-sans"
          >
            Nuestros clientes avalan la rigurosidad técnica, cumplimiento de plazos y profesionalismo que imprimimos en cada servicio.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between relative group hover:border-brand-green/20"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-brand-petrol/5 group-hover:text-brand-green/10 transition-colors duration-300">
                <Quote className="h-12 w-12 stroke-[1.5]" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Stars Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed font-sans italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-gray-50">
                {/* Initials Circle */}
                <div className="w-12 h-12 rounded-full bg-brand-petrol text-white flex items-center justify-center font-bold font-outfit text-sm shadow-inner group-hover:bg-brand-green transition-colors duration-300">
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-brand-petrol text-base leading-none">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-gray-400 mt-1.5 block font-sans">
                    {rev.role} — <span className="font-semibold text-brand-green">{rev.company}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
