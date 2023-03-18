import { WizardAddFilesToCommitHandlerImpl } from "../handlers/impl/WizardAddFilesToCommitHandlerImpl";
import { WizardCommitGenerationHandlerImpl } from "../handlers/impl/WizardCommitGenerationHandlerImpl";
import { WizardCommitValidationHandlerImpl } from "../handlers/impl/WizardCommitValidationHandlerImpl";
import { WizardCommitGenerationHandler } from "../handlers/WizardCommitGenerationHandler";
import { WizardCommitValidationHandler } from "../handlers/WizardCommitValidationHandler";

export interface WizardCommitHandlerFactory {
  createWizardCommitValidationHandler(): WizardCommitValidationHandler;
  createWizardCommitGenerationHandler(): WizardCommitGenerationHandler;
  createWizardAddFilesToCommitHandler(): WizardCommitGenerationHandler;
}

export class WizardCommitHandlerFactoryImpl
  implements WizardCommitHandlerFactory
{
  public createWizardCommitValidationHandler(): WizardCommitValidationHandler {
    return new WizardCommitValidationHandlerImpl();
  }

  public createWizardCommitGenerationHandler(): WizardCommitGenerationHandler {
    return new WizardCommitGenerationHandlerImpl();
  }

  public createWizardAddFilesToCommitHandler(): WizardCommitGenerationHandler {
    return new WizardAddFilesToCommitHandlerImpl();
  }
}
