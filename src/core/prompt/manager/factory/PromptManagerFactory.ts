import { PromptAdapter } from "~/adapters/prompt";
import { PromptManagerImpl } from "../impl/PromptManagerImpl";
import { PromptManager } from "../PromptManager";

export class PromptManagerFactory {
  public static create(adapter: PromptAdapter): PromptManager {
    return new PromptManagerImpl(adapter);
  }
}
