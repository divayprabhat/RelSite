import { useRef, useState, useEffect } from "react";

const GooeyNav = ({
  items = [],
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => {
    if (!filterRef.current) return;
    filterRef.current.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
            <feBlend in="SourceGraphic" in2="goo"/>
          </filter>
        </defs>
      </svg>
    `;
  }, []);

  const getParticleColor = (index) => {
    const colorMap = {
      1: "#6366F1",
      2: "#10B981",
      3: "#F59E0B",
      4: "#EF4444",
    };
    return colorMap[colors[index % colors.length]] || "#6366F1";
  };

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: getParticleColor(i),
      rotate: rotate,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;

    element._particles = [];

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element._particles.push(p);

      setTimeout(() => {
        const particle = document.createElement("span");
        particle.style.cssText = `
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${p.color};
          top: 50%;
          left: 50%;
          transform: translate(${p.start[0]}px, ${p.start[1]}px) scale(${p.scale});
          pointer-events: none;
          z-index: -1;
          transition: transform ${p.time}ms ease, opacity ${p.time}ms ease;
        `;
        element.appendChild(particle);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            particle.style.transform = `translate(${p.end[0]}px, ${p.end[1]}px) scale(0) rotate(${p.rotate}turn)`;
            particle.style.opacity = "0";
          });
        });

        setTimeout(() => {
          particle.remove();
        }, p.time);
      }, 30 * i);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const cx = elemRect.left - navRect.left + elemRect.width / 2;
    const cy = elemRect.top - navRect.top + elemRect.height / 2;

    if (textRef.current) {
      textRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      textRef.current.style.width = `${elemRect.width}px`;
      textRef.current.style.height = `${elemRect.height}px`;
    }
  };

  const handleClick = (index, e) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    const item = e.currentTarget;
    updateEffectPosition(item);
    makeParticles(item);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-flex" }}
    >
      <div ref={filterRef} />
      <nav
        ref={navRef}
        style={{
          display: "flex",
          gap: "4px",
          background: "rgba(10,10,20,0.85)",
          border: "1px solid rgba(42,42,53,0.8)",
          borderRadius: "50px",
          padding: "6px",
          backdropFilter: "blur(12px)",
          position: "relative",
          filter: "url(#gooey-filter)",
        }}
      >
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href || "#"}
            onClick={(e) => {
              e.preventDefault();
              handleClick(index, e);
            }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 20px",
              borderRadius: "50px",
              textDecoration: "none",
              color: activeIndex === index ? "#fff" : "rgba(255,255,255,0.7)",
              background:
                activeIndex === index ? "#6366F1" : "transparent",
              transition: "color 0.3s ease, background 0.3s ease",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              whiteSpace: "nowrap",
              zIndex: 2,
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default GooeyNav;
