import { CommitTypeOption } from "../types";
import { CommitHandler } from "./CommitHandler";

export interface CommitTypeHandler extends CommitHandler {
  updateCommitTypes(commitTypes: CommitTypeOption[]): CommitTypeHandler;
}
