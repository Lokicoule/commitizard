import { select } from "@clack/prompts";
import { CommitBuilder, CommitType } from "../../commit";
import { promptWithCancel } from "../../prompt/prompt-helper";
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
    const commitType = await promptWithCancel<string>(
      () =>
        select<CommitType[], string>({
          message: "Select commit type:",
          options: this.commitTypes,
        }),
      "Commit type selection aborted!"
    );

    commitBuilder.withType(commitType);
  }
}
