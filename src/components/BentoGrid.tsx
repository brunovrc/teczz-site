import { useRef, type ReactNode } from 'react';
import { GlowingEffect } from './ui/GlowingEffect';

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  tags?: string[];
  num?: string;
  colSpan?: 1 | 2;
  accent?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

function ProcessCard({ item }: { item: BentoItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rx = ((e.clientY - top - height / 2) / (height / 2)) * -5;
    const ry = ((e.clientX - left - width / 2) / (width / 2)) * 5;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    el.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = 'transform 0.5s ease-in-out';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', height: '100%' }}
      className="relative rounded-2xl border border-white/[0.08] p-2 cursor-default"
    >
      <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} proximity={64} inactiveZone={0.01} />
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-[#060d1f] p-6 md:p-8 shadow-[0px_0px_27px_0px_#0a1628]">

        <div className="w-fit rounded-lg border border-white/10 bg-white/5 p-2">
          {item.icon}
        </div>

        <div className="space-y-3">
          {item.num && (
            <span className="text-[11px] tracking-[0.2em] text-blue-500/70 uppercase font-semibold block">
              {item.num}
            </span>
          )}
          <h3 className="text-xl font-semibold text-white tracking-tight">{item.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag, i) => (
                <span key={i} className="text-[11px] px-3 py-1 rounded-lg tracking-wide text-blue-400/70 border border-blue-500/15 bg-blue-500/5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`min-h-[16rem] ${item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}`}
        >
          <ProcessCard item={item} />
        </div>
      ))}
    </div>
  );
}
