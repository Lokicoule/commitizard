import { Wizard } from "./types";

export interface WizardBuilder {
  withMessage(message: string): WizardBuilder;
  withFiles(files: string[]): WizardBuilder;
  build(): Wizard;
}
