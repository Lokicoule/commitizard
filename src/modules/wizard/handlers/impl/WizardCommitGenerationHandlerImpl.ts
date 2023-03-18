import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { ConventionalCommitHandlerChainFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerChainFactoryImpl";
import { ConventionalCommitHandlerFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerFactoryImpl";
import { AbstractWizardCommitHandler } from "../AbstractWizardCommitHandler";
import { WizardCommitHandler } from "../WizardCommitHandler";

export class WizardCommitGenerationHandlerImpl
  extends AbstractWizardCommitHandler
  implements WizardCommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitHandlerFactory = new ConventionalCommitHandlerFactoryImpl();
    const commitHandlerChainFactory =
      new ConventionalCommitHandlerChainFactoryImpl(commitHandlerFactory);
    const commitHandlerChain =
      commitHandlerChainFactory.createConventionalCommitHandlerChain();

    await commitHandlerChain.handle(commitBuilder);
  }
}
