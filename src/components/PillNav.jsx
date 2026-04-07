import { useState, useRef, useEffect } from "react";

const PillNav = ({
  items = [],
  activeIndex: controlledActiveIndex,
  onChange,
  defaultActiveIndex = 0,
  pillColor = "#6366F1",
  textColor = "rgba(255,255,255,0.6)",
  activeTextColor = "#ffffff",
  backgroundColor = "rgba(10,10,20,0.85)",
  borderColor = "rgba(42,42,53,0.8)",
  className = "",
  style = {},
}) => {
  const [activeIndex, setActiveIndex] = useState(
    controlledActiveIndex ?? defaultActiveIndex
  );
  const [pillStyle, setPillStyle] = useState({});
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  const currentIndex =
    controlledActiveIndex !== undefined ? controlledActiveIndex : activeIndex;

  useEffect(() => {
    const activeEl = itemRefs.current[currentIndex];
    const container = containerRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setPillStyle({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
      height: activeRect.height,
      top: activeRect.top - containerRect.top,
    });
  }, [currentIndex]);

  const handleClick = (index) => {
    if (controlledActiveIndex === undefined) {
      setActiveIndex(index);
    }
    onChange?.(index);
  };

  return (
    <nav
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        background: backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "50px",
        padding: "4px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {/* Sliding pill */}
      <div
        style={{
          position: "absolute",
          background: pillColor,
          borderRadius: "50px",
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
          boxShadow: `0 2px 10px ${pillColor}40`,
          ...pillStyle,
        }}
      />

      {items.map((item, index) => (
        <button
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => handleClick(index)}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 18px",
            borderRadius: "50px",
            border: "none",
            background: "transparent",
            color: currentIndex === index ? activeTextColor : textColor,
            fontSize: "14px",
            fontWeight: currentIndex === index ? "600" : "400",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "color 0.3s ease",
          }}
        >
          {item.icon && (
            <span style={{ display: "flex", alignItems: "center" }}>
              {item.icon}
            </span>
          )}
          {item.label || item}
        </button>
      ))}
    </nav>
  );
};

export default PillNav;
