import { Type } from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
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
      return WizardCommitState.UseConventionalCommit;
    }

    return WizardCommitState.UseRedGreenCommit;
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
}
