import { type ReactNode } from 'react';

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  tags?: string[];
  num?: string;
  colSpan?: 1 | 2;
  hasPersistentHover?: boolean;
  accent?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

export default function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((item, index) => {
        const color = item.accent ?? '#3b82f6';
        const colorAlpha = (a: number) => {
          const hex = color.replace('#', '');
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `rgba(${r},${g},${b},${a})`;
        };

        return (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 will-change-transform ${
              item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'
            }`}
            style={{
              background: 'rgba(4, 9, 24, 0.92)',
              border: `1px solid ${item.hasPersistentHover ? colorAlpha(0.22) : 'rgba(255,255,255,0.06)'}`,
              boxShadow: item.hasPersistentHover
                ? `0 0 30px ${colorAlpha(0.1)}, inset 0 1px 0 rgba(255,255,255,0.06)`
                : 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.border = `1px solid ${colorAlpha(0.35)}`;
              el.style.boxShadow = `0 0 40px ${colorAlpha(0.14)}, inset 0 1px 0 rgba(255,255,255,0.08)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.border = `1px solid ${item.hasPersistentHover ? colorAlpha(0.22) : 'rgba(255,255,255,0.06)'}`;
              el.style.boxShadow = item.hasPersistentHover
                ? `0 0 30px ${colorAlpha(0.1)}, inset 0 1px 0 rgba(255,255,255,0.06)`
                : 'inset 0 1px 0 rgba(255,255,255,0.04)';
            }}
          >
            {/* Top metallic sheen — accent color */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${colorAlpha(0.5)}, transparent)`,
            }} />


            {/* Dot pattern */}
            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
              item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at center, ${colorAlpha(0.08)} 1px, transparent 1px)`,
                backgroundSize: '22px 22px',
              }} />
            </div>

            {/* Corner glow on persistent hover */}
            {item.hasPersistentHover && (
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 220, height: 220,
                background: `radial-gradient(circle at bottom right, ${colorAlpha(0.14)} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
            )}

            {/* Content */}
            <div className="relative flex flex-col h-full gap-6 p-8 md:p-10">

              {/* Step number */}
              {item.num && (
                <span className="font-black leading-none tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: colorAlpha(0.9) }}>
                  {item.num}
                </span>
              )}

              {/* Icon + Title inline */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: colorAlpha(0.1),
                    border: `1px solid ${colorAlpha(0.25)}`,
                    boxShadow: `0 0 16px ${colorAlpha(0.12)}`,
                  }}>
                  {item.icon}
                </div>
                <h3 className="font-black uppercase tracking-tight text-white/85 group-hover:text-white transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', lineHeight: 1.15 }}>
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/75 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-1">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-3 py-1 rounded-lg tracking-wide"
                      style={{
                        background: colorAlpha(0.08),
                        border: `1px solid ${colorAlpha(0.18)}`,
                        color: colorAlpha(0.9),
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
