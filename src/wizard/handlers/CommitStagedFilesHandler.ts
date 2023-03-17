import { CommitBuilder } from "../../commit-old";
import { CommitHandler } from "./CommitHandler";

export interface CommitStagedFilesHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
