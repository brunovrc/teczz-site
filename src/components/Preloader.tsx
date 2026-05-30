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
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [duration]);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, duration);

    return () => clearTimeout(completeTimer);
  }, [duration, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.018;
    const scale = 2.5;
    const noiseIntensity = 0.6;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
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
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Create gradient background - black base with subtle dark shifts
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#111111');
      gradient.addColorStop(1, '#0a0a0a');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create silk-like pattern
      for (let x = 0; x < width; x += 3) {
        for (let y = 0; y < height; y += 3) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          let tex_x = u;
          let tex_y = v + 0.025 * Math.sin(6.0 * tex_x - tOffset);

          const pattern = 0.5 + 0.3 * Math.sin(
            4.0 * (tex_x + tex_y +
              Math.cos(2.5 * tex_x + 4.0 * tex_y) +
              0.015 * tOffset) +
            Math.sin(16.0 * (tex_x + tex_y - 0.08 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 18.0 * noiseIntensity);

          // Dark blue-gray silk color matching the site theme
          const r = Math.floor(18 + 25 * intensity);
          const g = Math.floor(22 + 32 * intensity);
          const b = Math.floor(35 + 45 * intensity);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
          ctx.fillRect(x, y, 3, 3);
        }
      }

      // Add subtle overlay for depth
      const overlayGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      overlayGradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      overlayGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      // Add spotlight cone effect from top
      const spotlightGradient = ctx.createRadialGradient(
        width / 2, 0, 0,
        width / 2, 0, height * 0.8
      );
      spotlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      spotlightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
      spotlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlightGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: '600ms' }}
    >
      {/* Animated Silk Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8">
        {/* Teczz Logo */}
        <div
          className={`
            text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
            font-bold tracking-tight leading-none
            text-white
            opacity-0
            transition-all duration-1000 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'translate-y-8'}
          `}
          style={{
            textShadow: '0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(59, 130, 246, 0.1)',
          }}
        >
          <span className="relative inline-block">
            Teczz
            <span className="text-blue-500">.</span>
          </span>
        </div>

        {/* Subtitle */}
        <div
          className={`
            mt-8 md:mt-10
            text-base md:text-lg lg:text-xl
            font-light tracking-[0.35em] uppercase
            text-white/50
            opacity-0
            transition-all duration-1000 ease-out delay-200
            ${isLoaded ? 'opacity-100 translate-y-0' : 'translate-y-6'}
          `}
        >
          <span className="inline-block">IA</span>
          <span className="mx-3 md:mx-5 text-blue-500/60 text-xs">●</span>
          <span className="inline-block">TECNOLOGIA</span>
          <span className="mx-3 md:mx-5 text-blue-500/60 text-xs">●</span>
          <span className="inline-block">OTIMIZAÇÃO DE TEMPO</span>
        </div>

        {/* Progress Bar */}
        <div
          className={`
            mt-12 md:mt-16
            w-48 md:w-64 h-[2px]
            bg-white/10 rounded-full overflow-hidden
            opacity-0
            transition-all duration-1000 ease-out delay-500
            ${isLoaded ? 'opacity-100' : ''}
          `}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: '50ms' }}
          />
        </div>
      </div>

      {/* Corner Accent */}
      <div
        className={`
          absolute top-8 left-8
          text-[10px] font-light tracking-[0.3em] uppercase
          text-white/20
          opacity-0
          transition-all duration-1000 ease-out delay-700
          ${isLoaded ? 'opacity-100' : '-translate-y-4'}
        `}
      >
        IA ST '25
      </div>

      {/* Bottom Corner */}
      <div
        className={`
          absolute bottom-8 right-8
          text-[10px] font-light tracking-[0.2em] uppercase
          text-white/15
          opacity-0
          transition-all duration-1000 ease-out delay-800
          ${isLoaded ? 'opacity-100' : 'translate-y-4'}
        `}
      >
        2025
      </div>
    </div>
  );
}
