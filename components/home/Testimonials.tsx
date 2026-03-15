'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Best coffee I've had delivered to my door. The Mezzanotte is insane — deep, rich, no bitterness. I'm hooked.",
    name: 'Marco R.',
    location: 'Bergen County, NJ',
    blend: 'Mezzanotte',
  },
  {
    quote: "I bought Ciao a Tutti for my office and now everyone asks where I got it. The quality is on another level.",
    name: 'Sarah K.',
    location: 'Hoboken, NJ',
    blend: 'Ciao a Tutti',
  },
  {
    quote: "Finally a decaf that doesn't taste like compromise. Senza Fretta is smooth, chocolatey, and perfect for evenings.",
    name: 'James D.',
    location: 'Ridgewood, NJ',
    blend: 'Senza Fretta',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-section bg-alb-charcoal noise-texture">
      <div className="alb-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
            What People Are Saying
          </p>
          <h2 className="font-heading text-section-lg font-bold text-alb-off-white">
            BREWED WITH TRUST
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-alb-surface border border-white/[0.06] rounded-alb p-6 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4 text-alb-olive text-sm">
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-body-md text-alb-off-white/80 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="border-t border-white/[0.06] pt-4">
                <p className="font-heading text-body-sm font-semibold text-alb-off-white uppercase tracking-wide">
                  {t.name}
                </p>
                <p className="text-body-xs text-alb-muted">
                  {t.location} · {t.blend}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
