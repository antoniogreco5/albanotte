/* ============================================
   ALBANOTTE — Fallback Product Data
   
   Used when the Shopify Storefront API isn't
   connected or returns no data. Remove this file
   once all products are live in Shopify.
   ============================================ */

import type { Product } from './shopify/types';

export const FALLBACK_COFFEE: Product[] = [
  {
    id: 'fallback-ciao-a-tutti',
    title: 'Ciao a Tutti',
    handle: 'ciao-a-tutti',
    description: 'A crowd-pleasing medium roast from Brazil with notes of brown sugar, chocolate, and a bright citrus finish. The blend that brings everyone together.',
    descriptionHtml: '<p>A crowd-pleasing medium roast from Brazil with notes of brown sugar, chocolate, and a bright citrus finish. The blend that brings everyone together.</p>',
    price: '22.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-ciao-wb', title: 'Whole Bean', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Whole Bean' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-ciao-drip', title: 'Drip', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Drip' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-ciao-fp', title: 'French Press', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'French Press' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-ciao-esp', title: 'Espresso', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Espresso' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-ciao-po', title: 'Pour Over', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Pour Over' }], price: { amount: '22.00', currencyCode: 'USD' } },
    ],
    tastingNotes: 'Brown Sugar, Chocolate, Citrus',
    origin: 'Brazil',
    roastLevel: 'Medium',
    blendColor: '#5C9E8F',
    sellingPlans: [],
  },
  {
    id: 'fallback-la-dolce-vita',
    title: 'La Dolce Vita',
    handle: 'la-dolce-vita',
    description: 'A rich, comforting medium roast from Guatemala. Chocolate and hazelnut dominate with a smooth, sweet finish. The sweet life in every cup.',
    descriptionHtml: '<p>A rich, comforting medium roast from Guatemala. Chocolate and hazelnut dominate with a smooth, sweet finish. The sweet life in every cup.</p>',
    price: '22.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-dolce-wb', title: 'Whole Bean', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Whole Bean' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-dolce-drip', title: 'Drip', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Drip' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-dolce-fp', title: 'French Press', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'French Press' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-dolce-esp', title: 'Espresso', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Espresso' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-dolce-po', title: 'Pour Over', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Pour Over' }], price: { amount: '22.00', currencyCode: 'USD' } },
    ],
    tastingNotes: 'Chocolate, Hazelnut',
    origin: 'Guatemala',
    roastLevel: 'Medium',
    blendColor: '#B87333',
    sellingPlans: [],
  },
  {
    id: 'fallback-senza-fretta',
    title: 'Senza Fretta',
    handle: 'senza-fretta',
    description: 'Our decaf done right. Sugar cane processed Colombian beans with deep dark chocolate notes. No rush, no compromise.',
    descriptionHtml: '<p>Our decaf done right. Sugar cane processed Colombian beans with deep dark chocolate notes. No rush, no compromise.</p>',
    price: '22.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-senza-wb', title: 'Whole Bean', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Whole Bean' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-senza-drip', title: 'Drip', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Drip' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-senza-fp', title: 'French Press', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'French Press' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-senza-esp', title: 'Espresso', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Espresso' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-senza-po', title: 'Pour Over', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Pour Over' }], price: { amount: '22.00', currencyCode: 'USD' } },
    ],
    tastingNotes: 'Dark Chocolate, Sugar Cane',
    origin: 'Colombia',
    roastLevel: 'Decaf',
    blendColor: '#5C6B4F',
    sellingPlans: [],
  },
  {
    id: 'fallback-buongiorno',
    title: 'Buongiorno',
    handle: 'buongiorno',
    description: 'A bright, fruity medium-light roast from Ethiopia. Dark chocolate and dried fruit create the perfect morning cup. Good morning, indeed.',
    descriptionHtml: '<p>A bright, fruity medium-light roast from Ethiopia. Dark chocolate and dried fruit create the perfect morning cup. Good morning, indeed.</p>',
    price: '22.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-buon-wb', title: 'Whole Bean', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Whole Bean' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-buon-drip', title: 'Drip', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Drip' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-buon-fp', title: 'French Press', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'French Press' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-buon-esp', title: 'Espresso', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Espresso' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-buon-po', title: 'Pour Over', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Pour Over' }], price: { amount: '22.00', currencyCode: 'USD' } },
    ],
    tastingNotes: 'Dark Chocolate, Dried Fruit',
    origin: 'Ethiopia',
    roastLevel: 'Medium Light',
    blendColor: '#BFA343',
    sellingPlans: [],
  },
  {
    id: 'fallback-mezzanotte',
    title: 'Mezzanotte',
    handle: 'mezzanotte',
    description: 'A bold, complex dark roast from Rwanda. Black tea, dried cherry, and baking spice. The final chapter of the day deserves depth.',
    descriptionHtml: '<p>A bold, complex dark roast from Rwanda. Black tea, dried cherry, and baking spice. The final chapter of the day deserves depth.</p>',
    price: '22.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-mezza-wb', title: 'Whole Bean', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Whole Bean' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-mezza-drip', title: 'Drip', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Drip' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-mezza-fp', title: 'French Press', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'French Press' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-mezza-esp', title: 'Espresso', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Espresso' }], price: { amount: '22.00', currencyCode: 'USD' } },
      { id: 'fallback-mezza-po', title: 'Pour Over', availableForSale: true, selectedOptions: [{ name: 'Grind', value: 'Pour Over' }], price: { amount: '22.00', currencyCode: 'USD' } },
    ],
    tastingNotes: 'Black Tea, Dried Cherry, Baking Spice',
    origin: 'Rwanda',
    roastLevel: 'Dark',
    blendColor: '#F2F0EA',
    sellingPlans: [],
  },
];

export const FALLBACK_BISCOTTI: Product[] = [
  {
    id: 'fallback-biscotti-classic',
    title: 'Classic Almond Biscotti',
    handle: 'classic-almond-biscotti',
    description: 'Traditional Italian almond biscotti, twice-baked for the perfect crunch. Made in small batches.',
    descriptionHtml: '<p>Traditional Italian almond biscotti, twice-baked for the perfect crunch. Made in small batches.</p>',
    price: '14.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-bisc-classic', title: 'Default', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'Bag' }], price: { amount: '14.00', currencyCode: 'USD' } },
    ],
    tastingNotes: null,
    origin: null,
    roastLevel: null,
    blendColor: '#C4956A',
    sellingPlans: [],
  },
];

export const FALLBACK_STREETWEAR: Product[] = [
  {
    id: 'fallback-hoodie',
    title: 'Dawn to Night Embroidered Hoodie',
    handle: 'dawn-to-night-embroidered-hoodie',
    description: 'Heavyweight embroidered hoodie. ALBANOTTE "From Dawn to Night" embroidery. Premium cotton.',
    descriptionHtml: '<p>Heavyweight embroidered hoodie. ALBANOTTE "From Dawn to Night" embroidery. Premium cotton.</p>',
    price: '75.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-hood-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '75.00', currencyCode: 'USD' } },
      { id: 'fallback-hood-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '75.00', currencyCode: 'USD' } },
      { id: 'fallback-hood-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '75.00', currencyCode: 'USD' } },
      { id: 'fallback-hood-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '75.00', currencyCode: 'USD' } },
    ],
    tastingNotes: null,
    origin: null,
    roastLevel: null,
    blendColor: null,
    sellingPlans: [],
  },
  {
    id: 'fallback-buon-tee',
    title: 'Buongiorno Heavyweight Tee',
    handle: 'buongiorno-heavyweight-tee',
    description: 'Heavyweight graphic tee. Buongiorno collection.',
    descriptionHtml: '<p>Heavyweight graphic tee. Buongiorno collection.</p>',
    price: '35.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-btee-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-btee-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-btee-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-btee-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '35.00', currencyCode: 'USD' } },
    ],
    tastingNotes: null,
    origin: null,
    roastLevel: null,
    blendColor: null,
    sellingPlans: [],
  },
  {
    id: 'fallback-mezza-tee',
    title: 'Mezzanotte Heavyweight Tee',
    handle: 'mezzanotte-heavyweight-tee',
    description: 'Heavyweight graphic tee. Mezzanotte collection.',
    descriptionHtml: '<p>Heavyweight graphic tee. Mezzanotte collection.</p>',
    price: '35.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-mtee-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-mtee-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-mtee-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-mtee-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '35.00', currencyCode: 'USD' } },
    ],
    tastingNotes: null,
    origin: null,
    roastLevel: null,
    blendColor: null,
    sellingPlans: [],
  },
  {
    id: 'fallback-ldv-tee',
    title: 'LDV Monogram Heavyweight Tee',
    handle: 'ldv-monogram-heavyweight-tee',
    description: 'Heavyweight graphic tee. La Dolce Vita monogram.',
    descriptionHtml: '<p>Heavyweight graphic tee. La Dolce Vita monogram.</p>',
    price: '35.00',
    currencyCode: 'USD',
    images: [],
    variants: [
      { id: 'fallback-ldv-s', title: 'S', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'S' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-ldv-m', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'M' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-ldv-l', title: 'L', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'L' }], price: { amount: '35.00', currencyCode: 'USD' } },
      { id: 'fallback-ldv-xl', title: 'XL', availableForSale: true, selectedOptions: [{ name: 'Size', value: 'XL' }], price: { amount: '35.00', currencyCode: 'USD' } },
    ],
    tastingNotes: null,
    origin: null,
    roastLevel: null,
    blendColor: null,
    sellingPlans: [],
  },
];

export function getFallbackProducts(collectionHandle: string): Product[] {
  switch (collectionHandle) {
    case 'drop001':
    case 'coffee':
      return FALLBACK_COFFEE;
    case 'biscotti':
      return FALLBACK_BISCOTTI;
    case 'streetwear':
      return FALLBACK_STREETWEAR;
    default:
      return [];
  }
}

export function getFallbackProduct(handle: string): Product | null {
  const all = [...FALLBACK_COFFEE, ...FALLBACK_BISCOTTI, ...FALLBACK_STREETWEAR];
  return all.find((p) => p.handle === handle) ?? null;
}
