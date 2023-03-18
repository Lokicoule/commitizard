import { Type } from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { AbstractCommitHandler } from "../../../commit/handlers/impl/AbstractCommitHandler";
import { ConventionalCommitHandlerChainFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerChainFactoryImpl";
import { ConventionalCommitHandlerFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerFactoryImpl";
import { RedGreenCommitHandlerChainFactoryImpl } from "../../../red-green-commit/factories/impl/RedGreenCommitHandlerChainFactoryImpl";
import { RedGreenCommitHandlerFactoryImpl } from "../../../red-green-commit/factories/impl/RedGreenCommitHandlerFactoryImpl";

export class WizardSelectionCommitConventionHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  constructor() {
    super();
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const convention = await this.selectConvention();
    const commitHandlerChain =
      convention === "red-green-refactor"
        ? this.getRedGreenCommitHandlerChain()
        : this.getConventionalCommitHandlerChain();
    await commitHandlerChain.handle(commitBuilder);
  }

  private async selectConvention(): Promise<string> {
    const convention = await promptSelect<Type[], string>({
      message: "Which convention would you like to use?",
      options: [
        {
          value: "conventional",
          label: "Conventional Commit (default)",
        },
        {
          value: "red-green-refactor",
          label: "Red-Green-Refactor Commit",
        },
      ],
      abortMessage: "Convention selection aborted!",
    });

    return convention;
  }

  private getRedGreenCommitHandlerChain(): CommitHandler {
    const redGreenCommitHandlerFactory = new RedGreenCommitHandlerFactoryImpl();
    const redGreenCommitHandlerChainFactory =
      new RedGreenCommitHandlerChainFactoryImpl(redGreenCommitHandlerFactory);
    return redGreenCommitHandlerChainFactory.createRedGreenCommitHandlerChain();
  }

  private getConventionalCommitHandlerChain(): CommitHandler {
    const commitHandlerFactory = new ConventionalCommitHandlerFactoryImpl();
    const commitHandlerChainFactory =
      new ConventionalCommitHandlerChainFactoryImpl(commitHandlerFactory);
    return commitHandlerChainFactory.createConventionalCommitHandlerChain();
  }
}
