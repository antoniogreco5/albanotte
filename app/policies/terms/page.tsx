import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container max-w-2xl">
        <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">Policies</p>
        <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-8">TERMS OF SERVICE</h1>
        <div className="space-y-5 text-body-md text-alb-muted leading-relaxed">
          <p>By using albanotte.com, you agree to the following terms.</p>
          <p><strong className="text-alb-off-white">Products:</strong> All products are subject to availability. Prices are listed in USD and may change without notice. We reserve the right to limit quantities.</p>
          <p><strong className="text-alb-off-white">Orders:</strong> By placing an order, you confirm that all information provided is accurate. We reserve the right to cancel orders if we suspect fraud or if items are out of stock.</p>
          <p><strong className="text-alb-off-white">Intellectual property:</strong> All content on this site — including the {SITE.name} name, logo, blend names, label designs, and photography — is owned by {SITE.name} and may not be used without written permission.</p>
          <p><strong className="text-alb-off-white">Limitation of liability:</strong> {SITE.name} is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
          <p>These terms are governed by the laws of the State of New Jersey. Questions? Email hello@albanotte.com.</p>
        </div>
      </div>
    </div>
  );
}
