import { PromptAdapter } from "~/adapters/prompt";
import { PromptManagerFactory } from "../../factories";
import { PromptManagerImpl } from "../../managers/impl/PromptManagerImpl";

describe("PromptManagerFactory", () => {
  it("should create a PromptManager", () => {
    expect(PromptManagerFactory.create({} as PromptAdapter)).toBeInstanceOf(
      PromptManagerImpl
    );
  });
});
