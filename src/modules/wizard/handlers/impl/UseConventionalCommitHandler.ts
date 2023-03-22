import { CommitBuilderFactory } from "../../../commit/builder/CommitBuilderFactory";
import { ConventionalHandlerFactory } from "../../../../modules/conventional/factories/ConventionalHandlerFactory";
import { ConventionalPipelineFactory } from "../../../../modules/conventional/factories/ConventionalPipelineFactory";
import { CommitFormatter } from "../../../commit/formatter/CommitFormatter";
import {
  WizardCommitStateMachine,
  WizardCommitState,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseConventionalCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new ConventionalHandlerFactory(
      this.promptManager,
      this.configurationManager
    );
    const commitHandlerChainFactory = new ConventionalPipelineFactory(
      commitHandlerFactory
    );
    const commitHandlerChain = commitHandlerChainFactory.createPipeline();

    await commitHandlerChain.handle(commitBuilder);

    const message = CommitFormatter.format(
      commitBuilder.build(),
      this.configurationManager.getConventionalCommitTemplate(),
      this.configurationManager.getConventionalCommitTemplateOrder()
    );

    wizard.setMessage(message);
    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
