'use client';

import { useState } from 'react';
import ProductInfo from './ProductInfo';
import SubscriptionSelector from './SubscriptionSelector';
import ProductForm from './ProductForm';
import type { Product } from '@/lib/shopify/types';

type ProductDetailProps = {
  product: Product;
  accentColor: string;
  isCoffee: boolean;
};

export default function ProductDetail({ product, accentColor, isCoffee }: ProductDetailProps) {
  const [sellingPlanId, setSellingPlanId] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const handleSellingPlanChange = (planId: string | null) => {
    setSellingPlanId(planId);
    if (planId) {
      const plan = product.sellingPlans.find((p) => p.id === planId);
      setDiscountPercent(plan?.priceAdjustments?.[0]?.adjustmentValue?.adjustmentPercentage ?? 0);
    } else {
      setDiscountPercent(0);
    }
  };

  return (
    <div>
      <ProductInfo product={product} accentColor={accentColor} />
      {isCoffee && product.sellingPlans && product.sellingPlans.length > 0 && (
        <SubscriptionSelector
          accentColor={accentColor}
          sellingPlans={product.sellingPlans}
          onSellingPlanChange={handleSellingPlanChange}
        />
      )}
      <ProductForm
        variants={product.variants}
        accentColor={accentColor}
        sellingPlanId={sellingPlanId}
        discountPercent={discountPercent}
      />
    </div>
  );
}
