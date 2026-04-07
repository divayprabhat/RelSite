import React from 'react';


const FluidGlass = ({ children, mode = 'lens', style = {} }) => {
  return (
    <div
      style={{
        position: 'relative',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FluidGlass;
