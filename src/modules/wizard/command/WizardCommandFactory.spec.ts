import { WizardCommand } from "./WizardCommand";
import { WizardCommandFactory } from "./WizardCommandFactory";

describe("WizardCommandFactory", () => {
  it("should create a WizardCommand", () => {
    expect(WizardCommandFactory.create()).toBeInstanceOf(WizardCommand);
  });
});
