import { cancel, confirm, isCancel, log, select, text } from "@clack/prompts";

type SelectOption<Value> = Value extends string | boolean | number
  ? {
      value: Value;
      label?: string;
      hint?: string;
    }
  : {
      value: Value;
      label: string;
      hint?: string;
    };

export class PromptHelper {
  public static async log(
    message: string,
    level: "error" | "warn" | "success" | "info" = "info"
  ): Promise<void> {
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

  public static async promptText({
    message,
    placeholder,
    defaultValue,
    abortMessage,
  }: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    abortMessage?: string;
  }): Promise<string> {
    const result = await this.promptWithCancel<string>(
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

  public static async promptSelect<Option extends SelectOption<T>[], T>({
    message,
    options,
    defaultValue,
    abortMessage,
  }: {
    message: string;
    options: Option;
    defaultValue?: T;
    abortMessage?: string;
  }): Promise<T> {
    return this.promptWithCancel<T>(
      () =>
        select<Option, T>({
          message,
          options,
          initialValue: defaultValue,
        }),
      abortMessage
    );
  }

  public static async promptConfirm({
    message,
    defaultValue,
    abortMessage,
  }: {
    message: string;
    defaultValue?: boolean;
    abortMessage?: string;
  }): Promise<boolean> {
    return this.promptWithCancel<boolean>(
      () =>
        confirm({
          message,
          initialValue: defaultValue,
        }),
      abortMessage
    );
  }

  private static async promptWithCancel<T>(
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
