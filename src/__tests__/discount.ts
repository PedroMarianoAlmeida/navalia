import {
  getPromotion,
  PromotionOptions,
  PromotionItem,
} from "../lib/promotions";

import { products } from "../data/products";

describe("getPromotion", () => {
  it("Scenario 1: common customer with 3 t-shirts", () => {
    const options: PromotionOptions = {
      products,
      shoppingCart: new Map([["1", 3]]), // 3 × T-shirt
      isVip: false,
    };

    const expected: PromotionItem[] = [
      {
        productID: "1",
        fullPriceQty: 2,
        discountedQty: 0,
        freeQty: 1,
      },
    ];

    expect(getPromotion(options)).toEqual(expected);
  });

  it("Scenario 2: common customer with 2 t-shirts and 2 jeans", () => {
    const options: PromotionOptions = {
      products,
      shoppingCart: new Map([
        ["1", 2], // 2 × T-shirt
        ["2", 2], // 2 × Jeans
      ]),
      isVip: false,
    };

    const expected: PromotionItem[] = [
      {
        productID: "1",
        fullPriceQty: 1, // 2 Tshirts − 1 free
        discountedQty: 0,
        freeQty: 1,
      },
      {
        productID: "2",
        fullPriceQty: 2,
        discountedQty: 0,
        freeQty: 0,
      },
    ];

    expect(getPromotion(options)).toEqual(expected);
  });

  it("Scenario 3: VIP customer with 3 dresses (should pick 3-for-2)", () => {
    const options: PromotionOptions = {
      products,
      shoppingCart: new Map([["3", 3]]), // 3 × Dress
      isVip: true,
    };

    const expected: PromotionItem[] = [
      {
        productID: "3",
        fullPriceQty: 2, // pay for 2 dresses
        discountedQty: 0,
        freeQty: 1,
      },
    ];

    expect(getPromotion(options)).toEqual(expected);
  });

  it("Scenario 4: VIP customer with 2 jeans and 2 dresses (3-for-2 is best)", () => {
    const options: PromotionOptions = {
      products,
      shoppingCart: new Map([
        ["2", 2], // 2 × Jeans
        ["3", 2], // 2 × Dress
      ]),
      isVip: true,
    };

    const expected: PromotionItem[] = [
      {
        productID: "2",
        fullPriceQty: 1, // 2 Jeans − 1 free (cheapest)
        discountedQty: 0,
        freeQty: 1,
      },
      {
        productID: "3",
        fullPriceQty: 2,
        discountedQty: 0,
        freeQty: 0,
      },
    ];

    expect(getPromotion(options)).toEqual(expected);
  });

  it("Scenario 5: VIP customer with 4 t-shirts and 1 jeans (3-for-2 is best)", () => {
    const options: PromotionOptions = {
      products,
      shoppingCart: new Map([
        ["1", 4], // 4 × T-shirt
        ["2", 1], // 1 × Jeans
      ]),
      isVip: true,
    };

    const expected: PromotionItem[] = [
      {
        productID: "1",
        fullPriceQty: 3, // 4 Tshirts − 1 free
        discountedQty: 0,
        freeQty: 1,
      },
      {
        productID: "2",
        fullPriceQty: 1,
        discountedQty: 0,
        freeQty: 0,
      },
    ];

    expect(getPromotion(options)).toEqual(expected);
  });
});
