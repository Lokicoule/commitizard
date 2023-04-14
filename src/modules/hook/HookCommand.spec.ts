import { Command } from "commandzen";
import {
  GitHookManager,
  GitHookManagerFactory,
  GitManager,
  GitManagerFactory,
} from "~/core/git";
import { HookCommand } from "./HookCommand";
import { PrepareCommitMsgHookScript } from "./scripts/PrepareCommitMsgHookScript";

jest.mock("~/core/git");

describe("HookCommand", () => {
  let gitManager: GitManager;
  let gitHookManager: GitHookManager;

  beforeEach(() => {
    gitManager = {
      isGitRepository: jest.fn(),
    } as unknown as GitManager;

    gitHookManager = {
      hookExists: jest.fn(),
      installHook: jest.fn(),
      uninstallHook: jest.fn(),
    } as unknown as GitHookManager;

    (GitManagerFactory.create as jest.Mock).mockReturnValue(gitManager);
    (GitHookManagerFactory.create as jest.Mock).mockReturnValue(gitHookManager);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create a HookCommand instance", () => {
    const hookCommand = HookCommand.createDefault();
    expect(hookCommand).toBeInstanceOf(HookCommand);
  });

  test("should create a command", () => {
    const hookCommand = new HookCommand(gitManager, gitHookManager);
    const command = hookCommand.createCommand();
    expect(command).toBeInstanceOf(Command);
  });

  test("should execute install action", async () => {
    const prepareCommitMsgHookCommand = new PrepareCommitMsgHookScript(
      gitHookManager
    );

    prepareCommitMsgHookCommand.install = jest.fn();

    const hookCommand = new HookCommand(gitManager, gitHookManager, [
      prepareCommitMsgHookCommand,
    ]);

    const command = hookCommand.createCommand();

    (gitManager.isGitRepository as jest.Mock).mockResolvedValue(true);

    await command.emit("hook", { install: true });

    expect(prepareCommitMsgHookCommand.install).toHaveBeenCalled();
  });

  test("should execute uninstall action", async () => {
    const prepareCommitMsgHookCommand = new PrepareCommitMsgHookScript(
      gitHookManager
    );

    prepareCommitMsgHookCommand.uninstall = jest.fn();

    const hookCommand = new HookCommand(gitManager, gitHookManager, [
      prepareCommitMsgHookCommand,
    ]);

    const command = hookCommand.createCommand();

    (gitManager.isGitRepository as jest.Mock).mockResolvedValue(true);

    await command.emit("hook", { uninstall: true });

    expect(prepareCommitMsgHookCommand.uninstall).toHaveBeenCalled();
  });

  test("should not execute action if not in a git repository", async () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit() called");
    });

    const prepareCommitMsgHookCommand = new PrepareCommitMsgHookScript(
      gitHookManager
    );

    prepareCommitMsgHookCommand.install = jest.fn();

    const hookCommand = new HookCommand(gitManager, gitHookManager, [
      prepareCommitMsgHookCommand,
    ]);

    (gitManager.isGitRepository as jest.Mock).mockResolvedValue(false);

    try {
      await hookCommand.createCommand();
    } catch (e: any) {
      expect(e.message).toEqual("process.exit() called");
    }

    expect(prepareCommitMsgHookCommand.install).not.toHaveBeenCalled();

    mockExit.mockRestore();
  });

  test("should log error and exit when not in a git repository", async () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation();
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const hookCommand = HookCommand.createDefault();
    const command = hookCommand.createCommand();

    (gitManager.isGitRepository as jest.Mock).mockResolvedValue(false);

    await command.emit("hook", { install: true });

    expect(consoleError).toHaveBeenCalledWith("This is not a git repository");
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
    consoleError.mockRestore();
  });

  test("should log message when no options are provided", async () => {
    const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

    const hookCommand = HookCommand.createDefault();
    const command = hookCommand.createCommand();

    (gitManager.isGitRepository as jest.Mock).mockResolvedValue(true);

    await command.emit("hook", {});

    expect(consoleLog).toHaveBeenCalledWith(
      "Please specify --install or --uninstall."
    );

    consoleLog.mockRestore();
  });
});
