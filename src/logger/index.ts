import { PromptHelper } from "../prompt/prompt-helper";

export class Logger {
  public static info(message: string): void {
    PromptHelper.log(message, "info");
  }

  public static error(message: string): void {
    PromptHelper.log(message, "error");
  }

  public static warn(message: string): void {
    PromptHelper.log(message, "warn");
  }

  public static success(message: string): void {
    PromptHelper.log(message, "success");
  }
}
