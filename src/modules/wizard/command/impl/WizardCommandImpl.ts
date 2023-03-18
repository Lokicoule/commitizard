import { intro } from "@clack/prompts";
import { Command } from "commander";
import { CommitBuilderFactoryImpl } from "../../../commit/factories/impl/CommitBuilderFactoryImpl";
import { Configuration } from "../../../../core/config/Configuration";
import { WizardCommitHandlerChainFactoryImpl } from "../../factory/CommitHandlerChainFactory";
import { WizardCommitHandlerFactoryImpl } from "../../factory/CommitHandlerFactory";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  constructor() {
    super();
  }

  async run(configPath?: string): Promise<void> {
    intro("GitHub Commit Message Wizard");

    Configuration.initialize(configPath);

    const builder = CommitBuilderFactoryImpl.create();
    const wizardCommitHandlerFactory = new WizardCommitHandlerFactoryImpl();
    const wizardCommitHandlerChainFactory =
      new WizardCommitHandlerChainFactoryImpl(wizardCommitHandlerFactory);
    const wizardCommitHandlerChain =
      wizardCommitHandlerChainFactory.createWizardCommitHandlerChain();
    await wizardCommitHandlerChain.handle(builder);
  }
}
