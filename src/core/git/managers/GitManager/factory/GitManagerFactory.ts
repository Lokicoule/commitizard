import { CommitMessageManager, GitCommandRunner } from "~/core/git/helpers";
import { GitManager } from "../..";
import { GitManagerOptions } from "../GitManagerOptions";
import { GitManagerImpl } from "../impl/GitManagerImpl";

export class GitManagerFactory {
  public static create(options: GitManagerOptions): GitManager {
    return new GitManagerImpl(
      options,
      new GitCommandRunner(options),
      new CommitMessageManager()
    );
  }
}
