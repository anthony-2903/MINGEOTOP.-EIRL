import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const services = [
  'Levantamientos Topográficos',
  'Replanteo de Obras',
  'Georreferenciación (GNSS)',
  'Control Topográfico de Obra',
  'Cubicación & Movimiento de Tierras',
  'Fotogrametría con Dron',
  'Topografía Minera',
  'Curvas de Nivel / Planos',
  'Otro servicio de ingeniería',
];

function buildContactEmailUrl(formData: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}) {
  const subject = `Nueva solicitud de cotización - ${formData.service}`;
  const body = [
    'Nueva solicitud desde la página web de MINGEOTOP E.I.R.L.',
    '',
    `Nombre: ${formData.name}`,
    `Teléfono: ${formData.phone}`,
    `Correo: ${formData.email}`,
    `Servicio requerido: ${formData.service}`,
    '',
    'Detalle del proyecto:',
    formData.message,
  ].join('\n');

  return `https://mail.google.com/mail/?view=cm&fs=1&to=mingeotop@gmail.com&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.name.trim()) tempErrors.name = 'El nombre completo es requerido.';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'El teléfono es requerido.';
    } else if (!/^\+?[0-9\s-]{9,15}$/.test(formData.phone)) {
      tempErrors.phone = 'Ingrese un número de teléfono válido (mín. 9 dígitos).';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'El correo electrónico es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Ingrese un correo electrónico válido.';
    }
    if (!formData.service) tempErrors.service = 'Seleccione un servicio de la lista.';
    if (!formData.message.trim()) tempErrors.message = 'Por favor, detalle su requerimiento.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError('');

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/mingeotop@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nueva solicitud de cotización - ${formData.service}`,
          _template: 'table',
          _captcha: 'false',
          Nombre: formData.name,
          Telefono: formData.phone,
          Correo: formData.email,
          Servicio: formData.service,
          Mensaje: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#15171C', '#2D5B37', '#FF5C00'],
      });
    } catch {
      window.open(buildContactEmailUrl(formData), '_blank', 'noopener,noreferrer');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
      setSubmitError(
        'El envío automático no respondió, así que abrimos Gmail con tu solicitud ya preparada para enviarla a mingeotop@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-dark bg-topo-contour py-24 text-white">
      <div className="absolute inset-0 z-0 bg-brand-petrol-dark/90" />
      <div className="absolute -bottom-16 -left-16 -z-10 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl animate-float" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow sm:text-sm"
          >
            Contáctanos
          </motion.h3>
          <h2
            className="font-outfit text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            data-gsap-title
          >
            Solicita tu cotización técnica sin compromiso
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-gray-300 sm:text-lg"
          >
            Estamos listos para desplegar nuestro equipo y brindarte la precisión que tu proyecto necesita.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="flex h-full flex-col justify-center space-y-6 rounded-3xl border border-brand-green/20 bg-brand-petrol-dark/50 p-8 backdrop-blur-sm" data-gsap-mask>
              <h3 className="font-outfit text-2xl font-bold text-white">Canales directos</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                ¿Tienes una urgencia o un requerimiento inmediato? Comunícate por nuestros canales oficiales de atención.
              </p>

              <div className="space-y-6 pt-4">
                <a
                  href="https://wa.me/51913386354?text=Hola%20MINGEOTOP,%20solicito%20cotizaci%C3%B3n%20para%20un%20proyecto%20topogr%C3%A1fico."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 rounded-2xl border border-brand-green/20 bg-white/5 p-4 transition-all duration-300 hover:border-brand-yellow/50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green text-white transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0a11.948 11.948 0 0 1 8.495 3.519 11.938 11.938 0 0 1 3.5 8.495c-.005 6.633-5.38 12.003-12.007 12.003-2.003-.001-3.973-.5-5.787-1.452zm6.58-3.031l.385.23c1.562.928 3.433 1.419 5.358 1.42 5.498.002 9.97-4.47 9.975-9.979a9.911 9.911 0 0 0-2.915-7.078A9.913 9.913 0 0 0 12.003 2.03c-5.502 0-9.978 4.471-9.98 9.98-.001 1.995.52 3.943 1.508 5.666l.255.448-1.02 3.723 3.823-.99zM18.12 14.8c-.33-.164-1.951-.964-2.251-1.074-.3-.109-.518-.164-.737.164-.218.327-.847 1.074-1.037 1.293-.19.218-.379.245-.71.082a9.08 9.08 0 0 1-2.628-1.624 10.02 10.02 0 0 1-1.821-2.268c-.19-.328-.02-.505.145-.669.148-.148.33-.382.495-.573.165-.19.219-.327.33-.545.109-.219.054-.409-.028-.573-.081-.164-.737-1.774-1.01-2.429-.264-.636-.53-.55-.737-.56-.19-.009-.409-.01-.628-.01a1.205 1.205 0 0 0-.873.409c-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.308 3.52 5.59 4.939.78.337 1.39.539 1.86.688.784.249 1.498.214 2.062.13.629-.094 1.951-.798 2.225-1.57.275-.773.275-1.437.19-1.57-.082-.136-.3-.218-.63-.382z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit text-base font-bold leading-none text-white">WhatsApp corporativo</h4>
                    <span className="mt-1.5 block text-xs font-semibold text-brand-green-light">+51 913 386 354</span>
                  </div>
                </a>

                <a
                  href="tel:+51913386354"
                  className="group flex items-center space-x-4 rounded-2xl border border-brand-green/20 bg-white/5 p-4 transition-all duration-300 hover:border-brand-yellow/50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-yellow text-brand-dark transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit text-base font-bold leading-none text-white">Llamar a ingeniería</h4>
                    <span className="mt-1.5 block text-xs font-semibold text-brand-yellow">+51 913 386 354</span>
                  </div>
                </a>

                <a
                  href="mailto:mingeotop@gmail.com"
                  className="group flex items-center space-x-4 rounded-2xl border border-brand-green/20 bg-white/5 p-4 transition-all duration-300 hover:border-brand-yellow/50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-petrol text-white transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit text-base font-bold leading-none text-white">Correo electrónico</h4>
                    <span className="mt-1.5 block text-xs font-semibold text-gray-300">mingeotop@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 rounded-2xl border border-brand-green/20 bg-white/5 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-600 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit text-base font-bold leading-none text-white">Oficina central</h4>
                    <span className="mt-1.5 block text-xs text-gray-400">Lima, Perú</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white p-8 text-brand-dark shadow-2xl sm:p-10 lg:col-span-7" data-gsap-mask>
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="border-b border-gray-100 pb-2 font-outfit text-2xl font-bold text-brand-petrol">
                    Formulario de requerimiento
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-petrol">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Ing. Juan Pérez"
                      className={`w-full rounded-xl border bg-brand-light px-4 py-3 text-sm transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] font-semibold text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-petrol">
                        Celular / teléfono
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 999888777"
                        className={`w-full rounded-xl border bg-brand-light px-4 py-3 text-sm transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] font-semibold text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-petrol">
                        Correo corporativo
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@empresa.com"
                        className={`w-full rounded-xl border bg-brand-light px-4 py-3 text-sm transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] font-semibold text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-petrol">
                      Servicio requerido
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-brand-light px-4 py-3 text-sm transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                        errors.service ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">-- Seleccione una opción --</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-[11px] font-semibold text-red-500">{errors.service}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-petrol">
                      Detalle del proyecto
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe el alcance de la obra, ubicación, requerimientos técnicos, coordenadas o plazos estimados..."
                      className={`w-full rounded-xl border bg-brand-light px-4 py-3 text-sm transition-all focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] font-semibold text-red-500">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <div className="rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-3 text-sm font-semibold text-brand-petrol">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-brand-yellow py-4 font-outfit font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition-all duration-300 hover:bg-brand-yellow-light hover:shadow-brand-yellow/30 hover-glow-yellow disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Enviando requerimiento...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Enviar solicitud de cotización</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col items-center justify-center space-y-6 px-4 py-12 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/10 text-brand-green animate-success-pop">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-outfit text-3xl font-extrabold text-brand-petrol">¡Solicitud enviada!</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                      Hemos recibido los detalles de tu proyecto. Un especialista de MINGEOTOP E.I.R.L. se comunicará contigo para revisar la propuesta técnica.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="cursor-pointer rounded-xl border border-brand-petrol bg-brand-light px-6 py-2.5 font-outfit text-sm font-semibold text-brand-petrol transition-all duration-300 hover:bg-brand-petrol hover:text-white"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
