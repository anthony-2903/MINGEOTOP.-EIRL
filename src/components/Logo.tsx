import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColor?: 'light' | 'dark';
}

export default function Logo({ className = '', iconOnly = false, textColor = 'light' }: LogoProps) {
  if (iconOnly) {
    return (
      <img
        src="/logo.webp"
        alt="MINGEOTOP E.I.R.L."
        className={`h-12 w-12 rounded-full object-cover shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        loading="eager"
      />
    );
  }

  return (
    <div className={`group flex min-w-0 items-center gap-2 sm:gap-3 ${className}`}>
      <img
        src="/logo.webp"
        alt="MINGEOTOP E.I.R.L."
        className="h-12 w-12 shrink-0 rounded-full border border-white/10 bg-brand-dark object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 sm:w-14"
        loading="eager"
      />

      <div className="flex min-w-0 flex-col">
        <div className="font-outfit text-xl font-extrabold leading-none tracking-wide sm:text-2xl 2xl:text-3xl">
          <span className="text-brand-yellow drop-shadow-sm">MINGEO</span>
          <span className={`${textColor === 'light' ? 'text-white' : 'text-brand-petrol'} drop-shadow-sm`}>TOP</span>
        </div>
        <span
          className={`mt-1.5 hidden text-[8px] font-bold uppercase leading-none tracking-[0.18em] min-[420px]:block sm:text-[8.5px] sm:tracking-[0.24em] ${
            textColor === 'light' ? 'text-gray-300' : 'text-brand-green'
          }`}
        >
          Minería / Topografía / Geodesia
        </span>
      </div>
    </div>
  );
}
