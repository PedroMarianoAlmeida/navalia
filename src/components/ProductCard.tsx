import { Product } from "@/data/products";

export const ProductCard = ({
  product: { price, product },
}: {
  product: Product;
}) => {
  const quantity = 0; // Will be fetched from local storage
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{product}</h3>
            <p className="text-xl font-bold text-green-600 mt-1">
              ${price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-8 w-8 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors">
              -
            </button>

            <span className="font-semibold text-lg min-w-[2rem] text-center text-gray-900">
              {0}
            </span>

            <button className="h-8 w-8 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-colors">
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">Subtotal:</span>
          <span className="font-semibold text-gray-900">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
