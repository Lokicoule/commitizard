import { DEFAULT_CONFIG_PATH } from "..";
import { ConfigCommandImpl } from "./ConfigCommandImpl";
import { ConfigCommand } from "./ConfigCommand";

export type ConfigCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const defaultOptions: Required<ConfigCommandFactoryOptions> = {
  name: "init",
  version: "0.0.1",
  description: "A CLI tool for generating config file",
  userConfigPath: DEFAULT_CONFIG_PATH,
};

export class ConfigCommandFactory {
  private constructor() {}

  public static create(
    options?: ConfigCommandFactoryOptions & { userConfigPath?: string }
  ): ConfigCommand {
    const { name, version, description, userConfigPath } =
      options || defaultOptions;

    const command = new ConfigCommandImpl();
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
