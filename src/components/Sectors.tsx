import React from 'react';
import { m } from 'framer-motion';
import {
  Mountain,
  Building,
  Route,
  Droplet,
  Sprout,
  Compass,
  Zap,
  Globe
} from 'lucide-react';

export default function Sectors() {
  const sectorsList = [
    {
      icon: <Mountain className="h-6 w-6" />,
      title: 'Minería',
      desc: 'Control de avances tridimensionales en interior mina y tajo abierto. Levantamiento de botaderos, relaveras y control geométrico de taludes.',
      color: 'from-[#4B5E6B] to-brand-petrol',
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Construcción Civil',
      desc: 'Replanteo e instrumentación de alta precisión para cimentaciones complejas, puentes, losas, ejes estructurales y control de verticalidad.',
      color: 'from-brand-green-light to-brand-green',
    },
    {
      icon: <Route className="h-6 w-6" />,
      title: 'Carreteras',
      desc: 'Diseño geométrico de vías, trazado de curvas horizontales/verticales, perfiles longitudinales y control exacto de rasante y subrasante.',
      color: 'from-[#D97706] to-[#B45309]',
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: 'Saneamiento',
      desc: 'Levantamiento topográfico de precisión para tendido de redes de agua potable, alcantarillado, colectores pluviales y canales de riego por gravedad.',
      color: 'from-[#2563EB] to-[#1D4ED8]',
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: 'Agricultura',
      desc: 'Curvas de nivel para sistemas de riego tecnificado, nivelación de parcelas de cultivo, partición de tierras agrícolas y planos catastrales.',
      color: 'from-[#10B981] to-[#047857]',
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: 'Catastro',
      desc: 'Delimitación jurídica de linderos, levantamiento catastral urbano y rural, georreferenciación de predios bajo normativas SUNARP.',
      color: 'from-[#7C3AED] to-[#6D28D9]',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Energía',
      desc: 'Topografía de corredores de servidumbre para líneas de transmisión eléctrica, catastro de postes y replanteo de subestaciones y centrales.',
      color: 'from-brand-yellow-dark to-brand-yellow',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Geología & Geotecnia',
      desc: 'Mapeo geomecánico y estructural, control de fallas geológicas, perfiles estratigráficos de precisión y modelamiento 3D para estabilidad de taludes.',
      color: 'from-[#78350F] to-[#451A03]',
    },
  ];

  return (
    <section id="sectores" className="section-fade-to-light py-24 bg-brand-dark text-white relative overflow-hidden bg-topo-contour">
      {/* Visual background overlays */}
      <div className="absolute inset-0 bg-brand-petrol-dark/80 z-0" />
      
      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-green/10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-brand-yellow uppercase mb-3"
          >
            SECTORES DE TRABAJO
          </m.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-outfit"
            data-gsap-title
          >
            Presencia Técnica en las Industrias Clave
          </h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-sans"
          >
            Desplegamos nuestros equipos y especialistas en los entornos operacionales más exigentes del país para garantizar precisión en cada fase de obra.
          </m.p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectorsList.map((sector) => (
            <div
              key={sector.title}
              className="bg-brand-dark/40 border border-brand-green/20 hover:border-brand-yellow/40 rounded-2xl p-6 transition-[border-color,background-color] duration-300 group relative overflow-hidden backdrop-blur-sm"
              data-gsap-mask
            >
              {/* Soft decorative background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-petrol/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="space-y-4">
                {/* Sector Icon with matching border glow */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${sector.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {sector.icon}
                </div>

                <h3 className="text-lg font-bold font-outfit text-white group-hover:text-brand-yellow transition-colors duration-300">
                  {sector.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                  {sector.desc}
                </p>
              </div>

              {/* Decorative crosshairs (topography theme) */}
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-r border-b border-brand-green/20 group-hover:border-brand-yellow/30 group-hover:scale-110 transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 rounded-br-lg" />
              <div className="absolute -top-3 -left-3 w-10 h-10 border-l border-t border-brand-green/20 group-hover:border-brand-yellow/30 group-hover:scale-110 transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 rounded-tl-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
