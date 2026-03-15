'use client';

import type { ShopifyVariant } from '@/lib/shopify/types';

type VariantSelectorProps = {
  variants: ShopifyVariant[];
  selected: string;
  onSelect: (variantId: string) => void;
  accentColor?: string;
};

export default function VariantSelector({
  variants,
  selected,
  onSelect,
  accentColor = '#5C6B4F',
}: VariantSelectorProps) {
  // Auto-detect the option name from the first variant
  const optionName =
    variants[0]?.selectedOptions?.[0]?.name ?? 'Option';

  return (
    <div>
      <p className="text-body-xs font-body uppercase tracking-[0.12em] text-alb-muted mb-3">
        {optionName}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isActive = variant.id === selected;
          const label =
            variant.selectedOptions?.[0]?.value ?? variant.title;

          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant.id)}
              disabled={!variant.availableForSale}
              className={`relative px-4 py-3 rounded-alb text-body-sm font-body font-medium transition-all duration-300 min-h-[44px] ${
                !variant.availableForSale
                  ? 'opacity-30 cursor-not-allowed border border-white/[0.06] text-alb-muted'
                  : isActive
                  ? 'text-alb-off-white border-2'
                  : 'text-alb-muted border border-white/[0.08] hover:border-white/[0.15] hover:text-alb-off-white'
              }`}
              style={
                isActive
                  ? { borderColor: accentColor, background: `${accentColor}15` }
                  : undefined
              }
            >
              {label}
              {!variant.availableForSale && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-px bg-alb-muted/30 rotate-[-12deg]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
