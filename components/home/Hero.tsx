'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SITE, HERO_VIDEO_URL } from '@/lib/constants';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex flex-col overflow-hidden" aria-label="Hero">
      {/* Video bg */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {HERO_VIDEO_URL ? (
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-alb-black noise-texture" />
        )}
        <div className="absolute inset-0 bg-alb-black/[0.72]" />
        <div className="absolute inset-0 bg-gradient-to-t from-alb-black via-alb-black/20 to-alb-black/50" />
      </motion.div>

      {/* Content — pushed up with flex */}
      <motion.div className="alb-container relative z-10 flex-1 flex items-center pt-24 md:pt-28 pb-28" style={{ opacity: contentOpacity }}>
        <div className="max-w-2xl">
          <motion.p
            className="flex items-center gap-2.5 text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="w-8 h-px bg-alb-olive" />
            Small-Batch Roasted in {SITE.location}
          </motion.p>

          <motion.h1
            className="font-heading text-hero-xl font-bold text-alb-off-white mb-5 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            SPECIALTY COFFEE,
            <br />
            <span className="text-alb-olive">ROASTED FRESH.</span>
          </motion.h1>

          <motion.p
            className="font-body text-body-lg text-alb-off-white/70 max-w-md mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Five Italian-inspired blends. Single-origin, specialty grade, roasted to order in small batches.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a href="/collections/drop001" className="alb-btn-primary text-sm px-8 py-4 w-full sm:w-auto text-center">
              Shop the Collection
            </a>
            <a href="/about" className="font-body text-body-sm text-alb-off-white/50 hover:text-alb-off-white transition-colors underline underline-offset-4 decoration-alb-off-white/20">
              Our Story
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust bar — bigger, bolder, visible above fold */}
      <div className="relative z-10 border-t border-white/[0.08] bg-alb-black/60 backdrop-blur-lg">
        <div className="alb-container py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
          {[
            { value: '5', label: 'Single-Origin Blends' },
            { value: '48hr', label: 'Roast-to-Ship' },
            { value: '$40+', label: 'Free Shipping' },
            { value: 'NJ', label: 'Small-Batch Roasted' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 md:gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
            >
              <span className="font-heading text-lg md:text-2xl font-bold text-alb-olive leading-none">
                {item.value}
              </span>
              <span className="text-[0.5625rem] md:text-[0.625rem] font-body uppercase tracking-[0.08em] text-alb-off-white/50 leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
