"use client";
import { usePrice } from "@/providers/PriceProvider";

export const Total = () => {
  const { totalPrice } = usePrice();
  return <p className="text-xl font-semibold ">${totalPrice.toFixed(2)}</p>;
};
