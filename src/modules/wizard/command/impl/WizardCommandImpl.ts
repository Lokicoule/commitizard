import { Command } from "commander";
import { loadConfig } from "../../../../core/config";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { WizardCommitStateMachineFactory } from "../../factory/WizardCommitStateMachineFactory";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  constructor() {
    super();
  }

  async run(configPath?: string): Promise<void> {
    const promptManager = new PromptManagerImpl();

    promptManager.intro({
      message: "Welcome to the commit wizard!",
    });

    const config = loadConfig(configPath);

    const stateMachine = WizardCommitStateMachineFactory.create(
      config,
      promptManager
    );
    stateMachine.handleCommit();
  }
}
