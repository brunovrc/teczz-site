'use client';

import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  duration?: number;
}

export default function Preloader({ onComplete, duration = 3300 }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + (100 / (duration / 50));
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [duration]);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 700);
    }, duration);
    return () => clearTimeout(completeTimer);
  }, [duration, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.016;
    const scale = 2.5;
    const noiseIntensity = 0.5;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      return (G * Math.sin(G * x) * G * Math.sin(G * y) * (1 + x)) % 1;
    };

    const animate = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      /* Pure black base */
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      /* Silk pattern — very subtle on black */
      for (let x = 0; x < W; x += 3) {
        for (let y = 0; y < H; y += 3) {
          const u = (x / W) * scale;
          const v = (y / H) * scale;
          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.022 * Math.sin(6.0 * tex_x - tOffset);

          const pattern = 0.5 + 0.3 * Math.sin(
            4.0 * (tex_x + tex_y +
              Math.cos(2.5 * tex_x + 4.0 * tex_y) +
              0.012 * tOffset) +
            Math.sin(16.0 * (tex_x + tex_y - 0.07 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 20.0 * noiseIntensity);

          /* Near-black silk: very dark, barely visible shimmer */
          const v2 = Math.floor(8 + 14 * intensity);
          ctx.fillStyle = `rgba(${v2}, ${v2}, ${v2 + 4}, 0.55)`;
          ctx.fillRect(x, y, 3, 3);
        }
      }

      /* Subtle vignette */
      const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

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
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: '700ms' }}
    >
      {/* Silk canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">

        {/* Logo — serif light, like the silk reference */}
        <div
          className={`leading-none text-white opacity-0 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'translate-y-10'
          }`}
          style={{
            fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            textShadow: '0 0 80px rgba(255,255,255,0.08)',
          }}
        >
          Teczz
          <span style={{ color: '#3b82f6' }}>.</span>
        </div>

        {/* Tagline */}
        <div
          className={`opacity-0 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'translate-y-6'
          }`}
          style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            fontSize: 'clamp(0.65rem, 1.4vw, 1rem)',
            fontWeight: 300,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.40)',
          }}
        >
          IA&nbsp;&nbsp;+&nbsp;&nbsp;Processo&nbsp;&nbsp;=&nbsp;&nbsp;Resultado Real
        </div>

        {/* Progress bar */}
        <div
          className={`mt-14 w-48 md:w-64 h-px bg-white/10 overflow-hidden opacity-0 transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'opacity-100' : ''
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500/70 to-blue-400/50 transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: '50ms' }}
          />
        </div>

      </div>

      {/* Corner label */}
      <div
        className={`absolute top-8 left-8 text-[9px] tracking-[0.3em] uppercase text-white/20 opacity-0 transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100' : '-translate-y-4'
        }`}
      >
        IA ST '25
      </div>
    </div>
  );
}
