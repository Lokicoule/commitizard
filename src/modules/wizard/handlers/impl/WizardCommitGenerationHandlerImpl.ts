import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitHandlerChainFactoryImpl } from "../../../commit/factories/impl/CommitHandlerChainFactoryImpl";
import { CommitHandlerFactoryImpl } from "../../../commit/factories/impl/CommitHandlerFactoryImpl";
import { CommitHandlerImpl } from "../../../commit/handlers/impl/CommitHandlerImpl";
import { WizardCommitGenerationHandler } from "../WizardCommitGenerationHandler";

export class WizardCommitGenerationHandlerImpl
  extends CommitHandlerImpl
  implements WizardCommitGenerationHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

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
