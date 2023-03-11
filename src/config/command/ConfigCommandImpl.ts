import { Command } from "commander";
import { loadConfig, writeUserConfig } from "../configUtils";
import { ConfigCommand } from "./ConfigCommand";

export class ConfigCommandImpl extends Command implements ConfigCommand {
  public async run(configPath?: string): Promise<void> {
    const { apiKey, ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }
}
