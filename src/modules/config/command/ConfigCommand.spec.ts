import { ConfigurationService } from "~/core/configuration";
import { ParsedOptions } from "commandzen";
import { ConfigCommand } from "./ConfigCommand";

jest.mock("~/core/configuration/service/ConfigurationService");

describe("ConfigCommand", () => {
  let configurationService: ConfigurationService;
  let parsedOptions: ParsedOptions;

  beforeEach(() => {
    configurationService = {
      load: jest.fn(),
      backup: jest.fn(),
      delete: jest.fn(),
      write: jest.fn(),
    } as unknown as ConfigurationService;
  });

  it("should create a ConfigCommand instance", () => {
    const configCommand = new ConfigCommand(configurationService);

    expect(configCommand).toBeInstanceOf(ConfigCommand);
  });

  it("should execute ConfigCommand action with backup option", () => {
    parsedOptions = {
      path: "",
      "with-emoji": false,
      backup: true,
      restore: false,
      delete: false,
      install: false,
    };

    const configCommand = new ConfigCommand(configurationService);
    configCommand.execute(parsedOptions);

    expect(configurationService.backup).toHaveBeenCalled();
  });

  it("should execute ConfigCommand action with restore option", () => {
    parsedOptions = {
      path: "",
      "with-emoji": false,
      backup: false,
      restore: true,
      delete: false,
      install: false,
    };

    const configCommand = new ConfigCommand(configurationService);
    configCommand.execute(parsedOptions);

    expect(configurationService.load).toHaveBeenCalled();
    expect(configurationService.backup).toHaveBeenCalled();
    expect(configurationService.write).toHaveBeenCalled();
  });

  it("should execute ConfigCommand action with delete option", () => {
    parsedOptions = {
      path: "",
      "with-emoji": false,
      backup: false,
      restore: false,
      delete: true,
      install: false,
    };

    const configCommand = new ConfigCommand(configurationService);
    configCommand.execute(parsedOptions);

    expect(configurationService.delete).toHaveBeenCalled();
  });

  it("should execute ConfigCommand action with install option", () => {
    parsedOptions = {
      path: "",
      "with-emoji": false,
      backup: false,
      restore: false,
      delete: false,
      install: true,
    };

    const configCommand = new ConfigCommand(configurationService);
    configCommand.execute(parsedOptions);

    expect(configurationService.load).toHaveBeenCalled();
    expect(configurationService.write).toHaveBeenCalled();
  });

  it("should display help when no options are selected", () => {
    parsedOptions = {
      path: "",
      "with-emoji": false,
      backup: false,
      restore: false,
      delete: false,
      install: false,
    };

    const configCommand = new ConfigCommand(configurationService);
    const consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
    configCommand.execute(parsedOptions);

    expect(consoleInfoSpy).toHaveBeenCalled();
    consoleInfoSpy.mockRestore();
  });
});
