import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { VipToggle } from "@/components/VipToggle";
import { PriceProvider } from "@/providers/PriceProvider";

export const ItemsList = async () => {
  return (
    <section>
      <PriceProvider>
        <ul className="flex flex-col gap-4  items-center">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          <VipToggle />
        </ul>
      </PriceProvider>
    </section>
  );
};
