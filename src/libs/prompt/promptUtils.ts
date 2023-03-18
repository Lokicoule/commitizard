import { cancel, isCancel, log } from "@clack/prompts";

export async function logMessage(
  message: string,
  level: "error" | "warn" | "success" | "info" = "info"
): Promise<void> {
  switch (level) {
    case "error":
      log.error(message);
      break;
    case "warn":
      log.warn(message);
      break;
    case "success":
      log.success(message);
      break;
    default:
      log.info(message);
      break;
  }
}

export async function promptWithCancel<T>(
  prompt: () => Promise<T | Symbol>,
  message: string = "Press any key to go back"
): Promise<T> {
  const result = await prompt();

  if (isCancel(result)) {
    cancel(message);
    process.exit(0);
  }

  return result as T;
}
