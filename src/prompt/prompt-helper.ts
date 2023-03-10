import { cancel, isCancel } from "@clack/prompts";

export const promptWithCancel = async <T>(
  prompt: () => Promise<T | Symbol>,
  message: string = "Press any key to go back"
): Promise<T> => {
  const result = await prompt();

  if (isCancel(result)) {
    cancel(message);
    process.exit(0);
  }

  return result as T;
};
