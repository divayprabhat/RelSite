import React, { useRef, useState } from 'react';


const InfiniteMenu = ({ items = [] }) => {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

  const scroll = (dir) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: dir * 120, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={() => scroll(-1)}
        style={{ flexShrink: 0, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#fff', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >‹</button>

      <div
        ref={containerRef}
        style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', flex: 1 }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i === active ? null : i)}
            style={{
              flexShrink: 0,
              padding: '6px 16px',
              borderRadius: '8px',
              border: `1px solid ${active === i ? 'rgba(99,102,241,0.8)' : 'rgba(42,42,53,0.8)'}`,
              background: active === i ? 'rgba(99,102,241,0.25)' : 'rgba(20,20,26,0.6)',
              color: active === i ? '#a5b4fc' : '#9ca3af',
              fontSize: '12px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        style={{ flexShrink: 0, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#fff', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >›</button>
    </div>
  );
};

export default InfiniteMenu;
