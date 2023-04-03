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

  const testCases = [
    {
      name: "backup",
      options: {
        backup: true,
      },
      methods: ["backup"] as const,
    },
    {
      name: "restore",
      options: {
        restore: true,
      },
      methods: ["load", "backup", "write"] as const,
    },
    {
      name: "delete",
      options: {
        delete: true,
      },
      methods: ["delete"] as const,
    },
    {
      name: "install",
      options: {
        install: true,
      },
      methods: ["load", "write"] as const,
    },
  ];

  testCases.forEach((testCase) => {
    it(`should execute ConfigCommand action with ${testCase.name} option`, () => {
      parsedOptions = {
        path: "",
        "with-emoji": false,
        ...testCase.options,
      } as any;

      const configCommand = new ConfigCommand(configurationService);
      configCommand.execute(parsedOptions as any);

      testCase.methods.forEach((method) => {
        expect(configurationService[method]).toHaveBeenCalled();
      });
    });
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
    configCommand.execute(parsedOptions as any);

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
    configCommand.execute(parsedOptions as any);

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
    configCommand.execute(parsedOptions as any);

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
    configCommand.execute(parsedOptions as any);

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
    configCommand.execute(parsedOptions as any);

    expect(consoleInfoSpy).toHaveBeenCalled();
    consoleInfoSpy.mockRestore();
  });
});
