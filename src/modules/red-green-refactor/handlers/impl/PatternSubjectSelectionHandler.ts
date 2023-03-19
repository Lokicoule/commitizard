import { Configuration } from "../../../../core/config";
import {
  Config,
  RedGreenCliOptions,
  Type,
} from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

export class PatternSubjectSelectionHandler extends BaseRedGreenRefactorHandler {
  private configuration: Config;

  constructor() {
    super();
    this.configuration = Configuration.getConfig();
  }
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    const subjectPatterns = this.getSubjectPatternsFromType(
      this.configuration["red-green-refactor"].cliOptions,
      stateMachine.getType()
    );

    const subjectPattern = await this.selectSubjectPattern(subjectPatterns);

    if (subjectPattern === "custom") {
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

    const convention = await promptSelect<Type[], string>({
      message: "Which convention would you like to use?",
      options: [
        {
          value: "custom",
          label: "Custom",
        },
        ...patternOptions,
      ],
      abortMessage: "Convention selection aborted!",
    });

    return convention;
  }
}
