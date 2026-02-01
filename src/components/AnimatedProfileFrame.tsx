import { useState } from 'react';

interface AnimatedProfileFrameProps {
  imageUrl: "/profile.jpeg";
  alt: "Vishy";
}

const AnimatedProfileFrame = ({ imageUrl, alt }: AnimatedProfileFrameProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Rotating gradient ring */}
      <div className="absolute inset-0 rounded-full animate-rotate-gradient">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, hsl(195 100% 50%), hsl(270 80% 60%), hsl(195 100% 50%))',
            padding: '4px',
          }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </div>
      </div>

      {/* Glow effect */}
      <div 
        className="absolute inset-2 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(195 100% 50% / 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Inner static ring */}
      <div 
        className="absolute inset-4 rounded-full"
        style={{
          background: 'linear-gradient(135deg, hsl(195 100% 50% / 0.3), hsl(270 80% 60% / 0.3))',
          padding: '2px',
        }}
      >
        <div className="w-full h-full rounded-full bg-card overflow-hidden">
          {/* Profile image */}
          {!imageError ? (
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">
              VS
            </div>
          )}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary animate-float opacity-60" />
      <div className="absolute -bottom-4 -left-4 w-3 h-3 rounded-full bg-secondary animate-float opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-primary animate-float opacity-40" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default AnimatedProfileFrame;
