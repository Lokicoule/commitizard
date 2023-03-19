export enum RedGreenCommitState {
  CUSTOM_SUBJECT_INPUT = "custom_subject_input",
  PATTERN_GROUP_SELECTION = "pattern_group_selection",
  PATTERN_SUBJECT_SELECTION = "pattern_subject_selection",
  FEATURE_SUBJECT_INPUT = "feature_subject_input",
  TYPE_SELECTION = "type_selection",
}

export type RedGreenCommitTypeLowercase =
  | "red"
  | "green"
  | "refactor"
  | "initial";
export type RedGreenCommitTypeUppercase =
  | "RED"
  | "GREEN"
  | "REFACTOR"
  | "INITIAL";
export type RedGreenCommitType =
  | RedGreenCommitTypeLowercase
  | RedGreenCommitTypeUppercase;

export interface RedGreenCommitStateMachine {
  handleCommit(): void;
  setMessage(message: string): void;
  getMessage(): string;
  setType(type: Omit<RedGreenCommitType, "INITIAL" | "initial">): void;
  getType(): RedGreenCommitType;
}
