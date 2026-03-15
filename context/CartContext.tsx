'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_CART_QUERY } from '@/lib/shopify/queries';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from '@/lib/shopify/mutations';
import type {
  ShopifyCart,
  ShopifyCartResponse,
  ShopifyCartCreateResponse,
  ShopifyCartLinesAddResponse,
  ShopifyCartLinesUpdateResponse,
  ShopifyCartLinesRemoveResponse,
} from '@/lib/shopify/types';

/* ============================================
   TYPES
   ============================================ */

type CartState = {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
};

type CartAction =
  | { type: 'SET_CART'; cart: ShopifyCart }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'SET_LOADING'; loading: boolean };

type CartContextType = CartState & {
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number, sellingPlanId?: string) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeCartLine: (lineId: string) => Promise<void>;
};

/* ============================================
   COOKIE HELPERS (lightweight — no dep needed)
   ============================================ */

const CART_COOKIE = 'albanotte_cart_id';

function getCartIdFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CART_COOKIE}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCartIdCookie(cartId: string): void {
  // 30 day expiry
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(
    cartId
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

/* ============================================
   REDUCER
   ============================================ */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.cart, isLoading: false };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

/* ============================================
   CONTEXT + PROVIDER
   ============================================ */

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isOpen: false,
    isLoading: false,
  });

  // Hydrate cart from cookie on mount
  useEffect(() => {
    const cartId = getCartIdFromCookie();
    if (!cartId) return;

    async function fetchCart() {
      try {
        const data = await shopifyFetch<ShopifyCartResponse>({
          query: GET_CART_QUERY,
          variables: { cartId },
          cache: 'no-store',
        });
        if (data.cart) {
          dispatch({ type: 'SET_CART', cart: data.cart });
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    }

    fetchCart();
  }, []);

  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1, sellingPlanId?: string) => {
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        const line: Record<string, unknown> = { merchandiseId: variantId, quantity };
        if (sellingPlanId) line.sellingPlanId = sellingPlanId;
        const lines = [line];

        if (state.cart?.id) {
          // Add to existing cart
          const data = await shopifyFetch<ShopifyCartLinesAddResponse>({
            query: CART_LINES_ADD_MUTATION,
            variables: { cartId: state.cart.id, lines },
            cache: 'no-store',
          });
          dispatch({ type: 'SET_CART', cart: data.cartLinesAdd.cart });
        } else {
          // Create new cart
          const data = await shopifyFetch<ShopifyCartCreateResponse>({
            query: CART_CREATE_MUTATION,
            variables: { lines },
            cache: 'no-store',
          });
          const newCart = data.cartCreate.cart;
          setCartIdCookie(newCart.id);
          dispatch({ type: 'SET_CART', cart: newCart });
        }

        dispatch({ type: 'OPEN_CART' });
      } catch (err) {
        console.error('Failed to add to cart:', err);
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [state.cart?.id]
  );

  const updateCartLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!state.cart?.id) return;
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        const data = await shopifyFetch<ShopifyCartLinesUpdateResponse>({
          query: CART_LINES_UPDATE_MUTATION,
          variables: {
            cartId: state.cart.id,
            lines: [{ id: lineId, quantity }],
          },
          cache: 'no-store',
        });
        dispatch({ type: 'SET_CART', cart: data.cartLinesUpdate.cart });
      } catch (err) {
        console.error('Failed to update cart line:', err);
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [state.cart?.id]
  );

  const removeCartLine = useCallback(
    async (lineId: string) => {
      if (!state.cart?.id) return;
      dispatch({ type: 'SET_LOADING', loading: true });

      try {
        const data = await shopifyFetch<ShopifyCartLinesRemoveResponse>({
          query: CART_LINES_REMOVE_MUTATION,
          variables: { cartId: state.cart.id, lineIds: [lineId] },
          cache: 'no-store',
        });
        dispatch({ type: 'SET_CART', cart: data.cartLinesRemove.cart });
      } catch (err) {
        console.error('Failed to remove cart line:', err);
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    },
    [state.cart?.id]
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        openCart,
        closeCart,
        addToCart,
        updateCartLine,
        removeCartLine,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
