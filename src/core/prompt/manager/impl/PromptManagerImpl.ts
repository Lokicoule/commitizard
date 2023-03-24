import { bgCyan, black } from "picocolors";
import { PromptAdapter } from "~/adapters/prompt/PromptAdapter";
import {
  Confirm,
  MultiSelect,
  MultiText,
  Select,
  SelectOption,
  Text,
} from "~/adapters/prompt/types";
import { IntroInput, OutroInput } from "../../types";
import { PromptManager } from "../PromptManager";

export class PromptManagerImpl implements PromptManager {
  private readonly adapter: PromptAdapter;

  constructor(adapter: PromptAdapter) {
    this.adapter = adapter;
  }

  public async confirm({
    message,
    defaultValue = false,
    abortMessage,
  }: Confirm): Promise<boolean> {
    return this.adapter.confirm({
      message,
      defaultValue,
      abortMessage,
    });
  }

  public async text({
    message,
    placeholder,
    defaultValue,
    abortMessage,
    validate,
  }: Text): Promise<string> {
    return this.adapter.text({
      message,
      placeholder,
      defaultValue,
      abortMessage,
      validate,
    });
  }

  public async multiText(options: MultiText): Promise<string[]> {
    return this.adapter.multiText(options);
  }

  public async select<Option extends SelectOption<T>[], T>(
    options: Select<Option, T>
  ): Promise<T> {
    return this.adapter.select(options);
  }

  public async multiSelect<Option extends SelectOption<T>[], T>({
    message,
    options,
    required = false,
    abortMessage,
  }: MultiSelect<Option, T>): Promise<T[]> {
    return this.adapter.multiSelect({
      message,
      options,
      required,
      abortMessage,
    });
  }

  public async intro({ message }: IntroInput): Promise<void> {
    return this.adapter.intro(bgCyan(black(message)));
  }

  public async outro({ message }: OutroInput): Promise<void> {
    return this.adapter.outro(bgCyan(black(message)));
  }

  public log: {
    info: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    success: (message: string) => void;
  } = {
    info: (message) => this.adapter.log.info(message),
    error: (message) => this.adapter.log.error(message),
    warn: (message) => this.adapter.log.warn(message),
    success: (message) => this.adapter.log.success(message),
  };
}
