'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice, getFreeShippingProgress } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SITE } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateCartLine, removeCartLine, isLoading } =
    useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const subtotal = parseFloat(cart?.cost.subtotalAmount.amount ?? '0');
  const shipping = getFreeShippingProgress(subtotal, FREE_SHIPPING_THRESHOLD);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-alb-charcoal border-l border-white/[0.06] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="font-heading text-lg font-bold uppercase tracking-[0.05em] text-alb-off-white">
                Your Cart
                {cart && cart.totalQuantity > 0 && (
                  <span className="text-alb-muted ml-2 text-sm font-body font-normal lowercase tracking-normal">
                    ({cart.totalQuantity})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="text-alb-muted hover:text-alb-off-white transition-colors text-lg"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Free shipping progress */}
            <div className="px-6 py-3 bg-alb-surface/50">
              {shipping.qualified ? (
                <p className="text-body-xs text-alb-olive font-medium text-center">
                  ✓ You&apos;ve unlocked free shipping!
                </p>
              ) : (
                <>
                  <p className="text-body-xs text-alb-muted text-center mb-2">
                    {formatPrice(shipping.remaining.toString())} away from free shipping
                  </p>
                  <div className="w-full h-1 bg-alb-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-alb-olive rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${shipping.progress}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl mb-4">☕</span>
                  <p className="font-heading text-lg font-bold uppercase text-alb-off-white mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-body-sm text-alb-muted mb-6">
                    Time to find your roast.
                  </p>
                  <Link
                    href="/collections/drop001"
                    onClick={closeCart}
                    className="alb-btn-primary text-xs"
                  >
                    Shop Coffee
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => {
                    const imageUrl =
                      line.merchandise.product.images.edges[0]?.node.url;
                    return (
                      <li
                        key={line.id}
                        className="flex gap-4 pb-4 border-b border-white/[0.04] last:border-0"
                      >
                        {/* Image */}
                        {imageUrl && (
                          <div className="w-20 h-20 bg-alb-surface rounded-alb overflow-hidden flex-shrink-0">
                            <Image
                              src={imageUrl}
                              alt={line.merchandise.product.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-alb-off-white truncate">
                            {line.merchandise.product.title}
                          </p>
                          <p className="text-body-xs text-alb-muted mt-0.5">
                            {line.merchandise.title}
                          </p>
                          {/* Subscription badge */}
                          {line.sellingPlanAllocation?.sellingPlan && (
                            <p className="text-[0.5625rem] font-body text-alb-olive mt-1 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-alb-olive" />
                              {line.sellingPlanAllocation.sellingPlan.name}
                            </p>
                          )}
                          {/* Price — show discounted if subscription */}
                          <div className="flex items-baseline gap-2 mt-1">
                            {line.sellingPlanAllocation?.priceAdjustments?.[0] ? (
                              <>
                                <span className="text-body-sm text-alb-olive font-medium">
                                  {formatPrice(line.sellingPlanAllocation.priceAdjustments[0].price.amount)}
                                </span>
                                <span className="text-[0.625rem] text-alb-muted/40 line-through">
                                  {formatPrice(line.merchandise.price.amount)}
                                </span>
                              </>
                            ) : (
                              <span className="text-body-sm text-alb-off-white">
                                {formatPrice(line.merchandise.price.amount)}
                              </span>
                            )}
                          </div>

                          {/* Quantity stepper + remove */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-white/[0.08] rounded-alb">
                              <button
                                onClick={() =>
                                  line.quantity === 1
                                    ? removeCartLine(line.id)
                                    : updateCartLine(line.id, line.quantity - 1)
                                }
                                className="px-3 py-2 text-body-sm text-alb-muted hover:text-alb-off-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                                disabled={isLoading}
                              >
                                −
                              </button>
                              <span className="px-2 py-2 text-body-sm text-alb-off-white min-w-[2rem] text-center">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartLine(line.id, line.quantity + 1)
                                }
                                className="px-3 py-2 text-body-sm text-alb-muted hover:text-alb-off-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                                disabled={isLoading}
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeCartLine(line.id)}
                              className="text-body-xs text-alb-muted/50 hover:text-alb-muted-red transition-colors py-1 px-1"
                              disabled={isLoading}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer — subtotal + checkout */}
            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-white/[0.06] bg-alb-surface/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-sm uppercase tracking-[0.05em] text-alb-off-white">
                    Subtotal
                  </span>
                  <span className="font-heading text-lg font-bold text-alb-off-white">
                    {formatPrice(cart?.cost.subtotalAmount.amount ?? '0')}
                  </span>
                </div>
                <p className="text-body-xs text-alb-muted mb-3">
                  Shipping & taxes calculated at checkout
                </p>
                <a
                  href="/membership"
                  className="flex items-center gap-2 px-3 py-2.5 bg-alb-olive/[0.06] border border-alb-olive/[0.12] rounded-alb mb-4 group hover:border-alb-olive/25 transition-all"
                >
                  <span className="w-1 h-1 rounded-full bg-alb-olive shrink-0" />
                  <span className="text-[0.625rem] font-body text-alb-muted group-hover:text-alb-off-white transition-colors">
                    Members save up to 15% + free shipping
                  </span>
                  <span className="ml-auto text-[0.5625rem] text-alb-olive">→</span>
                </a>
                <a
                  href={cart?.checkoutUrl}
                  className="alb-btn-primary w-full text-center block"
                >
                  Checkout
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
