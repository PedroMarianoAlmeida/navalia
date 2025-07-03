import { Product } from "@/app/data/products";

interface PromotionOptions {
  products: Product[];
  shoppingCart: Map<Product["id"], number>;
  isVip: boolean;
}

interface PromotionItem {
  productID: Product["id"];
  fullPriceQty: number;
  discountedQty: number;
  freeQty: number;
  discountedUnitPrice?: number;
}

const getPromotion = ({
  products,
  isVip,
  shoppingCart,
}: PromotionOptions): PromotionItem[] => {};
