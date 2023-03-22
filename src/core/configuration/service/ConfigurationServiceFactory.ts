import { FilesystemAdapter } from "~/adapters/fs";
import { ConfigurationService } from "./ConfigurationService";
import { ConfigurationServiceImpl } from "./impl/ConfigurationServiceImpl";

export class ConfigurationServiceFactory {
  public static create(
    filesystemAdapter: FilesystemAdapter
  ): ConfigurationService {
    return new ConfigurationServiceImpl(filesystemAdapter);
  }
}
