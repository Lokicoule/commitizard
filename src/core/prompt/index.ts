import { PromptAdapter } from "~/adapters/prompt";
import { PromptManager } from "./interface/PromptManager";
import { PromptManagerImpl } from "./manager/PromptManagerImpl";

export { PromptManager };

export function createPromptManager(adapter: PromptAdapter): PromptManager {
  return PromptManagerImpl.create(adapter);
}
