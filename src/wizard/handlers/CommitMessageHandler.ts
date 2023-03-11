import { CommitBuilder } from "../../commit";
import { CommitHandler } from "./CommitHandler";

export interface CommitMessageHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
