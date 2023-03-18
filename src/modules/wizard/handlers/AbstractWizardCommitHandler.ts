import { AbstractHandler } from "../../../core/handler/impl/AbstractHandler";
import { CommitBuilder } from "../../commit/builder/CommitBuilder";
import { WizardCommitHandler } from "./WizardCommitHandler";

export abstract class AbstractWizardCommitHandler
  extends AbstractHandler<CommitBuilder>
  implements WizardCommitHandler
{
  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
