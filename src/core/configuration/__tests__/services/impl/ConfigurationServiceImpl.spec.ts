import { FilesystemAdapter } from "~/adapters/filesystem";
import { Configuration } from "../../../types";
import { defaultConfig } from "../../../__config__/default";
import { defaultConfigWithEmojis } from "../../../__config__/default-with-emojis";
import { ConfigurationServiceImpl } from "../../../services/impl/ConfigurationServiceImpl";

describe("ConfigurationServiceImpl", () => {
  let filesystemAdapter: FilesystemAdapter;

  beforeEach(() => {
    filesystemAdapter = {
      read: jest.fn(),
      write: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      rename: jest.fn(),
    };
  });

  it("should create a ConfigurationServiceImpl instance", () => {
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    expect(configurationService).toBeInstanceOf(ConfigurationServiceImpl);
  });

  it("should load default configuration when config file is not available", () => {
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(false);
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );

    const config = configurationService.load();

    expect(config).toEqual(defaultConfig);
  });

  it("should load default configuration with emojis when withEmoji flag is true", () => {
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(false);
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );

    const config = configurationService.load(undefined, true);

    expect(config).toEqual(defaultConfigWithEmojis);
  });

  it("should merge user configuration with default configuration", () => {
    const userConfig: Configuration = {
      version: "1.0.0",
      settings: {
        maxViewFilesToShow: 10,
        excludePaths: ["node_modules"],
      },
    } as Configuration;
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(true);
    (filesystemAdapter.read as jest.Mock).mockReturnValue(
      JSON.stringify(userConfig)
    );
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );

    const config = configurationService.load();

    expect(config).toEqual({ ...defaultConfig, ...userConfig });
  });

  it("should not create a backup when config file does not exist", () => {
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(false);
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const renameSpy = jest.spyOn(filesystemAdapter, "rename");

    configurationService.backup();

    expect(renameSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it("should handle error when reading config file", () => {
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(true);
    (filesystemAdapter.read as jest.Mock).mockImplementation(() => {
      throw new Error("Read error");
    });
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const config = configurationService.load();

    expect(config).toEqual(defaultConfig);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when writing config file", () => {
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    const config = defaultConfig;
    (filesystemAdapter.write as jest.Mock).mockImplementation(() => {
      throw new Error("Write error");
    });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.write(config);

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when deleting config file", () => {
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    (filesystemAdapter.delete as jest.Mock).mockImplementation(() => {
      throw new Error("Delete error");
    });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.delete();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when creating backup of config file", () => {
    (filesystemAdapter.exists as jest.Mock).mockReturnValue(true);
    (filesystemAdapter.rename as jest.Mock).mockImplementation(() => {
      throw new Error("Backup error");
    });
    const configurationService = new ConfigurationServiceImpl(
      filesystemAdapter
    );
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.backup();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
