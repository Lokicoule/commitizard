import { Command } from "commander";
import { loadConfig, writeUserConfig } from "../../../../core/config";
import { ConfigCommand } from "../ConfigCommand";

export class ConfigCommandImpl extends Command implements ConfigCommand {
  public async run(configPath?: string): Promise<void> {
    const { ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }
}
