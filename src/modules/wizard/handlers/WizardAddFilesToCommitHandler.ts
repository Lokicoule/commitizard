import { CommitBuilder } from "../../commit/builder/CommitBuilder";
import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface WizardAddFilesToCommitHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
