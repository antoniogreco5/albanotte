'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SITE } from '@/lib/constants';
import Link from 'next/link';

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bleedX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section ref={ref} className="py-section bg-alb-stone text-alb-charcoal relative overflow-hidden">
      {/* Background typography bleed */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 font-heading font-bold uppercase whitespace-nowrap select-none pointer-events-none text-alb-charcoal/[0.03]"
        style={{ fontSize: 'clamp(8rem, 14vw, 18rem)', x: bleedX }}
      >
        dall&apos;alba alla notte
      </motion.div>

      <div className="alb-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
              The Brand
            </p>
            <h2 className="font-heading text-section-xl font-bold text-alb-charcoal mb-6">
              ITALIAN ROOTS.
              <br />
              AMERICAN HUSTLE.
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-body text-body-md text-alb-charcoal/80 leading-relaxed">
                ALBANOTTE was built on a simple belief: great coffee should be
                intentional, never careless. Every blend is sourced from the
                world&apos;s best growing regions and roasted in small batches in
                Bergen County, New Jersey — where Italian-American roots run deep.
              </p>
              <p className="font-body text-body-md text-alb-charcoal/70 leading-relaxed">
                The name means &ldquo;from dawn to night&rdquo; — five moments in
                the day, five single-origin roasts, each crafted for a specific
                mood and time.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-heading text-body-sm font-semibold uppercase tracking-[0.1em] text-alb-olive hover:gap-3 transition-all duration-300"
            >
              Read Our Story
              <span>→</span>
            </Link>
          </motion.div>

          {/* Right: credibility markers */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {[
              { number: '5', label: 'Single-Origin Blends', sub: 'From 5 countries' },
              { number: '48hr', label: 'Roast to Ship', sub: 'Fresh to your door' },
              { number: 'NJ', label: 'Roasted Local', sub: 'Harrington Park' },
              { number: '2026', label: 'Est.', sub: 'Bergen County' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white/50 border border-alb-charcoal/[0.06] rounded-alb p-5 md:p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              >
                <span className="font-heading text-3xl md:text-4xl font-bold text-alb-olive block mb-1">
                  {stat.number}
                </span>
                <span className="font-heading text-body-xs font-semibold uppercase tracking-[0.05em] text-alb-charcoal block">
                  {stat.label}
                </span>
                <span className="text-body-xs text-alb-charcoal/50 block mt-0.5">
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
