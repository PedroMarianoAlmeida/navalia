"use server";

import { products } from "@/data/products";
import { getPromotion, PromotionOptions } from "@/lib/promotions";

export const getPromotionServerAction = async ({
  isVip,
  shoppingCart,
}: Pick<PromotionOptions, "isVip" | "shoppingCart">) => {
  // products from server side and interactive data from client side params
  return getPromotion({ isVip, products, shoppingCart });
};
