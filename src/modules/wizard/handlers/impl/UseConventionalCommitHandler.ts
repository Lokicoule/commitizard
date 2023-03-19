import { CommitBuilderFactory } from "../../../../modules/conventional/factories/CommitBuilderFactory";
import { ConventionalHandlerFactory } from "../../../../modules/conventional/factories/ConventionalHandlerFactory";
import { ConventionalPipelineFactory } from "../../../../modules/conventional/factories/ConventionalPipelineFactory";
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
    const commitBuilder = CommitBuilderFactory.create();
    const commitHandlerFactory = new ConventionalHandlerFactory(
      this.promptManager,
      this.configuration
    );
    const commitHandlerChainFactory = new ConventionalPipelineFactory(
      commitHandlerFactory
    );
    const commitHandlerChain = commitHandlerChainFactory.createPipeline();

    await commitHandlerChain.handle(commitBuilder);

    const message = ConventionalCommitFormatter.format(
      commitBuilder.build(),
      this.configuration.conventional
    );

    wizard.setMessage(message);
    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
