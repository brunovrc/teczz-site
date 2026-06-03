import { type RefObject } from 'react';
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
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      {/* Grid animado de fundo */}
      <DataGridHero
        rows={28} cols={50} spacing={3} duration={5}
        color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
        opacityMin={0.03} opacityMax={0.28}
      />

      {/* Scrim — escurece o lado do texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.2) 58%, transparent 75%)',
        }}
      />

      {/* ── Layout principal: texto + robô ── */}
      <div className="relative z-10 flex-1 flex items-center">

        {/* Texto — esquerda */}
        <div
          className="w-full md:w-[50%] lg:w-[44%] flex flex-col items-start gap-6 px-6 md:px-10 lg:px-16"
          style={{ paddingTop: 'calc(72px + 1rem)', paddingBottom: '2rem' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 5.4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span ref={line1Ref} style={{
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.62) 100%)',
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
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            style={{ height: '2rem', position: 'relative', overflow: 'visible', width: '100%' }}
          >
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
          </motion.div>

          <motion.a
            href="https://wa.me/5511940411688?text=Ol%C3%A1%2C%20quero%20implementar%20IA%20na%20minha%20empresa!"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7, ease }}
          >
            Quero implementar IA na minha empresa <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* Robô Spline — direita, responsivo, interativo */}
        <div className="absolute right-0 top-0 w-full md:w-[62%] h-full">
          {/*
            mix-blend-mode: screen aplicado aqui:
            fundo escuro do Spline vira transparente,
            o robô 3D brilhante fica visível sobre o DataGridHero
          */}
          <div className="w-full h-full" style={{ mixBlendMode: 'screen' }}>
            <SplineScene
              scene={SPLINE_SCENE}
              className="w-full h-full"
            />
          </div>

          {/* Vignette lateral esquerda — transição suave pro texto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 18%, transparent 42%)',
            }}
          />

          {/* Vignette topo/base */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, #000 0%, transparent 12%, transparent 82%, #000 100%)',
            }}
          />

          {/* Esconde watermark Spline */}
          <style>{`
            canvas ~ div[style*="position: absolute"],
            #spline-watermark { display: none !important; }
          `}</style>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div className="relative z-[15] mt-auto">
        <div className="px-6 md:px-10 pt-6 pb-3 flex items-center justify-between">
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
