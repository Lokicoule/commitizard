import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilderFactory, CommitFormatter } from "~/modules/commit";
import { CommitConventionStrategy } from "~/modules/commit/strategy/CommitConventionStrategy";
import { ConventionalHandlerFactory } from "~/modules/conventional/handlers/ConventionalHandlerFactory";

export class ConventionalStrategy implements CommitConventionStrategy {
  private readonly promptManager: PromptManager;
  private readonly configurationManager: ConfigurationManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
  }

  async getCommitMessage(): Promise<string> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new ConventionalHandlerFactory(
      this.promptManager,
      this.configurationManager
    );

    const templatesOrder =
      this.configurationManager.getConventionalCommitTemplateOrder();
    const commitHandlerChain = commitHandlerFactory.createTypeHandler();

    templatesOrder.forEach((order) => {
      switch (order) {
        case "scope":
          commitHandlerChain.setNext(commitHandlerFactory.createScopeHandler());
          break;
        case "subject":
          commitHandlerChain.setNext(
            commitHandlerFactory.createSubjectHandler()
          );
          break;
        case "body":
          commitHandlerChain.setNext(commitHandlerFactory.createBodyHandler());
          break;
        case "breaking":
          commitHandlerChain.setNext(
            commitHandlerFactory.createBreakingChangesHandler()
          );
          break;
        case "refs":
          commitHandlerChain.setNext(
            commitHandlerFactory.createReferencesHandler()
          );
          break;
        case "footer":
          commitHandlerChain.setNext(
            commitHandlerFactory.createFooterHandler()
          );
          break;
        default:
          break;
      }
    });

    await commitHandlerChain.handle(commitBuilder);

    const message = CommitFormatter.format(
      commitBuilder.build(),
      this.configurationManager.getConventionalCommitTemplate(),
      this.configurationManager.getConventionalCommitTemplateOrder()
    );

    return message;
  }
}
