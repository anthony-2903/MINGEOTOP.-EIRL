import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textColor?: 'light' | 'dark';
}

// SVG drawing representing the official MINGEOTOP emblem exactly
function LogoIcon() {
  return (
    <svg
      viewBox="0 0 120 100"
      className="w-full h-full filter drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Subtle drop shadow filter for 3D depth */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#15171C" floodOpacity="0.15" />
        </filter>
        
        {/* Gradients for the 3D bars to look extremely premium */}
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3F7A4A" />
          <stop offset="100%" stopColor="#2D5B37" />
        </linearGradient>
        
        <linearGradient id="barSideGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3E22" />
          <stop offset="100%" stopColor="#122B17" />
        </linearGradient>
      </defs>

      {/* 1. TOPOGRAPHIC CONCENTRIC CONTOUR WAVES (Moss/Forest Green) */}
      <g stroke="#2D5B37" strokeWidth="1.5" fill="none" opacity="0.95">
        {/* Outer Wave Loop */}
        <path d="M 12,65 C 18,52 38,51 55,52 C 72,53 92,49 100,58 C 104,65 98,72 88,76 C 75,81 48,82 30,79 C 18,77 8,72 12,65 Z" />
        {/* Wave Loop 2 */}
        <path d="M 22,67 C 27,57 41,56 55,57 C 69,58 84,55 90,62 C 93,67 89,72 81,75 C 70,78 49,79 36,77 C 26,75 19,71 22,67 Z" strokeWidth="1.3" />
        {/* Wave Loop 3 */}
        <path d="M 32,69 C 36,62 46,61 55,62 C 64,63 76,60 80,66 C 82,70 78,74 72,76 C 63,78 48,79 39,77 C 32,75 28,72 32,69 Z" strokeWidth="1.1" />
        {/* Inner Wave Ring (Center of target) */}
        <path d="M 42,70 C 45,66 51,65 55,66 C 59,67 67,65 70,69 C 71,72 68,75 64,76 C 58,77 49,77 45,76 C 41,74 39,72 42,70 Z" strokeWidth="0.9" />
      </g>

      {/* 2. RISING 3D COLUMNS (Forest Green with light/dark faces) */}
      {/* Column 1 (Leftmost small) */}
      <g filter="url(#logoShadow)">
        <polygon points="20,44 26,44 26,59 20,59" fill="url(#barGrad)" />
        <polygon points="26,44 28,42 28,57 26,59" fill="url(#barSideGrad)" />
        <polygon points="20,44 26,44 28,42 22,42" fill="#4D8D5A" />
      </g>

      {/* Column 2 (Left small) */}
      <g filter="url(#logoShadow)">
        <polygon points="34,36 40,36 40,61 34,61" fill="url(#barGrad)" />
        <polygon points="40,36 42,34 42,59 40,61" fill="url(#barSideGrad)" />
        <polygon points="34,36 40,36 42,34 36,34" fill="#4D8D5A" />
      </g>

      {/* Column 3 (Behind / Right-center medium) */}
      <g filter="url(#logoShadow)">
        <polygon points="76,24 82,24 82,60 76,60" fill="url(#barGrad)" />
        <polygon points="82,24 84,22 84,58 82,60" fill="url(#barSideGrad)" />
        <polygon points="76,24 82,24 84,22 78,22" fill="#4D8D5A" />
        
        {/* Yellow Upward Arrow 1 */}
        <path d="M 79,48 L 79,40 M 79,40 L 77,43 M 79,40 L 81,43" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Column 4 (Right tall) */}
      <g filter="url(#logoShadow)">
        <polygon points="90,14 96,14 96,59 90,59" fill="url(#barGrad)" />
        <polygon points="96,14 98,12 98,57 96,59" fill="url(#barSideGrad)" />
        <polygon points="90,14 96,14 98,12 92,12" fill="#4D8D5A" />

        {/* Yellow Upward Arrow 2 */}
        <path d="M 93,36 L 93,25 M 93,25 L 91,29 M 93,25 L 95,29" stroke="#FFA500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 3. CENTERPIECE MAP PIN (Vibrant Safety Orange) */}
      <g filter="url(#logoShadow)">
        {/* Stylized Map Pin pointing exactly to center target at (55, 68) */}
        <path
          d="M 55,68 C 51.5,63.5 37,48 37,33.5 C 37,21.5 45,15.5 55,15.5 C 65,15.5 73,21.5 73,33.5 C 73,48 58.5,63.5 55,68 Z"
          fill="#FF5C00"
        />
        
        {/* Inner White Reticle Area */}
        <circle cx="55" cy="33.5" r="11" fill="#FFFFFF" />

        {/* Technical Target Crosshair (Dark Charcoal) */}
        <circle cx="55" cy="33.5" r="5.5" stroke="#15171C" strokeWidth="1.5" fill="none" />
        <line x1="43" y1="33.5" x2="67" y2="33.5" stroke="#15171C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="55" y1="21.5" x2="55" y2="45.5" stroke="#15171C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="55" cy="33.5" r="1.2" fill="#15171C" />
      </g>
    </svg>
  );
}

export default function Logo({ className = '', iconOnly = false, textColor = 'light' }: LogoProps) {
  if (iconOnly) {
    return (
      <div className={`w-12 h-12 flex-shrink-0 hover:scale-110 transition-transform duration-300 ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3.5 group ${className}`}>
      {/* Animated Emblem container with subtle pop-out shadow */}
      <div className="p-1 rounded-xl bg-white/5 border border-transparent group-hover:border-brand-yellow/20 group-hover:bg-brand-petrol-light/20 transition-all duration-300 shadow-sm flex items-center justify-center">
        <div className="w-14 h-12 flex-shrink-0">
          <LogoIcon />
        </div>
      </div>

      {/* Brand Text Typography */}
      <div className="flex flex-col">
        <div className="font-outfit font-extrabold text-2xl sm:text-3xl tracking-wide leading-none flex items-center">
          <span className="text-brand-yellow drop-shadow-sm">MINGEO</span>
          <span className={`${textColor === 'light' ? 'text-white' : 'text-brand-petrol'} drop-shadow-sm`}>TOP</span>
          <span className="text-xs text-brand-yellow font-black ml-0.5 -mt-2">®</span>
        </div>
        <span className={`text-[8.5px] font-bold tracking-[0.28em] uppercase leading-none mt-1.5 ${
          textColor === 'light' ? 'text-gray-300' : 'text-brand-green'
        }`}>
          Minería • Topografía • Geodesia
        </span>
      </div>
    </div>
  );
}
