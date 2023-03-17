import { Commit } from "../model/Commit";

export interface CommitBuilder {
  withType(type: string): CommitBuilder;
  withScope(scope: string | null): CommitBuilder;
  withSubject(subject: string | null): CommitBuilder;
  addBodyLine(line: string | null): CommitBuilder;
  addFooterLine(line: string | null): CommitBuilder;
  build(): Commit;
}
