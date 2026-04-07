import { useRef, useEffect, useState } from "react";

const BentoCard = ({
  children,
  className = "",
  style = {},
  disableHoverEffect = false,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (disableHoverEffect) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--glow-opacity", "1");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--glow-opacity": "0",
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        transform:
          "perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))",
        transition: "transform 0.1s ease",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        background: "rgba(20, 20, 26, 0.7)",
        border: "1px solid rgba(42, 42, 53, 0.8)",
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.15), transparent 40%)`,
          opacity: "var(--glow-opacity)",
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  spotlightRadius = 300,
  particleCount = 12,
  enableBorderGlow = true,
  glowColor = "rgba(99,102,241,0.6)",
  cardData = [],
  className = "",
}) => {
  const gridRef = useRef(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (enableStars) {
      const generated = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        opacity: Math.random() * 0.6 + 0.1,
        animDuration: `${Math.random() * 3 + 2}s`,
        animDelay: `${Math.random() * 2}s`,
      }));
      setStars(generated);
    }
  }, [enableStars, particleCount]);

  const handleMouseMove = (e) => {
    if (!enableSpotlight || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty("--spotlight-x", `${x}px`);
    gridRef.current.style.setProperty("--spotlight-y", `${y}px`);
    gridRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!gridRef.current) return;
    gridRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={gridRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
        "--spotlight-opacity": "0",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {enableSpotlight && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(${spotlightRadius}px circle at var(--spotlight-x) var(--spotlight-y), rgba(99,102,241,0.08), transparent 50%)`,
            opacity: "var(--spotlight-opacity)",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "20px",
          }}
        />
      )}

      {enableStars &&
        stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: "white",
              opacity: star.opacity,
              animation: `twinkle ${star.animDuration} ${star.animDelay} infinite alternate ease-in-out`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ))}

      {cardData.map((card, index) => (
        <BentoCard
          key={index}
          className={card.className}
          style={{
            gridColumn: card.colSpan ? `span ${card.colSpan}` : "span 1",
            gridRow: card.rowSpan ? `span ${card.rowSpan}` : "span 1",
            minHeight: card.height || "200px",
            boxShadow: enableBorderGlow
              ? `0 0 0 1px rgba(42,42,53,0.8), 0 0 20px rgba(99,102,241,0.05)`
              : "none",
            ...(card.style || {}),
          }}
        >
          {card.content}
        </BentoCard>
      ))}

      <style>{`
        @keyframes twinkle {
          0% { opacity: var(--start-opacity, 0.1); transform: scale(1); }
          100% { opacity: var(--end-opacity, 0.6); transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export { BentoCard, MagicBento };
export default MagicBento;
