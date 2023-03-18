import { DEFAULT_CONFIG_PATH } from "../../../core/config";
import { SmartCommitCommandImpl } from "../command/impl/SmartCommitCommandImpl";
import { SmartCommitCommand } from "../command/SmartCommitCommand";

export type SmartCommitCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const DEFAULT_OPTIONS: Required<SmartCommitCommandFactoryOptions> = {
  name: "smart-commit",
  version: "0.0.1",
  description: "A CLI tool for generating commit messages",
  userConfigPath: DEFAULT_CONFIG_PATH,
};

export class SmartCommitCommandFactory {
  private static defaultOptions = DEFAULT_OPTIONS;

  public static create(
    options?: SmartCommitCommandFactoryOptions
  ): SmartCommitCommand {
    const { name, version, description, userConfigPath } = Object.assign(
      {},
      this.defaultOptions,
      options
    );

    const command = new SmartCommitCommandImpl();

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
