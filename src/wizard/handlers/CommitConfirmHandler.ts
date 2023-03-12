import { CommitBuilder } from "../../commit";
import { CommitHandler } from "./CommitHandler";

export interface CommitConfirmHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
  setMessageFormat(messageFormat: string): CommitConfirmHandler;
}
