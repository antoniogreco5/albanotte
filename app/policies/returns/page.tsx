import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Returns & Refunds' };

export default function ReturnsPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container max-w-2xl">
        <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">Policies</p>
        <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-8">RETURNS & REFUNDS</h1>
        <div className="space-y-5 text-body-md text-alb-muted leading-relaxed">
          <p>Because our coffee is roasted fresh to order, we cannot accept returns on opened bags. We stand behind every blend we roast — if your order arrives damaged or you&apos;re not satisfied, contact us at hello@albanotte.com within 7 days of delivery.</p>
          <p>For merch and apparel, unworn items in original packaging can be returned within 14 days of delivery for a full refund. Buyer covers return shipping unless the item was defective.</p>
          <p>Refunds are processed within 5–7 business days of receiving the returned item.</p>
        </div>
      </div>
    </div>
  );
}
