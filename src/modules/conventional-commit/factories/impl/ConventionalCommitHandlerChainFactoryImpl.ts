import { HandlerPipeline } from "../../../../core/handler/impl/HandlerPipeline";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { ConventionalCommitHandlerChainFactory } from "../ConventionalCommitHandlerChainFactory";
import { ConventionalCommitHandlerFactory } from "../ConventionalCommitHandlerFactory";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandler;
}

export class ConventionalCommitHandlerChainFactoryImpl
  implements ConventionalCommitHandlerChainFactory
{
  private commitHandlerFactory: ConventionalCommitHandlerFactory;

  constructor(commitHandlerFactory: ConventionalCommitHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createConventionalCommitHandlerChain(): CommitHandler {
    const commitTypeHandler =
      this.commitHandlerFactory.createConventionalCommitTypeHandler();
    const commitScopeHandler =
      this.commitHandlerFactory.createConventionalCommitScopeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createConventionalCommitSubjectHandler();
    const commitBreakingChangesHandler =
      this.commitHandlerFactory.createConventionalCommitBreakingChangesHandler();
    const commitReferencesHandler =
      this.commitHandlerFactory.createConventionalCommitReferencesHandler();
    const commitBodyHandler =
      this.commitHandlerFactory.createConventionalCommitBodyHandler();
    const commitFooterHandler =
      this.commitHandlerFactory.createConventionalCommitFooterHandler();

    const commitHandlers = [
      commitTypeHandler,
      commitScopeHandler,
      commitSubjectHandler,
      commitBodyHandler,
      commitBreakingChangesHandler,
      commitReferencesHandler,
      commitFooterHandler,
    ];

    return new HandlerPipeline(commitHandlers);
  }
}
