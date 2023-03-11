import { Command } from "commander";

export interface ConfigCommand extends Command {
  run(configPath?: string): Promise<void>;
}
