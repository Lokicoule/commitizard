import { ChainHandler } from "~/core/handler/ChainHandler";
import { WizardCommitBuilder } from "../builder/WizardCommit";

export interface WizardCommitHandler
  extends ChainHandler<WizardCommitBuilder> {}
