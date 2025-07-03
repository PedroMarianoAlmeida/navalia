import { PromotionItem } from "@/lib/promotions";

interface SubtotalProps {
  itemFullPrice: number;
  promotionItem: PromotionItem;
}

export const Subtotal = ({
  itemFullPrice,
  promotionItem: { fullPriceQty, discountedQty, freeQty, discountedUnitPrice },
}: SubtotalProps) => {
  const totalQty = fullPriceQty + discountedQty + freeQty;

  const fullTotal = totalQty * itemFullPrice;

  const discountedTotal =
    fullPriceQty * itemFullPrice +
    discountedQty * (discountedUnitPrice ?? itemFullPrice);

  const hasDiscountOrFree = freeQty > 0 || discountedQty > 0;
  return (
    <div className="flex flex-col items-end">
      {hasDiscountOrFree ? (
        <>
          <span className="text-sm text-gray-400 line-through">
            ${fullTotal.toFixed(2)}
          </span>

          <span className="text-lg font-semibold text-gray-900">
            ${discountedTotal.toFixed(2)}
          </span>

          <div className="mt-1 flex space-x-2">
            {freeQty > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                +{freeQty} Free
              </span>
            )}
            {discountedQty > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                {discountedQty}×15% off
              </span>
            )}
          </div>
        </>
      ) : (
        <span className="text-lg font-semibold text-gray-900">
          ${fullTotal.toFixed(2)}
        </span>
      )}
    </div>
  );
};
