import { CommitBuilder } from "../../commit/builder/CommitBuilder";
import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface WizardCommitGenerationHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
