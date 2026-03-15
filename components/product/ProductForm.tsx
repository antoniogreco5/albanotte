'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import VariantSelector from './VariantSelector';
import type { ShopifyVariant } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';

type ProductFormProps = {
  variants: ShopifyVariant[];
  accentColor?: string;
  sellingPlanId?: string | null;
  discountPercent?: number;
};

export default function ProductForm({
  variants,
  accentColor = '#5C6B4F',
  sellingPlanId,
  discountPercent = 0,
}: ProductFormProps) {
  const { addToCart, isLoading } = useCart();
  const [selectedId, setSelectedId] = useState(
    variants.find((v) => v.availableForSale)?.id ?? variants[0]?.id ?? ''
  );
  const [added, setAdded] = useState(false);

  const selectedVariant = variants.find((v) => v.id === selectedId);

  const handleAdd = async () => {
    if (!selectedId || isLoading) return;
    await addToCart(selectedId, 1, sellingPlanId ?? undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      <VariantSelector
        variants={variants}
        selected={selectedId}
        onSelect={setSelectedId}
        accentColor={accentColor}
      />

      {/* Price display */}
      {selectedVariant && (
        <div className="flex items-baseline gap-2.5">
          {sellingPlanId && discountPercent > 0 ? (
            <>
              <span className="font-heading text-2xl font-bold text-alb-olive">
                {formatPrice(
                  (parseFloat(selectedVariant.price.amount) * (1 - discountPercent / 100)).toFixed(2)
                )}
              </span>
              <span className="font-heading text-lg text-alb-muted/40 line-through">
                {formatPrice(selectedVariant.price.amount)}
              </span>
              <span className="text-[0.625rem] font-heading font-semibold uppercase px-2 py-0.5 rounded-full bg-alb-olive/15 text-alb-olive">
                Save {discountPercent}%
              </span>
            </>
          ) : (
            <span className="font-heading text-2xl font-bold text-alb-off-white">
              {formatPrice(selectedVariant.price.amount)}
            </span>
          )}
        </div>
      )}

      {/* Add to Cart button */}
      <motion.button
        onClick={handleAdd}
        disabled={isLoading || !selectedVariant?.availableForSale}
        className="w-full py-4 md:py-4 rounded-alb font-heading text-sm font-semibold uppercase tracking-[0.1em] text-alb-off-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
        style={{ background: accentColor }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              ✓ Added to Cart
            </motion.span>
          ) : isLoading ? (
            <motion.span key="loading">Adding...</motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {sellingPlanId ? 'Subscribe & Add to Cart' : 'Add to Cart'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
        {[
          { icon: '☕', text: 'Roasted Fresh' },
          { icon: '⚡', text: 'Ships in 48hrs' },
          { icon: '🚚', text: 'Free Over $40' },
        ].map((badge) => (
          <div
            key={badge.text}
            className="flex flex-col items-center gap-1.5 py-3 bg-alb-surface/50 border border-white/[0.04] rounded-alb"
          >
            <span className="text-base">{badge.icon}</span>
            <span className="text-[0.5625rem] font-body uppercase tracking-[0.06em] text-alb-muted text-center leading-tight">
              {badge.text}
            </span>
          </div>
        ))}
      </div>

      {/* Member savings callout */}
      <a
        href="/membership"
        className="mt-3 flex items-center gap-2.5 px-4 py-3 bg-alb-olive/[0.06] border border-alb-olive/[0.15] rounded-alb group hover:border-alb-olive/30 transition-all"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-alb-olive shrink-0" />
        <span className="text-[0.6875rem] font-body text-alb-muted group-hover:text-alb-off-white transition-colors">
          Members save up to <span className="text-alb-olive font-medium">15%</span> on this product
        </span>
        <span className="ml-auto text-[0.625rem] text-alb-olive opacity-60 group-hover:opacity-100 transition-opacity">Learn more →</span>
      </a>
    </div>
  );
}
