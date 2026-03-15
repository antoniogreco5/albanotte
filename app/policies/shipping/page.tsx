import type { Metadata } from 'next';
import { SITE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping Policy',
};

export default function ShippingPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container max-w-2xl">
        <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
          Policies
        </p>
        <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-8">
          SHIPPING
        </h1>
        <div className="space-y-5 text-body-md text-alb-muted leading-relaxed">
          <p>
            All coffee is roasted fresh to order and ships within 48 hours of
            roasting. We want you to taste the freshest possible cup.
          </p>
          <p>
            <strong className="text-alb-off-white">Free shipping</strong> on all
            orders over ${FREE_SHIPPING_THRESHOLD}. Standard shipping is a flat
            $5.99 for orders under the threshold.
          </p>
          <p>
            We currently ship within the continental United States. Delivery
            typically takes 3–5 business days depending on your location.
          </p>
          <p>
            Once your order ships, you&apos;ll receive a tracking number via
            email. If you have any questions about your shipment, reach out to
            us at hello@albanotte.com.
          </p>
        </div>
      </div>
    </div>
  );
}
