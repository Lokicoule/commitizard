import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
  text,
} from "@clack/prompts";
import { PromptManager } from "../PromptManager";
import {
  Confirm,
  Intro,
  Log,
  MultiSelect,
  Outro,
  Select,
  SelectOption,
  Text,
} from "../types";

export class PromptManagerImpl implements PromptManager {
  public async confirm({
    message,
    defaultValue,
    abortMessage,
  }: Confirm): Promise<boolean> {
    return this.cancel<boolean>(
      () =>
        confirm({
          message,
          initialValue: defaultValue,
        }),
      abortMessage
    );
  }

  public async text({
    message,
    placeholder,
    defaultValue,
    abortMessage,
  }: Text): Promise<string> {
    const result = await this.cancel<string>(
      () =>
        text({
          message,
          initialValue: defaultValue,
          placeholder,
        }),
      abortMessage
    );

    return result?.trim();
  }

  public async select<Option extends SelectOption<T>[], T>({
    message,
    options,
    defaultValue,
    abortMessage,
  }: Select<Option, T>): Promise<T> {
    return this.cancel<T>(
      () =>
        select<Option, T>({
          message,
          options,
          initialValue: defaultValue,
        }),
      abortMessage
    );
  }

  public async multiSelect<Option extends SelectOption<T>[], T>({
    message,
    options,
    required = false,
    abortMessage,
  }: MultiSelect<Option, T>): Promise<T[]> {
    return this.cancel<T[]>(
      () =>
        multiselect<Option, T>({
          message,
          options,
          required,
        }),
      abortMessage
    );
  }

  public async intro({ message }: Intro): Promise<void> {
    return intro(message);
  }

  public async outro({ message }: Outro): Promise<void> {
    return outro(message);
  }

  public async log({ message, level }: Log): Promise<void> {
    switch (level) {
      case "error":
        log.error(message);
        break;
      case "warn":
        log.warn(message);
        break;
      case "success":
        log.success(message);
        break;
      default:
        log.info(message);
        break;
    }
  }

  private async cancel<T>(
    prompt: () => Promise<T | Symbol>,
    message: string = "Press any key to go back"
  ): Promise<T> {
    const result = await prompt();

    if (isCancel(result)) {
      cancel(message);
      process.exit(0);
    }

    return result as T;
  }
}
