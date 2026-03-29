import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(5,150,105,0.3))' }}
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="sunGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="swirlGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="swirlBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <radialGradient id="glowEffect" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.15)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="35" cy="35" r="35" fill="url(#glowEffect)" />

        {/* Sun Rays (animated gradient) */}
        <path 
          d="M35 15L40 30M20 25L35 35M15 45L30 45" 
          stroke="url(#sunGradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <path 
          d="M38 18L44 26M23 28L34 33M18 40L28 40" 
          stroke="url(#sunGlowGradient)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.5"
        />

        {/* Top Swirl (Green gradient) */}
        <path 
          d="M40 35C55 35 75 45 75 60C75 75 55 85 40 85C25 85 20 75 25 65" 
          stroke="url(#swirlGreen)" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        
        {/* Bottom Swirl (Blue gradient) */}
        <path 
          d="M30 50C35 45 55 45 70 55C85 65 85 80 70 90C55 100 30 95 20 80" 
          stroke="url(#swirlBlue)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />

        {/* Inner accent highlight */}
        <path 
          d="M45 45C50 45 60 50 60 60" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.4" 
        />
      </svg>

      {showText && (
        <div className={`flex flex-col leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
          <span className="font-black text-lg tracking-tighter">
            URJA{' '}
            <span 
              className="bg-clip-text text-transparent"
              style={{ 
                backgroundImage: light 
                  ? 'linear-gradient(135deg, #FBBF24, #F59E0B, #D97706)' 
                  : 'linear-gradient(135deg, #047857, #059669, #10B981)' 
              }}
            >
              VISION
            </span>
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
