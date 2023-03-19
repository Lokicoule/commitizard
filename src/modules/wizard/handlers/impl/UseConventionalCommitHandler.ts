import { CommitBuilderFactoryImpl } from "../../../conventional-commit/factories/impl/CommitBuilderFactoryImpl";
import { ConventionalCommitHandlerChainFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerChainFactoryImpl";
import { ConventionalCommitHandlerFactoryImpl } from "../../../conventional-commit/factories/impl/ConventionalCommitHandlerFactoryImpl";
import { ConventionalCommitFormatter } from "../../../conventional-commit/formatter/ConventionalCommitFormatter";
import {
  WizardCommitStateMachine,
  WizardCommitState,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseConventionalCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const commitBuilder = CommitBuilderFactoryImpl.create();
    const commitHandlerFactory = new ConventionalCommitHandlerFactoryImpl();
    const commitHandlerChainFactory =
      new ConventionalCommitHandlerChainFactoryImpl(commitHandlerFactory);
    const commitHandlerChain =
      commitHandlerChainFactory.createConventionalCommitHandlerChain();

    await commitHandlerChain.handle(commitBuilder);

    const message = ConventionalCommitFormatter.format(commitBuilder.build());

    wizard.setMessage(message);
    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
