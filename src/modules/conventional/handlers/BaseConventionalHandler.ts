import { ConfigurationManager } from "~/core/configuration";
import { BaseChainHandler } from "~/core/handler/impl/BaseChainHandler";
import { PromptManager } from "~/core/prompt";
import { CommitHandler } from "~/modules/commit";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";

export abstract class BaseConventionalHandler
  extends BaseChainHandler<CommitBuilder>
  implements CommitHandler
{
  protected readonly promptManager: PromptManager;
  protected readonly configurationManager: ConfigurationManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    super();
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
  }
}
