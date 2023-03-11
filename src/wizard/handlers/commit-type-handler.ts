import { CommitBuilder, CommitType } from "../../commit";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

export class CommitTypeHandler extends CommitHandler {
  private commitTypes: CommitType[];

  constructor(commitTypes: CommitType[]) {
    super();
    this.commitTypes = commitTypes;
  }

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitType = await PromptHelper.promptSelect<CommitType[], string>({
      message: "Select commit type:",
      options: this.commitTypes,
      abortMessage: "Commit type selection aborted!",
    });

    commitBuilder.withType(commitType);
  }
}
