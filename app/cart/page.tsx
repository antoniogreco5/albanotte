'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { openCart } = useCart();

  // Auto-open the drawer when someone navigates to /cart
  useEffect(() => {
    openCart();
  }, [openCart]);

  return (
    <div className="min-h-screen bg-alb-black pt-36 md:pt-40 flex items-start justify-center">
      <div className="text-center">
        <p className="text-body-sm text-alb-muted">
          Your cart is in the drawer →
        </p>
      </div>
    </div>
  );
}
