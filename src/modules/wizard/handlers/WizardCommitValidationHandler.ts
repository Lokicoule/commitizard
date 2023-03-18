import { CommitBuilder } from "../../commit/builder/CommitBuilder";
import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface WizardCommitValidationHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
