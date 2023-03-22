import {
  Confirm,
  Log,
  MultiSelect,
  Select,
  SelectOption,
  Text,
} from "~/adapters/prompt/types";
import { IntroInput, LogInput, MultiText, OutroInput } from "../types";

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
  intro: (options: IntroInput) => Promise<void>;
  outro: (options: OutroInput) => Promise<void>;
  log: Log;
}
