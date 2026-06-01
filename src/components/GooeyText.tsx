import { useRef, useEffect, type CSSProperties } from 'react';

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textStyle?: CSSProperties;
}

export function GooeyText({ texts, morphTime = 1.2, cooldownTime = 2, className = '', textStyle = {} }: GooeyTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let raf: number;

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = '';
      text2Ref.current.style.opacity = '100%';
      text1Ref.current.style.filter = '';
      text1Ref.current.style.opacity = '0%';
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = new Date();
      const dt = (now.getTime() - time.getTime()) / 1000;
      time = now;
      const wasCooling = cooldown > 0;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (wasCooling) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current) text1Ref.current.textContent = texts[textIndex % texts.length];
          if (text2Ref.current) text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
        }
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / morphTime;
        if (fraction > 1) { cooldown = cooldownTime; fraction = 1; }
        setMorph(fraction);
      } else {
        doCooldown();
      }
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center w-full">
        <span ref={text1Ref} className="absolute inline-block select-none" style={{ opacity: 0, left: '50%', transform: 'translateX(-50%)', ...textStyle }} />
        <span ref={text2Ref} className="absolute inline-block select-none" style={{ left: '50%', transform: 'translateX(-50%)', ...textStyle }} />
      </div>
    </div>
  );
}
