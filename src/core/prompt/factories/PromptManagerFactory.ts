import { PromptAdapter } from "~/adapters/prompt";
import { PromptManagerImpl } from "../managers/impl/PromptManagerImpl";
import { PromptManager } from "../managers/interfaces/PromptManager";

export class PromptManagerFactory {
  public static create(adapter: PromptAdapter): PromptManager {
    return new PromptManagerImpl(adapter);
  }
}
