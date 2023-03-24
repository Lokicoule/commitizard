import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilderFactory, CommitFormatter } from "~/modules/commit";
import {
  CommitConventionStrategy,
  CommitConventionStrategyOptions,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { RedGreenRefactorHandlerFactory } from "~/modules/red-green-refactor/handlers/RedGreenRefactorHandlerFactory";

export class RedGreenRefactorStrategy implements CommitConventionStrategy {
  private readonly promptManager: PromptManager;
  private readonly configurationManager: ConfigurationManager;

  constructor(
    options: Pick<
      CommitConventionStrategyOptions,
      "configurationManager" | "promptManager"
    >
  ) {
    this.promptManager = options.promptManager;
    this.configurationManager = options.configurationManager;
  }

  async getCommitMessage(): Promise<string> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new RedGreenRefactorHandlerFactory(
      this.promptManager,
      this.configurationManager
    );

    const commitHandlerChain = commitHandlerFactory
      .createTypeHandler()
      .setNext(commitHandlerFactory.createSubjectHandler())
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
