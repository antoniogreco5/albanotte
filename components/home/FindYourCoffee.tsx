'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOMENTS = [
  {
    time: 'Morning',
    icon: '☀️',
    blend: 'Buongiorno',
    handle: 'buongiorno-ethiopia-medium-light',
    origin: 'Ethiopia',
    roast: 'Medium Light',
    description: 'Bright and fruity. Dark chocolate and dried fruit to start the day right.',
    color: '#BFA343',
  },
  {
    time: 'Midday',
    icon: '🌤️',
    blend: 'Ciao a Tutti',
    handle: 'ciao-a-tutti-brazil-medium-espresso',
    origin: 'Brazil',
    roast: 'Medium',
    description: 'The crowd-pleaser. Brown sugar, chocolate, and a bright citrus finish.',
    color: '#5C9E8F',
  },
  {
    time: 'Afternoon',
    icon: '☕',
    blend: 'La Dolce Vita',
    handle: 'la-dolce-vita-guatemala-medium',
    origin: 'Guatemala',
    roast: 'Medium',
    description: 'Rich and comforting. Chocolate and hazelnut for the sweetest part of the day.',
    color: '#B87333',
  },
  {
    time: 'Evening',
    icon: '🌙',
    blend: 'Senza Fretta',
    handle: 'senza-fretta-colombia-decaf',
    origin: 'Colombia',
    roast: 'Decaf',
    description: 'No rush, no caffeine. Sugar cane processed with deep dark chocolate notes.',
    color: '#5C6B4F',
  },
  {
    time: 'Night',
    icon: '🌑',
    blend: 'Mezzanotte',
    handle: 'mezzanotte-rwanda-dark',
    origin: 'Rwanda',
    roast: 'Dark',
    description: 'Bold and complex. Black tea, dried cherry, and baking spice. The final chapter.',
    color: '#F2F0EA',
  },
];

export default function FindYourCoffee() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);

  const moment = MOMENTS[active];

  return (
    <section ref={ref} className="py-section bg-alb-black relative overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-colors duration-700"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${moment.color}, transparent 70%)` }}
      />

      <div className="alb-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
            From Dawn to Night
          </p>
          <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
            FIND YOUR MOMENT
          </h2>
          <p className="font-body text-body-md text-alb-muted max-w-md mx-auto">
            Every hour deserves its own roast. When are you reaching for a cup?
          </p>
        </motion.div>

        {/* Time selector */}
        <motion.div
          className="flex items-center justify-center gap-2 md:gap-3 mb-12 md:mb-16 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {MOMENTS.map((m, i) => (
            <button
              key={m.time}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-body-sm font-body font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                i === active
                  ? 'bg-white/[0.08] text-alb-off-white border border-white/[0.12]'
                  : 'text-alb-muted hover:text-alb-off-white border border-transparent'
              }`}
            >
              <span className="text-base">{m.icon}</span>
              <span className="hidden sm:inline">{m.time}</span>
            </button>
          ))}
        </motion.div>

        {/* Result */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left: info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{moment.icon}</span>
                <div>
                  <p className="text-body-xs font-body uppercase tracking-[0.1em] text-alb-muted">
                    {moment.time} Roast
                  </p>
                  <p className="text-body-xs font-body uppercase tracking-[0.08em]" style={{ color: moment.color }}>
                    {moment.origin} · {moment.roast}
                  </p>
                </div>
              </div>

              <h3 className="font-heading text-4xl md:text-5xl font-bold text-alb-off-white uppercase mb-4">
                {moment.blend}
              </h3>

              <p className="font-body text-body-md text-alb-muted leading-relaxed mb-8">
                {moment.description}
              </p>

              <Link
                href={`/products/${moment.handle}`}
                className="alb-btn-primary inline-flex"
                style={{ background: moment.color }}
              >
                Shop {moment.blend}
              </Link>
            </div>

            {/* Right: visual accent */}
            <div className="relative aspect-square max-w-sm mx-auto md:mx-0">
              <div
                className="absolute inset-0 rounded-full opacity-10 blur-3xl"
                style={{ background: moment.color }}
              />
              <div className="absolute inset-8 border border-white/[0.06] rounded-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl md:text-7xl block mb-3">{moment.icon}</span>
                  <span className="font-heading text-xl font-bold text-alb-off-white/20 uppercase tracking-wider">
                    {moment.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
