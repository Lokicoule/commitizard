import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";

export const DEFAULT_MODEL = "gpt-3.5-turbo";

const defaultCompletionOptions = {
  model: DEFAULT_MODEL,
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  best_of: 5,
  frequency_penalty: 1,
  presence_penalty: 0,
};

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: "",
  })
);

export const listModels = async () => {
  const response = await openai.listModels();
  const relevantOwners = ["openai"];

  return response.data.data.filter((model) =>
    relevantOwners.includes(model.owned_by)
  );
};

export const createCompletion = async (prompt: string) => {
  const request = Object.assign({}, defaultCompletionOptions, {
    prompt,
  }) satisfies CreateCompletionRequest;

  console.log(request);
  //const response = await openai.createCompletion(request);

  return "response.data.choices[0].text";
};
