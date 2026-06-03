import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColor?: 'light' | 'dark';
}

function LogoIcon() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-full w-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mingeotopIconBg" x1="18" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#252830" />
          <stop offset="1" stopColor="#0C0E11" />
        </linearGradient>
        <linearGradient id="mingeotopPin" x1="48" y1="18" x2="48" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7C2B" />
          <stop offset="1" stopColor="#FF5C00" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="80" height="80" rx="18" fill="url(#mingeotopIconBg)" />
      <rect x="10.5" y="10.5" width="75" height="75" rx="15.5" stroke="#3F7A4A" strokeWidth="3" opacity="0.8" />

      <g stroke="#3F7A4A" strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <path d="M20 64C29 56 38 56 48 62C58 68 68 68 77 60" />
        <path d="M22 73C32 66 41 66 50 71C59 76 68 76 76 70" opacity="0.65" />
        <path d="M22 55C31 47 41 48 49 54C57 60 67 59 76 51" opacity="0.65" />
      </g>

      <path
        d="M48 70C43 62 32 51 32 38C32 27 40 19 48 19C56 19 64 27 64 38C64 51 53 62 48 70Z"
        fill="url(#mingeotopPin)"
      />
      <circle cx="48" cy="38" r="14" fill="#F8FAFC" />
      <circle cx="48" cy="38" r="7" stroke="#15171C" strokeWidth="2" />
      <path d="M48 25V31M48 45V51M35 38H41M55 38H61" stroke="#15171C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="38" r="2" fill="#15171C" />

      <path
        d="M25 28L34 48L42 33L48 49L57 29"
        stroke="#F8FAFC"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

export default function Logo({ className = '', iconOnly = false, textColor = 'light' }: LogoProps) {
  if (iconOnly) {
    return (
      <div className={`h-12 w-12 flex-shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  return (
    <div className={`group flex items-center space-x-3 ${className}`}>
      <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1 shadow-sm transition-all duration-300 group-hover:border-brand-yellow/30 group-hover:bg-brand-petrol-light/20">
        <div className="h-12 w-12 flex-shrink-0">
          <LogoIcon />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="font-outfit text-2xl font-extrabold leading-none tracking-wide sm:text-3xl">
          <span className="text-brand-yellow drop-shadow-sm">MINGEO</span>
          <span className={`${textColor === 'light' ? 'text-white' : 'text-brand-petrol'} drop-shadow-sm`}>TOP</span>
        </div>
        <span
          className={`mt-1.5 text-[8.5px] font-bold uppercase leading-none tracking-[0.24em] ${
            textColor === 'light' ? 'text-gray-300' : 'text-brand-green'
          }`}
        >
          Minería / Topografía / Geodesia
        </span>
      </div>
    </div>
  );
}
