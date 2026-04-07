import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setShowHero(true);
  }, [mediaType]);

  useEffect(() => {
    if (!mediaFullyExpanded) return;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 50) setShowHero(false);
      else if (currentY < lastScrollY.current) setShowHero(true);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        setScrollProgress(0);
        setShowHero(true);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);
    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        setScrollProgress(0);
        setShowHero(true);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + (deltaY < 0 ? 0.008 : 0.005) * deltaY, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
        setTouchStartY(touchY);
      }
    };
    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const getYTId = (src) => {
    if (!src) return null;
    if (src.includes('embed/')) return src.split('/embed/')[1]?.split('?')[0];
    if (src.includes('v=')) return src.split('v=')[1]?.split('&')[0];
    return null;
  };

  const ytId = (mediaType === 'video') ? getYTId(mediaSrc) : null;

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Fullscreen background: YouTube iframe OR fallback image — FIXED so it stays visible */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {ytId ? (
              <>
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${ytId}`}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '177.78vh',
                    minWidth: '100vw',
                    height: '56.25vw',
                    minHeight: '100vh',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                  }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,12,0.5)' }} />
              </>
            ) : bgImageSrc ? (
              <img src={bgImageSrc} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : null}
          </div>

          {/* Hero title */}
          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <AnimatePresence>
                {showHero && (
                  <motion.div
                    key="hero-title"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    <div className={`flex items-center justify-center text-center gap-4 w-full flex-col ${textBlend ? 'mix-blend-difference' : ''}`}>
                      <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                        style={{
                          transform: `translateX(-${textTranslateX}vw)`,
                          textShadow: '0 0 80px rgba(99,102,241,0.7), 0 2px 20px rgba(0,0,0,0.8)',
                          transition: 'transform 0ms',
                        }}
                      >
                        {firstWord}
                      </h1>
                      <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
                        style={{
                          transform: `translateX(${textTranslateX}vw)`,
                          textShadow: '0 0 80px rgba(99,102,241,0.7), 0 2px 20px rgba(0,0,0,0.8)',
                          transition: 'transform 0ms',
                        }}
                      >
                        {restOfTitle}
                      </h1>
                    </div>

                    {date && (
                      <p className="text-base text-blue-300/70 font-medium tracking-widest uppercase mt-4 letter-spacing-wider">
                        {date}
                      </p>
                    )}

                    {/* Scroll progress indicator */}
                    <div style={{ marginTop: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <p className="text-xs text-white/35 tracking-widest uppercase">
                        {scrollToExpand || 'Scroll to explore'}
                      </p>
                      <div style={{ width: '1.5px', height: '56px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                          style={{ width: '100%', background: 'linear-gradient(to bottom, #6366f1, #06b6d4)', borderRadius: '2px' }}
                          animate={{ height: `${scrollProgress * 100}%` }}
                          transition={{ duration: 0 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main content */}
            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
