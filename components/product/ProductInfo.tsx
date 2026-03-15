'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/lib/shopify/types';

type ProductInfoProps = {
  product: Product;
  accentColor: string;
};

type BlendProfile = {
  body: number;
  acidity: number;
  sweetness: number;
  bestFor: string;
  whoItsFor: string;
  vibe: string;
  process: string;
  brewing: string;
};

const PROFILES: Record<string, BlendProfile> = {
  'buongiorno-ethiopia-medium-light': {
    body: 3, acidity: 4, sweetness: 3,
    bestFor: 'Morning ritual',
    whoItsFor: 'For the person who wants their first cup to feel alive — bright, fruity, and full of energy.',
    vibe: 'Bright, energizing, fruity',
    process: 'Washed',
    brewing: 'Pour over or drip for the cleanest expression of fruit and chocolate. V60 recommended.',
  },
  'ciao-a-tutti-brazil-medium-espresso': {
    body: 4, acidity: 2, sweetness: 4,
    bestFor: 'Everyday crowd-pleaser',
    whoItsFor: 'For the person who wants a reliable, smooth cup that works every single day, any brew method.',
    vibe: 'Smooth, sweet, approachable',
    process: 'Natural',
    brewing: 'Works beautifully with any method. French press brings out the chocolate. Great as espresso.',
  },
  'la-dolce-vita-guatemala-medium': {
    body: 4, acidity: 2, sweetness: 5,
    bestFor: 'Afternoon indulgence',
    whoItsFor: 'For the person who wants their coffee to feel like a treat — rich, nutty, and comforting.',
    vibe: 'Rich, comforting, nutty',
    process: 'Washed',
    brewing: 'Espresso or moka pot to amplify the hazelnut and chocolate. Exceptional as a latte.',
  },
  'senza-fretta-colombia-decaf': {
    body: 3, acidity: 2, sweetness: 4,
    bestFor: 'Evening wind-down',
    whoItsFor: 'For the person who refuses to compromise on flavor just because the sun went down.',
    vibe: 'Calm, smooth, no compromise',
    process: 'Sugar Cane Decaf (EA Process)',
    brewing: 'Drip or pour over. Gentle extraction preserves the sweetness. Beautiful after dinner.',
  },
  'mezzanotte-rwanda-dark': {
    body: 5, acidity: 3, sweetness: 2,
    bestFor: 'After-dinner depth',
    whoItsFor: 'For the person who likes it bold, complex, and unapologetic. The last cup of the night.',
    vibe: 'Bold, complex, contemplative',
    process: 'Washed',
    brewing: 'French press or espresso. The body and spice shine with full immersion brewing.',
  },
};

function FlavorBar({ label, level, color }: { label: string; level: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[0.6875rem] font-body text-alb-muted w-20 shrink-0">{label}</span>
      <div className="flex-1 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full transition-colors duration-300"
            style={{ background: i <= level ? color : 'rgba(242,240,234,0.06)' }}
          />
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <p className="text-[0.625rem] font-heading uppercase tracking-[0.14em] text-alb-muted/60 mb-3">
        {label}
      </p>
      {children}
    </motion.div>
  );
}

export default function ProductInfo({ product, accentColor }: ProductInfoProps) {
  const profile = PROFILES[product.handle];
  const isCoffee = !!(product.roastLevel || product.tastingNotes);

  return (
    <div>
      {/* Title + Price */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-hero-lg font-bold text-alb-off-white uppercase mb-4 leading-[0.95]">
          {product.title}
        </h1>
      </motion.div>

      {/* Meta pills: Origin / Roast / Weight */}
      <motion.div
        className="flex flex-wrap items-center gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.4 }}
      >
        {product.origin && (
          <span className="px-3 py-1.5 rounded-alb text-[0.6875rem] font-body uppercase tracking-[0.06em] border border-white/[0.08] text-alb-off-white/80">
            {product.origin}
          </span>
        )}
        {product.roastLevel && (
          <span
            className="px-3 py-1.5 rounded-alb text-[0.6875rem] font-body uppercase tracking-[0.06em] text-alb-off-white/90"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}35` }}
          >
            {product.roastLevel}
          </span>
        )}
        {profile?.process && (
          <span className="px-3 py-1.5 rounded-alb text-[0.6875rem] font-body uppercase tracking-[0.06em] border border-white/[0.06] text-alb-muted">
            {profile.process}
          </span>
        )}
        {isCoffee && (
          <span className="px-3 py-1.5 rounded-alb text-[0.6875rem] font-body uppercase tracking-[0.06em] border border-white/[0.06] text-alb-muted">
            12oz / 340g
          </span>
        )}
      </motion.div>

      {/* Best For + Vibe */}
      {profile && (
        <motion.div
          className="flex items-start gap-3 mb-8 py-3 border-y border-white/[0.04]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.4 }}
        >
          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: accentColor }} />
          <div>
            <span className="text-body-sm text-alb-off-white font-medium">Best for: {profile.bestFor}</span>
            <span className="text-body-sm text-alb-muted"> — {profile.vibe}</span>
          </div>
        </motion.div>
      )}

      {/* Description — rendered as HTML to preserve Shopify formatting */}
      {product.descriptionHtml ? (
        <motion.div
          className="text-body-md text-alb-muted leading-relaxed mb-8 product-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      ) : product.description ? (
        <motion.p
          className="text-body-md text-alb-muted leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16, duration: 0.4 }}
        >
          {product.description}
        </motion.p>
      ) : null}

      {/* Tasting Notes */}
      {product.tastingNotes && (
        <InfoBlock label="Tasting Notes" delay={0.2}>
          <div className="flex flex-wrap gap-2">
            {product.tastingNotes.split(',').map((note) => (
              <span
                key={note.trim()}
                className="px-3.5 py-2 bg-alb-surface border border-white/[0.06] rounded-alb text-body-sm text-alb-off-white/80"
              >
                {note.trim()}
              </span>
            ))}
          </div>
        </InfoBlock>
      )}

      {/* Flavor Profile Bars */}
      {profile && (
        <InfoBlock label="Flavor Profile" delay={0.24}>
          <div className="space-y-3">
            <FlavorBar label="Body" level={profile.body} color={accentColor} />
            <FlavorBar label="Acidity" level={profile.acidity} color={accentColor} />
            <FlavorBar label="Sweetness" level={profile.sweetness} color={accentColor} />
          </div>
        </InfoBlock>
      )}

      {/* Who It's For */}
      {profile?.whoItsFor && (
        <InfoBlock label="Who It's For" delay={0.28}>
          <p className="text-body-sm text-alb-off-white/70 leading-relaxed italic">
            {profile.whoItsFor}
          </p>
        </InfoBlock>
      )}

      {/* Brewing Suggestion */}
      {profile?.brewing && (
        <InfoBlock label="How to Brew" delay={0.32}>
          <div className="bg-alb-surface border border-white/[0.05] rounded-alb p-4">
            <p className="text-body-sm text-alb-muted/80 leading-relaxed">
              {profile.brewing}
            </p>
          </div>
        </InfoBlock>
      )}

      {/* Freshness / Roast-to-order */}
      {isCoffee && (
        <motion.div
          className="flex flex-col gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36, duration: 0.4 }}
        >
          {[
            { text: 'Roasted fresh to order in Harrington Park, NJ' },
            { text: 'Ships within 48 hours of roasting' },
            { text: 'Specialty grade, single-origin beans' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-alb-olive shrink-0" />
              <span className="text-[0.6875rem] font-body text-alb-muted/60">{item.text}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
