import { Command } from "commander";

export interface WizardCommand extends Command {
  run(options?: any): Promise<void>;
}
