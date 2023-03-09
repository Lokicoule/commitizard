import { Commit, CommitType } from "../model/commit";

export interface CommitBuilder {
  withType(type: CommitType): CommitBuilder;
  withScope(scope: string | null): CommitBuilder;
  withMessage(message: string | null): CommitBuilder;
  withBody(body: string | null): CommitBuilder;
  withFooter(footer: string | null): CommitBuilder;
  build(): Commit;
}