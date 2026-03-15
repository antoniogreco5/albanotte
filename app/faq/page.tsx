import type { Metadata } from 'next';
import { SITE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ALBANOTTE coffee, shipping, and more.',
};

const FAQS = [
  {
    category: 'Coffee & Quality',
    questions: [
      {
        q: 'What makes ALBANOTTE different from grocery store coffee?',
        a: `All our coffee is specialty grade, single-origin, and roasted in small batches in ${SITE.location}. We roast to order — your bag is never sitting on a shelf for months. You're getting coffee at peak freshness, sourced from the best growing regions in the world.`,
      },
      {
        q: 'Is this really specialty grade?',
        a: 'Yes. Specialty grade means the beans scored 80+ on the Specialty Coffee Association scale. Our sourcing focuses on beans in the 83-88 range — complex, clean, and distinctive.',
      },
      {
        q: 'How fresh is the coffee when it arrives?',
        a: 'We roast to order. Your coffee is roasted within 48 hours of your purchase and shipped the same day it comes off the roaster. It doesn\'t get fresher than that without roasting it yourself.',
      },
      {
        q: 'Which blend should I start with?',
        a: 'If you\'re not sure, Ciao a Tutti (Brazil, Medium) is our most approachable blend — smooth, sweet, and crowd-pleasing. If you like bolder coffee, try Mezzanotte (Rwanda, Dark). Take our Blend Finder Quiz on the homepage to get a personalized recommendation.',
      },
    ],
  },
  {
    category: 'Grinds & Brewing',
    questions: [
      {
        q: 'Which grind should I choose?',
        a: 'Whole Bean is always the freshest option if you have a grinder. Otherwise: Drip for standard coffee makers, Pour Over for Chemex/V60, French Press for immersion brewing, and Espresso for espresso machines and moka pots.',
      },
      {
        q: 'Can I brew any of your coffees as espresso?',
        a: 'Absolutely. All five blends work as espresso — just select the Espresso grind. Mezzanotte and La Dolce Vita are especially great as espresso shots.',
      },
    ],
  },
  {
    category: 'Shipping & Orders',
    questions: [
      {
        q: 'How much is shipping?',
        a: `Shipping is a flat $5.99. Orders over $${FREE_SHIPPING_THRESHOLD} ship free. We currently ship within the continental United States.`,
      },
      {
        q: 'How fast does it ship?',
        a: 'Your coffee is roasted within 48 hours of ordering and shipped the same day. Standard delivery is 3-5 business days after that.',
      },
      {
        q: 'Do you offer subscriptions?',
        a: 'We\'re rolling out subscriptions soon — choose your blend, pick a frequency (every 2, 4, or 6 weeks), and save up to 15%. Sign up for our email list to be the first to know when it launches.',
      },
    ],
  },
  {
    category: 'Returns & Satisfaction',
    questions: [
      {
        q: 'What if I don\'t like my coffee?',
        a: 'We stand behind every bag. If your order arrives damaged or you\'re genuinely not satisfied, email us at hello@albanotte.com within 7 days of delivery and we\'ll make it right.',
      },
      {
        q: 'Can I return merch?',
        a: 'Unworn merch in original packaging can be returned within 14 days for a full refund. Buyer covers return shipping unless the item was defective.',
      },
    ],
  },
  {
    category: 'The Brand',
    questions: [
      {
        q: 'What does ALBANOTTE mean?',
        a: 'ALBANOTTE comes from the Italian "all\'alba, notte" — meaning "from dawn to night." Each of our five blends is named for a moment in the day, from the bright energy of Buongiorno (morning) to the depth of Mezzanotte (midnight).',
      },
      {
        q: 'Where is ALBANOTTE roasted?',
        a: `Every batch is small-batch roasted in ${SITE.location}, in Bergen County, New Jersey. It's a community with deep Italian-American roots — and that heritage is baked into everything we do.`,
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      <div className="alb-container max-w-3xl">
        <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
          Help
        </p>
        <h1 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-body-md text-alb-muted mb-12">
          Everything you need to know about ALBANOTTE coffee, shipping, and the brand.
        </p>

        <div className="space-y-12">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="font-heading text-lg font-bold text-alb-off-white uppercase tracking-wide mb-6 pb-3 border-b border-white/[0.06]">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.questions.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-body text-body-md font-medium text-alb-off-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-body-sm text-alb-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] text-center">
          <p className="font-heading text-lg font-bold text-alb-off-white uppercase mb-2">
            Still Have Questions?
          </p>
          <p className="text-body-sm text-alb-muted mb-6">
            We&apos;re happy to help.
          </p>
          <a
            href="mailto:hello@albanotte.com"
            className="alb-btn-primary inline-flex"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
