import { Command } from "commander";
import { Config, loadConfig, writeUserConfig } from "../config-helper";
import { ConfigCommand } from "../interface/config-command";

type SafeConfig = Omit<Config, "apiKey">;

class ConfigHelper {
  constructor() {}

  public getConfig(): SafeConfig {
    const { apiKey, ...safeConfig } = loadConfig();
    return safeConfig;
  }

  public writeConfig(config: SafeConfig, configPath?: string): void {
    writeUserConfig(config, configPath);
  }
}

export class ConfigCommandImpl extends Command implements ConfigCommand {
  private readonly configHelper: ConfigHelper;

  constructor() {
    super();
    this.configHelper = new ConfigHelper();
  }

  public async run(configPath?: string): Promise<void> {
    const config = this.configHelper.getConfig();
    console.log(config);
    this.configHelper.writeConfig(config, configPath);
  }
}
