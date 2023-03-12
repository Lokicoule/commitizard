import { Commit } from "../model/Commit";

export interface CommitBuilder {
  withType(type: string): CommitBuilder;
  withScope(scope: string | null): CommitBuilder;
  withSubject(subject: string | null): CommitBuilder;
  withBody(body: string | null): CommitBuilder;
  withFooter(footer: string | null): CommitBuilder;
  build(): Commit;
}
