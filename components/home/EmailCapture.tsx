'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE } from '@/lib/constants';

export default function EmailCapture() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Connect to Klaviyo / Mailchimp
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section ref={ref} className="py-section bg-alb-black relative overflow-hidden">
      {/* Subtle olive glow */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at center, #5C6B4F, transparent 60%)' }} />

      <div className="alb-container relative z-10">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
            Stay in the Loop
          </p>
          <h2 className="font-heading text-section-lg font-bold text-alb-off-white mb-4">
            JOIN THE NOTTE
          </h2>
          <p className="font-body text-body-md text-alb-muted mb-8 leading-relaxed">
            First access to new blends, drops, and merch. Plus 10% off your first order.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <p className="font-heading text-xl font-bold text-alb-olive uppercase mb-2">
                You&apos;re In.
              </p>
              <p className="text-body-sm text-alb-muted">
                Check your inbox for your 10% off code.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-alb-surface border border-white/[0.08] rounded-alb px-5 py-3.5 text-body-sm text-alb-off-white placeholder:text-alb-muted/40 focus:outline-none focus:border-alb-olive/40 transition-colors"
                required
              />
              <button
                onClick={handleSubmit}
                className="alb-btn-primary px-6 py-3.5 whitespace-nowrap"
              >
                Get 10% Off
              </button>
            </div>
          )}

          <p className="mt-4 text-body-xs text-alb-muted/40">
            No spam. Unsubscribe anytime. Just good coffee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
