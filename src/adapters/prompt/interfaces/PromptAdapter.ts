import {
  Confirm,
  Log,
  MultiSelect,
  MultiText,
  Select,
  SelectOption,
  Text,
} from "../types";

export interface PromptAdapter {
  confirm(options: Confirm): Promise<boolean>;
  text(options: Text): Promise<string>;
  multiText(options: MultiText): Promise<string[]>;
  select<Option extends SelectOption<T>[], T>(
    options: Select<Option, T>
  ): Promise<T>;
  multiSelect<Option extends SelectOption<T>[], T>(
    options: MultiSelect<Option, T>
  ): Promise<T[]>;
  log: Log;
  intro(message: string): void;
  outro(message: string): void;
}
