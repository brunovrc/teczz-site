import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from './ui/GlowingEffect';

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface BentoCardProps {
  area: string;
  icon: ReactNode;
  title: string;
  description: string;
  titleSize?: 'text-xl' | 'text-2xl';
}

export function BentoCard({ area, icon, title, description, titleSize = 'text-xl' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const rx = ((clientY - top - height / 2) / (height / 2)) * -5;
      const ry = ((clientX - left - width / 2) / (width / 2)) * 5;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
      el.style.transition = 'transform 0.1s ease-out';
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = 'transform 0.5s ease-in-out';
  };

  return (
    <motion.li variants={itemVariants} className={`min-h-[14rem] list-none ${area}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d', height: '100%' }}
        className="relative rounded-2xl border border-white/[0.08] p-2 cursor-default"
      >
        <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-[#0a0a0f] p-6 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="w-fit rounded-lg border border-white/10 bg-white/5 p-2">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className={`${titleSize} font-semibold text-white tracking-tight`}>{title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
