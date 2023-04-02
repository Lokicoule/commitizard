import { ClackPromptAdapter } from "./impl/ClackPromptAdapter";
import { PromptAdapterFactory } from "./PromptAdapterFactory";

describe("PromptAdapterFactory", () => {
  it("should create a PromptAdapter", () => {
    expect(PromptAdapterFactory.createClackPromptAdapter()).toBeInstanceOf(
      ClackPromptAdapter
    );
  });
});
