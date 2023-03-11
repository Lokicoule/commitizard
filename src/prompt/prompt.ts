import { confirm, select, text } from "@clack/prompts";
import { promptWithCancel } from "./promptUtils";

export type SelectOption<Value> = Value extends string | boolean | number
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

export async function promptText({
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
  const result = await promptWithCancel<string>(
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

export async function promptSelect<Option extends SelectOption<T>[], T>({
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
  return promptWithCancel<T>(
    () =>
      select<Option, T>({
        message,
        options,
        initialValue: defaultValue,
      }),
    abortMessage
  );
}

export async function promptConfirm({
  message,
  defaultValue,
  abortMessage,
}: {
  message: string;
  defaultValue?: boolean;
  abortMessage?: string;
}): Promise<boolean> {
  return promptWithCancel<boolean>(
    () =>
      confirm({
        message,
        initialValue: defaultValue,
      }),
    abortMessage
  );
}
