import { createContext, useContext, useMemo, useState } from 'react';

type CartContextValue = {
  itemCount: number;
  setItemCount: (count: number) => void;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0);

  const value = useMemo<CartContextValue>(() => {
    return {
      itemCount,
      setItemCount: (count) => setItemCount(Math.max(0, Math.floor(count))),
      increment: (by = 1) => setItemCount((c) => Math.max(0, c + Math.max(0, Math.floor(by)))),
      decrement: (by = 1) => setItemCount((c) => Math.max(0, c - Math.max(0, Math.floor(by)))),
      clear: () => setItemCount(0),
    };
  }, [itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

