import type { Metadata } from 'next';
import { SITE, BLEND_NAMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Story',
  description: `The story behind ${SITE.name}. Italian-inspired specialty coffee roasted in ${SITE.location}.`,
};

export default function AboutPage() {
  return (
    <div className="pt-36 md:pt-40 pb-section bg-alb-black min-h-screen">
      {/* Hero section */}
      <section className="alb-container mb-20">
        <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
          Our Story
        </p>
        <h1 className="font-heading text-hero-lg font-bold text-alb-off-white mb-8 max-w-3xl">
          BUILT IN BERGEN COUNTY.
          <br />
          ROASTED FOR EVERYONE.
        </h1>
        <div className="w-12 h-[3px] bg-alb-olive rounded-full mb-8" />
        <p className="text-body-lg text-alb-off-white-dim max-w-2xl leading-relaxed">
          ALBANOTTE means &ldquo;from dawn to night.&rdquo; Five single-origin blends,
          each named for a moment in the Italian day. Small-batch roasted in
          Harrington Park, NJ.
        </p>
      </section>

      {/* Heritage section */}
      <section className="bg-alb-stone text-alb-charcoal py-section relative overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-[3%] font-heading font-bold uppercase whitespace-nowrap select-none pointer-events-none text-alb-charcoal/[0.03]"
          style={{ fontSize: '12vw' }}
        >
          Harrington Park
        </div>

        <div className="alb-container relative z-10">
          <div className="max-w-2xl">
            <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
              The Roots
            </p>
            <h2 className="font-heading text-section-xl font-bold mb-8">
              ITALIAN-AMERICAN. BERGEN COUNTY.
            </h2>
            <div className="space-y-5 text-body-md text-alb-charcoal/80 leading-relaxed">
              <p>
                Bergen County, New Jersey has one of the deepest Italian-American
                communities in the country. It&apos;s where Sunday dinners run
                long, where espresso is a way of life, and where quality isn&apos;t
                negotiable.
              </p>
              <p>
                ALBANOTTE is roasted in Harrington Park — a small town in the
                heart of Bergen County. Every batch is small. Every blend is
                intentional. We don&apos;t mass-produce. We don&apos;t cut
                corners. We roast fresh to order, period.
              </p>
              <p>
                The brand exists at the intersection of Italian heritage and
                American hustle — old-world craft meets new-world energy. That
                tension is what makes the coffee and the culture work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The blends */}
      <section className="py-section bg-alb-charcoal noise-texture">
        <div className="alb-container">
          <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
            The Blends
          </p>
          <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-4">
            FIVE MOMENTS IN THE DAY
          </h2>
          <p className="text-body-md text-alb-muted max-w-xl mb-10">
            Each blend is named with an Italian phrase that captures a feeling,
            a time, a state of mind. From the first light to the last sip.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Buongiorno', meaning: '"Good morning" — the first light', origin: 'Ethiopia', color: '#BFA343' },
              { name: 'Ciao a Tutti', meaning: '"Hello everyone" — the social hour', origin: 'Brazil', color: '#5C9E8F' },
              { name: 'La Dolce Vita', meaning: '"The sweet life" — the afternoon pause', origin: 'Guatemala', color: '#B87333' },
              { name: 'Senza Fretta', meaning: '"Without hurry" — the evening wind-down', origin: 'Colombia', color: '#5C6B4F' },
              { name: 'Mezzanotte', meaning: '"Midnight" — the final chapter', origin: 'Rwanda', color: '#F2F0EA' },
            ].map((blend) => (
              <div
                key={blend.name}
                className="p-6 bg-alb-surface border border-white/[0.06] rounded-alb"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: blend.color }}
                  />
                  <h3 className="font-heading text-xl font-bold uppercase text-alb-off-white">
                    {blend.name}
                  </h3>
                </div>
                <p className="text-body-sm text-alb-olive italic mb-1">
                  {blend.meaning}
                </p>
                <p className="text-body-xs text-alb-muted">
                  Origin: {blend.origin}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-section bg-alb-black">
        <div className="alb-container">
          <div className="max-w-2xl">
            <p className="text-body-xs font-body uppercase tracking-[0.15em] text-alb-olive mb-3">
              The Founder
            </p>
            <h2 className="font-heading text-section-xl font-bold text-alb-off-white mb-6">
              {SITE.founder.toUpperCase()}
            </h2>
            <div className="space-y-4 text-body-md text-alb-muted leading-relaxed">
              <p>
                Antonio built ALBANOTTE from a simple belief: great coffee
                shouldn&apos;t be complicated, but it should never be careless.
              </p>
              <p>
                What started as an obsession with sourcing and roasting turned
                into a brand that blends Italian coffee tradition with the
                energy and hustle of building something from scratch.
              </p>
            </div>

            {/* Coordinates stamp */}
            <div className="mt-10 inline-flex flex-col items-center gap-1 border border-alb-off-white/10 rounded-full px-8 py-5">
              <span className="font-heading text-xs tracking-[0.2em] text-alb-off-white/40 uppercase">
                {SITE.name}
              </span>
              <span className="font-heading text-xs tracking-[0.15em] text-alb-olive">
                ★ EST. {SITE.established} ★
              </span>
              <span className="text-body-xs text-alb-muted/40 tracking-wide mt-1">
                {SITE.coordinates.lat.toFixed(4)}°N,{' '}
                {Math.abs(SITE.coordinates.lng).toFixed(4)}°W
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
