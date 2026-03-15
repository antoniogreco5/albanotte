'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/shopify/types';

const MERCH_DATA: Record<string, { tag: string; vibe: string }> = {
  'ciao-a-tutti-brazil-medium-espresso': { tag: 'Best Seller', vibe: 'The everyday crowd-pleaser' },
  'la-dolce-vita-guatemala-medium': { tag: 'Best for Espresso', vibe: 'Rich, smooth, indulgent' },
  'senza-fretta-colombia-decaf': { tag: 'Decaf Pick', vibe: 'Evening ritual, zero compromise' },
  'buongiorno-ethiopia-medium-light': { tag: 'Morning Roast', vibe: 'Bright and energizing' },
  'mezzanotte-rwanda-dark': { tag: 'Dark Roast Pick', vibe: 'Bold, complex, after-dark' },
};

function QuickShop({ product, accentColor, onClose }: { product: Product; accentColor: string; onClose: () => void }) {
  const { addToCart, isLoading } = useCart();
  const [selectedId, setSelectedId] = useState(product.variants?.find((v) => v.availableForSale)?.id ?? '');
  const [added, setAdded] = useState(false);
  const grindVariants = product.variants?.filter((v) => v.availableForSale) ?? [];

  const handleAdd = async () => {
    if (!selectedId || isLoading) return;
    await addToCart(selectedId, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <motion.div className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-auto"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 bg-alb-black/90 backdrop-blur-sm" />
      <div className="relative z-10 p-4 md:p-5">
        <p className="text-[0.6875rem] font-body uppercase tracking-[0.1em] text-alb-muted mb-3">
          {product.variants?.[0]?.selectedOptions?.[0]?.name ?? 'Option'}
        </p>
        {grindVariants.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {grindVariants.map((v) => {
                const label = v.selectedOptions?.[0]?.value ?? v.title;
                const isActive = v.id === selectedId;
                return (
                  <button key={v.id} onClick={() => setSelectedId(v.id)}
                    className={`px-3.5 py-2 rounded-full text-[0.75rem] font-body transition-all min-h-[36px] ${isActive ? 'text-alb-off-white' : 'text-alb-muted border border-white/[0.1]'}`}
                    style={isActive ? { background: `${accentColor}35`, border: `1px solid ${accentColor}60` } : undefined}>
                    {label}
                  </button>
                );
              })}
            </div>
            <button onClick={handleAdd} disabled={isLoading || added}
              className="w-full py-3.5 rounded-alb font-heading text-xs font-semibold uppercase tracking-[0.1em] text-alb-off-white"
              style={{ background: accentColor }}>
              {added ? '✓ Added to Cart' : isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          </>
        ) : (
          <Link href={`/products/${product.handle}`} className="block w-full py-3.5 rounded-alb font-heading text-xs font-semibold uppercase tracking-[0.1em] text-alb-off-white text-center" style={{ background: accentColor }}>
            View Product
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function ProductCard({ blend, index, isInView }: { blend: Product; index: number; isInView: boolean }) {
  const [showQuickShop, setShowQuickShop] = useState(false);
  const accentColor = blend.blendColor ?? '#5C6B4F';
  const notes = blend.tastingNotes?.split(',').map((n) => n.trim()) ?? [];
  const merchData = MERCH_DATA[blend.handle];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setShowQuickShop(true)}
      onMouseLeave={() => setShowQuickShop(false)}
      className="relative group"
    >
      <Link href={`/products/${blend.handle}`} className="block relative overflow-hidden rounded-alb">
        {/* Image — large, hero of the card */}
        <div className="aspect-[3/4] bg-alb-warm-dark overflow-hidden relative">
          {blend.images && blend.images.length > 0 ? (
            <Image src={blend.images[0].url} alt={blend.title ?? ''} fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${accentColor}10, ${accentColor}20)` }}>
              <span className="font-heading text-[8rem] font-bold uppercase opacity-[0.04]" style={{ color: accentColor }}>{(blend.title ?? '')[0]}</span>
            </div>
          )}

          {/* Gradient overlay on image for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-alb-black/70 via-transparent to-transparent" />

          {/* Tag */}
          {merchData && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[0.5rem] md:text-[0.6rem] font-heading font-bold uppercase tracking-[0.08em] text-alb-off-white backdrop-blur-sm"
              style={{ background: `${accentColor}cc` }}>
              {merchData.tag}
            </div>
          )}

          {/* Info overlaid on bottom of image */}
          <div className="absolute bottom-0 inset-x-0 p-3 md:p-5">
            <div className="flex items-center gap-1.5 mb-1 md:mb-2">
              <span className="text-[0.5625rem] md:text-[0.625rem] font-body uppercase tracking-[0.08em] text-alb-off-white/60">{blend.origin}</span>
              {blend.origin && blend.roastLevel && <span className="w-[3px] h-[3px] rounded-full bg-alb-off-white/30 hidden md:block" />}
              <span className="text-[0.5625rem] md:text-[0.625rem] font-body uppercase tracking-[0.08em] hidden md:inline" style={{ color: accentColor }}>{blend.roastLevel}</span>
            </div>

            <h3 className="font-heading text-base md:text-2xl lg:text-[1.75rem] font-bold uppercase text-alb-off-white mb-0.5 md:mb-1 leading-tight">
              {blend.title}
            </h3>

            {merchData && (
              <p className="text-[0.6875rem] text-alb-off-white/50 italic mb-2 md:mb-3 hidden sm:block">{merchData.vibe}</p>
            )}

            {notes.length > 0 && (
              <div className="flex-wrap gap-1 mb-2 md:mb-3 hidden md:flex">
                {notes.map((note) => (
                  <span key={note} className="px-2 py-0.5 text-[0.6rem] font-body text-alb-off-white/70 bg-white/[0.08] backdrop-blur-sm rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="font-heading text-sm md:text-xl font-bold text-alb-off-white">{formatPrice(blend.price ?? '20.00')}</span>
              <span className="text-[0.5625rem] md:text-[0.625rem] font-heading uppercase tracking-[0.12em] text-alb-off-white/40 group-hover:text-alb-olive transition-colors flex items-center gap-1">
                Shop <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Accent bottom line */}
        <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: accentColor }} />
      </Link>

      <AnimatePresence>
        {showQuickShop && blend.variants && blend.variants.length > 0 && (
          <QuickShop product={blend} accentColor={accentColor} onClose={() => setShowQuickShop(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const FALLBACK_BLENDS: Partial<Product>[] = [
  { handle: 'ciao-a-tutti-brazil-medium-espresso', title: 'Ciao a Tutti', price: '20.00', origin: 'Brazil', tastingNotes: 'Brown Sugar, Chocolate, Citrus', roastLevel: 'Medium', blendColor: '#5C9E8F', variants: [], images: [] },
  { handle: 'la-dolce-vita-guatemala-medium', title: 'La Dolce Vita', price: '20.00', origin: 'Guatemala', tastingNotes: 'Chocolate, Hazelnut', roastLevel: 'Medium', blendColor: '#B87333', variants: [], images: [] },
  { handle: 'senza-fretta-colombia-decaf', title: 'Senza Fretta', price: '20.00', origin: 'Colombia', tastingNotes: 'Dark Chocolate, Sugar Cane', roastLevel: 'Decaf', blendColor: '#5C6B4F', variants: [], images: [] },
  { handle: 'buongiorno-ethiopia-medium-light', title: 'Buongiorno', price: '20.00', origin: 'Ethiopia', tastingNotes: 'Dark Chocolate, Dried Fruit', roastLevel: 'Medium Light', blendColor: '#BFA343', variants: [], images: [] },
  { handle: 'mezzanotte-rwanda-dark', title: 'Mezzanotte', price: '20.00', origin: 'Rwanda', tastingNotes: 'Black Tea, Dried Cherry, Baking Spice', roastLevel: 'Dark', blendColor: '#F2F0EA', variants: [], images: [] },
];

type CoffeeGridProps = { products?: Product[] };

export default function CoffeeGrid({ products }: CoffeeGridProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const blends = products && products.length > 0 ? products : FALLBACK_BLENDS;

  return (
    <section ref={ref} className="py-14 md:py-20 bg-alb-charcoal noise-texture relative">
      <div className="alb-container relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-1.5">
              Drop 001 — From Dawn to Night
            </p>
            <h2 className="font-heading text-section-xl font-bold text-alb-off-white">
              THE COLLECTION
            </h2>
          </div>
          <Link href="/collections/drop001"
            className="text-body-xs font-body uppercase tracking-[0.1em] text-alb-muted hover:text-alb-olive transition-colors flex items-center gap-1.5 shrink-0">
            View All <span>→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {blends.map((blend, i) => (
            <ProductCard key={blend.handle} blend={blend as Product} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
