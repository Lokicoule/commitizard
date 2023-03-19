import { Configuration } from "../../../../core/config";
import { Config, Type } from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../../state-machine/RedGreenCommitStateMachine";
import { BaseRedGreenCommitHandler } from "./BaseRedGreenCommitHandler";

export class TypeSelectionHandler extends BaseRedGreenCommitHandler {
  private configuration: Config;

  constructor() {
    super();
    this.configuration = Configuration.getConfig();
  }

  public async handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null> {
    if (
      this.configuration["red-green-refactor"].cliOptions.types.length === 0
    ) {
      throw new Error("No commit types available!");
    }

    const commitType = await this.selectCommitType();

    stateMachine.setType(commitType);

    return RedGreenCommitState.PATTERN_SUBJECT_SELECTION;
  }

  private async selectCommitType(): Promise<string> {
    const commitType = await promptSelect<Type[], string>({
      message: "Select commit type:",
      options: this.configuration["red-green-refactor"].cliOptions.types,
      abortMessage: "Commit type selection aborted!",
    });

    return commitType;
  }
}
