import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getCollectionProducts } from '@/lib/shopify/client';
import { transformProduct } from '@/lib/utils';
import { BLEND_ACCENTS } from '@/lib/shopify/types';
import { getFallbackProduct, FALLBACK_COFFEE } from '@/lib/fallback-data';
import type { Product } from '@/lib/shopify/types';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetail from '@/components/product/ProductDetail';
import CrossSells from '@/components/product/CrossSells';

export const revalidate = 60;

type Props = {
  params: { handle: string };
};

async function getProductData(handle: string): Promise<Product | null> {
  // Try Shopify first
  try {
    const shopifyProduct = await getProduct(handle);
    if (shopifyProduct) return transformProduct(shopifyProduct);
  } catch {
    // Shopify not connected
  }

  // Fall back to local data
  return getFallbackProduct(handle);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductData(params.handle);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.description || `${product.title} — ALBANOTTE specialty coffee`,
    openGraph: {
      title: `${product.title} | ALBANOTTE`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductData(params.handle);
  if (!product) notFound();

  // Fetch all coffee products for cross-sells
  let allProducts: Product[] = [];
  try {
    const shopifyProducts = await getCollectionProducts('drop001', 10);
    allProducts = shopifyProducts.map(transformProduct);
  } catch {
    allProducts = FALLBACK_COFFEE;
  }

  const accentColor =
    product.blendColor ??
    BLEND_ACCENTS[params.handle] ??
    '#5C6B4F';

  // Determine product type by handle
  const COFFEE_HANDLES = [
    'buongiorno-ethiopia-medium-light',
    'ciao-a-tutti-brazil-medium-espresso',
    'la-dolce-vita-guatemala-medium',
    'senza-fretta-colombia-decaf',
    'mezzanotte-rwanda-dark',
  ];
  const STREETWEAR_HANDLES = [
    'buongiorno-heavyweight-tee',
    'mezzanotte-heavyweight-tee',
    'ldv-monogram-heavyweight-tee',
    'dawn-to-night-embroidered-hoodie',
  ];

  const isCoffee = COFFEE_HANDLES.includes(params.handle) || !!(product.roastLevel || product.tastingNotes);
  const isStreetwear = STREETWEAR_HANDLES.includes(params.handle);
  const backLink = isStreetwear
    ? { href: '/collections/streetwear', label: 'Streetwear' }
    : isCoffee
    ? { href: '/collections/drop001', label: 'Coffee' }
    : { href: '/collections/biscotti', label: 'Biscotti' };

  return (
    <div
      className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* Accent top line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: accentColor }} />

      <div className="alb-container">
        {/* Back link */}
        <a href={backLink.href} className="inline-flex items-center gap-2 text-body-xs font-body uppercase tracking-[0.1em] text-alb-muted hover:text-alb-off-white transition-colors mb-8">
          <span>←</span> Back to {backLink.label}
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery — sticky on desktop */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Info + Subscription + Form — managed by client wrapper */}
          <div>
            <ProductDetail product={product} accentColor={accentColor} isCoffee={isCoffee} />
          </div>
        </div>

        {/* Cross-sells — coffee only */}
        {isCoffee && <CrossSells currentHandle={params.handle} allProducts={allProducts} />}
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.description,
            image: product.images[0]?.url,
            brand: { '@type': 'Brand', name: 'ALBANOTTE' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: product.currencyCode,
              availability: product.variants.some((v) => v.availableForSale)
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          }),
        }}
      />
    </div>
  );
}
