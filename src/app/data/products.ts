export interface Product {
  id: string;
  product: string;
  price: number;
}

export const products: Product[] = [
  { id: "1", product: "T-shirt", price: 35.99 },
  { id: "2", product: "Jeans", price: 65.5 },
  { id: "3", product: "Dress", price: 80.75 },
];
