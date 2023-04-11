import { Command } from "commandzen";
import { GitManagerFactory, GitHookManagerFactory } from "~/core/git";
import { PreCommitHookCommand } from "./commands/PreCommitHookCommand";
import { PrepareCommitMsgHookCommand } from "./commands/PrepareCommitMsgHookCommand";
import { HookCommandOptions } from "./types/HookCommandOptions";

export const hookCommandFactory = () => {
  const gitManager = GitManagerFactory.create({
    exclude: [],
  });

  const gitHookManager = GitHookManagerFactory.create();

  const preCommitHookCommand = new PreCommitHookCommand(gitHookManager);
  const prepareCommitMsgHookCommand = new PrepareCommitMsgHookCommand(
    gitHookManager
  );

  const hookCommands = [
    preCommitHookCommand.createCommand(),
    prepareCommitMsgHookCommand.createCommand(),
  ];

  const action = async (options: HookCommandOptions) => {
    if (!(await gitManager.isGitRepository())) {
      console.error("This is not a git repository");
      process.exit(1);
    }

    for (const hookCommand of hookCommands) {
      await hookCommand.emit(hookCommand.name, options);
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
};
