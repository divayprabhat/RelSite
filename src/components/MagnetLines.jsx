import { useEffect, useRef } from "react";


const MagnetLines = ({
  rows = 13,
  columns = 20,
  containerSize = "100vw",
  lineColor = "rgb(178, 69, 69)",
  lineWidth = 1.5,
  lineHeight = 30,
  baseAngle = -10,
  style = {},
  className = "",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll(".ml-line");

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const spanCenterX = rect.left + rect.width / 2;
        const spanCenterY = rect.top + rect.height / 2;
        const dx = clientX - spanCenterX;
        const dy = clientY - spanCenterY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        span.style.transform = `rotate(${angle}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rows, columns]);

  const total = rows * columns;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        zIndex: 5,
        pointerEvents: "none",
        ...style,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="ml-line"
            style={{
              display: "block",
              width: `${lineWidth}px`,
              height: `${lineHeight}px`,
              backgroundColor: lineColor,
              borderRadius: `${lineWidth}px`,
              transform: `rotate(${baseAngle}deg)`,
              transition: "transform 0.12s ease-out",
              willChange: "transform",
            }}
          />
        </span>
      ))}
    </div>
  );
};

export default MagnetLines;
