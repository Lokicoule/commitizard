import { promises as fs } from "fs";
import { join } from "path";
import { GitHookManagerImpl } from "./GitHookManagerImpl";

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
    unlink: jest.fn(),
    access: jest.fn(),
    constants: {
      F_OK: 0,
    },
  },
}));

describe("GitHookManagerImpl", () => {
  const gitRoot = "/path/to/git/root";
  const hooksDir = join(gitRoot, ".git", "hooks");
  let gitHookManager: GitHookManagerImpl;

  beforeEach(() => {
    gitHookManager = new GitHookManagerImpl(gitRoot);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should install a hook", async () => {
    const hookName = "pre-commit";
    const script = "#!/bin/sh\necho 'Hello, world!'";

    await gitHookManager.installHook(hookName, script);

    expect(fs.writeFile).toHaveBeenCalledWith(
      join(hooksDir, hookName),
      script,
      {
        encoding: "utf8",
        mode: 0o755,
      }
    );
  });

  it("should uninstall a hook", async () => {
    const hookName = "pre-commit";

    await gitHookManager.uninstallHook(hookName);

    expect(fs.unlink).toHaveBeenCalledWith(join(hooksDir, hookName));
  });

  it("should return true if a hook is installed", async () => {
    const hookName = "pre-commit";

    (fs.access as jest.Mock).mockResolvedValue(true);

    const isInstalled = await gitHookManager.hookExists(hookName);

    expect(isInstalled).toBe(true);
    expect(fs.access).toHaveBeenCalledWith(
      join(hooksDir, hookName),
      fs.constants.F_OK
    );
  });

  it("should return false if a hook is not installed", async () => {
    const hookName = "pre-commit";
    (fs.access as jest.Mock).mockRejectedValue(new Error("Hook not found"));

    const isInstalled = await gitHookManager.hookExists(hookName);

    expect(isInstalled).toBe(false);
    expect(fs.access).toHaveBeenCalledWith(
      join(hooksDir, hookName),
      fs.constants.F_OK
    );
  });

  it("should log an error message if uninstallHook encounters an error", async () => {
    const hookName = "pre-commit";
    const errorMessage = "Error during hook uninstallation";

    (fs.unlink as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await gitHookManager.uninstallHook(hookName);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Failed to uninstall hook "${hookName}": ${errorMessage}`
    );

    consoleErrorSpy.mockRestore();
  });
});
