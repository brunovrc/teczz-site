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
  gradientFrom?: string;
  gradientTo?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

export default function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => {
        const accent = item.accent ?? '#3b82f6';
        const from = item.gradientFrom ?? '#0f172a';
        const to = item.gradientTo ?? accent;
        const gradient = `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;

        const accentAlpha = (a: number) => {
          const hex = accent.replace('#', '');
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `rgba(${r},${g},${b},${a})`;
        };

        return (
          <div
            key={index}
            className={`process-card ${item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}`}
            style={{ '--card-gradient': gradient } as React.CSSProperties}
          >
            <div className="process-card-inner group">

              {/* Dot pattern on hover */}
              <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `radial-gradient(circle at center, ${accentAlpha(0.07)} 1px, transparent 1px)`,
                  backgroundSize: '22px 22px',
                }} />
              </div>

              {/* Corner glow */}
              {item.hasPersistentHover && (
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 220, height: 220,
                  background: `radial-gradient(circle at bottom right, ${accentAlpha(0.12)} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Content */}
              <div className="relative flex flex-col h-full gap-6 p-8 md:p-10">

                {item.num && (
                  <span className="font-black leading-none tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: accentAlpha(0.9) }}>
                    {item.num}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: accentAlpha(0.1),
                      border: `1px solid ${accentAlpha(0.25)}`,
                      boxShadow: `0 0 16px ${accentAlpha(0.12)}`,
                    }}>
                    {item.icon}
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-white/85 group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', lineHeight: 1.15 }}>
                    {item.title}
                  </h3>
                </div>

                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-1">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] px-3 py-1 rounded-lg tracking-wide"
                        style={{
                          background: accentAlpha(0.08),
                          border: `1px solid ${accentAlpha(0.2)}`,
                          color: accentAlpha(0.9),
                        }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
