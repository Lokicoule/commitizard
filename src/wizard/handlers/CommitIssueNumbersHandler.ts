import { CommitBuilder } from "../../commit-old";
import { CommitHandler } from "./CommitHandler";

export interface CommitIssueNumbersHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
