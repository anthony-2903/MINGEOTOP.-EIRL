import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending message to corporate backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Trigger canvas-confetti for client satisfaction
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F3D4C', '#2E7D5B', '#F2B705'],
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
    }, 1800);
  };

  return (
    <section id="contacto" className="py-24 bg-brand-dark text-white relative overflow-hidden bg-topo-contour">
      {/* Background Petrol overlay */}
      <div className="absolute inset-0 bg-brand-petrol-dark/90 z-0" />
      
      {/* Decorative vector */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10 animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-green-light uppercase mb-3"
          >
            CONTÁCTANOS
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-outfit"
          >
            Solicita tu Cotización Técnica sin Compromiso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-sans"
          >
            Estamos listos para desplegar nuestro equipo y brindarte la precisión que tu proyecto necesita.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Info & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 bg-brand-petrol-dark/50 border border-brand-green/20 p-8 rounded-3xl backdrop-blur-sm h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold font-outfit text-white">Canales Directos</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                ¿Tienes una urgencia o un requerimiento inmediato? Comunícate por nuestros canales oficiales de atención corporativa.
              </p>

              <div className="space-y-6 pt-4">
                {/* Whatsapp Link */}
                <a
                  href="https://wa.me/51913386354?text=Hola%20MINGEOTOP,%20solicito%20cotizaci%C3%B3n%20para%20un%20proyecto%20topogr%C3%A1fico."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-brand-green/20 hover:border-brand-yellow/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {/* Stylized custom Whatsapp icon since Lucide lacks whatsapp brand */}
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.003 0a11.948 11.948 0 0 1 8.495 3.519 11.938 11.938 0 0 1 3.5 8.495c-.005 6.633-5.38 12.003-12.007 12.003-2.003-.001-3.973-.5-5.787-1.452zm6.58-3.031l.385.23c1.562.928 3.433 1.419 5.358 1.42 5.498.002 9.97-4.47 9.975-9.979a9.911 9.911 0 0 0-2.915-7.078A9.913 9.913 0 0 0 12.003 2.03c-5.502 0-9.978 4.471-9.98 9.98-.001 1.995.52 3.943 1.508 5.666l.255.448-1.02 3.723 3.823-.99zM18.12 14.8c-.33-.164-1.951-.964-2.251-1.074-.3-.109-.518-.164-.737.164-.218.327-.847 1.074-1.037 1.293-.19.218-.379.245-.71.082a9.08 9.08 0 0 1-2.628-1.624 10.02 10.02 0 0 1-1.821-2.268c-.19-.328-.02-.505.145-.669.148-.148.33-.382.495-.573.165-.19.219-.327.33-.545.109-.219.054-.409-.028-.573-.081-.164-.737-1.774-1.01-2.429-.264-.636-.53-.55-.737-.56-.19-.009-.409-.01-.628-.01a1.205 1.205 0 0 0-.873.409c-.3.327-1.145 1.118-1.145 2.727s1.173 3.164 1.336 3.382c.164.218 2.308 3.52 5.59 4.939.78.337 1.39.539 1.86.688.784.249 1.498.214 2.062.13.629-.094 1.951-.798 2.225-1.57.275-.773.275-1.437.19-1.57-.082-.136-.3-.218-.63-.382z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-base leading-none">WhatsApp Corporativo</h4>
                    <span className="text-xs text-brand-green-light mt-1.5 block font-semibold">+51 913 386 354</span>
                  </div>
                </a>

                {/* Telephone */}
                <a
                  href="tel:+51913386354"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-brand-green/20 hover:border-brand-yellow/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow text-brand-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-base leading-none">Llamar a Ingeniería</h4>
                    <span className="text-xs text-brand-yellow mt-1.5 block font-semibold">+51 913 386 354</span>
                  </div>
                </a>

                {/* Mail */}
                <a
                  href="mailto:mingeotop@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-brand-green/20 hover:border-brand-yellow/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-petrol text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-base leading-none">Correo Electrónico</h4>
                    <span className="text-xs text-gray-300 mt-1.5 block font-semibold">mingeotop@gmail.com</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-brand-green/20">
                  <div className="w-12 h-12 rounded-xl bg-gray-600 text-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-base leading-none">Oficina Central</h4>
                    <span className="text-xs text-gray-400 mt-1.5 block">Av. Principal 123, Oficina 402, Lima, Perú</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7 bg-white text-brand-dark p-8 sm:p-10 rounded-3xl shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-2xl font-bold font-outfit text-brand-petrol pb-2 border-b border-gray-100">
                    Formulario de Requerimiento
                  </h3>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-petrol uppercase tracking-wider block">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Ing. Juan Pérez"
                      className={`w-full px-4 py-3 rounded-xl bg-brand-light border ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone field */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-petrol uppercase tracking-wider block">
                        Celular / Teléfono
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 999888777"
                        className={`w-full px-4 py-3 rounded-xl bg-brand-light border ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 font-semibold">{errors.phone}</p>}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-petrol uppercase tracking-wider block">
                        Correo Corporativo
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@empresa.com"
                        className={`w-full px-4 py-3 rounded-xl bg-brand-light border ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Service selection field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-petrol uppercase tracking-wider block">
                      Servicio Requerido
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-brand-light border ${
                        errors.service ? 'border-red-500' : 'border-gray-200'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
                    >
                      <option value="">-- Seleccione una opción --</option>
                      {services.map((serv, idx) => (
                        <option key={idx} value={serv}>
                          {serv}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-[11px] text-red-500 font-semibold">{errors.service}</p>}
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-petrol uppercase tracking-wider block">
                      Detalle del Proyecto
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describa el alcance de la obra, ubicación geográfica, requerimientos técnicos, coordenadas o plazos estimados..."
                      className={`w-full px-4 py-3 rounded-xl bg-brand-light border ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 font-semibold">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-petrol hover:bg-brand-petrol-light text-white py-4 rounded-xl font-outfit font-bold transition-all duration-300 disabled:opacity-75 shadow-lg shadow-brand-petrol/20 hover:shadow-brand-petrol/30 hover-glow-green cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Enviando requerimiento...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Enviar Solicitud de Cotización</span>
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
                  className="flex flex-col items-center justify-center text-center py-12 px-4 h-full space-y-6"
                >
                  <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-extrabold text-brand-petrol font-outfit">
                      ¡Solicitud Enviada!
                    </h3>
                    <p className="text-sm text-gray-500 max-w-sm leading-relaxed font-sans">
                      Hemos recibido los detalles de tu proyecto. Un ingeniero especialista de MINGEOTOP E.I.R.L. se comunicará contigo en menos de 24 horas para enviarte la propuesta técnica formal.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-brand-light hover:bg-brand-petrol hover:text-white border border-brand-petrol text-brand-petrol px-6 py-2.5 rounded-xl font-outfit font-semibold text-sm transition-all duration-300 cursor-pointer"
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
