'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/shopify/types';

/* Pairing map — which blends go well together */
const PAIRINGS: Record<string, string[]> = {
  'buongiorno-ethiopia-medium-light': ['ciao-a-tutti-brazil-medium-espresso', 'la-dolce-vita-guatemala-medium'],
  'ciao-a-tutti-brazil-medium-espresso': ['buongiorno-ethiopia-medium-light', 'mezzanotte-rwanda-dark'],
  'la-dolce-vita-guatemala-medium': ['senza-fretta-colombia-decaf', 'ciao-a-tutti-brazil-medium-espresso'],
  'senza-fretta-colombia-decaf': ['la-dolce-vita-guatemala-medium', 'buongiorno-ethiopia-medium-light'],
  'mezzanotte-rwanda-dark': ['la-dolce-vita-guatemala-medium', 'ciao-a-tutti-brazil-medium-espresso'],
};

type CrossSellsProps = {
  currentHandle: string;
  allProducts: Product[];
};

export default function CrossSells({ currentHandle, allProducts }: CrossSellsProps) {
  const pairingHandles = PAIRINGS[currentHandle];
  if (!pairingHandles || pairingHandles.length === 0) return null;

  const pairings = pairingHandles
    .map((h) => allProducts.find((p) => p.handle === h))
    .filter(Boolean) as Product[];

  if (pairings.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-white/[0.06]">
      <p className="text-[0.6875rem] font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
        Pairs Well With
      </p>
      <h3 className="font-heading text-xl font-bold text-alb-off-white uppercase mb-6">
        COMPLETE YOUR LINEUP
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pairings.map((product) => (
          <Link
            key={product.handle}
            href={`/products/${product.handle}`}
            className="group flex gap-4 bg-alb-surface border border-white/[0.06] rounded-alb p-4 hover:border-white/[0.12] transition-all duration-300"
          >
            {/* Image */}
            <div className="w-20 h-20 bg-alb-warm-dark rounded-alb overflow-hidden flex-shrink-0">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].url}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="font-heading text-2xl font-bold opacity-10"
                    style={{ color: product.blendColor ?? '#5C6B4F' }}
                  >
                    {product.title[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-alb-off-white group-hover:text-alb-olive transition-colors truncate">
                {product.title}
              </h4>
              {product.origin && (
                <p className="text-body-xs text-alb-muted mt-0.5">
                  {product.origin} · {product.roastLevel}
                </p>
              )}
              <p className="font-heading text-sm font-bold text-alb-off-white mt-1.5">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
