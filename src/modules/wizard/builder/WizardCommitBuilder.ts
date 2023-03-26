import { WizardCommit } from "../types";

export interface WizardCommitBuilder {
  withMessage(message: string): WizardCommitBuilder;
  withFiles(files: string[]): WizardCommitBuilder;
  build(): WizardCommit;
}
