export function sum(a: number, b: number): number {
  return a + b;
}

describe("sum", () => {
  it("returns 4 when adding 2 + 2", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
