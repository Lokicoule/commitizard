import { DEFAULT_CONFIG_PATH } from "../../../core/config/configUtils";
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

/**
 * @class ConfigGeneratorCommandFactory
 * @description
 * It is responsible for creating a ConfigGeneratorCommand.
 * @see ConfigGeneratorCommand
 */
export class ConfigGeneratorCommandFactory {
  private constructor() {}

  /**
   * @static
   * @method create
   * @description
   * It is responsible for creating a ConfigGeneratorCommand.
   * @param {ConfigGeneratorCommandFactoryOptions} [options]
   * @returns {ConfigGeneratorCommand}
   * @memberof ConfigGeneratorCommandFactory
   * @see ConfigGeneratorCommand
   */
  public static create(
    options?: ConfigGeneratorCommandFactoryOptions & { userConfigPath?: string }
  ): ConfigGeneratorCommand {
    const { name, version, description, userConfigPath } =
      options || defaultOptions;

    const command = new ConfigGeneratorCommand();
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
