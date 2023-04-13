import { GitHookManager, GitHookManagerFactory } from "~/core/git";
import { BaseHookScript } from "./BaseHookScript";

class MockHookScript extends BaseHookScript {
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

describe("BaseHookScript", () => {
  let gitHookManager: GitHookManager;
  let mockHookScript: MockHookScript;

  beforeEach(() => {
    gitHookManager = GitHookManagerFactory.create();
    mockHookScript = new MockHookScript(gitHookManager);
  });

  it("should install hook if it does not exist", async () => {
    const installHookSpy = jest.spyOn(gitHookManager, "installHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(false);

    await mockHookScript.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledWith(
      "mock-hook",
      process.platform === "win32"
        ? mockHookScript.getWindowsScript()
        : mockHookScript.getScript()
    );
  });

  it("should not install hook if it already exists", async () => {
    const installHookSpy = jest.spyOn(gitHookManager, "installHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(true);

    await mockHookScript.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledTimes(0);
  });

  it("should uninstall hook if it exists", async () => {
    const uninstallHookSpy = jest.spyOn(gitHookManager, "uninstallHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(true);

    await mockHookScript.uninstall();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(uninstallHookSpy).toHaveBeenCalledWith("mock-hook");
  });

  it("should not uninstall hook if it does not exist", async () => {
    const uninstallHookSpy = jest.spyOn(gitHookManager, "uninstallHook");
    const hookExistsSpy = jest
      .spyOn(gitHookManager, "hookExists")
      .mockResolvedValue(false);

    await mockHookScript.uninstall();

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

    await mockHookScript.install();

    expect(hookExistsSpy).toHaveBeenCalledWith("mock-hook");
    expect(installHookSpy).toHaveBeenCalledWith(
      "mock-hook",
      mockHookScript.getWindowsScript()
    );
  });
});
