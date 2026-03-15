'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StickerBadgeProps = {
  text: string;
  rotation?: number;
  variant?: 'olive' | 'off-white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-[0.6875rem]',
  md: 'px-4 py-2.5 text-[0.8125rem]',
  lg: 'px-5 py-3 text-sm',
};

const variantMap = {
  dark: 'bg-alb-warm-dark text-alb-off-white border-white/[0.12]',
  olive: 'bg-alb-olive/20 text-alb-olive border-alb-olive/30',
  'off-white': 'bg-alb-off-white text-alb-charcoal border-alb-muted/20',
};

export default function StickerBadge({
  text,
  rotation = 0,
  variant = 'dark',
  size = 'md',
  animate = true,
  className,
}: StickerBadgeProps) {
  const Comp = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        whileHover: { y: -3, rotate: 0, boxShadow: '4px 6px 0 rgba(0,0,0,0.4)' },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Comp
      className={cn(
        'inline-flex items-center gap-2 font-heading font-semibold uppercase tracking-[0.06em] border rounded-alb shadow-sticker select-none cursor-default',
        sizeMap[size],
        variantMap[variant],
        className
      )}
      style={{ rotate: `${rotation}deg` }}
      {...animationProps}
    >
      <span className="alb-dot" />
      {text}
    </Comp>
  );
}
