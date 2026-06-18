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
      <div className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-[13px] tracking-[0.2em] text-blue-500 uppercase font-semibold mb-3 block"
        >
          {label}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
