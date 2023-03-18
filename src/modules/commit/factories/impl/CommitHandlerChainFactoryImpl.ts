import { HandlerPipeline } from "../../../../core/handler/impl/HandlerPipeline";
import { CommitHandler } from "../../handlers/CommitHandler";
import { CommitHandlerFactory } from "../CommitHandlerFactory";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandler;
}

export class CommitHandlerChainFactoryImpl
  implements CommitHandlerChainFactory
{
  private commitHandlerFactory: CommitHandlerFactory;

  constructor(commitHandlerFactory: CommitHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createCommitHandlerChain(): CommitHandler {
    const commitTypeHandler =
      this.commitHandlerFactory.createCommitTypeHandler();
    const commitScopeHandler =
      this.commitHandlerFactory.createCommitScopeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createCommitSubjectHandler();
    const commitBreakingChangesHandler =
      this.commitHandlerFactory.createCommitBreakingChangesHandler();
    const commitReferencesHandler =
      this.commitHandlerFactory.createCommitReferencesHandler();
    const commitBodyHandler =
      this.commitHandlerFactory.createCommitBodyHandler();
    const commitFooterHandler =
      this.commitHandlerFactory.createCommitFooterHandler();

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
