'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/shopify/types';

type MerchTeaserProps = {
  products?: Product[];
};

export default function MerchTeaser({ products }: MerchTeaserProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-section bg-alb-surface noise-texture">
      <div className="alb-container">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-1.5">
              Beyond the Cup
            </p>
            <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-2">
              THE CULTURE
            </h2>
            <p className="font-body text-body-sm text-alb-muted max-w-lg">
              DROP 001: DAWN TO NIGHT — Embroidered hoodies, graphic tees, and essentials. An extension of the brand, not a side project.
            </p>
          </div>
          <Link href="/collections/streetwear"
            className="text-body-xs font-body uppercase tracking-[0.1em] text-alb-muted hover:text-alb-olive transition-colors flex items-center gap-1.5 shrink-0">
            Shop Streetwear <span>→</span>
          </Link>
        </motion.div>

        {/* Product row */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.slice(0, 4).map((product, i) => (
              <motion.div key={product.handle}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}>
                <Link href={`/products/${product.handle}`} className="group block">
                  <div className="aspect-[3/4] bg-alb-warm-dark rounded-alb overflow-hidden relative mb-2 md:mb-3">
                    {product.images.length > 0 ? (
                      <Image src={product.images[0].url} alt={product.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 25vw" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-heading text-3xl md:text-5xl font-bold text-alb-off-white/[0.04] uppercase">{product.title[0]}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-[0.625rem] md:text-xs font-semibold uppercase tracking-wide text-alb-off-white group-hover:text-alb-olive transition-colors truncate mb-0.5">
                    {product.title}
                  </h3>
                  <p className="font-heading text-sm font-bold text-alb-off-white">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="aspect-[21/9] bg-alb-warm-dark rounded-alb flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}>
            <div className="text-center">
              <span className="font-heading text-5xl md:text-6xl font-bold text-alb-off-white/[0.04] uppercase block">DROP 001</span>
              <Link href="/collections/streetwear" className="mt-4 inline-block alb-btn-secondary text-xs">Shop Streetwear</Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
