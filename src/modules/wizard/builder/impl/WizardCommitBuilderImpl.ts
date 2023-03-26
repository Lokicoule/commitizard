import { WizardCommit } from "../../types";
import { WizardCommitBuilder } from "../WizardCommitBuilder";

export class WizardCommitBuilderImpl implements WizardCommitBuilder {
  private message = "";
  private files: string[] = [];

  public withMessage(message: string): WizardCommitBuilder {
    this.message = message;
    return this;
  }

  public withFiles(files: string[]): WizardCommitBuilder {
    this.files = files;
    return this;
  }

  public build(): WizardCommit {
    return {
      message: this.message,
      files: this.files,
    };
  }
}
