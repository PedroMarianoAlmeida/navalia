import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const ItemsList = async () => {
  return (
    <ul className="flex flex-col gap-4 max-w-2xl">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </ul>
  );
};
