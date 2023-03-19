import { Command } from "commander";
import { loadConfig, writeUserConfig } from "../../../core/config";

/**
 * @class ConfigGeneratorCommand
 * @description Command to generate a config file
 * @extends Command
 */
export class ConfigGeneratorCommand extends Command {
  /**
   * @method run
   * @description
   * It is responsible for running the command.
   * @param {string} [configPath]
   * @returns {Promise<void>}
   * @memberof ConfigGeneratorCommand
   */
  public async run(configPath?: string): Promise<void> {
    const { ...safeConfig } = loadConfig();
    writeUserConfig(safeConfig, configPath);
  }
}
