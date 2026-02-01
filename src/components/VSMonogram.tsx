import { useState } from 'react';

const VSMonogram = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-10 h-10 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(270, 80%, 60%)" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#strokeGradient)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`}
          style={{
            filter: isHovered ? 'url(#glow)' : 'none',
          }}
        />
        
        {/* V letter */}
        <path
          d="M12 12 L20 28 L28 12"
          stroke="url(#strokeGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-draw-stroke"
          style={{
            filter: isHovered ? 'url(#glow)' : 'none',
          }}
        />
        
        {/* S letter overlay */}
        <path
          d="M16 14 C16 14 24 10 24 16 C24 22 16 20 16 26 C16 30 24 28 24 28"
          stroke="url(#strokeGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}
          style={{
            filter: isHovered ? 'url(#glow)' : 'none',
          }}
        />
      </svg>
      
      {/* Hover glow effect */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, hsl(195 100% 50% / 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default VSMonogram;
