import { ChainHandler } from "~/core/handler/ChainHandler";
import { CommitBuilder } from "../builder/CommitBuilder";

export interface CommitHandler extends ChainHandler<CommitBuilder> {}
