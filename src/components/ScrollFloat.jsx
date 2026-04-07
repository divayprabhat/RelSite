import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=20%",
  scrollEnd = "bottom bottom-=20%",
  stagger = 0.03,
  className = "",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current || window;

    const chars = el.querySelectorAll(".sf-char");
    if (!chars.length) return;

    const tween = gsap.fromTo(
      chars,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  const text = typeof children === "string" ? children : String(children ?? "");

  return (
    <span
      ref={containerRef}
      className={`scroll-float-container ${className}`}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="sf-char"
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default ScrollFloat;
