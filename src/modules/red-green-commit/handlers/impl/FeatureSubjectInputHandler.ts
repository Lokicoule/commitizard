import { promptText } from "../../../../libs/prompt";
import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../../state-machine/RedGreenCommitStateMachine";
import { BaseRedGreenCommitHandler } from "./BaseRedGreenCommitHandler";
import { yellow } from "picocolors";

export class FeatureSubjectInputHandler extends BaseRedGreenCommitHandler {
  public async handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null> {
    const feature = await this.promptSubjectFeature();

    stateMachine.setMessage(
      stateMachine.getMessage().replace(/{{feature}}/g, feature)
    );

    return this.redirectFlow(stateMachine);
  }

  private redirectFlow(stateMachine: RedGreenCommitStateMachine) {
    switch (stateMachine.getType()) {
      case "green":
      case "GREEN":
      case "red":
      case "RED":
        return null;
      case "refactor":
      case "REFACTOR":
        return RedGreenCommitState.PATTERN_GROUP_SELECTION;
      default:
        throw new Error("Invalid type");
    }
  }

  private async promptSubjectFeature(): Promise<string> {
    let commitMessage;

    while (!commitMessage) {
      commitMessage = await promptText({
        message: "Enter feature name:",
        abortMessage: `${yellow("Aborting commit")}`,
      });
    }

    return commitMessage;
  }
}
