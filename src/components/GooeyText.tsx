import { useRef, useEffect, type CSSProperties } from 'react';

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textStyle?: CSSProperties;
}

export function GooeyText({
  texts,
  morphTime = 1.2,
  cooldownTime = 2.2,
  className = '',
  textStyle = {},
}: GooeyTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!texts.length) return;

    let textIndex = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let lastTime = performance.now();
    let raf: number;

    // Show first two texts from the start — no blank state
    if (text1Ref.current) {
      text1Ref.current.textContent = texts[0];
      text1Ref.current.style.opacity = '1';
      text1Ref.current.style.filter = '';
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = texts[1 % texts.length];
      text2Ref.current.style.opacity = '0';
      text2Ref.current.style.filter = 'blur(8px)';
    }

    const applyMorph = (fraction: number) => {
      const t1 = text1Ref.current;
      const t2 = text2Ref.current;
      if (!t1 || !t2) return;

      // text1 fades out: full → invisible
      const opacity1 = Math.pow(Math.max(0, 1 - fraction), 0.5);
      const blur1 = fraction * 8;

      // text2 fades in: invisible → full
      const opacity2 = Math.pow(Math.max(0, fraction), 0.5);
      const blur2 = (1 - fraction) * 8;

      t1.style.opacity = opacity1.toFixed(3);
      t1.style.filter = blur1 > 0.05 ? `blur(${blur1.toFixed(2)}px)` : '';

      t2.style.opacity = opacity2.toFixed(3);
      t2.style.filter = blur2 > 0.05 ? `blur(${blur2.toFixed(2)}px)` : '';
    };

    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);

      // Clamp dt to 50ms — prevents jumps when tab regains focus
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      cooldown -= dt;

      if (cooldown <= 0) {
        morph += dt;
        const fraction = Math.min(morph / morphTime, 1);
        applyMorph(fraction);

        if (fraction >= 1) {
          // Advance to next text
          textIndex = (textIndex + 1) % texts.length;

          if (text1Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text1Ref.current.style.opacity = '1';
            text1Ref.current.style.filter = '';
          }
          if (text2Ref.current) {
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
            text2Ref.current.style.opacity = '0';
            text2Ref.current.style.filter = 'blur(8px)';
          }

          morph = 0;
          cooldown = cooldownTime;
        }
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center w-full">
        <span
          ref={text1Ref}
          className="absolute inline-block select-none"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            willChange: 'filter, opacity',
            ...textStyle,
          }}
        />
        <span
          ref={text2Ref}
          className="absolute inline-block select-none"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            willChange: 'filter, opacity',
            ...textStyle,
          }}
        />
      </div>
    </div>
  );
}
