import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilderFactory, CommitFormatter } from "~/modules/commit";
import {
  CommitConventionStrategy,
  CommitConventionStrategyOptions,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { RedGreenRefactorHandlerFactory } from "~/modules/red-green-refactor/handlers/RedGreenRefactorHandlerFactory";

export class RedGreenRefactorCommitConventionStrategy
  implements CommitConventionStrategy
{
  private readonly promptManager: PromptManager;
  private readonly configurationManager: ConfigurationManager;

  constructor(options: CommitConventionStrategyOptions) {
    this.promptManager = options.promptManager;
    this.configurationManager = options.configuration;
  }

  async getCommitMessage(): Promise<string> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new RedGreenRefactorHandlerFactory(
      this.promptManager,
      this.configurationManager
    );

    const commitHandlerChain = commitHandlerFactory
      .createTypeHandler()
      .setNext(commitHandlerFactory.createTypeHandler())
      .setNext(commitHandlerFactory.createBodyHandler());

    await commitHandlerChain.handle(commitBuilder);

    const message = CommitFormatter.format(
      commitBuilder.build(),
      this.configurationManager.getRedGreenRefactorCommitTemplate(),
      this.configurationManager.getRedGreenRefactorCommitTemplateOrder()
    );

    return message;
  }
}
