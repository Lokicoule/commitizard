import { PromptAdapter } from "~/adapters/prompt/PromptAdapter";
import { PromptManagerImpl } from "./impl/PromptManagerImpl";
import { PromptManagerFactory } from "./PromptManagerFactory";

describe("PromptManagerFactory", () => {
  it("should create a PromptManager", () => {
    expect(PromptManagerFactory.create({} as PromptAdapter)).toBeInstanceOf(
      PromptManagerImpl
    );
  });
});
