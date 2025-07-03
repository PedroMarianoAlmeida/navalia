import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { VipToggle } from "@/components/VipToggle";
import { PriceProvider } from "@/providers/PriceProvider";
import { Total } from "@/components/Total";
export const ItemsList = async () => {
  return (
    <section>
      <PriceProvider>
        <ul className="flex flex-col gap-4  items-center">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          <VipToggle />
          <Total />
        </ul>
      </PriceProvider>
    </section>
  );
};
