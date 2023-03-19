import { CommitBuilderFactoryImpl } from "../../../commit/factory/impl/CommitBuilderFactoryImpl";
import { ConventionalCommitFormatter } from "../../../conventional-commit/formatter/ConventionalCommitFormatter";
import { RedGreenCommitHandlerChainFactoryImpl } from "../../../red-green-commit/factories/impl/RedGreenCommitHandlerChainFactoryImpl";
import { RedGreenCommitHandlerFactoryImpl } from "../../../red-green-commit/factories/impl/RedGreenCommitHandlerFactoryImpl";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseRedGreenCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const commitBuilder = CommitBuilderFactoryImpl.create();
    const redGreenCommitHandlerFactory = new RedGreenCommitHandlerFactoryImpl();
    const redGreenCommitHandlerChainFactory =
      new RedGreenCommitHandlerChainFactoryImpl(redGreenCommitHandlerFactory);
    const redGreenCommitHandlerChain =
      redGreenCommitHandlerChainFactory.createRedGreenCommitHandlerChain();

    await redGreenCommitHandlerChain.handle(commitBuilder);
    // TODO : use the red-green commit formatter
    const message = ConventionalCommitFormatter.format(commitBuilder.build());

    wizard.setMessage(message);

    return WizardCommitState.USE_CONVENTIONAL_COMMIT_CONVENTION;
  }
}
