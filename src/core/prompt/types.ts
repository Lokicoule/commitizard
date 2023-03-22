import { Confirm, Text } from "~/adapters/prompt/types";

export type MultiText = {
  text: Text;
  confirm: Confirm;
};

export type IntroInput = {
  message: string;
};

export type OutroInput = {
  message: string;
};

export type LogInput = {
  message: string;
};
