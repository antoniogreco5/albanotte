'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function MembershipTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-14 md:py-20 bg-alb-black">
      <div className="alb-container">
        <motion.div
          className="max-w-3xl mx-auto bg-alb-surface border border-white/[0.06] rounded-alb overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#5C6B4F] to-[#BFA343]" />
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[0.625rem] font-body uppercase tracking-[0.15em] text-alb-olive mb-2">
                Membership
              </p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-alb-off-white uppercase mb-2">
                Better Pricing. Insider Access.
              </h3>
              <p className="text-body-sm text-alb-muted leading-relaxed">
                Up to 15% off every bag, free shipping, and first access to limited drops.
                Two tiers starting at $39/year.
              </p>
            </div>
            <Link
              href="/membership"
              className="alb-btn-primary px-6 py-3.5 text-sm shrink-0 w-full md:w-auto text-center"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
