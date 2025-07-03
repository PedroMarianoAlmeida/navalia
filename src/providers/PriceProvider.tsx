"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getPromotionServerAction } from "@/server/discountService";
import { products } from "@/data/products";
import {
  PromotionItem,
  PromotionOptions,
  generateTotalPrice,
} from "@/lib/promotions";

interface PriceContextValue {
  isVip: boolean;
  toggleVip: () => void;
  shoppingCart: Map<string, number>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  promotionItems: PromotionItem[];
  totalPrice: number;
}

const PriceContext = createContext<PriceContextValue | null>(null);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [isVip, setIsVip] = useState(false);
  const [shoppingCart, setCart] = useState<Map<string, number>>(
    () => new Map()
  );

  const [promotionItems, setPromotionItems] = useState<PromotionItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  console.log({ promotionItems, totalPrice });
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

  const loadPromotion = async () => {
    try {
      const items = await getPromotionServerAction({
        isVip,
        shoppingCart,
      } as Pick<PromotionOptions, "isVip" | "shoppingCart">);

      setPromotionItems(items);
      setTotalPrice(generateTotalPrice(items, products));
    } catch (err) {
      console.error(err);
      setPromotionItems([]);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    loadPromotion();
  }, [isVip, shoppingCart]);

  return (
    <PriceContext.Provider
      value={{
        isVip,
        toggleVip,
        shoppingCart,
        addItem,
        removeItem,
        promotionItems,
        totalPrice,
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
