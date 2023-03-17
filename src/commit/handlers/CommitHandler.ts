import { CommitBuilder } from "../builder/CommitBuilder";

export interface CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
