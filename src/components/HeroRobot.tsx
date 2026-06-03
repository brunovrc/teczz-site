import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GooeyText } from './GooeyText';

const gooeyTexts = ['Sites personalizados', 'Chatbots', 'Automações', 'Agentes de IA'];

interface HeroRobotProps {
  line1Ref: RefObject<HTMLSpanElement>;
  line2Ref: RefObject<HTMLSpanElement>;
}

export function HeroRobot({ line1Ref, line2Ref }: HeroRobotProps) {
  const zoneRef    = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ['start start', 'end start'],
  });

  // ── Controla o vídeo via scroll (scroll-scrubbing)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pausa imediatamente — não queremos autoplay
    video.pause();

    const onReady = () => {
      setReady(true);
      video.currentTime = 0;
    };

    video.addEventListener('canplay', onReady);

    // rAF-batched: atualiza currentTime a cada mudança de scroll
    const unsub = scrollYProgress.on('change', (v) => {
      if (!video.duration) return;
      // Mapeia 0→1 do scroll para 0→duration do vídeo
      video.currentTime = Math.min(v * video.duration, video.duration - 0.05);
    });

    return () => {
      video.removeEventListener('canplay', onReady);
      unsub();
    };
  }, [scrollYProgress]);

  // ── Texto: visível no início, some ao rolar (~8-30%)
  const textOpacity = useTransform(scrollYProgress, [0.06, 0.28], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0.06, 0.28], [0, 24]);

  // ── Overlay escuro atrás do texto (segue o texto)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.06, 0.28], [0.7, 0.7, 0]);

  // ── Scroll indicator
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.05, 0.18], [0, 1, 0]);

  // ── Hero inteiro faz fade final
  const heroOpacity = useTransform(scrollYProgress, [0.87, 1.0], [1, 0]);

  return (
    // Zona de scroll: 250vh cria ~150vh de scroll room pra percorrer os 10s de vídeo
    <div ref={zoneRef} style={{ height: '250vh' }}>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen overflow-hidden bg-black"
      >

        {/* ── Vídeo full-screen scroll-scrubbed ── */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
        />

        {/* Fallback enquanto carrega */}
        {!ready && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* ── Overlay gradiente para legibilidade do texto ── */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-10 pointer-events-none"
          // Gradiente escurece mais à esquerda onde fica o texto
          css-note="gradient-only-left"
        >
          <div className="w-full h-full" style={{
            background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, transparent 100%)',
          }} />
        </motion.div>

        {/* ── Texto overlay — canto inferior esquerdo ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute z-20 bottom-[12%] left-[5%] md:left-[6%] lg:left-[8%]
                     flex flex-col items-start gap-5 max-w-[90%] md:max-w-[520px]"
        >
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 5.4rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <span ref={line1Ref} style={{
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.65) 100%)',
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

          <div style={{ height: '1.8rem', position: 'relative', overflow: 'visible', width: '100%' }}>
            <GooeyText
              texts={gooeyTexts}
              morphTime={1.2}
              cooldownTime={2.2}
              textStyle={{
                fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,255,255,0.65)',
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

        {/* ── Scroll indicator ── */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          aria-label="Role para continuar"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-medium">scroll</span>
          <ChevronDown size={16} className="text-white/40 animate-bounce" />
        </motion.div>

      </motion.div>
    </div>
  );
}
