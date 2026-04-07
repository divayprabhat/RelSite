import React from 'react';


const GradualBlur = ({ children, position = 'bottom', height = '8rem', animated = false }) => {
  const isBottom = position === 'bottom';

  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          [isBottom ? 'bottom' : 'top']: 0,
          height,
          background: isBottom
            ? 'linear-gradient(to bottom, transparent, rgba(10,10,15,0.85))'
            : 'linear-gradient(to top, transparent, rgba(10,10,15,0.85))',
          pointerEvents: 'none',
          zIndex: 1,
          animation: animated ? 'gradualBlurPulse 4s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`
        @keyframes gradualBlurPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default GradualBlur;
