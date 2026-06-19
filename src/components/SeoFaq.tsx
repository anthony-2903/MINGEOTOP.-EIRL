import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué servicios topográficos ofrece MINGEOTOP E.I.R.L.?',
    answer:
      'Realizamos levantamientos topográficos, georreferenciación GNSS, replanteo de obras, control topográfico, cubicación, movimiento de tierras, topografía minera y fotogrametría con drones.',
  },
  {
    question: '¿En qué zonas atiende MINGEOTOP E.I.R.L.?',
    answer:
      'Atendemos proyectos en Perú para minería, construcción, infraestructura, catastro, saneamiento, agricultura, energía, geología y geotecnia.',
  },
  {
    question: '¿Cómo solicitar una cotización topográfica?',
    answer:
      'Puedes enviar tu requerimiento desde el formulario web, escribir por WhatsApp al +51 913 386 354 o contactar por correo a mingeotop@gmail.com.',
  },
];

export default function SeoFaq() {
  return (
    <section id="preguntas-frecuentes" className="relative bg-white py-20">
      <div className="absolute inset-0 bg-topo-grid opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2
            className="font-outfit text-3xl font-extrabold text-brand-petrol sm:text-4xl"
            data-gsap-title
          >
            Preguntas frecuentes sobre servicios topográficos
          </h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-lg border border-gray-200 bg-brand-light p-5 shadow-sm sm:p-6"
              data-gsap-mask
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />
                <div>
                  <h3 className="font-outfit text-lg font-bold leading-snug text-brand-petrol">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
