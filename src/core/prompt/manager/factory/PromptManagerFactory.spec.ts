import { PromptAdapter } from "~/adapters/prompt";
import { PromptManagerImpl } from "../impl/PromptManagerImpl";
import { PromptManagerFactory } from "./PromptManagerFactory";

describe("PromptManagerFactory", () => {
  it("should create a PromptManager", () => {
    expect(PromptManagerFactory.create({} as PromptAdapter)).toBeInstanceOf(
      PromptManagerImpl
    );
  });
});
