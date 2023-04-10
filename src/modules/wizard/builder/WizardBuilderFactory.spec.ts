import { WizardBuilderImpl } from "./impl/WizardBuilderImpl";
import { WizardBuilderFactory } from "./WizardBuilderFactory";

describe("WizardBuilderFactory", () => {
  it("should create a WizardBuilder", () => {
    expect(WizardBuilderFactory.create()).toBeInstanceOf(WizardBuilderImpl);
  });
});
