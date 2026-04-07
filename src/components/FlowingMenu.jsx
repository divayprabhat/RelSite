import React, { useState } from 'react';


const FlowingMenu = ({ items = [], textColor = '#fff', bgColor = '#060010', marqueeBgColor = '#6366F1', marqueeTextColor = '#fff', borderColor = '#2A2A35' }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <nav style={{ display: 'flex', gap: '2px', background: bgColor, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '4px', backdropFilter: 'blur(12px)' }}>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.link || '#'}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 18px',
            borderRadius: '8px',
            textDecoration: 'none',
            overflow: 'hidden',
            color: hovered === i ? marqueeTextColor : textColor,
            background: hovered === i ? marqueeBgColor : 'transparent',
            transition: 'all 0.25s ease',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
};

export default FlowingMenu;
