import { CommitHandlerChain } from "../../chain/CommitHandlerChain";
import { CommitHandlerChainImpl } from "../../chain/impl/CommitHandlerChainImpl";
import { CommitHandlerFactory } from "../CommitHandlerFactory";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandlerChain;
}

export class CommitHandlerChainFactoryImpl
  implements CommitHandlerChainFactory
{
  private commitHandlerFactory: CommitHandlerFactory;

  constructor(commitHandlerFactory: CommitHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createCommitHandlerChain(): CommitHandlerChain {
    const commitTypeHandler =
      this.commitHandlerFactory.createCommitTypeHandler();
    const commitScopeHandler =
      this.commitHandlerFactory.createCommitScopeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createCommitSubjectHandler();
    const commitBreakingChangesHandler =
      this.commitHandlerFactory.createCommitBreakingChangesHandler();
    const commitIssueNumbersHandler =
      this.commitHandlerFactory.createCommitIssueNumbersHandler();
    const commitBodyHandler =
      this.commitHandlerFactory.createCommitBodyHandler();
    const commitFooterHandler =
      this.commitHandlerFactory.createCommitFooterHandler();

    const commitHandlers = [
      commitTypeHandler,
      commitScopeHandler,
      commitSubjectHandler,
      commitBreakingChangesHandler,
      commitIssueNumbersHandler,
      commitBodyHandler,
      commitFooterHandler,
    ];

    return new CommitHandlerChainImpl(commitHandlers);
  }
}
