import { type RefObject } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DataGridHero from './DataGridHero';
import { GooeyText } from './GooeyText';

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

      {/* Scrim — escurece mais à esquerda onde fica o texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 35% 50%, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 55%, transparent 100%)',
        }}
      />

      {/* Robô — direita, mix-blend-mode:screen remove o fundo escuro */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full pointer-events-none z-[6]
                   hidden md:block"
        style={{ width: '58%' }}
      >
        {/* Imagem com blend mode pra sumir fundo escuro */}
        <img
          src="/robot.png"
          alt=""
          loading="eager"
          draggable={false}
          className="w-full h-full object-contain object-center select-none"
          style={{
            mixBlendMode: 'screen',
            maskImage:
              'radial-gradient(ellipse 80% 92% at 50% 52%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 92% at 50% 52%, black 30%, transparent 100%)',
          }}
        />

        {/* Glow pulsante no coração */}
        <div
          aria-hidden="true"
          className="absolute inset-0 heart-glow pointer-events-none"
        />
      </div>

      {/* Robô mobile — fantasma atrás do texto */}
      <div
        aria-hidden="true"
        className="md:hidden absolute right-[-10%] top-0 h-full w-[70%] pointer-events-none z-[6]"
        style={{ opacity: 0.15 }}
      >
        <img
          src="/robot.png"
          alt=""
          loading="eager"
          draggable={false}
          className="w-full h-full object-contain object-right select-none"
          style={{
            mixBlendMode: 'screen',
            maskImage: 'linear-gradient(to left, black 5%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to left, black 5%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Conteúdo principal ── */}
      <div
        className="relative z-20 flex-1 flex items-center"
        style={{ padding: 'calc(72px + 1.5rem) clamp(1.5rem, 6vw, 5rem) 2rem' }}
      >
        <div className="flex flex-col items-start gap-7 max-w-[520px]">

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2rem, 6vw, 5.4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span
              ref={line1Ref}
              style={{
                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
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
                fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)',
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
            transition={{ delay: 0.65, duration: 0.7, ease }}
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
              <span
                key={i}
                className={`text-[13px] tracking-[0.12em] uppercase font-semibold ${
                  word === '·' ? 'text-blue-500' : 'marquee-word'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
