import React, { useRef, useEffect } from 'react';

const VortexBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.002;
        this.radiusSpeed = 0.001;
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, 50%)`;
      }

      update(centerX, centerY, time) {
        this.angle += this.speed;
        this.radius += this.radiusSpeed;
        if (this.radius > Math.min(canvas.width, canvas.height) / 1.5) {
          this.radius = 10;
        }
        this.x = centerX + Math.cos(this.angle + time) * this.radius;
        this.y = centerY + Math.sin(this.angle * 0.7 + time) * this.radius * 0.7;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      resize();
      particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      for (let i = 0; i < 300; i++) {
        const radius = Math.random() * Math.min(canvas.width, canvas.height) / 1.5;
        const angle = Math.random() * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        particles.push(new Particle(x, y, radius));
      }
    };

    let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      time += 0.01;

      particles.forEach(particle => {
        particle.update(centerX, centerY, time);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      resize();
      particles = [];
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default VortexBackground;
