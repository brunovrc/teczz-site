import { useEffect, useRef } from 'react';

interface DataGridHeroProps {
  rows?: number;
  cols?: number;
  color?: string;
  opacityMin?: number;
  opacityMax?: number;
  // legacy props kept for compatibility — ignored
  spacing?: number;
  duration?: number;
  animationType?: string;
  pulseEffect?: boolean;
  mouseGlow?: boolean;
}

export default function DataGridHero({
  rows = 24,
  cols = 40,
  color = '#3b82f6',
  opacityMin = 0.03,
  opacityMax = 0.28,
}: DataGridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // On mobile, cells are physically larger (smaller screen) so we can
    // use the same visual density with fewer absolute cells
    const isMobile = window.innerWidth < 768;
    const effectiveRows = isMobile ? Math.ceil(rows * 0.7) : rows;
    const effectiveCols = isMobile ? Math.ceil(cols * 0.7) : cols;

    let width = 0;
    let height = 0;
    let mouseX = -1;
    let mouseY = -1;
    let rafId = 0;
    const startTime = performance.now();
    const GAP = 3;
    const DURATION = 5000;
    const GLOW_R2 = 260 * 260;

    const delays = new Float32Array(effectiveRows * effectiveCols);
    const centerRow = effectiveRows / 2;
    const centerCol = effectiveCols / 2;
    for (let r = 0; r < effectiveRows; r++) {
      for (let c = 0; c < effectiveCols; c++) {
        const dr = r - centerRow;
        const dc = c - centerCol;
        delays[r * effectiveCols + c] = Math.sqrt(dr * dr + dc * dc) * 0.18;
      }
    }

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!width || !height) return;

      const t = performance.now() - startTime;
      const cellW = width / effectiveCols;
      const cellH = height / effectiveRows;
      const cw = cellW - GAP;
      const ch = cellH - GAP;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (let r = 0; r < effectiveRows; r++) {
        const y = r * cellH + GAP / 2;
        const cy = (r + 0.5) * cellH;

        for (let c = 0; c < effectiveCols; c++) {
          const delay = delays[r * effectiveCols + c];
          const phase = (t / DURATION - delay * 0.1) * Math.PI * 2;
          let opacity = opacityMin + (opacityMax - opacityMin) * ((Math.sin(phase) + 1) * 0.5);

          // Mouse glow — desktop only
          if (!isMobile && mouseX >= 0) {
            const dx = (c + 0.5) * cellW - mouseX;
            const dy = cy - mouseY;
            const d2 = dx * dx + dy * dy;
            if (d2 < GLOW_R2) opacity += (1 - d2 / GLOW_R2) * 0.18;
          }

          ctx.globalAlpha = Math.min(opacity, 1);
          ctx.fillRect(c * cellW + GAP / 2, y, cw, ch);
        }
      }

      ctx.globalAlpha = 1;
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, [rows, cols, color, opacityMin, opacityMax]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
