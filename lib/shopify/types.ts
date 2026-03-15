/* ============================================
   ALBANOTTE — Shopify Type Definitions
   ============================================ */

/* ---------- Money ---------- */

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

/* ---------- Images ---------- */

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

/* ---------- Variants ---------- */

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyMoney;
};

/* ---------- Metafields ---------- */

export type ShopifyMetafield = {
  key: string;
  value: string;
} | null;

/* ---------- Selling Plans ---------- */

export type SellingPlan = {
  id: string;
  name: string;
  description: string | null;
  options: { name: string; value: string }[];
  priceAdjustments: {
    adjustmentValue: {
      adjustmentPercentage?: number;
    };
  }[];
  recurringDeliveries: boolean;
};

export type SellingPlanGroup = {
  name: string;
  sellingPlans: {
    edges: { node: SellingPlan }[];
  };
};

/* ---------- Product ---------- */

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
  metafields: ShopifyMetafield[];
  sellingPlanGroups?: {
    edges: { node: SellingPlanGroup }[];
  };
};

/* ---------- Collection ---------- */

export type ShopifyCollection = {
  title: string;
  description: string;
  products: {
    edges: { node: ShopifyProduct }[];
  };
};

/* ---------- Cart ---------- */

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      title: string;
      handle: string;
      images: {
        edges: { node: { url: string; altText: string | null } }[];
      };
    };
  };
  sellingPlanAllocation?: {
    sellingPlan: {
      name: string;
    };
    priceAdjustments: {
      price: ShopifyMoney;
      compareAtPrice: ShopifyMoney;
    }[];
  } | null;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
};

/* ---------- API Responses ---------- */

export type ShopifyProductResponse = {
  product: ShopifyProduct | null;
};

export type ShopifyCollectionProductsResponse = {
  collection: ShopifyCollection | null;
};

export type ShopifyCartResponse = {
  cart: ShopifyCart | null;
};

export type ShopifyCartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart;
    userErrors: { field: string; message: string }[];
  };
};

export type ShopifyCartLinesAddResponse = {
  cartLinesAdd: {
    cart: ShopifyCart;
    userErrors: { field: string; message: string }[];
  };
};

export type ShopifyCartLinesUpdateResponse = {
  cartLinesUpdate: {
    cart: ShopifyCart;
    userErrors: { field: string; message: string }[];
  };
};

export type ShopifyCartLinesRemoveResponse = {
  cartLinesRemove: {
    cart: ShopifyCart;
    userErrors: { field: string; message: string }[];
  };
};

/* ---------- Parsed / Transformed ---------- */

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  price: string;
  currencyCode: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  tastingNotes: string | null;
  origin: string | null;
  roastLevel: string | null;
  blendColor: string | null;
  sellingPlans: SellingPlan[];
};

export type CartItem = {
  id: string;
  quantity: number;
  variantId: string;
  variantTitle: string;
  productTitle: string;
  productHandle: string;
  price: string;
  currencyCode: string;
  imageUrl: string | null;
};

/* ---------- Blend Accent Colors ---------- */

export const BLEND_ACCENTS: Record<string, string> = {
  'ciao-a-tutti': '#5C9E8F',
  'la-dolce-vita': '#B87333',
  'senza-fretta': '#5C6B4F',
  buongiorno: '#BFA343',
  mezzanotte: '#F2F0EA',
};
