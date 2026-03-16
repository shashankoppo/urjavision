import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 
        Custom SVG replicating the Urja Vision Logo:
        - Sun rays at top-left
        - Three-stroke swirl 
      */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto drop-shadow-sm" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun Rays (Yellow) */}
        <path 
          d="M35 15L40 30M20 25L35 35M15 45L30 45" 
          stroke="#FBBF24" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <path 
          d="M38 18L44 26M23 28L34 33M18 40L28 40" 
          stroke="#F59E0B" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.6"
        />

        {/* Global Swirl Definition */}
        <defs>
          <linearGradient id="swirlGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="swirlBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Top Swirl (Green) */}
        <path 
          d="M40 35C55 35 75 45 75 60C75 75 55 85 40 85C25 85 20 75 25 65" 
          stroke="url(#swirlGreen)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        
        {/* Bottom Swirl (Blue) */}
        <path 
          d="M30 50C35 45 55 45 70 55C85 65 85 80 70 90C55 100 30 95 20 80" 
          stroke="url(#swirlBlue)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />

        {/* Inner Accents */}
        <path 
          d="M45 45C50 45 60 50 60 60" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.3" 
        />
      </svg>

      {showText && (
        <div className={`flex flex-col leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
          <span className="font-black text-lg tracking-tighter">
            URJA <span className={light ? 'text-amber-400' : 'text-emerald-600'}>VISION</span>
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] transform scale-y-90 origin-left ${light ? 'text-gray-400' : 'text-gray-500'}`}>
            Powering the Future
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
