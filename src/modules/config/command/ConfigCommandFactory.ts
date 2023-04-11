import { Command } from "commandzen";
import {
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";

export const configCommandFactory = (
  configurationService: ConfigurationService = ConfigurationServiceFactory.create()
) => {
  return Command.create({
    name: "config",
    description: "Manage the application configuration",
  })
    .addOption(
      {
        flag: "-p, --path <path>",
        description: "Path to the configuration file",
        defaultValue: DEFAULT_CONFIG_PATH,
      },
      {
        flag: "-i, --install",
        description: "Install the configuration file",
      },
      {
        flag: "-e, --with-emoji",
        description: "Use the emoji configuration file",
      },
      {
        flag: "-b, --backup",
        description: "Backup the configuration file",
      },
      {
        flag: "-r, --restore",
        description: "Restore the configuration file",
      },
      {
        flag: "-d, --delete",
        description: "Delete the configuration file",
      }
    )
    .registerAction<{
      path: string;
      withEmoji: boolean;
      backup: boolean;
      restore: boolean;
      delete: boolean;
      install: boolean;
    }>((options) => {
      const operationCount =
        (options.backup ? 1 : 0) +
        (options.restore ? 1 : 0) +
        (options.delete ? 1 : 0) +
        (options.install ? 1 : 0);

      if (operationCount !== 1) {
        console.error(
          "Please specify exactly one operation: backup, restore, delete, or install."
        );
        process.exit(1);
      }

      if (options.backup) {
        configurationService.backup(options.path);
      } else if (options.restore) {
        const safeConfig = configurationService.load();
        configurationService.backup(options.path);
        configurationService.write(safeConfig, options.path);
      } else if (options.delete) {
        configurationService.delete(options.path);
      } else if (options.install) {
        const safeConfig = configurationService.load(
          options.path,
          options.withEmoji
        );
        configurationService.write(safeConfig, options.path);
      }
    });
};
