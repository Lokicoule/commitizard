import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitHandlerChainFactoryImpl } from "../../../commit/factories/impl/CommitHandlerChainFactoryImpl";
import { CommitHandlerFactoryImpl } from "../../../commit/factories/impl/CommitHandlerFactoryImpl";
import { AbstractWizardCommitHandler } from "../AbstractWizardCommitHandler";
import { WizardCommitHandler } from "../WizardCommitHandler";

export class WizardCommitGenerationHandlerImpl
  extends AbstractWizardCommitHandler
  implements WizardCommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitHandlerFactory = new CommitHandlerFactoryImpl();
    const commitHandlerChainFactory = new CommitHandlerChainFactoryImpl(
      commitHandlerFactory
    );
    const commitHandlerChain =
      commitHandlerChainFactory.createCommitHandlerChain();

    await commitHandlerChain.handle(commitBuilder);
  }
}
