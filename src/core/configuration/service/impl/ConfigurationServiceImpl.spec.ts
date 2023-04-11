import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { defaultConfig } from "../../__config__/default";
import { defaultConfigWithEmojis } from "../../__config__/default-with-emojis";
import { Configuration } from "../../types";
import { ConfigurationServiceImpl } from "./ConfigurationServiceImpl";

jest.mock("fs");

describe("ConfigurationServiceImpl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a ConfigurationServiceImpl instance", () => {
    const configurationService = new ConfigurationServiceImpl();
    expect(configurationService).toBeInstanceOf(ConfigurationServiceImpl);
  });

  it("should load default configuration when config file is not available", () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const configurationService = new ConfigurationServiceImpl();

    const config = configurationService.load();

    expect(config).toEqual(defaultConfig);
  });

  it("should load default configuration with emojis when withEmoji flag is true", () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const configurationService = new ConfigurationServiceImpl();

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
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFileSync as jest.Mock).mockReturnValue(JSON.stringify(userConfig));
    const configurationService = new ConfigurationServiceImpl();

    const config = configurationService.load();

    expect(config).toEqual({ ...defaultConfig, ...userConfig });
  });

  it("should handle error when reading config file", () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("Read error");
    });
    const configurationService = new ConfigurationServiceImpl();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const config = configurationService.load();

    expect(config).toEqual(defaultConfig);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should write configuration to file", () => {
    const config: Configuration = {
      version: "1.0.0",
      settings: {
        maxViewFilesToShow: 10,
        excludePaths: ["node_modules"],
      },
    } as Configuration;
    const configurationService = new ConfigurationServiceImpl();

    configurationService.write(config);

    expect(writeFileSync).toHaveBeenCalled();
  });

  it("should delete configuration file", () => {
    const configurationService = new ConfigurationServiceImpl();

    configurationService.delete();

    expect(unlinkSync).toHaveBeenCalled();
  });

  it("should backup configuration file", () => {
    const configurationService = new ConfigurationServiceImpl();

    configurationService.backup();

    expect(renameSync).toHaveBeenCalled();
  });

  it("should handle error when writing config file", () => {
    const config: Configuration = {
      version: "1.0.0",
      settings: {
        maxViewFilesToShow: 10,
        excludePaths: ["node_modules"],
      },
    } as Configuration;
    (writeFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("Write error");
    });
    const configurationService = new ConfigurationServiceImpl();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.write(config);

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when deleting config file", () => {
    (unlinkSync as jest.Mock).mockImplementation(() => {
      throw new Error("Delete error");
    });
    const configurationService = new ConfigurationServiceImpl();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.delete();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should handle error when backup config file", () => {
    (renameSync as jest.Mock).mockImplementation(() => {
      throw new Error("Backup error");
    });
    const configurationService = new ConfigurationServiceImpl();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    configurationService.backup();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
