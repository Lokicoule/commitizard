import { Wizard } from "../types";
import { WizardBuilder } from "../WizardBuilder";

export class WizardBuilderImpl implements WizardBuilder {
  private message = "";
  private files: string[] = [];

  public withMessage(message: string): WizardBuilder {
    this.message = message;
    return this;
  }

  public withFiles(files: string[]): WizardBuilder {
    this.files = files;
    return this;
  }

  public build(): Wizard {
    return {
      message: this.message,
      files: this.files,
    };
  }
}
