import { Type } from "../../../../core/config/types";
import {
  WizardCommitStateMachine,
  WizardCommitState,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class SelectConventionHandler extends BaseWizardCommitHandler {
  public async handle(
    _wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const convention = await this.selectConvention();

    if (convention === "conventional") {
      return WizardCommitState.USE_CONVENTIONAL_COMMIT_CONVENTION;
    }

    return WizardCommitState.USE_RED_GREEN_REFACTOR_COMMIT_CONVENTION;
  }

  private async selectConvention(): Promise<string> {
    const convention = await this.promptManager.select<Type[], string>({
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
}
