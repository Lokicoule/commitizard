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
        .argument("-p, --path <path>", "Path to initialize the application")
        .action((path) => {
          console.log(path);
          this.init(path);
        })
    )
      .addCommand(
        new Command("clean")
          .description("Clean up the application")
          .argument("-p, --path <path>", "Path to clean up the application")
          .action((options) => {
            const path = options.path;
            this.clean(path);
          })
      )
      .addCommand(
        new Command("reset")
          .description("Reset the application")
          .argument("-p, --path <path>", "Path to reset the application")
          .action((options) => {
            const path = options.path;
            console.log(path);
            this.reset(path);
          })
      );
  }

  private init(configPath: string = DEFAULT_CONFIG_PATH): void {
    const { ...safeConfig } = this.configurationService.load();
    this.configurationService.write(safeConfig, configPath);
  }

  private clean(configPath: string = DEFAULT_CONFIG_PATH): void {
    this.configurationService.delete(configPath);
  }

  private reset(configPath: string = DEFAULT_CONFIG_PATH): void {
    const { ...safeConfig } = this.configurationService.load();
    this.configurationService.backup(configPath);
    this.configurationService.write(safeConfig, configPath);
  }
}
