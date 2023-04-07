import { Command } from "commandzen";
import { FilesystemAdapterFactory } from "~/adapters/filesystem";
import {
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { configCommandFactory } from "./configCommandFactory";

describe("configCommandFactory", () => {
  let configurationService: ConfigurationService;

  beforeEach(() => {
    configurationService = ConfigurationServiceFactory.create(
      FilesystemAdapterFactory.createLocalFilesystemAdapter()
    );
  });

  test("should create a config command", () => {
    const command = configCommandFactory(configurationService);
    expect(command).toBeInstanceOf(Command);
  });

  test("should call backup on configurationService", () => {
    configurationService.backup = jest.fn();
    const command = configCommandFactory(configurationService);
    command.emit("config", { backup: true, path: DEFAULT_CONFIG_PATH });
    expect(configurationService.backup).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH
    );
  });

  test("should call restore on configurationService", () => {
    configurationService.load = jest.fn().mockReturnValue("safeConfig");
    configurationService.backup = jest.fn();
    configurationService.write = jest.fn();
    const command = configCommandFactory(configurationService);
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
    const command = configCommandFactory(configurationService);
    command.emit("config", { delete: true, path: DEFAULT_CONFIG_PATH });
    expect(configurationService.delete).toHaveBeenCalledWith(
      DEFAULT_CONFIG_PATH
    );
  });

  test("should call install on configurationService", () => {
    configurationService.load = jest.fn().mockReturnValue("safeConfig");
    configurationService.write = jest.fn();
    const command = configCommandFactory(configurationService);
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
});
