import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface TracingBeamProps {
  children: ReactNode;
}

export function TracingBeam({ children }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const measure = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight * 0.9]),
    { stiffness: 500, damping: 90 }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <div ref={ref} className="relative w-full">

      {/* Beam SVG — desktop only, fixed to left edge */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 hidden md:block pointer-events-none" style={{ width: '20px' }}>
        {svgHeight > 0 && (
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            aria-hidden="true"
            className="block"
          >
            {/* Background track */}
            <path
              d={`M 10 0 V ${svgHeight}`}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.5"
            />
            {/* Animated beam */}
            <motion.path
              d={`M 10 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#tracing-gradient)"
              strokeWidth="1.5"
            />
            <defs>
              <motion.linearGradient
                id="tracing-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0" x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="0.15" stopColor="#3b82f6" />
                <stop offset="0.5" stopColor="#60a5fa" />
                <stop offset="0.85" stopColor="#93c5fd" />
                <stop offset="1" stopColor="#93c5fd" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>

      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
