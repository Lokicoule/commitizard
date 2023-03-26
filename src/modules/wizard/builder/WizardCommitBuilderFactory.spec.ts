import { WizardCommitBuilderImpl } from "./impl/WizardCommitBuilderImpl";
import { WizardCommitBuilderFactory } from "./WizardCommitBuilderFactory";

describe("WizardCommitBuilderFactory", () => {
  it("should create a WizardCommitBuilder", () => {
    expect(WizardCommitBuilderFactory.create()).toBeInstanceOf(
      WizardCommitBuilderImpl
    );
  });
});
