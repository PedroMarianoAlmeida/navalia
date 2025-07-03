import { Product } from "@/app/data/products";

export interface PromotionOptions {
  products: Product[];
  shoppingCart: Map<Product["id"], number>;
  isVip: boolean;
}

export interface PromotionItem {
  productID: Product["id"];
  fullPriceQty: number;
  discountedQty: number;
  freeQty: number;
  discountedUnitPrice?: number;
}

export const getPromotion = ({
  products,
  isVip,
  shoppingCart,
}: PromotionOptions): PromotionItem[] => {};
