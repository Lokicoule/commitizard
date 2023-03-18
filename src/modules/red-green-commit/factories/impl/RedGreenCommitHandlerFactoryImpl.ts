import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { RedGreenCommitSubjectHandlerImpl } from "../../handlers/impl/RedGreenCommitSubjectHandlerImpl";
import { RedGreenCommitTypeHandlerImpl } from "../../handlers/impl/RedGreenCommitTypeHandlerImpl";
import { RedGreenCommitHandlerFactory } from "../RedGreenCommitHandlerFactory";

export class RedGreenCommitHandlerFactoryImpl
  implements RedGreenCommitHandlerFactory
{
  public createRedGreenCommitTypeHandler(): CommitHandler {
    return new RedGreenCommitTypeHandlerImpl();
  }

  public createRedGreenCommitSubjectHandler(): CommitHandler {
    return new RedGreenCommitSubjectHandlerImpl();
  }
}
