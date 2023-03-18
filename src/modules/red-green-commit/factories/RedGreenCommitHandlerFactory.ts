import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface RedGreenCommitHandlerFactory {
  createRedGreenCommitTypeHandler(): CommitHandler;
  createRedGreenCommitSubjectHandler(): CommitHandler;
}
