import { PromptAdapter } from "~/adapters/prompt/PromptAdapter";
import {
  Confirm,
  Log,
  MultiSelect,
  Select,
  SelectOption,
  Text,
} from "~/adapters/prompt/types";
import { IntroInput, LogInput, MultiText, OutroInput } from "../../types";
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
  }: Text): Promise<string> {
    return this.adapter.text({
      message,
      placeholder,
      defaultValue,
      abortMessage,
    });
  }

  public async multiText({ text, confirm }: MultiText): Promise<string[]> {
    let lines: Array<string> = [];

    while (true) {
      const result = await this.adapter.text(text);

      if (result) {
        lines.push(result);
      }

      const isContinue = await this.adapter.confirm(confirm);

      if (!isContinue) {
        break;
      }
    }

    return lines;
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
    return this.adapter.intro(message);
  }

  public async outro({ message }: OutroInput): Promise<void> {
    return this.adapter.outro(message);
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
