import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Join the ALBANOTTE membership. Better pricing, insider access, and perks that compound.',
};

const TIERS = [
  {
    name: 'La Famiglia',
    meaning: 'The Family',
    position: 'For repeat coffee drinkers who want better pricing and insider access.',
    price: 39,
    color: '#5C6B4F',
    featured: false,
    dayOne: [
      { item: '$20 welcome store credit', detail: 'Loaded instantly' },
    ],
    ongoing: [
      '10% off all coffee, always',
      'Early access to limited drops and new blends',
    ],
  },
  {
    name: 'Il Fondatore',
    meaning: 'The Founder',
    position: 'For the ones building with us from the start. Deeper savings, premium perks, priority access.',
    price: 99,
    color: '#BFA343',
    featured: true,
    dayOne: [
      { item: '$40 welcome store credit', detail: 'Loaded instantly' },
    ],
    ongoing: [
      '15% off all coffee, always',
      'Free shipping on every order',
      'Member pricing on merch and streetwear',
      'Priority access to limited drops',
      'Birthday reward',
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      {/* Hero */}
      <section className="alb-container text-center mb-16 md:mb-24">
        <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
          Membership
        </p>
        <h1 className="font-heading text-hero-lg font-bold text-alb-off-white mb-5 max-w-3xl mx-auto leading-[0.9]">
          BETTER COFFEE.
          <br />
          <span className="text-alb-olive">BETTER PRICING.</span>
        </h1>
        <p className="font-body text-body-lg text-alb-muted max-w-lg mx-auto leading-relaxed">
          Two tiers. One goal: reward the people who drink with us.
          Welcome credit on day one, ongoing discounts, and access to
          everything before anyone else.
        </p>
      </section>

      {/* How it works */}
      <section className="alb-container mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { step: '01', title: 'Choose Your Tier', desc: 'Pick the level that matches how you drink.' },
            { step: '02', title: 'Get Credit Instantly', desc: 'Welcome credit loads to your account the moment you join.' },
            { step: '03', title: 'Save on Every Order', desc: 'Member pricing, free shipping, and early access — all year.' },
          ].map((s) => (
            <div key={s.step} className="text-center md:text-left">
              <span className="font-heading text-3xl font-bold text-alb-olive/30 block mb-2">{s.step}</span>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-alb-off-white mb-1.5">{s.title}</h3>
              <p className="text-body-xs text-alb-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier cards */}
      <section className="alb-container mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-alb-surface rounded-alb overflow-hidden ${
                tier.featured
                  ? 'border-2 ring-1 ring-white/[0.04]'
                  : 'border border-white/[0.06]'
              }`}
              style={tier.featured ? { borderColor: `${tier.color}60` } : undefined}
            >
              {/* Top accent */}
              <div className="h-1.5 w-full" style={{ background: tier.color }} />

              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute top-5 right-5">
                  <span
                    className="px-3 py-1 rounded-full text-[0.6rem] font-heading font-bold uppercase tracking-[0.08em] text-alb-off-white"
                    style={{ background: tier.color }}
                  >
                    Best Value
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Name + price */}
                <p className="text-[0.625rem] font-body uppercase tracking-[0.15em] text-alb-muted mb-1">
                  {tier.meaning}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-alb-off-white uppercase mb-1">
                  {tier.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-heading text-2xl font-bold" style={{ color: tier.color }}>
                    ${tier.price}
                  </span>
                  <span className="text-body-xs text-alb-muted">/year</span>
                </div>

                {/* Positioning line */}
                <p className="text-body-xs text-alb-muted/70 italic mb-6 leading-relaxed">
                  {tier.position}
                </p>

                {/* Day one */}
                <div className="bg-alb-warm-dark border border-white/[0.04] rounded-alb p-4 mb-6">
                  <p className="text-[0.625rem] font-heading uppercase tracking-[0.12em] text-alb-off-white/50 mb-3">
                    Day One
                  </p>
                  {tier.dayOne.map((item) => (
                    <div key={item.item} className="flex items-center justify-between">
                      <span className="text-body-sm text-alb-off-white/80">{item.item}</span>
                      <span className="text-[0.625rem] text-alb-muted">{item.detail}</span>
                    </div>
                  ))}
                </div>

                {/* Ongoing perks */}
                <p className="text-[0.625rem] font-heading uppercase tracking-[0.12em] text-alb-off-white/50 mb-3">
                  Ongoing Perks
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tier.ongoing.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: tier.color }} />
                      <span className="text-body-sm text-alb-muted">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full py-4 rounded-alb font-heading text-sm font-semibold uppercase tracking-[0.1em] text-alb-off-white transition-all duration-300 hover:brightness-110 min-h-[52px]"
                  style={{ background: tier.color }}
                >
                  Join {tier.name}
                </button>
                <p className="text-[0.625rem] text-alb-muted/40 text-center mt-3">
                  Cancel anytime. No commitment.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="alb-container mb-16 md:mb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-section-lg font-bold text-alb-off-white text-center mb-8">
            COMPARE TIERS
          </h2>

          <div className="bg-alb-surface border border-white/[0.06] rounded-alb overflow-hidden">
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              <div className="p-4 md:p-5" />
              <div className="p-4 md:p-5 text-center border-l border-white/[0.06]">
                <p className="font-heading text-xs font-bold uppercase tracking-wide text-alb-off-white">La Famiglia</p>
                <p className="text-[0.625rem] text-alb-muted">$39/yr</p>
              </div>
              <div className="p-4 md:p-5 text-center border-l border-white/[0.06] bg-[#BFA343]/[0.04]">
                <p className="font-heading text-xs font-bold uppercase tracking-wide text-[#BFA343]">Il Fondatore</p>
                <p className="text-[0.625rem] text-alb-muted">$99/yr</p>
              </div>
            </div>

            {[
              { feature: 'Welcome Credit', t1: '$20', t2: '$40' },
              { feature: 'Coffee Discount', t1: '10%', t2: '15%' },
              { feature: 'Free Shipping', t1: '—', t2: 'All orders' },
              { feature: 'Merch Pricing', t1: '—', t2: 'Member price' },
              { feature: 'Early Access', t1: 'Yes', t2: 'Priority' },
              { feature: 'Birthday Reward', t1: '—', t2: 'Yes' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i < 5 ? 'border-b border-white/[0.04]' : ''}`}>
                <div className="p-3 md:p-4 text-body-xs text-alb-muted">{row.feature}</div>
                <div className="p-3 md:p-4 text-center text-body-xs text-alb-off-white/70 border-l border-white/[0.04]">{row.t1}</div>
                <div className="p-3 md:p-4 text-center text-body-xs text-alb-off-white font-medium border-l border-white/[0.04] bg-[#BFA343]/[0.04]">{row.t2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The math */}
      <section className="bg-alb-charcoal noise-texture py-section">
        <div className="alb-container max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-3">
              Why It Works
            </p>
            <h2 className="font-heading text-section-lg font-bold text-alb-off-white">
              THE MATH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* La Famiglia math */}
            <div className="bg-alb-surface border border-white/[0.06] rounded-alb p-5 md:p-6">
              <p className="font-heading text-sm font-bold uppercase text-alb-off-white mb-1">La Famiglia</p>
              <p className="text-[0.625rem] text-alb-muted mb-4">If you buy 1 bag per month</p>
              <div className="space-y-2">
                {[
                  { label: 'Membership', val: '-$39' },
                  { label: 'Welcome credit', val: '+$20' },
                  { label: '10% off 12 bags', val: '+$24' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-body-xs border-b border-white/[0.03] pb-1.5">
                    <span className="text-alb-muted">{r.label}</span>
                    <span className={r.val.startsWith('-') ? 'text-alb-muted-red' : 'text-alb-olive'}>{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.08] flex justify-between">
                <span className="font-heading text-xs font-bold text-alb-off-white uppercase">Net Savings</span>
                <span className="font-heading text-lg font-bold text-alb-olive">+$5</span>
              </div>
              <p className="text-[0.5625rem] text-alb-muted/40 mt-1">Pays for itself by month 2.</p>
            </div>

            {/* Il Fondatore math */}
            <div className="bg-alb-surface border-2 rounded-alb p-5 md:p-6" style={{ borderColor: '#BFA34360' }}>
              <p className="font-heading text-sm font-bold uppercase text-[#BFA343] mb-1">Il Fondatore</p>
              <p className="text-[0.625rem] text-alb-muted mb-4">If you buy 1 bag per month</p>
              <div className="space-y-2">
                {[
                  { label: 'Membership', val: '-$99' },
                  { label: 'Welcome credit', val: '+$40' },
                  { label: '15% off 12 bags', val: '+$36' },
                  { label: 'Free shipping (12 orders)', val: '+$72' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-body-xs border-b border-white/[0.03] pb-1.5">
                    <span className="text-alb-muted">{r.label}</span>
                    <span className={r.val.startsWith('-') ? 'text-alb-muted-red' : 'text-[#BFA343]'}>{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.08] flex justify-between">
                <span className="font-heading text-xs font-bold text-alb-off-white uppercase">Net Savings</span>
                <span className="font-heading text-xl font-bold text-[#BFA343]">+$49</span>
              </div>
              <p className="text-[0.5625rem] text-alb-muted/40 mt-1">Before birthday reward and merch savings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section alb-container max-w-3xl">
        <h2 className="font-heading text-section-lg font-bold text-alb-off-white text-center mb-10">
          MEMBERSHIP FAQ
        </h2>
        <div className="space-y-6">
          {[
            { q: 'When does my welcome credit arrive?', a: 'Instantly. It loads to your account the moment you join.' },
            { q: 'Can I cancel?', a: 'Anytime. Your perks stay active through the end of your membership year.' },
            { q: 'Does the discount apply to everything?', a: 'La Famiglia gets 10% off all coffee. Il Fondatore gets 15% off coffee plus member pricing on merch and streetwear.' },
            { q: 'How does the birthday reward work?', a: 'Il Fondatore members receive a reward during their birthday month. We will reach out with the details.' },
            { q: 'Do member discounts stack with sales?', a: 'Member pricing applies to regular-priced items. Some limited drops may have separate rules.' },
            { q: 'Is free shipping really on every order?', a: 'For Il Fondatore members, yes. Every order, no minimum, all year.' },
          ].map((faq) => (
            <div key={faq.q} className="pb-5 border-b border-white/[0.06] last:border-0">
              <h3 className="font-body text-body-md font-medium text-alb-off-white mb-1.5">{faq.q}</h3>
              <p className="text-body-sm text-alb-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-alb-warm-dark py-section">
        <div className="alb-container text-center">
          <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
            JOIN THE INNER CIRCLE
          </h2>
          <p className="font-body text-body-md text-alb-muted mb-8 max-w-md mx-auto">
            Better pricing, early access, and perks that get better the more you drink.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="alb-btn-primary px-8 py-4 text-sm w-full sm:w-auto text-center" style={{ background: '#5C6B4F' }}>
              La Famiglia — $39/yr
            </a>
            <a href="#" className="alb-btn-primary px-8 py-4 text-sm w-full sm:w-auto text-center" style={{ background: '#BFA343' }}>
              Il Fondatore — $99/yr
            </a>
          </div>
          <p className="text-[0.625rem] text-alb-muted/40 mt-4">Cancel anytime.</p>
        </div>
      </section>
    </div>
  );
}
