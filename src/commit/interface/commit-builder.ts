import { Commit } from "../models/commit";

export interface CommitBuilder {
  withType(type: string): CommitBuilder;
  withScope(scope: string | null): CommitBuilder;
  withMessage(message: string | null): CommitBuilder;
  withBody(body: string | null): CommitBuilder;
  withFooter(footer: string | null): CommitBuilder;
  build(): Commit;
}
