import { DEFAULT_CONFIG_PATH } from "../../config";
import { CommitBreakingChangesHandlerImpl } from "../handlers/impl/CommitBreakingChangesHandlerImpl";
import { CommitConfirmHandlerImpl } from "../handlers/impl/CommitConfirmHandlerImpl";
import { CommitIssueNumbersHandlerImpl } from "../handlers/impl/CommitIssueNumbersHandlerImpl";
import { CommitSubjectHandlerImpl } from "../handlers/impl/CommitSubjectHandlerImpl";
import { CommitScopeHandlerImpl } from "../handlers/impl/CommitScopeHandlerImpl";
import { CommitTypeHandlerImpl } from "../handlers/impl/CommitTypeHandlerImpl";
import { WizardCommand } from "../command/WizardCommand";
import { WizardCommandImpl } from "../command/impl/WizardCommandImpl";

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
      new CommitSubjectHandlerImpl(),
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
