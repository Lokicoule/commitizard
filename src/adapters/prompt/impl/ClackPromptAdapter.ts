import {
  cancel as clackCancel,
  confirm as clackConfirm,
  intro as clackIntro,
  isCancel as clackIsCancel,
  log as clackLog,
  multiselect as clackMultiselect,
  outro as clackOutro,
  select as clackSelect,
  text as clackText,
} from "@clack/prompts";
import { PromptAdapter } from "../PromptAdapter";

import {
  Confirm,
  Log,
  MultiSelect,
  Select,
  SelectOption,
  Text,
} from "../types";

export class ClackPromptAdapter implements PromptAdapter {
  public async confirm({
    message,
    defaultValue,
    abortMessage,
  }: Confirm): Promise<boolean> {
    return this.prompt<boolean>(
      async () =>
        await clackConfirm({
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
    const result = await this.prompt<string>(
      async () =>
        await clackText({
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
    return this.prompt<T>(
      async () =>
        await clackSelect<Option, T>({
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
    return this.prompt<T[]>(
      async () =>
        await clackMultiselect<Option, T>({
          message,
          options,
          required,
        }),
      abortMessage
    );
  }

  public async intro(message: string): Promise<void> {
    return clackIntro(message);
  }

  public async outro(message: string): Promise<void> {
    return clackOutro(message);
  }

  log: Log = {
    info: (message: string) => clackLog.info(message),
    warn: (message: string) => clackLog.warn(message),
    error: (message: string) => clackLog.error(message),
    success: (message: string) => clackLog.success(message),
  };

  private async prompt<T>(
    prompt: () => Promise<T | Symbol>,
    abortMessage?: string
  ): Promise<T> {
    const result = await prompt();

    if (clackIsCancel(result)) {
      if (abortMessage) {
        clackCancel(abortMessage);
      }
      process.exit(0);
    }

    return result as T;
  }
}
