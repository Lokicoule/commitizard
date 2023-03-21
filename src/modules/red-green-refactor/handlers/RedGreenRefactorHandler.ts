import { Handler } from "../../../core/handler/Handler";
import { CommitBuilder } from "../../commit/builder/CommitBuilder";

export interface RedGreenRefactorHandler extends Handler<CommitBuilder> {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
