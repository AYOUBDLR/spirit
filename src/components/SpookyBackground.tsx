import React from 'react';

export const SpookyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial ambient glow top */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.45) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 80%)'
        }}
      />
      
      {/* Ambient purple haze on the bottom */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[500px] rounded-full opacity-25 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(255, 98, 0, 0.15) 60%, transparent 80%)'
        }}
      />

      {/* Floating subtle embers / stars */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/40 animate-pulse"
            style={{
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 23 + 13) % 96}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.7}s`,
              boxShadow: '0 0 6px rgba(255, 140, 0, 0.8)'
            }}
          />
        ))}
      </div>
    </div>
  );
};
