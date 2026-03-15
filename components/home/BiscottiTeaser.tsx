'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const FLAVORS = [
  { name: 'Originale', description: 'Classic almond. The foundation.', color: '#C4956A' },
  { name: 'Espresso Chocolate Chip', description: 'Coffee meets chocolate. The obvious pairing.', color: '#6B4226' },
  { name: 'Bourbon Hazelnut', description: 'Rich, warm, a little dangerous.', color: '#8B6914' },
];

export default function BiscottiTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-section bg-alb-warm-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at 30% 50%, #C4956A, transparent 60%)' }} />

      <div className="alb-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-[#C4956A] mb-3">
              Baked Fresh in Small Batches
            </p>
            <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
              ITALIAN-STYLE
              <br />BISCOTTI
            </h2>
            <p className="font-body text-body-md text-alb-muted leading-relaxed mb-3">
              Twice-baked mini biscotti designed to pair with every blend in the collection. Three core flavors plus a quarterly members-only release.
            </p>
            <p className="text-body-sm text-alb-muted/50 mb-8">
              6oz bags — Flour-based minis — Handmade
            </p>
            <Link href="/collections/biscotti" className="inline-flex items-center gap-2 font-heading text-body-sm font-semibold uppercase tracking-[0.1em] text-[#C4956A] hover:gap-3 transition-all duration-300">
              Shop Biscotti <span>→</span>
            </Link>
          </motion.div>

          <div className="space-y-3">
            {FLAVORS.map((flavor, i) => (
              <motion.div key={flavor.name}
                className="flex items-center gap-5 p-5 bg-alb-surface/40 border border-white/[0.05] rounded-alb"
                initial={{ opacity: 0, x: 25 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${flavor.color}20` }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: flavor.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-alb-off-white mb-0.5">{flavor.name}</h3>
                  <p className="text-body-xs text-alb-muted/70">{flavor.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex items-center gap-5 p-5 border border-dashed border-white/[0.08] rounded-alb"
              initial={{ opacity: 0, x: 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/[0.03]">
                <div className="w-4 h-4 rounded-full bg-alb-muted/20" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-alb-off-white/50 mb-0.5">Quarterly Exclusive</h3>
                <p className="text-body-xs text-alb-muted/40">Rotating flavor. Members first.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
