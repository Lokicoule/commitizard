import { Command } from "commander";
import {
  ConfigurationService,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";

export class ConfigCommand extends Command {
  private readonly configurationService: ConfigurationService;

  constructor(configurationService: ConfigurationService) {
    super();
    this.configurationService = configurationService;
    this.name("config");
    this.description("Manage configuration");
    this.version("0.0.1");
    this.addCommand(
      new Command("init")
        .description("Initialize the application")
        .option(
          "-p, --path [path]",
          "Path to initialize the application",
          DEFAULT_CONFIG_PATH
        )
        .option("-e, --with-emoji", "Add emoji to the configuration", false)
        .action((options: { path: string; withEmoji: boolean }) => {
          console.log("Initializing the application");
          console.log(options);
          const configPath = options.path;
          const { ...safeConfig } = this.configurationService.load(
            undefined,
            options.withEmoji
          );
          this.configurationService.write(safeConfig, configPath);
        })
    )
      .addCommand(
        new Command("clean")
          .description("Clean up the application")
          .option(
            "-p, --path <path>",
            "Path to clean up the application",
            DEFAULT_CONFIG_PATH
          )
          .action((options) => {
            const configPath = options.path;
            this.configurationService.delete(configPath);
          })
      )
      .addCommand(
        new Command("reset")
          .description("Reset the application")
          .option(
            "-p, --path <path>",
            "Path to reset the application",
            DEFAULT_CONFIG_PATH
          )
          .action((options) => {
            const configPath = options.path;
            const { ...safeConfig } = this.configurationService.load();
            this.configurationService.backup(configPath);
            this.configurationService.write(safeConfig, configPath);
          })
      );
  }
}
