import { Command } from "commander";
import {
  backupUserConfig,
  deleteUserConfig,
  loadConfig,
  writeUserConfig,
} from "../../../core/config";

export class ConfigCommand extends Command {
  constructor() {
    super();
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

  private init(configPath?: string): void {
    const { ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }

  private clean(configPath?: string): void {
    deleteUserConfig(configPath);
  }

  private reset(configPath?: string): void {
    const { ...safeConfig } = loadConfig();
    backupUserConfig(configPath);
    writeUserConfig(safeConfig, configPath);
  }
}
