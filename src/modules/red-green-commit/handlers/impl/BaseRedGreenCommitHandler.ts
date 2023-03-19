import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../../state-machine/RedGreenCommitStateMachine";
import { RedGreenCommitHandler } from "../RedGreenCommitHandler";

export abstract class BaseRedGreenCommitHandler
  implements RedGreenCommitHandler
{
  private nextHandler: RedGreenCommitHandler | null = null;

  public setNext(handler: RedGreenCommitHandler): RedGreenCommitHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(stateMachine);
    }
    return null;
  }
}
