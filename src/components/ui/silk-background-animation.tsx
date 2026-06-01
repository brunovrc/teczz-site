'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SilkProps {
  title?: string;
  subtitle?: string;
  onComplete?: () => void;
  duration?: number;
}

export const SilkPreloader = ({
  title = 'Teczz',
  subtitle = 'IA  +  Processo  =  Resultado Real',
  onComplete,
  duration = 3200,
}: SilkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 100 / (duration / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (!onComplete) return;
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 700);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    // Render at 25% resolution — CSS scales up, saves ~16x pixel ops
    const SCALE = 0.25;
    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth * SCALE);
      canvas.height = Math.floor(window.innerHeight * SCALE);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      /* Dark gradient base */
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#111111');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /* Silk pixel pattern */
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;
          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);

          /* Purple-gray silk — original colors from the component */
          const r = Math.floor(123 * intensity);
          const g = Math.floor(116 * intensity);
          const b = Math.floor(129 * intensity);

          const idx = (y * width + x) * 4;
          if (idx < data.length) {
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      /* Radial overlay for depth */
      const overlay = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlay.addColorStop(0, 'rgba(0,0,0,0.05)');
      overlay.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes silkFadeUp {
          from { opacity: 0; transform: translateY(2rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes silkFadeUpSlow {
          from { opacity: 0; transform: translateY(1rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .silk-fade-up       { animation: silkFadeUp     1s ease-out forwards; }
        .silk-fade-up-delay { animation: silkFadeUpSlow 1s ease-out 0.35s forwards; }
        .silk-fade-bar      { animation: silkFadeUpSlow 0.8s ease-out 0.7s forwards; }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          overflow: 'hidden',
          background: '#000',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 700ms ease-out',
          pointerEvents: fadeOut ? 'none' : 'all',
        }}
      >
        {/* Silk canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'auto' }}
        />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)',
        }} />

        {/* Dark radial scrim atrás do texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 45% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 2rem', textAlign: 'center',
        }}>

          {/* Title */}
          <h1
            className={isLoaded ? 'silk-fade-up' : ''}
            style={{
              opacity: 0,
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#ffffff',
              textShadow: '0 0 60px rgba(255,255,255,0.06)',
              margin: 0,
            }}
          >
            {title}
            <span style={{ color: '#3b82f6' }}>.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={isLoaded ? 'silk-fade-up-delay' : ''}
            style={{
              opacity: 0,
              marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(0.75rem, 1.4vw, 1rem)',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {subtitle}
          </p>

        </div>

      </div>
    </>
  );
};
