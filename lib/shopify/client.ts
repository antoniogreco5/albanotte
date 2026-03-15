/* ============================================
   ALBANOTTE — Shopify Storefront API Client
   
   Uses the Storefront API (GraphQL) for:
   - Product data (collections, individual products)
   - Cart operations (create, add, update, remove)
   - Checkout URL generation
   
   Admin operations (inventory, orders) stay in Shopify Admin.
   ============================================ */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2025-01/graphql.json`;

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache,
  tags,
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 30, ...(tags ? { tags } : {}) },
  });

  if (!res.ok) {
    throw new Error(
      `Shopify API error: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Unknown Shopify error');
  }

  return json.data as T;
}

/* ============================================
   HELPER: Get a single product by handle
   ============================================ */

import { PRODUCT_QUERY, COLLECTION_PRODUCTS_QUERY } from './queries';
import type {
  ShopifyProduct,
  ShopifyCollectionProductsResponse,
  ShopifyProductResponse,
} from './types';

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: PRODUCT_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  });

  return data.product ?? null;
}

export async function getCollectionProducts(
  handle: string,
  first: number = 20
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ShopifyCollectionProductsResponse>({
    query: COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first },
    tags: [`collection-${handle}`],
  });

  return (
    data.collection?.products.edges.map((edge) => edge.node) ?? []
  );
}
