import { CommitBuilder } from "../../commit";
import { CommitHandler } from "./CommitHandler";

export interface CommitBreakingChangesHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
