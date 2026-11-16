import React from 'react';

export const SpookyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial ambient festive glow top */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[720px] h-[550px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.42) 0%, rgba(16, 185, 129, 0.22) 50%, transparent 80%)'
        }}
      />
      
      {/* Ambient warm pine & gold haze on the bottom */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[500px] rounded-full opacity-25 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(220, 38, 38, 0.2) 60%, transparent 80%)'
        }}
      />

      {/* Floating subtle winter snowflakes / holiday sparkles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/60 animate-pulse"
            style={{
              top: `${(i * 17 + 5) % 95}%`,
              left: `${(i * 21 + 9) % 96}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.6}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)'
            }}
          />
        ))}
      </div>
    </div>
  );
};
