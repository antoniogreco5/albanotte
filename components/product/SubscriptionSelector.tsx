'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SellingPlan } from '@/lib/shopify/types';

type SubscriptionSelectorProps = {
  accentColor: string;
  sellingPlans: SellingPlan[];
  onSellingPlanChange?: (sellingPlanId: string | null) => void;
};

function getDiscount(plan: SellingPlan): number {
  return plan.priceAdjustments?.[0]?.adjustmentValue?.adjustmentPercentage ?? 0;
}

function getFrequencyLabel(plan: SellingPlan): string {
  // Try to extract from options first (e.g. "Every 2 weeks")
  const option = plan.options?.find((o) => o.name === 'Delivery every' || o.name === 'Billing every');
  if (option) return `Every ${option.value}`;
  // Fallback to plan name
  return plan.name;
}

export default function SubscriptionSelector({
  accentColor,
  sellingPlans,
  onSellingPlanChange,
}: SubscriptionSelectorProps) {
  const [type, setType] = useState<'one-time' | 'subscription'>('one-time');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(sellingPlans[0]?.id ?? '');

  // If no selling plans, don't render
  if (!sellingPlans || sellingPlans.length === 0) return null;

  const handleTypeChange = (newType: 'one-time' | 'subscription') => {
    setType(newType);
    onSellingPlanChange?.(newType === 'subscription' ? selectedPlanId : null);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    onSellingPlanChange?.(planId);
  };

  return (
    <div className="mb-6">
      {/* Toggle */}
      <div className="flex bg-alb-surface border border-white/[0.06] rounded-alb p-1 mb-4">
        <button
          onClick={() => handleTypeChange('one-time')}
          className={`flex-1 py-3 rounded-alb text-body-sm font-body font-medium transition-all duration-300 min-h-[44px] ${
            type === 'one-time'
              ? 'bg-white/[0.08] text-alb-off-white'
              : 'text-alb-muted hover:text-alb-off-white'
          }`}
        >
          One-Time
        </button>
        <button
          onClick={() => handleTypeChange('subscription')}
          className={`flex-1 py-3 rounded-alb text-body-sm font-body font-medium transition-all duration-300 relative min-h-[44px] ${
            type === 'subscription'
              ? 'text-alb-off-white'
              : 'text-alb-muted hover:text-alb-off-white'
          }`}
          style={
            type === 'subscription'
              ? { background: `${accentColor}15`, border: `1px solid ${accentColor}30` }
              : undefined
          }
        >
          Subscribe & Save
        </button>
      </div>

      {/* Frequency options */}
      <AnimatePresence>
        {type === 'subscription' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[0.6875rem] font-body uppercase tracking-[0.1em] text-alb-muted mb-2.5">
              Delivery Frequency
            </p>
            <div className="space-y-2 mb-4">
              {sellingPlans.map((plan) => {
                const discount = getDiscount(plan);
                const label = getFrequencyLabel(plan);
                const isActive = plan.id === selectedPlanId;

                return (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-alb text-body-sm font-body transition-all duration-300 min-h-[48px] ${
                      isActive
                        ? 'bg-white/[0.06] border-2 text-alb-off-white'
                        : 'border border-white/[0.06] text-alb-muted hover:text-alb-off-white'
                    }`}
                    style={isActive ? { borderColor: `${accentColor}50` } : undefined}
                  >
                    <span>{label}</span>
                    {discount > 0 && (
                      <span
                        className="text-body-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${accentColor}20`, color: accentColor }}
                      >
                        Save {discount}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="bg-alb-surface/50 border border-white/[0.04] rounded-alb p-3 flex items-start gap-2.5">
              <span className="text-alb-olive text-sm mt-0.5">✦</span>
              <div>
                <p className="text-body-xs text-alb-off-white/70 font-medium">
                  Never run out of your favorite roast
                </p>
                <p className="text-body-xs text-alb-muted/60 mt-0.5">
                  Skip, swap, or cancel anytime. No commitment.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
