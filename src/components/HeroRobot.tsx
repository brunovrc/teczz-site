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
    <section className="relative flex flex-col overflow-hidden bg-black" style={{ minHeight: '100svh' }}>

      {/* Grid de fundo */}
      <DataGridHero
        rows={28} cols={50} spacing={3} duration={5}
        color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
        opacityMin={0.03} opacityMax={0.28}
      />

      {/* Scrim esquerda — legibilidade do texto */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.15) 55%, transparent 70%)',
        }}
      />

      {/* ── Layout flex: texto + robô ── */}
      <div className="relative z-10 flex flex-1" style={{ minHeight: 'calc(100svh - 60px)' }}>

        {/* Texto — esquerda */}
        <div className="relative z-20 flex flex-col justify-center gap-7 px-6 md:px-10 lg:px-16
                        w-full md:w-[48%] lg:w-[42%]"
          style={{ paddingTop: 'calc(72px + 1rem)', paddingBottom: '2rem' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 5.2rem)',
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
            target="_blank" rel="noopener noreferrer"
            className="pill-btn-lg w-fit"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7, ease }}
          >
            Quero implementar IA na minha empresa <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* ── Robô 3D Spline — direita ── */}
        <div id="spline-robot" className="hidden md:flex flex-1 relative overflow-hidden" style={{ minHeight: 'calc(100svh - 60px)' }}>

          {/*
            mix-blend-mode: screen FORA do filter → composta contra o fundo real da página
            (fundo escuro do Spline vira transparente; robô fica visível)
            filter DENTRO → apenas tinta a cor, sem afetar o blend
          */}
          <div className="absolute inset-0" style={{ mixBlendMode: 'screen' }}>
            <div className="absolute inset-0" style={{
              filter: 'sepia(0.2) hue-rotate(185deg) saturate(2.4) brightness(1.1)',
              transform: 'scale(1.18) translateY(6%)',
              transformOrigin: 'center top',
            }}>
              <SplineScene scene={SPLINE_SCENE} className="w-full h-full" transparentBackground />
            </div>
          </div>

          {/* Vignette esquerda */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.5) 20%, transparent 45%)' }}
          />
          {/* Vignette topo/base */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 14%, transparent 84%, #000 100%)' }}
          />

          {/* Escopo restrito ao container do Spline — não afeta canvas do DataGridHero */}
          <style>{`#spline-robot canvas ~ div { display: none !important; }`}</style>
        </div>

        {/* Mobile — robô fantasma atrás do texto */}
        <div className="md:hidden absolute inset-0 pointer-events-none opacity-20 z-[4]"
          style={{ filter: 'sepia(0.25) hue-rotate(185deg) saturate(2.6) brightness(1.08)' }}>
          <SplineScene scene={SPLINE_SCENE} className="w-full h-full" transparentBackground />
        </div>

      </div>

      {/* ── Marquee ── */}
      <div className="relative z-[15]">
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
