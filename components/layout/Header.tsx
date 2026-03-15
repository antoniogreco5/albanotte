'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { NAV_LINKS, SITE } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

/* ============================================
   ANNOUNCEMENT BAR (embedded in header)
   ============================================ */

const ANNOUNCEMENTS = [
  'Free Shipping on Orders Over $40',
  'DROP 001: DAWN TO NIGHT — Now Live',
  'NEW: Italian-Style Biscotti — Baked Fresh',
  'Roasted Fresh in Harrington Park, NJ',
];

function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-alb-olive text-alb-off-white overflow-hidden">
      <div className="alb-container flex items-center justify-center py-2 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            className="text-[0.6875rem] font-body font-medium uppercase tracking-[0.12em] text-center"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {ANNOUNCEMENTS[current]}
          </motion.p>
        </AnimatePresence>

        <button
          onClick={onDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-alb-off-white/60 hover:text-alb-off-white transition-colors text-xs"
          aria-label="Close announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/* ============================================
   HEADER
   ============================================ */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const { scrollY } = useScroll();
  const { cart, openCart } = useCart();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(11,11,9,0)', 'rgba(11,11,9,0.95)']
  );
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );
  const logoScale = useTransform(scrollY, [0, 100], [1.05, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const totalItems = cart?.totalQuantity ?? 0;

  return (
    <>
      {/* Fixed wrapper containing announcement bar + nav */}
      <div className="fixed top-0 inset-x-0 z-40">
        {/* Announcement bar */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav bar */}
        <motion.header
          style={{
            backgroundColor: headerBg,
            backdropFilter: headerBlur,
            WebkitBackdropFilter: headerBlur,
          }}
          className="relative"
        >
          <motion.div
            className="absolute bottom-0 inset-x-0 h-px bg-white"
            style={{ opacity: borderOpacity }}
          />

          <div className="alb-container flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="relative z-50">
              <motion.div style={{ scale: logoScale }}>
                <Image
                  src="/images/logo-light.png"
                  alt={SITE.name}
                  width={160}
                  height={40}
                  className="h-8 md:h-9 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-body-sm text-alb-off-white/70 hover:text-alb-off-white uppercase tracking-[0.08em] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-alb-olive group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right side: cart + mobile toggle */}
            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative text-alb-off-white/70 hover:text-alb-off-white transition-colors"
                aria-label={`Cart (${totalItems} items)`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-alb-olive text-alb-off-white text-[0.5625rem] font-bold rounded-full flex items-center justify-center leading-none"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden relative z-50 w-6 h-5 flex flex-col justify-between"
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block w-full h-px bg-alb-off-white origin-left"
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: -1 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.span
                  className="block w-full h-px bg-alb-off-white"
                  animate={
                    mobileOpen
                      ? { opacity: 0, x: -10 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-full h-px bg-alb-off-white origin-left"
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: 1 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-alb-black flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-4xl font-bold uppercase tracking-[0.05em] text-alb-off-white hover:text-alb-olive transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="font-heading text-xs tracking-[0.2em] text-alb-off-white/30 uppercase">
                {SITE.name}
              </span>
              <span className="font-heading text-xs tracking-[0.15em] text-alb-olive/60">
                ★ EST. {SITE.established} ★
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
