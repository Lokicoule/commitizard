import {
  Confirm,
  Intro,
  Log,
  MultiSelect,
  MultiText,
  Outro,
  Select,
  SelectOption,
  Text,
} from "./types";

export interface PromptManager {
  confirm: (options: Confirm) => Promise<boolean>;
  text: (options: Text) => Promise<string>;
  multiText: (options: MultiText) => Promise<string[]>;
  select: <Option extends SelectOption<T>[], T>(
    options: Select<Option, T>
  ) => Promise<T>;
  multiSelect: <Option extends SelectOption<T>[], T>(
    options: MultiSelect<Option, T>
  ) => Promise<T[]>;
  intro: (options: Intro) => Promise<void>;
  outro: (options: Outro) => Promise<void>;
  log: (options: Log) => Promise<void>;
}
