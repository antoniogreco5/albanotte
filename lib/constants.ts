/* ============================================
   ALBANOTTE — Site Constants
   ============================================ */

export const SITE = {
  name: 'ALBANOTTE',
  tagline: 'Italian roots, American hustle',
  description: 'Italian-inspired specialty coffee roasted in Harrington Park, NJ.',
  url: 'https://albanotte.com',
  founder: 'Antonio Greco',
  established: 2026,
  location: 'Harrington Park, NJ',
  coordinates: { lat: 40.9834, lng: -73.9787 },
} as const;

export const FREE_SHIPPING_THRESHOLD = 40; // dollars

export const COLLECTIONS = {
  coffee: 'drop001',
  biscotti: 'biscotti',
  streetwear: 'streetwear',
} as const;

export const BLEND_NAMES = [
  'Ciao a Tutti',
  'La Dolce Vita',
  'Senza Fretta',
  'Buongiorno',
  'Mezzanotte',
] as const;

export const GRIND_OPTIONS = [
  'Whole Bean',
  'Drip',
  'French Press',
  'Espresso',
  'Pour Over',
] as const;

export const TRUST_ITEMS = [
  { icon: '☕', text: 'Roasted Fresh to Order' },
  { icon: '⚡', text: 'Ships Within 48 Hours' },
  { icon: '★', text: 'Specialty Grade Quality' },
  { icon: '✦', text: 'No Subscription Required' },
] as const;

// Hero video — update this URL after uploading to Shopify Admin → Settings → Files
export const HERO_VIDEO_URL = 'https://cdn.shopify.com/videos/c/o/v/5ca5b03d7c5c460e886c529e035ee3b1.mov';

export const NAV_LINKS = [
  { label: 'Coffee', href: '/collections/drop001' },
  { label: 'Biscotti', href: '/collections/biscotti' },
  { label: 'Streetwear', href: '/collections/streetwear' },
  { label: 'Membership', href: '/membership' },
  { label: 'Our Story', href: '/about' },
] as const;
