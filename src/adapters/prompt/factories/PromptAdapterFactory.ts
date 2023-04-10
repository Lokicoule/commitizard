import { ClackPromptAdapter } from "../impl/ClackPromptAdapter";
import { PromptAdapter } from "../interfaces/PromptAdapter";

export class PromptAdapterFactory {
  static createClackPromptAdapter(): PromptAdapter {
    return new ClackPromptAdapter();
  }
}
