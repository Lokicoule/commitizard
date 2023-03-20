import { RedGreenCliOptions, Type } from "../../../../core/config/types";
import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorState } from "../../types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

//TODO: do not hardcode this value and get it from the configuration
export const CUSTOM_VALUE = "custom";

/**
 * @class PatternSubjectSelectionHandler
 * @extends BaseRedGreenRefactorHandler
 * @description
 * It is responsible for handling the state of the pattern subject selection.
 */
export class PatternSubjectSelectionHandler extends BaseRedGreenRefactorHandler {
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    const subjectPatterns = this.getSubjectPatternsFromType(
      this.configuration.redGreenRefactor.cliOptions,
      stateMachine.getType()
    );

    const subjectPattern = await this.selectSubjectPattern(subjectPatterns);
    console.log("subjectPattern: ", subjectPattern);
    if (subjectPattern === CUSTOM_VALUE) {
      return RedGreenRefactorState.CUSTOM_SUBJECT_INPUT;
    }

    stateMachine.setMessage(subjectPattern);

    return RedGreenRefactorState.FEATURE_SUBJECT_INPUT;
  }

  private getSubjectPatternsFromType(
    cliOptions: RedGreenCliOptions,
    type: string
  ) {
    switch (type) {
      case "green":
      case "GREEN":
        return cliOptions.greenPatterns;
      case "red":
      case "RED":
        return cliOptions.redPatterns;
      case "refactor":
      case "REFACTOR":
        return cliOptions.refactorPatterns;
      default:
        throw new Error("Invalid type");
    }
  }

  private async selectSubjectPattern(options: string[]): Promise<string> {
    const patternOptions = options.map((option) => ({
      value: option,
      label: option,
    }));

    const convention = await this.promptManager.select<Type[], string>({
      message: "Which convention would you like to use?",
      options: [
        {
          value: CUSTOM_VALUE,
          label: "Custom",
        },
        ...patternOptions,
      ],
      abortMessage: "Convention selection aborted!",
    });

    return convention;
  }
}
