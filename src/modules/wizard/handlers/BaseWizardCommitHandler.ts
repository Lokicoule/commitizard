import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { BaseChainHandler } from "~/core/chain-handler";
import { PromptManager } from "~/core/prompt";
import { WizardCommitHandler } from "./WizardCommitHandler";
import { WizardBuilder } from "../builder";

export abstract class BaseWizardCommitHandler
  extends BaseChainHandler<WizardBuilder>
  implements WizardCommitHandler
{
  protected readonly promptManager: PromptManager;
  protected readonly configurationManager: ConfigurationManager;
  protected readonly gitManager: GitManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager
  ) {
    super();
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
    this.gitManager = gitManager;
  }
}
