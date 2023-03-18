import { AbstractHandler } from "../../../../core/handler/impl/AbstractHandler";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitHandler } from "../CommitHandler";

export abstract class AbstractCommitHandler
  extends AbstractHandler<CommitBuilder>
  implements CommitHandler
{
  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
