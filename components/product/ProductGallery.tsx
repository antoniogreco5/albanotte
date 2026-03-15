'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { ShopifyImage } from '@/lib/shopify/types';

type ProductGalleryProps = {
  images: ShopifyImage[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-alb-surface rounded-alb flex items-center justify-center">
        <span className="font-heading text-4xl text-alb-muted/20 uppercase">
          {title[0]}
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square bg-alb-surface rounded-alb overflow-hidden mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[selected].url}
              alt={images[selected].altText ?? title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 rounded-alb overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                i === selected
                  ? 'border-alb-olive'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
