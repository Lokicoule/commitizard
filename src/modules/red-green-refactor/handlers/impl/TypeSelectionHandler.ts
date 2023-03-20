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
    const types = this.configuration.redGreenRefactor?.cliOptions.types || [];

    if (types.length === 0) {
      throw new Error("No types configured!");
    }

    const commitType = await this.selectCommitType(types);

    stateMachine.setType(commitType);

    return RedGreenRefactorState.PATTERN_SUBJECT_SELECTION;
  }

  private async selectCommitType(types: Type[]): Promise<string> {
    const commitType = await this.promptManager.select<Type[], string>({
      message: "Select commit type:",
      options: this.configuration.redGreenRefactor.cliOptions.types,
      abortMessage: "Commit type selection aborted!",
    });

    return commitType;
  }
}
