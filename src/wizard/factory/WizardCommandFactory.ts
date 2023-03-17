import { DEFAULT_CONFIG_PATH } from "../../config";
import { Container } from "../../core/container";
import { WizardCommandImpl } from "../command/impl/WizardCommandImpl";
import { WizardCommand } from "../command/WizardCommand";
import { WizardModule } from "../WizardModule";

export type WizardCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const DEFAULT_OPTIONS: Required<WizardCommandFactoryOptions> = {
  name: "wizard",
  version: "0.0.1",
  description: "A CLI tool for generating commit messages",
  userConfigPath: DEFAULT_CONFIG_PATH,
};

export class WizardCommandFactory {
  private static defaultOptions = DEFAULT_OPTIONS;

  public static create(options?: WizardCommandFactoryOptions): WizardCommand {
    const { name, version, description, userConfigPath } = Object.assign(
      {},
      this.defaultOptions,
      options
    );

    const wizardModule = new WizardModule(Container.getInstance());
    wizardModule.register();

    const command = wizardModule.getWizardCommand();

    command
      .name(name ?? this.defaultOptions.name)
      .version(version ?? this.defaultOptions.version)
      .description(description ?? this.defaultOptions.description)
      .option(
        "-c, --config <path>",
        "path to user config file",
        userConfigPath ?? this.defaultOptions.userConfigPath
      )
      .action((options: { config: string }) => command.run(options.config));
    return command;
  }
}
