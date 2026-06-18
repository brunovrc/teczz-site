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

  const isGradientText = style?.WebkitTextFillColor === 'transparent';

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const split = (splitText as any)(el, { words: true });

    split.words.forEach((w: HTMLElement) => {
      w.style.opacity = '0';
      w.style.transform = 'translateY(10px)';
      w.style.display = 'inline-block';

      if (isGradientText && style?.background) {
        w.style.background = style.background as string;
        w.style.webkitBackgroundClip = 'text';
        w.style.backgroundClip = 'text';
        w.style.webkitTextFillColor = 'transparent';
      }
    });

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

  // Gradient text: não passa o estilo pro h2 pois background-clip:text
  // só funciona no elemento que tem texto direto — as word spans herdarão via JS
  const h2Style = isGradientText ? {} : style;

  return (
    <h2
      ref={ref}
      className={className}
      style={h2Style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
