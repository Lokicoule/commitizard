import { HandlerPipeline } from "../../../../core/handler/impl/HandlerPipeline";
import { ConventionalHandler } from "../../handlers/ConventionalHandler";
import { ConventionalPipelineFactory } from "../ConventionalPipelineFactory";
import { ConventionalHandlerFactory } from "../ConventionalHandlerFactory";

export class ConventionalPipelineFactoryImpl
  implements ConventionalPipelineFactory
{
  private commitHandlerFactory: ConventionalHandlerFactory;

  constructor(commitHandlerFactory: ConventionalHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createPipeline(): ConventionalHandler {
    const commitTypeHandler = this.commitHandlerFactory.createTypeHandler();
    const commitScopeHandler = this.commitHandlerFactory.createScopeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createSubjectHandler();
    const commitBreakingChangesHandler =
      this.commitHandlerFactory.createBreakingChangesHandler();
    const commitReferencesHandler =
      this.commitHandlerFactory.createReferencesHandler();
    const commitBodyHandler = this.commitHandlerFactory.createBodyHandler();
    const commitFooterHandler = this.commitHandlerFactory.createFooterHandler();

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
