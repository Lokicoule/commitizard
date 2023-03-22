import { Command } from "commander";
import { PromptAdapterFactory } from "~/adapters/prompt/PromptAdapterFactory";
import {
  ConfigurationManagerFactory,
  ConfigurationService,
} from "~/core/configuration";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { WizardCommitStateMachineFactory } from "../../factory/WizardCommitStateMachineFactory";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  private readonly configurationService: ConfigurationService;
  constructor(configurationService: ConfigurationService) {
    super();
    this.configurationService = configurationService;
  }

  async run(configPath?: string): Promise<void> {
    const promptManager = PromptManagerFactory.create(
      PromptAdapterFactory.createClackPromptAdapter()
    );

    promptManager.intro({
      message: "Welcome to the commit wizard!",
    });

    const config = this.configurationService.load(configPath);
    const configManager = ConfigurationManagerFactory.create(config);
    const stateMachine = WizardCommitStateMachineFactory.create(
      configManager,
      promptManager
    );
    stateMachine.handleCommit();
  }
}
