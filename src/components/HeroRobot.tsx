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
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Grid animado de fundo */}
      <DataGridHero
        rows={28} cols={50} spacing={3} duration={5}
        color="#3b82f6" animationType="pulse" pulseEffect mouseGlow
        opacityMin={0.03} opacityMax={0.28}
      />

      {/* Scrim — concentra escuridão no lado do texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 55% 80% at 28% 50%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)',
        }}
      />

      {/* ── Spline — lado direito ── */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full pointer-events-none z-[7]
                   hidden md:block"
        style={{ width: '62%' }}
      >
        {/* Container com customizações visuais */}
        <div
          className="relative w-full h-full"
          style={{
            // Ajusta a cor para a paleta azul do site
            filter: 'hue-rotate(10deg) saturate(1.25) brightness(0.92)',
          }}
        >
          <SplineScene
            scene={SPLINE_SCENE}
            className="w-full h-full"
          />

          {/* Overlay azul sutil pra fundir na identidade do site */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 45%, rgba(37,99,235,0.08) 0%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Vignette nas bordas pra fundir com o fundo preto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 85% 90% at 52% 48%, transparent 45%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.95) 100%)',
            }}
          />

          {/* Esconde watermark do Spline */}
          <style>{`
            #spline-watermark,
            [class*="spline-watermark"],
            canvas + div { display: none !important; }
          `}</style>
        </div>
      </div>

      {/* Spline mobile — menor, atrás do texto */}
      <div
        aria-hidden="true"
        className="md:hidden absolute right-[-15%] top-0 h-full w-[75%]
                   pointer-events-none z-[6]"
        style={{ opacity: 0.22 }}
      >
        <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
      </div>

      {/* ── Conteúdo ── */}
      <div
        className="relative z-20 flex-1 flex items-center"
        style={{ padding: 'calc(72px + 1rem) clamp(1.5rem, 5vw, 5rem) 2rem' }}
      >
        <div className="flex flex-col items-start gap-7 max-w-[500px]">

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 5.8vw, 5.4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span
              ref={line1Ref}
              style={{
                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.62) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}
            >
              IA não é mais tendência.
            </span>
            <span
              ref={line2Ref}
              style={{
                background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 60%, #2563eb 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                display: 'block',
              }}
            >
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
                fontSize: 'clamp(0.85rem, 1.7vw, 1.2rem)',
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
