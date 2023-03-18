import { CommitHandler } from "../../commit/handlers/CommitHandler";
import { HandlerPipeline } from "../../../core/handler/impl/HandlerPipeline";
import { WizardCommitHandlerFactory } from "./CommitHandlerFactory";

export interface CommitHandlerChainFactory {
  createWizardCommitHandlerChain(): CommitHandler;
}

export class WizardCommitHandlerChainFactoryImpl {
  private commitHandlerFactory: WizardCommitHandlerFactory;

  constructor(commitHandlerFactory: WizardCommitHandlerFactory) {
    this.commitHandlerFactory = commitHandlerFactory;
  }

  public createWizardCommitHandlerChain(): CommitHandler {
    const wizardAddFilesToCommitHandler =
      this.commitHandlerFactory.createWizardAddFilesToCommitHandler();
    const wizardCommitGenerationHandler =
      this.commitHandlerFactory.createWizardCommitGenerationHandler();
    const wizardCommitValidationHandler =
      this.commitHandlerFactory.createWizardCommitValidationHandler();
    const wizardSelectCommitConventionHandler =
      this.commitHandlerFactory.createWizardSelectCommitConventionHandler();
    const wizardCommitHandlers = [
      wizardAddFilesToCommitHandler,
      wizardSelectCommitConventionHandler,
      wizardCommitValidationHandler,
    ];

    return new HandlerPipeline(wizardCommitHandlers);
  }
}
