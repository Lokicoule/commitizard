import { CommitBuilder, CommitType } from "../../commit";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

export interface CommitTypeHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
  updateCommitTypes(commitTypes: CommitType[]): CommitTypeHandler;
}

export class CommitTypeHandlerImpl
  extends CommitHandler
  implements CommitTypeHandler
{
  private commitTypes: CommitType[];

  constructor(commitTypes: CommitType[] = []) {
    super();
    this.commitTypes = commitTypes;
  }

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  public updateCommitTypes(commitTypes: CommitType[]): CommitTypeHandler {
    this.commitTypes = commitTypes;
    return this;
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
