import { WizardCommandImpl } from "../command/wizard-command-impl";
import { WizardCommand } from "../interface/wizard-command";

export type WizardCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const defaultOptions: Required<WizardCommandFactoryOptions> = {
  name: "wizard",
  version: "0.0.1",
  description: "A CLI tool for generating commit messages",
  userConfigPath: ".commitcraftrc",
};

export class WizardCommandFactory {
  private constructor() {}

  public static create(
    options?: WizardCommandFactoryOptions & { userConfigPath?: string }
  ): WizardCommand {
    const { name, version, description, userConfigPath } =
      options || defaultOptions;

    const command = new WizardCommandImpl();
    command
      .name(name || defaultOptions.name)
      .version(version || defaultOptions.version)
      .description(description || defaultOptions.description)
      .option(
        "-c, --config <path>",
        "path to user config file",
        userConfigPath || defaultOptions.userConfigPath
      )
      .action((options: { config: string }) => command.run(options.config));

    return command;
  }
}
