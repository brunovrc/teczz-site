import { useRef, type ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  tagline: string;
  body: string;
  background: ReactNode;
  accent: string;
  icon: ReactNode;
}

export default function ServiceCard({ title, tagline, body, background, accent, icon }: ServiceCardProps) {
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
      const rotX = (((clientY - top) - height / 2) / (height / 2)) * -6;
      const rotY = (((clientX - left) - width / 2) / (width / 2)) * 6;
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      el.style.transition = 'transform 0.1s ease-out';
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = 'transform 0.5s ease-in-out';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative w-full rounded-xl overflow-hidden cursor-default"
    >
      <div style={{ height: '240px', position: 'relative' }}>

        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(-10px) scale(1.06)' }}>
          {background}
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.82) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          transform: 'translateZ(20px)',
        }}>

          {/* Glass header */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '10px',
            padding: '10px 13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}>
            <div style={{ color: accent, flexShrink: 0, opacity: 0.9 }}>{icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontSize: '1rem', fontWeight: 700,
                color: '#fff', letterSpacing: '-0.02em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{title}</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginTop: '3px' }}>{tagline}</p>
            </div>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: accent, boxShadow: `0 0 8px ${accent}`,
            }} />
          </div>

          {/* Body text */}
          <p style={{
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.72,
            fontWeight: 300,
            flex: 1,
          }}>
            {body}
          </p>

          {/* Bottom accent line */}
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, ${accent}40, transparent)`,
            flexShrink: 0,
          }} />
        </div>
      </div>
    </div>
  );
}
