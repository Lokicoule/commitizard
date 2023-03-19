import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

/**
 * @class CustomSubjectInputHandler
 * @extends BaseRedGreenRefactorHandler
 * @description
 * It is responsible for handling the state of the subject input.
 */
export class CustomSubjectInputHandler extends BaseRedGreenRefactorHandler {
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    const subject = await this.promptCommitSubject();

    stateMachine.setMessage(subject);

    return null;
  }

  private async promptCommitSubject(): Promise<string> {
    let commitMessage;

    while (!commitMessage) {
      commitMessage = await this.promptManager.text({
        message: "Enter commit subject:",
        abortMessage: "Commit subject selection aborted!",
      });
    }

    return commitMessage;
  }
}
