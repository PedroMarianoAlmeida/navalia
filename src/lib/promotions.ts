import { Product } from "@/data/products";

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

/**
 * Build the “3-for-2” promotion across the entire cart:
 * for every 3 items (any mix), the cheapest one is free.
 */
export function generateRegularPromotion({
  products,
  shoppingCart,
}: PromotionOptions): PromotionItem[] {
  // 1) flatten out all item IDs
  const allItems: string[] = [];
  for (const [id, qty] of shoppingCart) {
    for (let i = 0; i < qty; i++) {
      allItems.push(id);
    }
  }

  // 2) sort by unit price ascending
  const priceMap = new Map(products.map((p) => [p.id, p.price]));
  allItems.sort((a, b) => priceMap.get(a)! - priceMap.get(b)!);

  // 3) determine which are free
  const freeCount = Math.floor(allItems.length / 3);
  const freeIds = allItems.slice(0, freeCount);

  // 4) count free occurrences per product
  const freeMap = new Map<string, number>();
  for (const id of freeIds) {
    freeMap.set(id, (freeMap.get(id) ?? 0) + 1);
  }

  // 5) build PromotionItem[] for each product in cart
  const result: PromotionItem[] = [];
  for (const p of products) {
    const qty = shoppingCart.get(p.id);
    if (!qty) continue;

    const freeQty = freeMap.get(p.id) ?? 0;
    result.push({
      productID: p.id,
      fullPriceQty: qty - freeQty,
      discountedQty: 0,
      freeQty,
    });
  }

  return result;
}

/**
 * Build the VIP 15% discount promotion:
 * everything is “discountedQty” at 85% of list price.
 */
export function generateVipPromotion({
  products,
  shoppingCart,
}: PromotionOptions): PromotionItem[] {
  return products
    .filter((p) => shoppingCart.has(p.id))
    .map((p) => {
      const qty = shoppingCart.get(p.id)!;
      return {
        productID: p.id,
        fullPriceQty: 0,
        discountedQty: qty,
        freeQty: 0,
        discountedUnitPrice: +(p.price * 0.85).toFixed(2),
      };
    });
}

/**
 * Sum up the total dollars for a set of PromotionItems.
 */
export function generateTotalPrice(
  items: PromotionItem[],
  products: Product[]
): number {
  const priceMap = new Map(products.map((p) => [p.id, p.price]));
  let total = 0;
  for (const it of items) {
    const listPrice = priceMap.get(it.productID)!;
    const unit = it.discountedUnitPrice ?? listPrice;
    total += it.fullPriceQty * listPrice + it.discountedQty * unit;
  }
  return +total.toFixed(2);
}

/**
 * Choose the best promo for VIPs, or always the regular promo for common users.
 */
export const getPromotion = ({
  products,
  shoppingCart,
  isVip,
}: PromotionOptions): PromotionItem[] => {
  const regular = generateRegularPromotion({ products, shoppingCart, isVip });
  if (!isVip) {
    return regular;
  }

  const vip = generateVipPromotion({ products, shoppingCart, isVip });
  const regularTotal = generateTotalPrice(regular, products);
  const vipTotal = generateTotalPrice(vip, products);

  return vipTotal < regularTotal ? vip : regular;
};
