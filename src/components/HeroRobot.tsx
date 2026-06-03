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

  // Texto: some entre 25% e 55%
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const textX      = useTransform(scrollYProgress, [0.2, 0.55], ['0%', '-6%']);

  // Robô: escala a partir do coração (transform-origin: 50% 44%)
  const robotScale = useTransform(scrollYProgress, [0.3, 1], [1, 9]);

  // Glow do coração: intensifica com o scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [0.45, 0.9, 1]);
  const glowScale   = useTransform(scrollYProgress, [0, 0.75], [1, 2.5]);

  // Hero inteiro: faz fade final
  const heroOpacity = useTransform(scrollYProgress, [0.78, 0.97], [1, 0]);

  return (
    // Zona de scroll — 200vh cria 100vh de room pra animação
    <div ref={zoneRef} style={{ height: '200vh' }}>

      {/* Container sticky — fica fixo durante a zona de scroll */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen flex flex-col overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background grid */}
        <DataGridHero
          rows={28} cols={50} spacing={3} duration={5}
          color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
          opacityMin={0.03} opacityMax={0.28}
        />

        {/* Scrim central */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)',
          }}
        />

        {/* ── Conteúdo principal ── */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-10 lg:px-16">

          {/* Texto — esquerda */}
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="w-full md:w-[45%] lg:w-[42%] flex flex-col items-start gap-6 z-20
                       max-md:items-center max-md:text-center"
          >
            <h1
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(1.6rem, 5.5vw, 5.2rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span
                ref={line1Ref}
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                IA não é mais tendência.
              </span>
              <span
                ref={line2Ref}
                style={{
                  background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                É vantagem competitiva.
              </span>
            </h1>

            <div style={{ height: '2rem', position: 'relative', overflow: 'visible', width: '100%' }}>
              <GooeyText
                texts={gooeyTexts}
                morphTime={1.2}
                cooldownTime={2.2}
                textStyle={{
                  fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)',
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
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn-lg"
            >
              Quero implementar IA na minha empresa <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Robô — direita */}
          <div
            className="hidden md:flex absolute right-0 top-0 h-full items-center justify-center
                       w-[58%] lg:w-[55%] pointer-events-none"
            aria-hidden="true"
          >
            {/* Wrapper de escala — transform-origin no coração */}
            <motion.div
              style={{
                scale: robotScale,
                transformOrigin: '50% 44%',
                willChange: 'transform',
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Imagem do robô com máscara de fade nas bordas */}
              <img
                src="/robot.png"
                alt="Robô IA com coração"
                loading="eager"
                className="w-full h-full object-contain object-center select-none"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 82% 90% at 50% 50%, black 35%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 82% 90% at 50% 50%, black 35%, transparent 100%)',
                  maxHeight: '95vh',
                }}
              />

              {/* Glow pulsante no coração */}
              <motion.div
                style={{
                  opacity: glowOpacity,
                  scale: glowScale,
                  transformOrigin: '50% 44%',
                }}
                className="absolute inset-0 pointer-events-none heart-glow"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* Mobile: robô como background recortado */}
          <div
            className="md:hidden absolute right-[-15%] top-0 h-full w-[75%] pointer-events-none opacity-25"
            aria-hidden="true"
          >
            <img
              src="/robot.png"
              alt=""
              loading="eager"
              className="w-full h-full object-contain object-center"
              style={{
                maskImage: 'linear-gradient(to left, black 20%, transparent 85%)',
                WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 85%)',
              }}
            />
          </div>
        </div>

        {/* ── Bottom strip + marquee ── */}
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
                <span
                  key={i}
                  className={`text-[13px] tracking-[0.12em] uppercase font-semibold ${word === '·' ? 'text-blue-500' : 'marquee-word'}`}
                >
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
