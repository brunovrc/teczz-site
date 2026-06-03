import { useEffect, useRef } from 'react';
import { animate, splitText, stagger } from 'animejs';

interface AnimatedHeadingProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedHeading({ html, className, style }: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const split = (splitText as any)(el, { words: true });

    // Se o h2 tem gradient text, propaga pra cada word span —
    // background-clip: text só funciona no elemento com texto direto
    const hasGradientText =
      el.style.webkitTextFillColor === 'transparent' ||
      el.style.backgroundClip === 'text';

    split.words.forEach((w: HTMLElement) => {
      w.style.opacity = '0';
      w.style.transform = 'translateY(10px)';
      w.style.display = 'inline-block';

      if (hasGradientText) {
        w.style.background = el.style.background;
        w.style.webkitBackgroundClip = 'text';
        w.style.backgroundClip = 'text';
        w.style.webkitTextFillColor = 'transparent';
      }
    });

    // Remove o gradient do h2 pai pra não duplicar
    if (hasGradientText) {
      el.style.background = 'none';
      el.style.webkitTextFillColor = 'inherit';
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      observer.disconnect();

      animate(split.words, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 700,
        ease: 'outExpo',
        delay: stagger(80),
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -30px 0px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
