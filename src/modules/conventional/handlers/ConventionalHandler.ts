import { Handler } from "~/core/handler/Handler";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";

export interface ConventionalHandler extends Handler<CommitBuilder> {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
