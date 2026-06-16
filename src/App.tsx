import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Sectors from './components/Sectors';
import Equipment from './components/Equipment';
import Process from './components/Process';
import Benefits from './components/Benefits';
import SeoFaq from './components/SeoFaq';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import GsapScrollEffects from './components/GsapScrollEffects';
import { ArrowUp } from 'lucide-react';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3.2c-7.05 0-12.79 5.67-12.79 12.64 0 2.23.6 4.41 1.73 6.32L3.14 28.8l6.84-1.79a12.94 12.94 0 0 0 6.06 1.52c7.05 0 12.79-5.67 12.79-12.65S23.09 3.2 16.04 3.2Zm0 23.2c-1.9 0-3.75-.5-5.38-1.45l-.39-.23-4.06 1.06 1.08-3.92-.26-.4a10.42 10.42 0 0 1-1.63-5.62c0-5.8 4.77-10.52 10.64-10.52 5.86 0 10.63 4.72 10.63 10.56 0 5.8-4.77 10.52-10.63 10.52Zm5.83-7.9c-.32-.16-1.9-.93-2.2-1.04-.29-.1-.51-.16-.72.16-.21.31-.83 1.04-1.02 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.88-1.78-2.2-.18-.31-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.72-1.72-.99-2.36-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.39-.29.31-1.12 1.09-1.12 2.65 0 1.57 1.15 3.08 1.31 3.29.16.21 2.27 3.43 5.49 4.81.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const normalizedPath = window.location.pathname.replace(/\/$/, '');
  const isAdminRoute = normalizedPath === '/admin';
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden antialiased bg-brand-light font-sans selection:bg-brand-yellow selection:text-brand-dark">
      {/* Header / Navbar */}
      <Navbar />
      <GsapScrollEffects />

      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-brand-yellow shadow-[0_0_18px_rgba(255,92,0,0.45)]"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Main Sections */}
      <main className="flex-grow cinematic-scroll">
        <Hero />
        <AboutUs />
        <Portfolio />
        <Services />
        <Sectors />
        <Equipment />
        <Process />
        <Benefits />
        <SeoFaq />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button: WhatsApp Widget */}
      <a
        href="https://wa.me/51913386354?text=Hola%20MINGEOTOP,%20estoy%20visitando%20su%20p%C3%A1gina%20web%20y%20deseo%20realizar%20una%20consulta%20t%C3%A9cnica."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-white/25 bg-[#25D366] px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1ebe5d] active:scale-95 sm:bottom-6 sm:right-6 sm:px-5"
        title="Chatear por WhatsApp"
        aria-label="Chatear por WhatsApp"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#25D366] shadow-inner sm:h-12 sm:w-12">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
        <span className="hidden pr-1 text-left font-outfit text-sm font-extrabold leading-tight text-white sm:block">
          WhatsApp
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
            Cotiza ahora
          </span>
        </span>
      </a>

      {/* Scroll back to top button */}
      {showBackToTop && (
        <a
          href="#inicio"
          className="fixed bottom-6 left-6 z-40 bg-brand-petrol/90 hover:bg-brand-petrol text-white p-3.5 rounded-xl shadow-xl hover:scale-115 active:scale-95 transition-all duration-300 flex items-center justify-center border border-brand-green/30 backdrop-blur-xs cursor-pointer"
          title="Subir al inicio"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5]" />
        </a>
      )}
    </div>
  );
}
