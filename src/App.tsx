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
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isAdminRoute = window.location.pathname === '/admin';
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

      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-brand-yellow shadow-[0_0_18px_rgba(255,92,0,0.45)]"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Main Sections */}
      <main className="flex-grow cinematic-scroll">
        <Hero />
        <AboutUs />
        <Services />
        <Sectors />
        <Equipment />
        <Process />
        <Benefits />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button: WhatsApp Widget */}
      <a
        href="https://wa.me/51913386354?text=Hola%20MINGEOTOP,%20estoy%20visitando%20su%20p%C3%A1gina%20web%20y%20deseo%20realizar%20una%20consulta%20técnica."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-whatsapp-pulse hover-glow-green cursor-pointer"
        title="Chatear por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 stroke-[2.5]" />
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
