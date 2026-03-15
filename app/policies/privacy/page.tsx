import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container max-w-2xl">
        <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">Policies</p>
        <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-8">PRIVACY POLICY</h1>
        <div className="space-y-5 text-body-md text-alb-muted leading-relaxed">
          <p>At {SITE.name}, your privacy is important to us. This policy outlines what information we collect, why, and how we protect it.</p>
          <p><strong className="text-alb-off-white">What we collect:</strong> When you make a purchase, we collect your name, email, shipping address, and payment information. Payment data is processed securely through Shopify and is never stored on our servers.</p>
          <p><strong className="text-alb-off-white">Email:</strong> If you subscribe to our newsletter, we&apos;ll send occasional updates about new blends, drops, and brand news. You can unsubscribe at any time.</p>
          <p><strong className="text-alb-off-white">Cookies:</strong> We use essential cookies to power your cart and basic analytics to understand how visitors use the site. We don&apos;t sell your data to third parties.</p>
          <p>Questions? Email us at hello@albanotte.com.</p>
        </div>
      </div>
    </div>
  );
}
