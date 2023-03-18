import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitHandlerChainFactoryImpl } from "../../../commit/factories/impl/CommitHandlerChainFactoryImpl";
import { CommitHandlerFactoryImpl } from "../../../commit/factories/impl/CommitHandlerFactoryImpl";
import { AbstractCommitHandler } from "../../../commit/handlers/AbstractCommitHandler";
import { WizardCommitGenerationHandler } from "../WizardCommitGenerationHandler";

export class WizardCommitGenerationHandlerImpl
  extends AbstractCommitHandler
  implements WizardCommitGenerationHandler
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
