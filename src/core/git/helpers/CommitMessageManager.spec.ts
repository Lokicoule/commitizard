import { promises as fs } from "fs";
import { COMMIT_MSG_TMP_PATH } from "../constants";
import { CommitMessageManager } from "./CommitMessageManager";

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
    access: jest.fn(),
    appendFile: jest.fn(),
    readFile: jest.fn(),
    rename: jest.fn(),
  },
}));

describe("CommitMessageManager", () => {
  let commitMessageManager: CommitMessageManager;

  beforeEach(() => {
    commitMessageManager = new CommitMessageManager();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new instance", () => {
    expect(commitMessageManager).toBeInstanceOf(CommitMessageManager);
  });

  describe("commitFromHook", () => {
    it("should perform the commit from hook process", async () => {
      (fs.readFile as jest.Mock).mockResolvedValue("Existing message\n");
      await commitMessageManager.commitFromHook("New message\n");

      expect(fs.writeFile).toHaveBeenCalledWith(
        `${COMMIT_MSG_TMP_PATH}.tmp`,
        "New message\n",
        { encoding: "utf8" }
      );
      expect(fs.access).toHaveBeenCalledWith(COMMIT_MSG_TMP_PATH);
      expect(fs.appendFile).toHaveBeenCalledWith(
        `${COMMIT_MSG_TMP_PATH}.tmp`,
        "Existing message\n"
      );
      expect(fs.rename).toHaveBeenCalledWith(
        `${COMMIT_MSG_TMP_PATH}.tmp`,
        COMMIT_MSG_TMP_PATH
      );
    });

    it("should handle an error in commitFromHook", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      (fs.writeFile as jest.Mock).mockRejectedValue(new Error("Test error"));

      await commitMessageManager.commitFromHook("New message\n");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "error: ",
        new Error("Test error")
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("ensureCommitMsgFileExists", () => {
    it("should create the commit message file if it does not exist", async () => {
      (fs.access as jest.Mock).mockRejectedValue({ code: "ENOENT" });

      await commitMessageManager["ensureCommitMsgFileExists"]();

      expect(fs.writeFile).toHaveBeenCalledWith(COMMIT_MSG_TMP_PATH, "", {
        encoding: "utf8",
      });
    });

    it("should throw an error if access fails for a reason other than ENOENT", async () => {
      (fs.access as jest.Mock).mockRejectedValue({ code: "EACCES" });

      await expect(
        commitMessageManager["ensureCommitMsgFileExists"]()
      ).rejects.toEqual({
        code: "EACCES",
      });
    });
  });
});
