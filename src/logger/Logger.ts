import { logMessage } from "../prompt/promptUtils";

export class Logger {
  public static info(message: string): void {
    logMessage(message, "info");
  }

  public static error(message: string): void {
    logMessage(message, "error");
  }

  public static warn(message: string): void {
    logMessage(message, "warn");
  }

  public static success(message: string): void {
    logMessage(message, "success");
  }
}
