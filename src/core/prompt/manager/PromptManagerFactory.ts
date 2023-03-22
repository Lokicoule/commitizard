import { PromptAdapter } from "~/adapters/prompt/PromptAdapter";
import { PromptManagerImpl } from "./impl/PromptManagerImpl";
import { PromptManager } from "./PromptManager";

export class PromptManagerFactory {
  static create(promptAdapter: PromptAdapter): PromptManager {
    return new PromptManagerImpl(promptAdapter);
  }
}
