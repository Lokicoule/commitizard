import { CommitBuilder } from "../../commit-old";
import { CommitHandler } from "./CommitHandler";

export interface CommitScopeHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
