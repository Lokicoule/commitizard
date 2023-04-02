import { FilesystemAdapter } from "~/adapters/filesystem";
import { Configuration } from "../../types";
import { defaultConfig } from "../../__config__/default";
import { defaultConfigWithEmojis } from "../../__config__/default-with-emojis";
import { ConfigurationServiceImpl } from "./ConfigurationServiceImpl";

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
});
