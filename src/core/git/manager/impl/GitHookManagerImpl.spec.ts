import { promises as fs } from "fs";
import { join } from "path";
import { GitHookManagerImpl } from "./GitHookManagerImpl";

const gitRoot = process.cwd();
const hooksDir = join(gitRoot, ".git", "hooks");

describe("GitHookManagerImpl", () => {
  let gitHookManager: GitHookManagerImpl;

  beforeEach(() => {
    gitHookManager = new GitHookManagerImpl(gitRoot);
  });

  afterEach(async () => {
    const hooks = ["pre-commit", "prepare-commit-msg"];
    for (const hook of hooks) {
      const hookPath = join(hooksDir, hook);
      try {
        await fs.unlink(hookPath);
      } catch (error) {}
    }
  });

  it("should install a hook", async () => {
    const hookName = "pre-commit";
    const hookScript = "#!/bin/sh\necho 'Hello, World!'\n";

    await gitHookManager.installHook(hookName, hookScript);

    const installedScript = await fs.readFile(join(hooksDir, hookName), "utf8");
    expect(installedScript).toEqual(hookScript);
  });

  it("should uninstall a hook", async () => {
    const hookName = "pre-commit";
    const hookPath = join(hooksDir, hookName);
    const hookScript = "#!/bin/sh\necho 'Hello, World!'\n";

    await fs.writeFile(hookPath, hookScript, { encoding: "utf8", mode: 0o755 });

    await gitHookManager.uninstallHook(hookName);

    try {
      await fs.access(hookPath, fs.constants.F_OK);
    } catch (error: any) {
      expect(error.code).toEqual("ENOENT");
    }
  });

  it("should check if a hook is installed", async () => {
    const hookName = "pre-commit";
    const hookScript = "#!/bin/sh\necho 'Hello, World!'\n";

    await gitHookManager.installHook(hookName, hookScript);

    const isHookInstalled = await gitHookManager.isHookInstalled(hookName);
    expect(isHookInstalled).toBe(true);
  });

  it("should return false if a hook is not installed", async () => {
    const hookName = "nonexistent-hook";

    const isHookInstalled = await gitHookManager.isHookInstalled(hookName);
    expect(isHookInstalled).toBe(false);
  });
});
