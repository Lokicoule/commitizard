import { promptText } from "../../../../libs/prompt";
import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../../state-machine/RedGreenCommitStateMachine";
import { BaseRedGreenCommitHandler } from "./BaseRedGreenCommitHandler";

export class CustomSubjectInputHandler extends BaseRedGreenCommitHandler {
  public async handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null> {
    const subject = await this.promptCommitSubject();

    stateMachine.setMessage(subject);

    return null;
  }

  private async promptCommitSubject(): Promise<string> {
    let commitMessage;

    while (!commitMessage) {
      commitMessage = await promptText({
        message: "Enter commit subject:",
        abortMessage: "Commit subject selection aborted!",
      });
    }

    return commitMessage;
  }
}
