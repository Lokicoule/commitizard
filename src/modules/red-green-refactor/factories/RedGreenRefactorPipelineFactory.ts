import { HandlerPipeline } from "~/core/handler/impl/HandlerPipeline";
import { RedGreenRefactorHandler } from "../handlers/RedGreenRefactorHandler";
import { RedGreenRefactorHandlerFactory } from "./RedGreenRefactorHandlerFactory";

export class RedGreenRefactorPipelineFactory {
  private commitHandlerFactory: RedGreenRefactorHandlerFactory;

  constructor(commitHandlerFactory: RedGreenRefactorHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createPipeline(): RedGreenRefactorHandler {
    const commitTypeHandler = this.commitHandlerFactory.createTypeHandler();
    const commitSubjectHandler =
      this.commitHandlerFactory.createSubjectHandler();
    const commitBodyHandler = this.commitHandlerFactory.createBodyHandler();

    const commitHandlers = [
      commitTypeHandler,
      commitSubjectHandler,
      commitBodyHandler,
    ];

    return new HandlerPipeline(commitHandlers);
  }
}
