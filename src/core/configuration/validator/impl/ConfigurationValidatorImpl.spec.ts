import { ConfigurationValidator } from "../ConfigurationValidator";
import { Configuration } from "../../types";
import { ConfigurationValidatorImpl } from "./ConfigurationValidatorImpl";

describe("ConfigurationValidatorImpl", () => {
  let configurationValidator: ConfigurationValidator;

  beforeEach(() => {
    configurationValidator = new ConfigurationValidatorImpl();
  });

  describe("validate", () => {
    it("should throw an error if the configuration version is not defined", () => {
      const config = {
        version: "",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration version is not defined"
      );
    });

    it("should throw an error if the configuration settings maxViewFilesToShow is not a number", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: NaN,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration settings maxViewFilesToShow is not a number"
      );
    });

    it("should throw an error if the configuration conventional commitOptions templateOrder is empty", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: [],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration conventional commitOptions templateOrder is empty"
      );
    });

    it("should throw an error if the configuration conventional cliOptions types is empty", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: [],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration conventional cliOptions types is empty"
      );
    });

    it("should throw an error if the configuration redGreenRefactor commitOptions templateOrder is empty", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: [],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration redGreenRefactor commitOptions templateOrder is empty"
      );
    });

    it("should throw an error if the configuration redGreenRefactor cliOptions types is empty", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: [],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).toThrowError(
        "Configuration redGreenRefactor cliOptions types is empty"
      );
    });

    it("should not throw an error if the configuration is valid", () => {
      const config = {
        version: "1.0.0",
        settings: {
          maxViewFilesToShow: 10,
        },
        conventional: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
        redGreenRefactor: {
          commitOptions: {
            templateOrder: ["type", "scope", "subject"],
          },
          cliOptions: {
            types: ["feat", "fix"],
          },
        },
      } as unknown as Configuration;

      expect(() => configurationValidator.validate(config)).not.toThrow();
    });
  });
});
