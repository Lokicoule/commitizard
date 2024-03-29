import { Command } from "commandzen";
import {
  GitHookManager,
  GitHookManagerFactory,
  GitManager,
  GitManagerFactory,
} from "~/core/git";
import { HookCommandOptions } from "./types/HookCommandOptions";
import { PrepareCommitMsgHookScript } from "./scripts/PrepareCommitMsgHookScript";
import { BaseHookScript } from "./scripts/BaseHookScript";

export class HookCommand {
  private hookCommands: BaseHookScript[];

  constructor(
    private readonly gitManager: GitManager,
    private readonly gitHookManager: GitHookManager,
    hookCommands?: BaseHookScript[]
  ) {
    this.hookCommands = hookCommands ?? [
      new PrepareCommitMsgHookScript(gitHookManager),
    ];
  }

  public static createDefault(): HookCommand {
    const gitManager = GitManagerFactory.create({
      exclude: [],
    });
    const gitHookManager = GitHookManagerFactory.create();

    return new HookCommand(gitManager, gitHookManager);
  }

  public createCommand(): Command {
    const action = async (options: HookCommandOptions) => {
      if (!(await this.gitManager.isGitRepository())) {
        console.error("This is not a git repository");
        process.exit(1);
      }

      for (const hookCommand of this.hookCommands) {
        if (options.install) {
          await hookCommand.install();
        } else if (options.uninstall) {
          await hookCommand.uninstall();
        } else {
          console.log("Please specify --install or --uninstall.");
        }
      }
    };

    return Command.create({
      name: "hook",
      description: "Manage the application hooks",
    })
      .addOption({
        flag: "-i, --install",
        description: "Install the hooks",
      })
      .addOption({
        flag: "-u, --uninstall",
        description: "Uninstall the hooks",
      })
      .registerAction(action);
  }
}
