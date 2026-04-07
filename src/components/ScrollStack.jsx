import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ScrollStack = ({
  children,
  itemDistance = 120,
  itemScale = 0.04,
  itemStackZIndex = 10,
  scaleEndPoint = 0.92,
  className = "",
  style = {},
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const totalCards = cards.length;
    const triggers = [];

    cards.forEach((card, index) => {
      const isLast = index === totalCards - 1;

      gsap.set(card, { zIndex: itemStackZIndex + index });

      if (!isLast) {
        const pinTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top top+=80",
          end: () => `+=${itemDistance * (totalCards - index - 1)}`,
          pin: true,
          pinSpacing: false,
        });
        triggers.push(pinTrigger);

        const scaleTween = gsap.to(card, {
          scale: scaleEndPoint - itemScale * (totalCards - index - 2),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top+=80",
            end: () => `+=${itemDistance}`,
            scrub: true,
          },
        });
        triggers.push(scaleTween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t && t.kill());
    };
  }, [itemDistance, itemScale, itemStackZIndex, scaleEndPoint]);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {items.map((child, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            position: "relative",
            transformOrigin: "center top",
            willChange: "transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
