import { Configuration } from "../../../../core/config";
import { Config, Type } from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
import {
  RedGreenCommitStateMachine,
  RedGreenCommitState,
} from "../../state-machine/RedGreenCommitStateMachine";
import { BaseRedGreenCommitHandler } from "./BaseRedGreenCommitHandler";

export class PatternGroupSelectionHandler extends BaseRedGreenCommitHandler {
  private configuration: Config;

  constructor() {
    super();
    this.configuration = Configuration.getConfig();
  }

  public async handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null> {
    const refactorOptions =
      this.configuration["red-green-refactor"].cliOptions.refactorOptions;

    const patternOptions = refactorOptions.filter((option) =>
      stateMachine
        .getMessage()
        .toLowerCase()
        .includes(option.value.toLowerCase())
    );

    for (const patternOption of patternOptions) {
      const selectedOption = await promptSelect<Type[], string>({
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
