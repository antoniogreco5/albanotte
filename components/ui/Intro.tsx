'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/lib/constants';
import Image from 'next/image';

export default function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem('alb_intro_played');
    if (!played) {
      setShow(true);
      sessionStorage.setItem('alb_intro_played', '1');
      const timer = setTimeout(() => setShow(false), 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-alb-black flex flex-col items-center justify-center cursor-pointer"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setShow(false)}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.7, y: -200, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/images/logo-light.png"
              alt={SITE.name}
              width={280}
              height={70}
              className="h-14 md:h-16 w-auto"
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.span
            className="mt-3 font-body text-body-xs uppercase tracking-[0.2em] text-alb-olive"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            From Dawn to Night
          </motion.span>

          {/* Skip hint */}
          <motion.span
            className="absolute bottom-8 text-body-xs text-alb-muted/30 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            TAP TO SKIP
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
