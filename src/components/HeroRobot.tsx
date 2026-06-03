import { useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DataGridHero from './DataGridHero';
import { GooeyText } from './GooeyText';

const gooeyTexts = ['Sites personalizados', 'Chatbots', 'Automações', 'Agentes de IA'];

const marqueeWords = [
  'CHATBOTS', '·', 'AUTOMAÇÃO', '·', 'AGENTES IA', '·', 'INTEGRAÇÕES', '·',
  'SITES PERSONALIZADOS', '·', 'CLAUDE', '·', 'RESULTS FIRST', '·',
];

// Posição do coração na imagem
// Desktop: robô ocupa 62% direita → coração ≈ 71% X do viewport, 44% Y
// Mobile: robô centralizado → 50% X, 44% Y
const HEART = {
  desktop: { x: '71%', y: '44%' },
  mobile:  { x: '50%', y: '44%' },
};

interface HeroRobotProps {
  line1Ref: RefObject<HTMLSpanElement>;
  line2Ref: RefObject<HTMLSpanElement>;
}

export function HeroRobot({ line1Ref, line2Ref }: HeroRobotProps) {
  const zoneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ['start start', 'end start'],
  });

  // ── Texto: desaparece entre 20-52%
  const textOpacity = useTransform(scrollYProgress, [0.18, 0.50], [1, 0]);
  const textX       = useTransform(scrollYProgress, [0.18, 0.52], ['0%', '-5%']);

  // ── Coração: brilha mais ao se aproximar do portal
  const glowOpacity = useTransform(scrollYProgress, [0,    0.45], [0.4, 1.0]);
  const glowScale   = useTransform(scrollYProgress, [0,    0.45], [1.0, 1.8]);

  // ── Portal: círculo escuro nasce no coração e engole a tela (40-92%)
  const portalScale = useTransform(scrollYProgress, [0.40, 0.92], [0, 1]);

  // ── Fade final do container
  const heroOpacity = useTransform(scrollYProgress, [0.88, 1.00], [1, 0]);

  return (
    <div ref={zoneRef} style={{ height: '200vh' }}>
      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen flex flex-col overflow-hidden"
        aria-label="Hero"
      >
        {/* Background grid */}
        <DataGridHero
          rows={28} cols={50} spacing={3} duration={5}
          color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
          opacityMin={0.03} opacityMax={0.28}
        />

        {/* Scrim central */}
        <div className="absolute inset-0 pointer-events-none z-[5]" style={{
          background: 'radial-gradient(ellipse 60% 55% at 38% 50%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
        }} />

        {/* ── Portal — círculo que nasce no coração (z acima de tudo) */}
        {/* Desktop */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: HEART.desktop.x,
            top: HEART.desktop.y,
            translateX: '-50%',
            translateY: '-50%',
            width: '320vmax',
            height: '320vmax',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #060d1f 0%, #000510 35%, #000 70%)',
            scale: portalScale,
            zIndex: 60,
            pointerEvents: 'none',
          }}
          className="hidden md:block"
        />
        {/* Mobile */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: HEART.mobile.x,
            top: HEART.mobile.y,
            translateX: '-50%',
            translateY: '-50%',
            width: '320vmax',
            height: '320vmax',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #060d1f 0%, #000510 35%, #000 70%)',
            scale: portalScale,
            zIndex: 60,
            pointerEvents: 'none',
          }}
          className="md:hidden"
        />

        {/* ── Conteúdo ── */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-10 lg:px-16">

          {/* Texto — esquerda */}
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="w-full md:w-[42%] flex flex-col items-start gap-6 z-20
                       max-md:items-center max-md:text-center"
          >
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.6rem, 5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              <span ref={line1Ref} style={{
                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}>
                IA não é mais tendência.
              </span>
              <span ref={line2Ref} style={{
                background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}>
                É vantagem competitiva.
              </span>
            </h1>

            <div style={{ height: '2rem', position: 'relative', overflow: 'visible', width: '100%' }}>
              <GooeyText
                texts={gooeyTexts}
                morphTime={1.2}
                cooldownTime={2.2}
                textStyle={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>

            <a
              href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!"
              target="_blank" rel="noopener noreferrer"
              className="pill-btn-lg"
            >
              Quero implementar IA na minha empresa <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* ── Robô — direita (desktop) */}
          <div
            className="hidden md:block absolute right-0 top-0 h-full pointer-events-none"
            style={{ width: '62%' }}
            aria-hidden="true"
          >
            <div className="relative w-full h-full">
              <img
                src="/robot.png"
                alt=""
                loading="eager"
                className="w-full h-full object-contain object-center select-none"
                style={{
                  mixBlendMode: 'screen',
                  maskImage: 'radial-gradient(ellipse 78% 88% at 50% 52%, black 25%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 78% 88% at 50% 52%, black 25%, transparent 100%)',
                  maxHeight: '100vh',
                }}
              />
              {/* Glow do coração — pulsa e intensifica no scroll */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: glowOpacity, scale: glowScale, transformOrigin: '50% 44%' }}
                className="absolute inset-0 heart-glow"
              />
            </div>
          </div>

          {/* ── Robô — mobile (background fantasma) */}
          <div
            className="md:hidden absolute right-[-20%] top-0 h-full w-[80%] pointer-events-none"
            style={{ opacity: 0.18 }}
            aria-hidden="true"
          >
            <img
              src="/robot.png" alt="" loading="eager"
              className="w-full h-full object-contain object-right"
              style={{
                mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to left, black 10%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to left, black 10%, transparent 80%)',
              }}
            />
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="relative z-10 mt-auto">
          <div className="px-6 md:px-10 pt-4 pb-3 flex items-center justify-between">
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

      </motion.div>
    </div>
  );
}
