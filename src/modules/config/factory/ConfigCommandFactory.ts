import { Command } from "commander";
import { FilesystemAdapterFactory } from "~/adapters/filesystem";
import { ConfigurationServiceFactory } from "~/core/configuration";
import { ConfigCommand } from "../command/ConfigCommand";

/**
 * @class ConfigCommandFactory
 * @description
 * It is responsible for creating a ConfigCommand.
 * @see ConfigCommand
 */
export class ConfigCommandFactory {
  private constructor() {
    // This class is not meant to be instantiated.
  }

  public static create(): Command {
    return new ConfigCommand(
      ConfigurationServiceFactory.create(
        FilesystemAdapterFactory.createLocalFilesystemAdapter()
      )
    );
  }
}
