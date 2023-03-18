import { DEFAULT_CONFIG_PATH } from "../../../core/config/configUtils";
import { ConfigGeneratorCommandImpl } from "../command/impl/ConfigGeneratorCommandImpl";
import { ConfigGeneratorCommand } from "../command/ConfigGeneratorCommand";

export type ConfigGeneratorCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const defaultOptions: Required<ConfigGeneratorCommandFactoryOptions> = {
  name: "init",
  version: "0.0.1",
  description: "A CLI tool for generating config file",
  userConfigPath: DEFAULT_CONFIG_PATH,
};

export class ConfigGeneratorCommandFactory {
  private constructor() {}

  public static create(
    options?: ConfigGeneratorCommandFactoryOptions & { userConfigPath?: string }
  ): ConfigGeneratorCommand {
    const { name, version, description, userConfigPath } =
      options || defaultOptions;

    const command = new ConfigGeneratorCommandImpl();
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
