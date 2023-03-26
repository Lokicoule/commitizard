import { ConfigurationService } from "~/core/configuration";
import { WizardCommand } from "./WizardCommand";

describe("WizardCommand", () => {
  it("should be defined", () => {
    expect(WizardCommand).toBeDefined();
  });

  it("should be instantiable", () => {
    const configurationService = {} as ConfigurationService;
    const wizardCommand = new WizardCommand(configurationService);
    expect(wizardCommand).toBeInstanceOf(WizardCommand);
  });

  it("should configure the command", () => {
    const configurationService = {} as ConfigurationService;
    const wizardCommand = new WizardCommand(configurationService);
    expect(wizardCommand.name()).toEqual("wizard");
    expect(wizardCommand.description()).toEqual(
      "A CLI tool for generating commit messages"
    );
  });

  it("should add the red-green-refactor subcommand", () => {
    const configurationService = {} as ConfigurationService;
    const wizardCommand = new WizardCommand(configurationService);
    const subcommand = wizardCommand.commands.find(
      (command) => command.name() === "red-green-refactor"
    );
    expect(subcommand).toBeDefined();
    expect(subcommand?.aliases()).toEqual(["rg", "rgr", "tdd"]);
    expect(subcommand?.description()).toEqual(
      "Commit message generator following the red-green-refactor pattern"
    );
  });

  it("should add the conventional subcommand", () => {
    const configurationService = {} as ConfigurationService;
    const wizardCommand = new WizardCommand(configurationService);
    const subcommand = wizardCommand.commands.find(
      (command) => command.name() === "conventional"
    );
    expect(subcommand).toBeDefined();
    expect(subcommand?.aliases()).toEqual([
      "conv",
      "convention",
      "cv",
      "cc",
      "c",
    ]);
    expect(subcommand?.description()).toEqual(
      "Commit message generator following the conventional pattern"
    );
  });
});
