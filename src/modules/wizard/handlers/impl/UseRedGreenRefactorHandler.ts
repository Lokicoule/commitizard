import { CommitBuilderFactory } from "../../../../modules/commit/factory/CommitBuilderFactory";
import { CommitFormatter } from "../../../../modules/commit/formatter/CommitFormatter";
import { RedGreenRefactorHandlerFactory } from "../../../../modules/red-green-refactor/factories/RedGreenRefactorHandlerFactory";
import { RedGreenRefactorPipelineFactory } from "../../../../modules/red-green-refactor/factories/RedGreenRefactorPipelineFactory";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseRedGreenRefactorHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new RedGreenRefactorHandlerFactory(
      this.promptManager,
      this.configuration
    );
    const commitHandlerChainFactory = new RedGreenRefactorPipelineFactory(
      commitHandlerFactory
    );
    const commitHandlerChain = commitHandlerChainFactory.createPipeline();

    await commitHandlerChain.handle(commitBuilder);

    const message = CommitFormatter.format(
      commitBuilder.build(),
      this.configuration.conventional
    );

    wizard.setMessage(message);
    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
