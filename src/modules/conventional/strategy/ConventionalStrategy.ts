import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilderFactory, CommitFormatter } from "~/modules/commit";
import {
  CommitConventionStrategy,
  CommitConventionStrategyOptions,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { ConventionalHandlerFactory } from "~/modules/conventional/handlers/ConventionalHandlerFactory";

export class ConventionalCommitConventionStrategy
  implements CommitConventionStrategy
{
  private readonly promptManager: PromptManager;
  private readonly configurationManager: ConfigurationManager;

  constructor(
    options: Pick<
      CommitConventionStrategyOptions,
      "promptManager" | "configurationManager"
    >
  ) {
    this.promptManager = options.promptManager;
    this.configurationManager = options.configurationManager;
  }

  async getCommitMessage(): Promise<string> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new ConventionalHandlerFactory(
      this.promptManager,
      this.configurationManager
    );

    const commitHandlerChain = commitHandlerFactory
      .createTypeHandler()
      .setNext(commitHandlerFactory.createScopeHandler())
      .setNext(commitHandlerFactory.createSubjectHandler())
      .setNext(commitHandlerFactory.createBodyHandler())
      .setNext(commitHandlerFactory.createBreakingChangesHandler())
      .setNext(commitHandlerFactory.createReferencesHandler())
      .setNext(commitHandlerFactory.createFooterHandler());

    await commitHandlerChain.handle(commitBuilder);

    const message = CommitFormatter.format(
      commitBuilder.build(),
      this.configurationManager.getConventionalCommitTemplate(),
      this.configurationManager.getConventionalCommitTemplateOrder()
    );

    return message;
  }
}
