import { CommitBuilderFactoryImpl } from "../../../conventional/factories/impl/CommitBuilderFactoryImpl";
import { ConventionalPipelineFactoryImpl } from "../../../conventional/factories/impl/ConventionalPipelineFactoryImpl";
import { ConventionalHandlerFactoryImpl } from "../../../conventional/factories/impl/ConventionalCommitHandlerFactoryImpl";
import { ConventionalCommitFormatter } from "../../../conventional/formatter/ConventionalCommitFormatter";
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
    const commitHandlerFactory = new ConventionalHandlerFactoryImpl();
    const commitHandlerChainFactory = new ConventionalPipelineFactoryImpl(
      commitHandlerFactory
    );
    const commitHandlerChain = commitHandlerChainFactory.createPipeline();

    await commitHandlerChain.handle(commitBuilder);

    const message = ConventionalCommitFormatter.format(commitBuilder.build());

    wizard.setMessage(message);
    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
