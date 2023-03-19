import { yellow } from "picocolors";
import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorState } from "../../types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

/**
 * @class FeatureSubjectInputHandler
 * @extends BaseRedGreenRefactorHandler
 * @description
 * It is responsible for handling the state of the subject's feature input.
 */
export class FeatureSubjectInputHandler extends BaseRedGreenRefactorHandler {
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    const feature = await this.promptSubjectFeature();

    stateMachine.setMessage(
      stateMachine.getMessage().replace(/{{feature}}/g, feature)
    );

    return this.redirectFlow(stateMachine);
  }

  private redirectFlow(stateMachine: RedGreenRefactorStateMachine) {
    switch (stateMachine.getType()) {
      case "green":
      case "GREEN":
      case "red":
      case "RED":
        return null;
      case "refactor":
      case "REFACTOR":
        return RedGreenRefactorState.PATTERN_GROUP_SELECTION;
      default:
        throw new Error("Invalid type");
    }
  }

  private async promptSubjectFeature(): Promise<string> {
    let commitMessage;

    while (!commitMessage) {
      commitMessage = await this.promptManager.text({
        message: "Enter feature name:",
        abortMessage: `${yellow("Aborting commit")}`,
      });
    }

    return commitMessage;
  }
}
