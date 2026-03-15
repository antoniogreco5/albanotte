import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import CoffeeGrid from '@/components/home/CoffeeGrid';
import { getCollectionProducts } from '@/lib/shopify/client';
import { transformProduct } from '@/lib/utils';
import { FALLBACK_COFFEE } from '@/lib/fallback-data';
import { SITE } from '@/lib/constants';
import type { Product } from '@/lib/shopify/types';

// Lazy load below-fold sections
const BlendQuiz = dynamic(() => import('@/components/home/BlendQuiz'));
const Story = dynamic(() => import('@/components/home/Story'));
const MembershipTeaser = dynamic(() => import('@/components/home/MembershipTeaser'));
const BiscottiTeaser = dynamic(() => import('@/components/home/BiscottiTeaser'));
const MerchTeaser = dynamic(() => import('@/components/home/MerchTeaser'));
const EmailCapture = dynamic(() => import('@/components/home/EmailCapture'));

export const revalidate = 30;

export default async function HomePage() {
  let coffeeProducts: Product[] = [];
  let streetwearProducts: Product[] = [];

  try {
    const shopifyCoffee = await getCollectionProducts('drop001', 10);
    coffeeProducts = shopifyCoffee.map(transformProduct);
  } catch {}

  try {
    const shopifyStreet = await getCollectionProducts('streetwear', 10);
    streetwearProducts = shopifyStreet.map(transformProduct);
  } catch {}

  if (coffeeProducts.length === 0) {
    coffeeProducts = FALLBACK_COFFEE;
  }

  return (
    <>
      <Hero />
      <CoffeeGrid products={coffeeProducts} />
      <BlendQuiz />
      <Story />
      <MembershipTeaser />
      <BiscottiTeaser />
      <MerchTeaser products={streetwearProducts} />
      <EmailCapture />

      <section className="py-section-sm bg-alb-black noise-texture text-center">
        <div className="alb-container">
          <div className="inline-flex flex-col items-center gap-1 border border-alb-off-white/10 rounded-full px-8 py-5">
            <span className="font-heading text-xs tracking-[0.2em] text-alb-off-white/40 uppercase">{SITE.name}</span>
            <span className="font-heading text-xs tracking-[0.15em] text-alb-olive">★ EST. {SITE.established} ★</span>
          </div>
          <p className="mt-6 text-body-xs text-alb-muted/40 tracking-wide">
            {SITE.coordinates.lat.toFixed(4)}°N, {Math.abs(SITE.coordinates.lng).toFixed(4)}°W
          </p>
        </div>
      </section>
    </>
  );
}
