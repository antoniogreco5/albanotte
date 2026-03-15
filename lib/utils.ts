/* ============================================
   ALBANOTTE — Utility Functions
   ============================================ */

import type { ShopifyProduct, ShopifyMetafield, Product, CartItem, ShopifyCartLine } from './shopify/types';

/**
 * Format a price string from Shopify's amount (e.g. "22.00" → "$22")
 */
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
  }).format(num);
}

/**
 * Extract a metafield value by key from Shopify metafields array
 */
export function getMetafield(
  metafields: ShopifyMetafield[],
  key: string
): string | null {
  const field = metafields.find((mf) => mf?.key === key);
  return field?.value ?? null;
}

/**
 * Transform a Shopify product into our clean Product type
 */
export function transformProduct(shopifyProduct: ShopifyProduct): Product {
  const sellingPlans = shopifyProduct.sellingPlanGroups?.edges.flatMap(
    (g) => g.node.sellingPlans.edges.map((e) => e.node)
  ) ?? [];

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    price: shopifyProduct.priceRange.minVariantPrice.amount,
    currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    images: shopifyProduct.images.edges.map((e) => e.node),
    variants: shopifyProduct.variants.edges.map((e) => e.node),
    tastingNotes: getMetafield(shopifyProduct.metafields, 'tasting_notes'),
    origin: getMetafield(shopifyProduct.metafields, 'origin'),
    roastLevel: getMetafield(shopifyProduct.metafields, 'roast_level'),
    blendColor: getMetafield(shopifyProduct.metafields, 'blend_color'),
    sellingPlans,
  };
}

/**
 * Transform a Shopify cart line into our CartItem type
 */
export function transformCartLine(line: ShopifyCartLine): CartItem {
  const imageEdge = line.merchandise.product.images.edges[0];
  return {
    id: line.id,
    quantity: line.quantity,
    variantId: line.merchandise.id,
    variantTitle: line.merchandise.title,
    productTitle: line.merchandise.product.title,
    productHandle: line.merchandise.product.handle,
    price: line.merchandise.price.amount,
    currencyCode: line.merchandise.price.currencyCode,
    imageUrl: imageEdge?.node.url ?? null,
  };
}

/**
 * Calculate free shipping progress
 */
export function getFreeShippingProgress(
  subtotal: number,
  threshold: number = 40
): { progress: number; remaining: number; qualified: boolean } {
  const progress = Math.min((subtotal / threshold) * 100, 100);
  const remaining = Math.max(threshold - subtotal, 0);
  return { progress, remaining, qualified: subtotal >= threshold };
}

/**
 * cn — simple className merger (no clsx dependency needed)
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
