import { chunk } from "./chunk";

describe("chunk", () => {
  it("should chunk an array", () => {
    const result = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});
