import { Config } from "../../../../core/config";
import { AbstractHandler } from "../../../../core/handler/impl/AbstractHandler";
import { PromptManager } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { ConventionalHandler } from "../ConventionalHandler";

export abstract class BaseConventionalHandler
  extends AbstractHandler<CommitBuilder>
  implements ConventionalHandler
{
  protected promptManager: PromptManager;
  protected configuration: Config;

  constructor(promptManager: PromptManager, configuration: Config) {
    super();
    this.promptManager = promptManager;
    this.configuration = configuration;
  }

  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
