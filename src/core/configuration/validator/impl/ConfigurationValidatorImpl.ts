import { ConfigurationValidator } from "../ConfigurationValidator";
import { Configuration } from "../../types";

export class ConfigurationValidatorImpl implements ConfigurationValidator {
  public validate(config: Configuration): void {
    if (!config) {
      throw new Error("Configuration is not defined");
    }

    if (!config.version) {
      throw new Error("Configuration version is not defined");
    }

    if (!config.settings) {
      throw new Error("Configuration settings is not defined");
    }

    if (!config.settings.maxViewFilesToShow) {
      throw new Error(
        "Configuration settings maxViewFilesToShow is not defined"
      );
    }

    if (!config.conventional) {
      throw new Error("Configuration conventional is not defined");
    }

    if (!config.conventional.commitOptions) {
      throw new Error(
        "Configuration conventional commitOptions is not defined"
      );
    }

    if (!config.conventional.commitOptions.template) {
      throw new Error(
        "Configuration conventional commitOptions template is not defined"
      );
    }

    if (!config.conventional.commitOptions.templateOrder) {
      throw new Error(
        "Configuration conventional commitOptions templateOrder is not defined"
      );
    }

    if (!config.conventional.cliOptions) {
      throw new Error("Configuration conventional cliOptions is not defined");
    }

    if (!config.conventional.cliOptions.types) {
      throw new Error(
        "Configuration conventional cliOptions types is not defined"
      );
    }

    if (!config.redGreenRefactor) {
      throw new Error("Configuration redGreenRefactor is not defined");
    }

    if (!config.redGreenRefactor.commitOptions) {
      throw new Error(
        "Configuration redGreenRefactor commitOptions is not defined"
      );
    }

    if (!config.redGreenRefactor.commitOptions.template) {
      throw new Error(
        "Configuration redGreenRefactor commitOptions template is not defined"
      );
    }

    if (!config.redGreenRefactor.commitOptions.templateOrder) {
      throw new Error(
        "Configuration redGreenRefactor commitOptions templateOrder is not defined"
      );
    }

    if (!config.redGreenRefactor.cliOptions) {
      throw new Error(
        "Configuration redGreenRefactor cliOptions is not defined"
      );
    }

    if (!config.redGreenRefactor.cliOptions.types) {
      throw new Error(
        "Configuration redGreenRefactor cliOptions types is not defined"
      );
    }
  }
}
