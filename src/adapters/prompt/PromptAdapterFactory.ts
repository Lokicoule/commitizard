import { ClackPromptAdapter } from "./impl/ClackPromptAdapter";
import { PromptAdapter } from "./PromptAdapter";

export class PromptAdapterFactory {
  static createClackPromptAdapter(): PromptAdapter {
    return new ClackPromptAdapter();
  }
}
