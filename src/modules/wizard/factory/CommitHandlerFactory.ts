import { WizardAddFilesToCommitHandlerImpl } from "../handlers/impl/WizardAddFilesToCommitHandlerImpl";
import { WizardCommitGenerationHandlerImpl } from "../handlers/impl/WizardCommitGenerationHandlerImpl";
import { WizardCommitValidationHandlerImpl } from "../handlers/impl/WizardCommitValidationHandlerImpl";
import { WizardSelectionCommitConventionHandlerImpl } from "../handlers/impl/WizardSelectCommitConventionHandlerImpl";
import { WizardCommitHandler } from "../handlers/WizardCommitHandler";

export interface WizardCommitHandlerFactory {
  createWizardCommitValidationHandler(): WizardCommitHandler;
  createWizardCommitGenerationHandler(): WizardCommitHandler;
  createWizardAddFilesToCommitHandler(): WizardCommitHandler;
  createWizardSelectCommitConventionHandler(): WizardCommitHandler;
}

export class WizardCommitHandlerFactoryImpl
  implements WizardCommitHandlerFactory
{
  public createWizardCommitValidationHandler(): WizardCommitHandler {
    return new WizardCommitValidationHandlerImpl();
  }

  public createWizardCommitGenerationHandler(): WizardCommitHandler {
    return new WizardCommitGenerationHandlerImpl();
  }

  public createWizardAddFilesToCommitHandler(): WizardCommitHandler {
    return new WizardAddFilesToCommitHandlerImpl();
  }

  public createWizardSelectCommitConventionHandler(): WizardCommitHandler {
    return new WizardSelectionCommitConventionHandlerImpl();
  }
}
