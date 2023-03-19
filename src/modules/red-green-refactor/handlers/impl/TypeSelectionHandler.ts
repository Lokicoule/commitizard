import { Type } from "../../../../core/config/types";
import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorState } from "../../types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

/**
 * @class TypeSelectionHandler
 * @extends BaseRedGreenRefactorHandler
 * @description
 * It is responsible for handling the state of the type selection.
 * @returns {RedGreenRefactorState | null}
 */
export class TypeSelectionHandler extends BaseRedGreenRefactorHandler {
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    if (
      this.configuration["red-green-refactor"].cliOptions.types.length === 0
    ) {
      throw new Error("No types configured!");
    }

    const commitType = await this.selectCommitType();

    stateMachine.setType(commitType);

    return RedGreenRefactorState.PATTERN_SUBJECT_SELECTION;
  }

  private async selectCommitType(): Promise<string> {
    const commitType = await this.promptManager.select<Type[], string>({
      message: "Select commit type:",
      options: this.configuration["red-green-refactor"].cliOptions.types,
      abortMessage: "Commit type selection aborted!",
    });

    return commitType;
  }
}
