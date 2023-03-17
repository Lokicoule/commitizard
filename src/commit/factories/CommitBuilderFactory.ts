import { CommitBuilder } from "../builder/CommitBuilder";

export interface CommitBuilderFactory {
  createCommitBuilder(): CommitBuilder;
}
