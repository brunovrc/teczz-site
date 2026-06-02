import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LampHeadingProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function LampHeading({ label, children, className = '' }: LampHeadingProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center w-full ${className}`}>

      {/* Lamp beams */}
      <div className="relative flex w-full items-start justify-center h-28 pointer-events-none">

        {/* Left beam — conic gradient */}
        <motion.div
          initial={{ opacity: 0, width: '4rem' }}
          whileInView={{ opacity: 1, width: '18rem' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
          className="absolute right-1/2 top-0 h-40 overflow-visible"
          style={{
            backgroundImage:
              'conic-gradient(from 70deg at center top, transparent 0deg, rgba(59,130,246,0.08) 10deg, rgba(59,130,246,0.22) 35deg, transparent 50deg)',
          }}
        >
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent to-transparent" />
          <div className="absolute bottom-0 w-full h-16"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, transparent 100%)' }} />
        </motion.div>

        {/* Right beam — conic gradient */}
        <motion.div
          initial={{ opacity: 0, width: '4rem' }}
          whileInView={{ opacity: 1, width: '18rem' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.9, ease: 'easeInOut' }}
          className="absolute left-1/2 top-0 h-40 overflow-visible"
          style={{
            backgroundImage:
              'conic-gradient(from 290deg at center top, transparent 0deg, rgba(59,130,246,0.22) 15deg, rgba(59,130,246,0.08) 40deg, transparent 50deg)',
          }}
        >
          <div className="absolute bottom-0 w-full h-16"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0) 0%, transparent 100%)' }} />
        </motion.div>

        {/* Horizontal bright line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '20rem', opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.8), rgba(255,255,255,0.9), rgba(96,165,250,0.8), transparent)',
            boxShadow: '0 0 12px rgba(96,165,250,0.6), 0 0 30px rgba(59,130,246,0.3)',
          }}
        />

        {/* Glow orb below line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.25, duration: 1, ease: 'easeOut' }}
          className="absolute top-0 h-20 w-72 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Label + Title */}
      <div className="relative z-10 text-center -mt-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[13px] tracking-[0.2em] text-blue-500 uppercase font-semibold mb-3 block"
        >
          {label}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
