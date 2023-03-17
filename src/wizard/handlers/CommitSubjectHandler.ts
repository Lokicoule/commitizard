import { CommitBuilder } from "../../commit-old";
import { CommitHandler } from "./CommitHandler";

export interface CommitSubjectHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
