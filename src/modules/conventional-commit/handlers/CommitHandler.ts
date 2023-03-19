import { Handler } from "../../../core/handler/Handler";
import { CommitBuilder } from "../builder/CommitBuilder";

export interface CommitHandler extends Handler<CommitBuilder> {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
