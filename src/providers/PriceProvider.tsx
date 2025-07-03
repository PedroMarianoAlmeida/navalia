"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface PriceContextValue {
  isVip: boolean;
  toggleVip: () => void;
  shoppingCart: Map<string, number>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
}

const PriceContext = createContext<PriceContextValue | null>(null);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [isVip, setIsVip] = useState(false);
  const [shoppingCart, setCart] = useState<Map<string, number>>(
    () => new Map()
  );

  const toggleVip = () => setIsVip((v) => !v);

  const addItem = (id: string) =>
    setCart((prev) => {
      const next = new Map(prev);
      next.set(id, (next.get(id) ?? 0) + 1);
      return next;
    });

  const removeItem = (id: string) =>
    setCart((prev) => {
      const next = new Map(prev);
      const curr = next.get(id) ?? 0;
      if (curr <= 1) next.delete(id);
      else next.set(id, curr - 1);
      return next;
    });

  return (
    <PriceContext.Provider
      value={{
        isVip,
        toggleVip,
        shoppingCart,
        addItem,
        removeItem,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = (): PriceContextValue => {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error();
  return ctx;
};
