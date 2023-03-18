import { Command } from "commander";

export interface ConfigGeneratorCommand extends Command {
  run(configPath?: string): Promise<void>;
}
