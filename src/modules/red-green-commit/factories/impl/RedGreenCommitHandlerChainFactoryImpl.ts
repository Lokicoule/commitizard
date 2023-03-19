/* import { HandlerPipeline } from "../../../../core/handler/impl/HandlerPipeline";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { RedGreenCommitHandlerChainFactory } from "../RedGreenCommitHandlerChainFactory";
import { RedGreenCommitHandlerFactory } from "../RedGreenCommitHandlerFactory";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandler;
}

export class RedGreenCommitHandlerChainFactoryImpl
  implements RedGreenCommitHandlerChainFactory
{
  private commitHandlerFactory: RedGreenCommitHandlerFactory;

  constructor(commitHandlerFactory: RedGreenCommitHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createRedGreenCommitHandlerChain(): CommitHandler {
    const commitTypeHandler =
      this.commitHandlerFactory.createRedGreenCommitTypeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createRedGreenCommitSubjectHandler();

    const commitHandlers = [commitTypeHandler, commitSubjectHandler];

    return new HandlerPipeline(commitHandlers);
  }
}
 */
