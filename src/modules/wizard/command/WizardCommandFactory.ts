import { FilesystemAdapterFactory } from "~/adapters/filesystem";
import { ConfigurationServiceFactory } from "~/core/configuration";
import { WizardCommand } from "./WizardCommand";

export class WizardCommandFactory {
  public static create() {
    return new WizardCommand(
      ConfigurationServiceFactory.create(
        FilesystemAdapterFactory.createLocalFilesystemAdapter()
      )
    );
  }
}
