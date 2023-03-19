import { Command } from "commander";

/**
 * @class ConfigGeneratorCommand
 * @description Command to generate a config file
 * @extends Command
 */
export interface ConfigGeneratorCommand extends Command {
  /**
   * @method run
   * @description
   * It is responsible for running the command.
   * @param {string} [configPath]
   * @returns {Promise<void>}
   * @memberof ConfigGeneratorCommand
   */
  run(configPath?: string): Promise<void>;
}
