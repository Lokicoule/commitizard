import { FilesystemAdapterFactory } from "~/adapters/filesystem";
import { ConfigurationServiceFactory } from "~/core/configuration";
import { ConfigCommand } from "../command/ConfigCommand";

export class ConfigCommandFactory {
  private constructor() {
    // This class is not meant to be instantiated.
  }

  public static create() {
    return new ConfigCommand(
      ConfigurationServiceFactory.create(
        FilesystemAdapterFactory.createLocalFilesystemAdapter()
      )
    );
  }
}
