import { AbstractHandler } from "../../../../core/handler/impl/AbstractHandler";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { ConventionalHandler } from "../ConventionalHandler";

export abstract class BaseConventionalHandler
  extends AbstractHandler<CommitBuilder>
  implements ConventionalHandler
{
  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
