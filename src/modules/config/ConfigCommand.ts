import { Command } from "commandzen";
import {
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";

export class ConfigCommand {
  private constructor(private configurationService: ConfigurationService) {}

  public static create(
    configurationService: ConfigurationService = ConfigurationServiceFactory.create()
  ): Command {
    const configCommand = new ConfigCommand(configurationService);
    return configCommand.buildCommand();
  }

  private buildCommand(): Command {
    return Command.create({
      name: "config",
      description: "Manage the application configuration",
    })
      .addOption({
        flag: "-p, --path <path>",
        description: "Path to the configuration file",
        defaultValue: DEFAULT_CONFIG_PATH,
      })
      .addOption({
        flag: "-i, --install",
        description: "Install the configuration file",
      })
      .addOption({
        flag: "-e, --with-emoji",
        description: "Use the emoji configuration file",
      })
      .addOption({
        flag: "-b, --backup",
        description: "Backup the configuration file",
      })
      .addOption({
        flag: "-r, --restore",
        description: "Restore the configuration file",
      })
      .addOption({
        flag: "-d, --delete",
        description: "Delete the configuration file",
      })
      .registerAction<{
        path: string;
        withEmoji: boolean;
        backup: boolean;
        restore: boolean;
        delete: boolean;
        install: boolean;
      }>((options) => this.handleAction(options));
  }

  private handleAction(options: {
    path: string;
    withEmoji: boolean;
    backup: boolean;
    restore: boolean;
    delete: boolean;
    install: boolean;
  }): void {
    const operationCount =
      (options.backup ? 1 : 0) +
      (options.restore ? 1 : 0) +
      (options.delete ? 1 : 0) +
      (options.install ? 1 : 0);

    if (operationCount !== 1) {
      console.error(
        "Please specify exactly one operation: backup, restore, delete, or install.\nUse --help to see available options."
      );
      process.exit(1);
    }

    if (options.backup) {
      this.configurationService.backup(options.path);
    } else if (options.restore) {
      const safeConfig = this.configurationService.load();
      this.configurationService.backup(options.path);
      this.configurationService.write(safeConfig, options.path);
    } else if (options.delete) {
      this.configurationService.delete(options.path);
    } else if (options.install) {
      const safeConfig = this.configurationService.load(
        options.path,
        options.withEmoji
      );
      this.configurationService.write(safeConfig, options.path);
    }
  }
}
