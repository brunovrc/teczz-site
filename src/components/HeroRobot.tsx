import { type RefObject, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DataGridHero from './DataGridHero';
import { GooeyText } from './GooeyText';
import { SplineScene } from './ui/SplineScene';

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const gooeyTexts = ['Sites personalizados', 'Chatbots', 'Automações', 'Agentes de IA'];

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

  // Repassa mousemove de toda a hero para o canvas do Spline
  // → robô responde ao mouse mesmo quando cursor está no lado esquerdo
  useEffect(() => {
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
  }, []);

  return (
    <section ref={heroRef} className="relative flex flex-col overflow-hidden bg-black" style={{ minHeight: '100svh' }}>

      {/* 1. Grid de fundo */}
      <DataGridHero
        rows={28} cols={50} spacing={3} duration={5}
        color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
        opacityMin={0.03} opacityMax={0.28}
      />

      {/*
        2. Robô — container na direita (visual limpo)
           Mouse events da esquerda são repassados via useEffect acima
      */}
      <div
        ref={splineRef}
        id="spline-robot"
        className="hidden md:block absolute overflow-hidden"
        style={{ top: 0, right: 0, bottom: 0, left: '50%', zIndex: 3 }}
      >
        <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
        <style>{`#spline-robot canvas ~ div { display: none !important; }`}</style>
      </div>

      {/* 3. Scrim esquerda — legibilidade do texto */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.1) 50%, transparent 65%)',
        }}
      />

      {/*
        4. Flex: texto — z-10
           pointer-events-none → mouse chega ao Spline
      */}
      <div className="relative z-10 flex flex-1 pointer-events-none">

        <div className="relative z-20 flex flex-col justify-center gap-6 px-6 md:px-10 lg:px-16
                        w-full md:w-[55%] lg:w-[52%] pointer-events-auto"
          style={{ paddingTop: 'calc(72px + 1rem)', paddingBottom: '2rem' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span ref={line1Ref} style={{
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.62) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
              whiteSpace: 'nowrap',
            }}>
              IA não é mais tendência.
            </span>
            <span ref={line2Ref} style={{
              background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
              whiteSpace: 'nowrap',
            }}>
              É vantagem competitiva.
            </span>
          </motion.h1>

          <motion.a
            href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!"
            target="_blank" rel="noopener noreferrer"
            className="pill-btn-lg w-fit"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
          >
            Quero implementar IA na minha empresa <ArrowRight size={14} />
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.7 }}
            style={{ height: '1.6rem', position: 'relative', overflow: 'visible' }}
          >
            <GooeyText
              texts={gooeyTexts}
              morphTime={1.2}
              cooldownTime={2.2}
              textStyle={{
                fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap',
                left: 0,
                transform: 'none',
              }}
            />
          </motion.div>
        </div>

        <div className="hidden md:flex flex-1" />

        {/* Mobile — robô do topo até onde começa o GooeyText (~50vh) */}
        <div
          id="spline-mobile"
          className="md:hidden absolute left-0 right-0 top-0 pointer-events-none opacity-30 z-[4]"
          style={{ height: '50vh' }}
        >
          <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
          <style>{`#spline-mobile canvas ~ div { display: none !important; }`}</style>
        </div>

      </div>

      {/* 5. Marquee */}
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
