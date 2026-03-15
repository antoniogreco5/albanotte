import type { Metadata } from 'next';
import { getCollectionProducts } from '@/lib/shopify/client';
import { transformProduct, formatPrice } from '@/lib/utils';
import { getFallbackProducts } from '@/lib/fallback-data';
import type { Product } from '@/lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const titleMap: Record<string, string> = {
    coffee: 'Shop Coffee',
    drop001: 'Shop Coffee',
    biscotti: 'Shop Biscotti',
    streetwear: 'Shop Streetwear',
  };
  return {
    title: titleMap[params.handle] ?? 'Collection',
    description: `Browse the ALBANOTTE ${params.handle} collection.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  let products: Product[] = [];

  try {
    const shopifyProducts = await getCollectionProducts(params.handle, 50);
    products = shopifyProducts.map(transformProduct);
    console.log(`[Collection: ${params.handle}] Fetched ${products.length} products from Shopify`);
  } catch (err) {
    console.error(`[Collection: ${params.handle}] Shopify fetch failed:`, err);
    // Shopify not connected — use fallback
  }

  // Use fallback data if Shopify returned nothing
  if (products.length === 0) {
    products = getFallbackProducts(params.handle);
  }

  const titleMap: Record<string, string> = {
    drop001: 'THE COLLECTION',
    biscotti: 'BISCOTTI',
    streetwear: 'STREETWEAR',
  };

  const subtitleMap: Record<string, string> = {
    drop001: 'Five single-origin blends, each roasted in small batches in Harrington Park, NJ.',
    biscotti: 'Italian-style biscotti, baked and bagged fresh. The perfect pairing for every cup.',
    streetwear: 'Streetwear meets specialty coffee. DROP 001: DAWN TO NIGHT.',
  };

  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container">
        {/* Header */}
        <div className="mb-12">
          <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
            {params.handle}
          </p>
          <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
            {titleMap[params.handle] ?? params.handle.toUpperCase()}
          </h1>
          <p className="text-body-md text-alb-muted max-w-xl">
            {subtitleMap[params.handle] ?? ''}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.handle}
              href={`/products/${product.handle}`}
              className="group block bg-alb-surface border border-white/[0.06] rounded-alb overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-card-hover hover:-translate-y-1.5"
            >
              <div className="aspect-[3/4] bg-alb-warm-dark overflow-hidden relative">
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-alb-surface to-alb-warm-dark">
                    <span
                      className="font-heading text-7xl font-bold uppercase opacity-[0.07]"
                      style={{ color: product.blendColor ?? '#5C6B4F' }}
                    >
                      {product.title[0]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 md:p-5">
                {/* Roast + Origin badges */}
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                  {product.roastLevel && (
                    <span className="px-2 md:px-2.5 py-0.5 md:py-1 bg-alb-warm-dark border border-white/[0.08] rounded-alb text-[0.5625rem] md:text-[0.6875rem] font-heading font-semibold uppercase tracking-[0.05em] text-alb-off-white">
                      {product.roastLevel}
                    </span>
                  )}
                  {product.origin && (
                    <span className="text-[0.5625rem] md:text-[0.6875rem] font-body uppercase tracking-[0.06em] text-alb-muted hidden sm:inline">
                      {product.origin}
                    </span>
                  )}
                </div>

                <h2 className="font-heading text-sm md:text-xl font-bold uppercase tracking-wide text-alb-off-white mb-1 md:mb-3">
                  {product.title}
                </h2>

                {/* Tasting notes as chips - hidden on very small screens */}
                {product.tastingNotes && (
                  <div className="flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4 hidden sm:flex">
                    {product.tastingNotes.split(',').map((note: string) => (
                      <span
                        key={note.trim()}
                        className="px-2 py-0.5 md:px-2.5 md:py-1 bg-alb-warm-dark border border-white/[0.06] rounded-alb text-[0.5625rem] md:text-[0.6875rem] font-body text-alb-off-white/70"
                      >
                        {note.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {product.description && !product.tastingNotes && !product.origin && (
                  <p className="text-body-xs text-alb-muted/70 line-clamp-2 mb-3 md:mb-4 hidden sm:block">
                    {product.description}
                  </p>
                )}

                <p className="font-heading text-sm md:text-lg font-bold text-alb-off-white">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: product.blendColor ?? '#5C6B4F' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
