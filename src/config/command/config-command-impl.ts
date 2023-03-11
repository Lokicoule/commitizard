import { Command } from "commander";
import { loadConfig, writeUserConfig } from "../config-helper";
import { ConfigCommand } from "../interface/config-command";

export class ConfigCommandImpl extends Command implements ConfigCommand {
  public async run(configPath?: string): Promise<void> {
    const { apiKey, ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }
}
