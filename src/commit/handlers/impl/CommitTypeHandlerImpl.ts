import { CommitHandlerImpl } from "./CommitHandlerImpl";
import { CommitTypeHandler } from "../CommitTypeHandler";
import { CommitType, CommitTypeOption } from "../../types";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { promptSelect } from "../../../prompt";

export class CommitTypeHandlerImpl
  extends CommitHandlerImpl
  implements CommitTypeHandler
{
  private commitTypes: CommitTypeOption[];

  constructor() {
    super();
    this.commitTypes = [];
  }

  public updateCommitTypes(commitTypes: CommitTypeOption[]): CommitTypeHandler {
    this.commitTypes = commitTypes;
    return this;
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    if (this.commitTypes.length === 0) {
      throw new Error("No commit types available!");
    }

    const commitType = await this.selectCommitType();
    commitBuilder.withType(commitType);
  }

  private async selectCommitType(): Promise<CommitType> {
    const commitType = await this.promptCommitType();
    return commitType;
  }

  private async promptCommitType(): Promise<CommitType> {
    const commitType = await promptSelect<CommitTypeOption[], string>({
      message: "Select commit type:",
      options: this.commitTypes,
      abortMessage: "Commit type selection aborted!",
    });

    return {
      data: commitType,
    };
  }
}
