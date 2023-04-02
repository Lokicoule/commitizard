import { Argument, Command, Option, ParsedOptions } from "commandzen";
import {
  ConfigurationService,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";

type Options = {
  path: string;
  "with-emoji": boolean;
  backup: boolean;
  restore: boolean;
  delete: boolean;
  install: boolean;
};

export class ConfigCommand extends Command {
  constructor(private readonly configurationService: ConfigurationService) {
    super({
      name: "config",
      description: "Manage the application configuration",
    });
    this.configureAction();
    this.configureOptions();
  }

  private configureOptions(): void {
    this.options = [
      Option.create({
        shortName: "-p",
        longName: "--path",
        description: "Path to the configuration file",
        argument: Argument.create({
          type: "string",
          defaultValue: DEFAULT_CONFIG_PATH,
        }),
      }),
      Option.create({
        shortName: "-i",
        longName: "--install",
        description: "Install the configuration file",
      }),
      Option.create({
        shortName: "-e",
        longName: "--with-emoji",
        description: "Add emoji to the configuration",
      }),
      Option.create({
        shortName: "-b",
        longName: "--backup",
        description: "Backup the configuration file",
      }),
      Option.create({
        shortName: "-r",
        longName: "--restore",
        description: "Restore the configuration file",
      }),
      Option.create({
        shortName: "-d",
        longName: "--delete",
        description: "Delete the configuration file",
      }),
    ];
  }

  private configureAction(): void {
    this.action = (options: ParsedOptions) => {
      const {
        path,
        "with-emoji": withEmoji,
        backup,
        restore,
        delete: deleteConfig,
        install,
      } = options as Options;

      if (backup) {
        this.configurationService.backup(path);
      } else if (restore) {
        const safeConfig = this.configurationService.load();
        this.configurationService.backup(path);
        this.configurationService.write(safeConfig, path);
      } else if (deleteConfig) {
        this.configurationService.delete(path);
      } else if (install) {
        const safeConfig = this.configurationService.load(path, withEmoji);
        this.configurationService.write(safeConfig, path);
      } else {
        console.info(this.getHelp());
      }
    };
  }
}
