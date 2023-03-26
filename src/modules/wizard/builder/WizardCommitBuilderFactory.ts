import { WizardCommitBuilderImpl } from "./impl/WizardCommitBuilderImpl";
import { WizardCommitBuilder } from "./WizardCommitBuilder";

export class WizardCommitBuilderFactory {
  public static create(): WizardCommitBuilder {
    return new WizardCommitBuilderImpl();
  }
}
