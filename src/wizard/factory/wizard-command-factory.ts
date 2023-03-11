import { DEFAULT_CONFIG_PATH } from "../../config";
import { WizardCommandImpl } from "../command/wizard-command-impl";
import { CommitBreakingChangesHandlerImpl } from "../handlers/commit-breaking-changes-handler";
import { CommitConfirmHandlerImpl } from "../handlers/commit-confirm-handler";
import { CommitIssueNumbersHandlerImpl } from "../handlers/commit-issue-numbers-handler";
import { CommitMessageHandlerImpl } from "../handlers/commit-message-handler";
import { CommitScopeHandlerImpl } from "../handlers/commit-scope-handler";
import { CommitTypeHandlerImpl } from "../handlers/commit-type-handler";
import { WizardCommand } from "../interface/wizard-command";

export type WizardCommandFactoryOptions = {
  name?: string;
  version?: string;
  description?: string;
  userConfigPath?: string;
};

const DEFAULT_OPTIONS: Required<WizardCommandFactoryOptions> = {
  name: "wizard",
  version: "0.0.1",
  description: "A CLI tool for generating commit messages",
  userConfigPath: DEFAULT_CONFIG_PATH,
};

export class WizardCommandFactory {
  private static defaultOptions = DEFAULT_OPTIONS;

  public static create(options?: WizardCommandFactoryOptions): WizardCommand {
    const { name, version, description, userConfigPath } = Object.assign(
      {},
      this.defaultOptions,
      options
    );

    const command = new WizardCommandImpl(
      new CommitTypeHandlerImpl(),
      new CommitScopeHandlerImpl(),
      new CommitMessageHandlerImpl(),
      new CommitBreakingChangesHandlerImpl(),
      new CommitIssueNumbersHandlerImpl(),
      new CommitConfirmHandlerImpl()
    );

    command
      .name(name ?? this.defaultOptions.name)
      .version(version ?? this.defaultOptions.version)
      .description(description ?? this.defaultOptions.description)
      .option(
        "-c, --config <path>",
        "path to user config file",
        userConfigPath ?? this.defaultOptions.userConfigPath
      )
      .action((options: { config: string }) => command.run(options.config));
    return command;
  }
}
