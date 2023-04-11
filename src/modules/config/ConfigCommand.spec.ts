import { Command } from "commandzen";
import {
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { ConfigCommand } from "./ConfigCommand";

describe("ConfigCommand", () => {
  let configurationService: ConfigurationService;

  beforeEach(() => {
    configurationService = ConfigurationServiceFactory.create();
  });

  test("should create a config command", () => {
    const command = ConfigCommand.create();
    expect(command).toBeInstanceOf(Command);
  });

  test("should call backup on configurationService", () => {
    configurationService.backup = jest.fn();
    const command = ConfigCommand.create(configurationService);
    command.emit("config", { backup: true, path: DEFAULT_CONFIG_PATH });
    expect(configurationService.backup).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH
    );
  });

  test("should call restore on configurationService", () => {
    configurationService.load = jest.fn().mockReturnValue("safeConfig");
    configurationService.backup = jest.fn();
    configurationService.write = jest.fn();
    const command = ConfigCommand.create(configurationService);
    command.emit("config", { restore: true, path: DEFAULT_CONFIG_PATH });
    expect(configurationService.backup).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH
    );
    expect(configurationService.write).toHaveBeenCalledWith(
      "safeConfig",
      DEFAULT_CONFIG_PATH
    );
  });

  test("should call delete on configurationService", () => {
    configurationService.delete = jest.fn();
    const command = ConfigCommand.create(configurationService);
    command.emit("config", { delete: true, path: DEFAULT_CONFIG_PATH });
    expect(configurationService.delete).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH
    );
  });

  test("should call install on configurationService", () => {
    configurationService.load = jest.fn().mockReturnValue("safeConfig");
    configurationService.write = jest.fn();
    const command = ConfigCommand.create(configurationService);
    command.emit("config", {
      install: true,
      path: DEFAULT_CONFIG_PATH,
      withEmoji: false,
    });
    expect(configurationService.load).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH,
      false
    );
    expect(configurationService.write).toHaveBeenCalledWith(
      "safeConfig",
      DEFAULT_CONFIG_PATH
    );
  });

  test("should log error and exit process when option count is invalid", async () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit() called");
    });

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const command = ConfigCommand.create(configurationService);

    try {
      command.emit("config", {
        backup: true,
        delete: true,
        path: DEFAULT_CONFIG_PATH,
      });
    } catch (e: any) {
      expect(e.message).toEqual("process.exit() called");
    }

    expect(consoleError).toHaveBeenCalledWith(
      "Please specify exactly one operation: backup, restore, delete, or install.\nUse --help to see available options."
    );

    mockExit.mockRestore();
    consoleError.mockRestore();
  });
});
