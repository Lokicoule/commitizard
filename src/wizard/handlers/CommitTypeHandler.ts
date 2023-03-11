import { CommitBuilder, CommitType } from "../../commit";
import { CommitHandler } from "./CommitHandler";

export interface CommitTypeHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
  updateCommitTypes(commitTypes: CommitType[]): CommitTypeHandler;
}
