import { CommitBuilder, CommitType } from "../../../commit";
import { promptSelect } from "../../../prompt";
import { CommitHandler } from "../CommitHandler";
import { CommitTypeHandler } from "../CommitTypeHandler";

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
    const commitType = await promptSelect<CommitType[], string>({
      message: "Select commit type:",
      options: this.commitTypes,
      abortMessage: "Commit type selection aborted!",
    });

    commitBuilder.withType(commitType);
  }
}
