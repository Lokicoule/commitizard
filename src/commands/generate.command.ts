/* import { Command } from "commander";
import { OpenAIApi } from "openai";
import { prompts } from '@clack/prompts';

export class GenerateCommand extends Command {
  async run() {
    const { apiKey, prompt } = await prompts([
      {
        type: "text",
        name: "apiKey",
        message: "Please enter your OpenAI API key:",
      },
      {
        type: "text",
        name: "prompt",
        message: "Please enter a prompt for generating the commit message:",
      },
    ]);

    OpenAIApi.apiKey = apiKey;
    const response = await OpenAIApi.completions.create({
      engine: "text-davinci-002",
      prompt: prompt,
      maxTokens: 32,
      n: 1,
      stop: "\n",
    });

    console.log(response.data.choices[0].text.trim());
  }
}
 */
