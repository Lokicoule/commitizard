import { Command } from "commander";
import { loadConfig, writeUserConfig } from "../../../../core/config";
import { ConfigGeneratorCommand } from "../ConfigGeneratorCommand";

export class ConfigGeneratorCommandImpl
  extends Command
  implements ConfigGeneratorCommand
{
  public async run(configPath?: string): Promise<void> {
    const { ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }
}
