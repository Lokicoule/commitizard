import { Command } from "commander";

export interface WizardCommand extends Command {
  run(configPath?: string): Promise<void>;
}
