import { log } from "@clack/prompts";
import { Command } from "commander";
import { ConfigCommandFactory } from "./modules/config/factory/ConfigCommandFactory";
import { getStagedDiff, getStagedFiles, isInsideGitRepo } from "./libs/git";
import { DEFAULT_MODEL, listModels } from "./libs/openai/openaiUtils";
import { sanitize } from "./libs/openai/sanitize";
import { promptConfirm, promptSelect, promptText } from "./libs/prompt";
import { SmartCommitCommandFactory } from "./modules/smart-commit";
import { WizardCommandFactory } from "./modules/wizard/factory/WizardCommandFactory";

import "reflect-metadata";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

program.addCommand(
  program.createCommand("git").action(async () => {
    if (!(await isInsideGitRepo())) {
      log.error("You are not inside a git repository");
      log.info("Please run this command inside a git repository");
      return;
    }
    log.info("Getting staged files...");
    const stagedFiles = await getStagedFiles();
    if (!stagedFiles) {
      log.info("No staged files found");
      return;
    }
    log.success("Staged files:");
    console.log(stagedFiles);
    //log.success(stagedFiles.join("\n"));
    log.info("Generating diff...");
    const diff = await getStagedDiff();
    //console.log(diff);
    console.log(sanitize(diff));
    console.log("------------");

    /*     for (const file of stagedFiles) {
      log.info(`Generating diff for ${file}...`);
      const diff = await getStagedDiff(file);
      if (!diff) {
        log.info("No diff found");
        return;
      }
      log.success(diff);
    } */

    log.info("Generating commit message...");

    const keepDefault = await promptConfirm({
      message: "Do you want to keep the default configuration?",
      defaultValue: true,
    });

    if (!keepDefault) {
      const models = await (
        await listModels()
      ).map((model) => ({
        value: model.id,
        label: model.id,
      }));

      const model = promptSelect({
        message: "Select a model",
        options: models,
        defaultValue: DEFAULT_MODEL,
      });

      const saveConfig = await promptConfirm({
        message: "Do you want to save this configuration?",
        defaultValue: false,
      });

      if (saveConfig) {
        const configPath =
          (await promptText({
            message: "Enter the path to the configuration file",
            placeholder:
              "e.g. (if empty, the default will be used .commitcraftrc)",
          })) ?? ".commitcraftrc";

        console.log(configPath);
        // TODO: merge config
        // TODO: save config
      }
    }
    //createCompletion(getPrompt(stagedFiles, diff));
  })
);
program.addCommand(WizardCommandFactory.create());
program.addCommand(ConfigCommandFactory.create());
program.addCommand(SmartCommitCommandFactory.create());
program.parse(process.argv);
