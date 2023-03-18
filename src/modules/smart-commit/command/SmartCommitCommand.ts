import { Command } from "commander";

export interface SmartCommitCommand extends Command {
  run(configPath?: string): Promise<void>;
}
