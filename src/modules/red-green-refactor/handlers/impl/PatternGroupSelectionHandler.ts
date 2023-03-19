import { Type } from "../../../../core/config/types";
import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorState } from "../../types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

/**
 * @class PatternGroupSelectionHandler
 * @extends BaseRedGreenRefactorHandler
 * @description
 * It is responsible for handling the state of the pattern group selection.
 */
export class PatternGroupSelectionHandler extends BaseRedGreenRefactorHandler {
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    const refactorOptions =
      this.configuration.redGreenRefactor.cliOptions.refactorOptions;

    const patternOptions = refactorOptions.filter((option) =>
      stateMachine
        .getMessage()
        .toLowerCase()
        .includes(option.value.toLowerCase())
    );

    for (const patternOption of patternOptions) {
      const selectedOption = await this.promptManager.select<Type[], string>({
        message: "Which option would you like to use?",
        options: patternOption.options,
        abortMessage: "Option selection aborted!",
      });

      const updatedPattern = stateMachine
        .getMessage()
        .replace(patternOption.value, selectedOption);

      stateMachine.setMessage(updatedPattern);
    }

    return null;
  }
}
