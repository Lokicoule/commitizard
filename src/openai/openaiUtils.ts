import { Configuration, OpenAIApi, Model } from "openai";

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: "",
  })
);

export const defaultModel = "gpt-3.5-turbo";

const defaultCompletionOptions = {
  model: "gpt-3.5-turbo",
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  best_of: 5,
  frequency_penalty: 1,
  presence_penalty: 0,
};

export const retrieveModel = async (modelId: string) => {
  const response = await openai.retrieveModel(modelId);

  return response.data;
};

export const listModels = async () => {
  const response = await openai.listModels();
  const relevantOwners = ["openai"];

  return response.data.data.filter((model) =>
    relevantOwners.includes(model.owned_by)
  );
};

export const getPrompt = (
  files: string[],
  diff: string,
  lang: string = "en"
) => {
  const fileCount = files.length;
  const fileWord = fileCount > 1 ? "files" : "file";
  const diffSummary = diff.substring(0, 50) + (diff.length > 50 ? "..." : "");
  const language = lang !== "en" ? ` in ${lang}` : "";
  const message = `Please provide a brief and descriptive commit message for ${fileCount} ${fileWord}: ${files.join(
    ", "
  )}\n\nChanges:\n${diff}\n\n`;

  return message;
};

export const createCompletion = async (prompt: string) => {
  const response = await openai.createCompletion(defaultCompletionOptions);

  return response.data.choices[0].text;
};
