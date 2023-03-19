import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorHandler } from "../RedGreenRefactorHandler";

export abstract class BaseRedGreenRefactorHandler
  implements RedGreenRefactorHandler
{
  private nextHandler: RedGreenRefactorHandler | null = null;

  public setNext(handler: RedGreenRefactorHandler): RedGreenRefactorHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(stateMachine);
    }
    return null;
  }
}
