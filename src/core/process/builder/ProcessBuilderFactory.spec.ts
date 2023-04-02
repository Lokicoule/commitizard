import { ProcessBuilderImpl } from "./impl/ProcessBuilderImpl";
import { ProcessBuilderFactory } from "./ProcessBuilderFactory";

describe("ProcessBuilderFactory", () => {
  it("should create a ProcessBuilder", () => {
    expect(ProcessBuilderFactory.create()).toBeInstanceOf(ProcessBuilderImpl);
  });
});
