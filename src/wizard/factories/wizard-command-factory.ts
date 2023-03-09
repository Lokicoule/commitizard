import { WizardCommandImpl } from "../command/wizard-command-impl";
import { WizardCommand } from "../interfaces/wizard-command";

export type WizardCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
};

const defaultOptions: Required<WizardCommandFactoryOptions> = {
  name: "wizard",
  version: "0.0.1",
  description: "A CLI tool for generating commit messages",
};

export class WizardCommandFactory {
  private constructor() {}

  public static create(options?: WizardCommandFactoryOptions): WizardCommand {
    const { name, version, description } = options || defaultOptions;

    const command = new WizardCommandImpl();
    command
      .name(name || defaultOptions.name)
      .version(version || defaultOptions.version)
      .description(description || defaultOptions.description)
      .action(() => command.run());

    return command;
  }
}
