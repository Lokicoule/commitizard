import { WizardBuilderImpl } from "./impl/WizardBuilderImpl";
import { WizardBuilder } from "./WizardBuilder";

export class WizardBuilderFactory {
  public static create(): WizardBuilder {
    return new WizardBuilderImpl();
  }
}
