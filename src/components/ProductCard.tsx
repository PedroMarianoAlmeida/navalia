// src/components/ProductCard.tsx
"use client";

import { Product } from "@/data/products";
import { usePrice } from "@/providers/PriceProvider";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { shoppingCart, addItem, removeItem, promotionItems } = usePrice();
  const qty = shoppingCart.get(product.id) ?? 0;
  const itemPrice = promotionItems.find(
    (item) => item.productID === product.id
  );
  console.log({ itemPrice });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-90">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {product.product}
            </h3>
            <p className="text-xl font-bold text-green-600 mt-1">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => removeItem(product.id)}
              className="h-8 w-8 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors text-black"
            >
              –
            </button>
            <span className="font-semibold text-lg min-w-[2rem] text-center text-gray-900">
              {qty}
            </span>
            <button
              onClick={() => addItem(product.id)}
              className="h-8 w-8 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors text-black"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <span className="text-sm text-gray-500">Subtotal:</span>
          <span className="font-semibold text-gray-900">
            {itemPrice ? "" : 0}
          </span>
        </div>
      </div>
    </div>
  );
};
