import { useCallback, useEffect, useRef } from 'react';

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  borderWidth?: number;
  disabled?: boolean;
}

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  glow = false,
  borderWidth = 1,
  disabled = false,
}: GlowingEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const update = useCallback(
    (e?: { x: number; y: number }) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;

        const { left, top, width, height } = el.getBoundingClientRect();
        const mx = e?.x ?? lastPos.current.x;
        const my = e?.y ?? lastPos.current.y;
        if (e) lastPos.current = { x: mx, y: my };

        const cx = left + width / 2;
        const cy = top + height / 2;

        if (Math.hypot(mx - cx, my - cy) < 0.5 * Math.min(width, height) * inactiveZone) {
          el.style.setProperty('--active', '0');
          return;
        }

        const active =
          mx > left - proximity && mx < left + width + proximity &&
          my > top - proximity && my < top + height + proximity;

        el.style.setProperty('--active', active ? '1' : '0');
        if (!active) return;

        const prev = parseFloat(el.style.getPropertyValue('--start') || '0');
        const target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
        el.style.setProperty('--start', String(prev + ((target - prev + 180) % 360) - 180));
      });
    },
    [inactiveZone, proximity]
  );

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => update(e);
    const onScroll = () => update();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [disabled, update]);

  const gradient = `conic-gradient(from calc((var(--start) - ${spread}) * 1deg) at 50% 50%, transparent 0deg, #dd7bbb, #d79f1e, #57b9f8, #5df2d6, transparent ${spread * 2}deg)`;

  const maskStyle = {
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      style={{ '--start': '0', '--active': '0' } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
    >
      <div
        style={{
          position: 'absolute',
          inset: `-${borderWidth}px`,
          borderRadius: 'inherit',
          background: gradient,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          ...maskStyle,
          padding: `${borderWidth}px`,
          opacity: 'var(--active)' as unknown as number,
          transition: 'opacity 300ms ease',
        }}
      />
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: `-${borderWidth}px`,
            borderRadius: 'inherit',
            background: gradient,
            filter: 'blur(14px)',
            opacity: 'calc(var(--active) * 0.4)' as unknown as number,
            transition: 'opacity 300ms ease',
          }}
        />
      )}
    </div>
  );
}
