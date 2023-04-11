import { GitHookManager, GitHookManagerFactory } from "~/core/git";
import { BaseHookCommand } from "./BaseHookCommand";

class MockHookCommand extends BaseHookCommand {
  getHookName(): string {
    return "mock-hook";
  }

  getScript(): string {
    return "mock script";
  }

  getWindowsScript(): string {
    return "mock windows script";
  }
}

describe("BaseHookCommand", () => {
  let gitHookManager: GitHookManager;
  let mockHookCommand: MockHookCommand;

  beforeEach(() => {
    gitHookManager = GitHookManagerFactory.create();
    mockHookCommand = new MockHookCommand(gitHookManager);
  });

  it("should install hook if it does not exist", async () => {
    const installHookSpy = jest.spyOn(gitHookManager, "installHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(false);

    await mockHookCommand.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledWith(
      "mock-hook",
      process.platform === "win32"
        ? mockHookCommand.getWindowsScript()
        : mockHookCommand.getScript()
    );
  });

  it("should not install hook if it already exists", async () => {
    const installHookSpy = jest.spyOn(gitHookManager, "installHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(true);

    await mockHookCommand.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledTimes(0);
  });

  it("should uninstall hook if it exists", async () => {
    const uninstallHookSpy = jest.spyOn(gitHookManager, "uninstallHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(true);

    await mockHookCommand.uninstall();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(uninstallHookSpy).toHaveBeenCalledWith("mock-hook");
  });

  it("should not uninstall hook if it does not exist", async () => {
    const uninstallHookSpy = jest.spyOn(gitHookManager, "uninstallHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(false);

    await mockHookCommand.uninstall();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(uninstallHookSpy).toHaveBeenCalledTimes(0);
  });

  it("should use windows script if platform is windows", async () => {
    const installHookSpy = jest.spyOn(gitHookManager, "installHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(false);

    Object.defineProperty(process, "platform", {
      value: "win32",
    });

    await mockHookCommand.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledWith(
      "mock-hook",
      mockHookCommand.getWindowsScript()
    );
  });
});
