import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Benefit = ({ text, checked }: { text: string; checked: boolean }) => (
  <div className="flex items-center gap-3">
    <span className={`grid size-4 place-content-center rounded-full shrink-0 ${
      checked ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/40'
    }`}>
      {checked ? <Check className="size-3" /> : <X className="size-3" />}
    </span>
    <span className="text-sm text-white/60 leading-snug">{text}</span>
  </div>
);

export interface PricingCardProps {
  tier: string;
  price: string;
  originalPrice?: string;
  bestFor: string;
  CTA: string;
  ctaHref: string;
  benefits: Array<{ text: string; checked: boolean }>;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  tier, price, originalPrice, bestFor, CTA, ctaHref,
  benefits, highlighted = false, badge, className = '',
}: PricingCardProps) {
  return (
    <motion.li variants={itemVariants} className={`list-none min-h-[20rem] ${className}`}>
      <div className={`relative h-full rounded-2xl border p-6 flex flex-col shadow-[0px_0px_27px_0px_#2D2D2D] ${
        highlighted
          ? 'border-blue-500/40 bg-gradient-to-b from-blue-950/30 to-[#0a0a0f]'
          : 'border-white/[0.08] bg-[#0a0a0f]'
      }`}>
        {badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
            <span className="bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              {badge}
            </span>
          </div>
        )}

        <div className="border-b border-white/[0.08] pb-5 mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/35 mb-3">{tier}</p>
          {originalPrice && (
            <p className="text-sm text-white/25 line-through mb-0.5">{originalPrice}</p>
          )}
          <p className={`text-3xl font-semibold tracking-tight mb-2 ${highlighted ? 'text-blue-400' : 'text-white'}`}>
            {price}
          </p>
          <p className="text-xs text-white/40 leading-relaxed">{bestFor}</p>
        </div>

        <div className="space-y-3 flex-1 mb-7">
          {benefits.map((b, i) => <Benefit key={i} {...b} />)}
        </div>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-3 rounded-xl text-sm font-medium text-center transition-all duration-200 ${
            highlighted
              ? 'bg-blue-500 hover:bg-blue-400 text-white'
              : 'border border-white/10 hover:border-white/20 text-white/70 hover:text-white'
          }`}
        >
          {CTA}
        </a>
      </div>
    </motion.li>
  );
}
