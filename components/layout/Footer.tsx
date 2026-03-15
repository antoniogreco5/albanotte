'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE, NAV_LINKS } from '@/lib/constants';

const FOOTER_LINKS = {
  shop: [
    { label: 'Coffee', href: '/collections/drop001' },
    { label: 'Biscotti', href: '/collections/biscotti' },
    { label: 'Streetwear', href: '/collections/streetwear' },
  ],
  info: [
    { label: 'Our Story', href: '/about' },
    { label: 'Membership', href: '/membership' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/policies/shipping' },
    { label: 'Returns', href: '/policies/returns' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms of Service', href: '/policies/terms' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Klaviyo / Mailchimp / etc.
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-alb-charcoal border-t border-white/[0.06]">
      <div className="alb-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand + email signup */}
          <div className="md:col-span-5">
            <span className="font-heading text-2xl font-bold tracking-[0.08em] text-alb-off-white">
              {SITE.name}
            </span>
            <p className="mt-3 text-body-sm text-alb-muted max-w-sm">
              Italian-inspired specialty coffee roasted in small batches in{' '}
              {SITE.location}. From dawn to night.
            </p>

            {/* Email signup */}
            <div className="mt-8">
              <p className="text-body-xs font-body uppercase tracking-[0.12em] text-alb-off-white/60 mb-3">
                Stay in the loop
              </p>
              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-body-sm text-alb-olive font-medium"
                >
                  You&apos;re in. Welcome to the notte. ☕
                </motion.p>
              ) : (
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-alb-surface border border-white/[0.08] rounded-alb px-4 py-2.5 text-body-sm text-alb-off-white placeholder:text-alb-muted/50 focus:outline-none focus:border-alb-olive/40 transition-colors"
                    required
                  />
                  <button
                    onClick={handleSubmit}
                    className="alb-btn-primary px-5 py-2.5 text-xs"
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <p className="text-body-xs font-body uppercase tracking-[0.12em] text-alb-off-white/40 mb-4">
              Shop
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-alb-muted hover:text-alb-off-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-body-xs font-body uppercase tracking-[0.12em] text-alb-off-white/40 mb-4">
              Info
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-alb-muted hover:text-alb-off-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-body-xs font-body uppercase tracking-[0.12em] text-alb-off-white/40 mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-alb-muted hover:text-alb-off-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="alb-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-xs text-alb-muted/60">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-body-xs text-alb-muted/40 tracking-wide">
            {SITE.coordinates.lat.toFixed(4)}°N,{' '}
            {Math.abs(SITE.coordinates.lng).toFixed(4)}°W
          </p>
        </div>
      </div>
    </footer>
  );
}
