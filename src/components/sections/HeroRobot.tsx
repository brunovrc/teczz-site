import { type RefObject, useRef, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DataGridHero from './DataGridHero';
import { SplineScene } from '../ui/SplineScene';

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const marqueeWords = [
  'CHATBOTS', '·', 'AUTOMAÇÃO', '·', 'AGENTES IA', '·', 'INTEGRAÇÕES', '·',
  'SITES PERSONALIZADOS', '·', 'CLAUDE', '·', 'RESULTS FIRST', '·',
];

const ease = [0.22, 1, 0.36, 1] as const;

interface HeroRobotProps {
  line1Ref: RefObject<HTMLSpanElement>;
  line2Ref: RefObject<HTMLSpanElement>;
}

export function HeroRobot({ line1Ref, line2Ref }: HeroRobotProps) {
  const heroRef = useRef<HTMLElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMemo(() => window.innerWidth >= 768, []);

  // Desktop: monta Spline após 2 frames (~33ms)
  // Mobile: +350ms extra para o primeiro render assentar antes do WebGL
  const [splineReady, setSplineReady] = useState(false);
  useEffect(() => {
    let raf1: number, raf2: number;
    const id = setTimeout(() => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setSplineReady(true));
      });
    }, isDesktop ? 0 : 350);
    return () => { clearTimeout(id); cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [isDesktop]);

  // Repassa mousemove para o canvas do Spline (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const hero = heroRef.current;
    if (!hero) return;
    const forward = (e: MouseEvent) => {
      const canvas = splineRef.current?.querySelector('canvas');
      if (!canvas) return;
      canvas.dispatchEvent(new MouseEvent('mousemove', {
        bubbles: false, cancelable: true, view: window,
        clientX: e.clientX, clientY: e.clientY,
        screenX: e.screenX, screenY: e.screenY,
        movementX: e.movementX, movementY: e.movementY,
      }));
    };
    hero.addEventListener('mousemove', forward, { passive: true });
    return () => hero.removeEventListener('mousemove', forward);
  }, [isDesktop]);

  return (
    <section ref={heroRef} className="relative flex flex-col overflow-hidden bg-black" style={{ minHeight: '100svh' }}>

      {/* 1. Grid de fundo — só no desktop (mobile: robô cobre 100%, gasto desnecessário) */}
      {isDesktop && (
        <DataGridHero
          rows={18} cols={30} spacing={3} duration={5}
          color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
          opacityMin={0.03} opacityMax={0.28}
        />
      )}

      {/* 2. Robô — monta só quando browser está idle (não bloqueia primeiro render) */}
      {isDesktop ? (
        <div
          ref={splineRef}
          id="spline-robot"
          className="absolute overflow-hidden"
          style={{
            top: 0, right: 0, bottom: 0, left: '50%', zIndex: 3,
            opacity: splineReady ? 1 : 0,
            transition: splineReady ? 'opacity 0.8s ease' : 'none',
          }}
        >
          {splineReady && <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />}
          <style>{`#spline-robot canvas ~ div { display: none !important; }`}</style>
        </div>
      ) : (
        <div
          id="spline-mobile"
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            opacity: splineReady ? 1 : 0,
            transition: splineReady ? 'opacity 1s ease' : 'none',
          }}
        >
          {splineReady && <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />}
          <style>{`#spline-mobile canvas ~ div { display: none !important; }`}</style>
        </div>
      )}

      {/* 3. Scrim desktop */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 68%, transparent 80%)',
        }}
      />

      {/* 4. Scrim mobile */}
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-0 pointer-events-none z-[6]"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.08) 85%, transparent 100%)',
        }}
      />

      {/* 5. Conteúdo */}
      <div className="relative z-10 flex flex-1 pointer-events-none">

        <div
          className="relative z-20 flex flex-col pointer-events-none gap-5
                     items-center text-center justify-end pb-24
                     md:items-start md:text-left md:justify-center md:pb-8
                     px-5 md:px-10 lg:px-16
                     w-full md:w-[65%] lg:w-[63%]"
          style={{ paddingTop: 'calc(72px + 1rem)' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.9rem, 5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span ref={line1Ref} className="whitespace-nowrap" style={{
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.62) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
            }} />
            <span ref={line2Ref} className="whitespace-nowrap" style={{
              background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
            }} />
          </motion.h1>

          <motion.a
            href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!"
            target="_blank" rel="noopener noreferrer"
            className="pill-btn-lg w-fit pointer-events-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
          >
            Quero implementar IA na minha empresa <ArrowRight size={14} />
          </motion.a>
        </div>

        <div className="hidden md:flex flex-1" />

      </div>

      {/* 6. Marquee */}
      <div className="relative z-[15] pointer-events-auto">
        <div className="px-6 md:px-10 pt-5 pb-3 flex items-center justify-between">
          <p className="lets-build text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-medium">
            L&nbsp;&nbsp;E&nbsp;&nbsp;T&nbsp;&nbsp;'&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;U&nbsp;&nbsp;I&nbsp;&nbsp;L&nbsp;&nbsp;D
          </p>
          <a href="#soluções" className="scroll-indicator text-white/75 hover:text-white/70 transition-colors">
            <ChevronDown size={18} />
          </a>
        </div>
        <div className="border-y section-divider py-3 overflow-hidden" style={{ background: '#000' }}>
          <div className="marquee-track">
            {Array(2).fill(marqueeWords).flat().map((word, i) => (
              <span key={i} className={`text-[13px] tracking-[0.12em] uppercase font-semibold ${word === '·' ? 'text-blue-500' : 'marquee-word'}`}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
