import { WizardBuilder } from "../interfaces/wizard-builder";
import { WizardBuilderImpl } from "../builder/wizard-builder-impl";

export class WizardBuilderFactory {
  static create(): WizardBuilder {
    return new WizardBuilderImpl();
  }
}
