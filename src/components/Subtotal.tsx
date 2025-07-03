import { PromotionItem } from "@/lib/promotions";

interface SubtotalProps {
  itemFullPrice: number;
  promotionItem: PromotionItem;
}

export const Subtotal = ({ itemFullPrice, promotionItem }: SubtotalProps) => {
  return <p>Price</p>;
};
