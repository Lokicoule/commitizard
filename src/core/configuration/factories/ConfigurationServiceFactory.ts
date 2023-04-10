import { FilesystemAdapter } from "~/adapters/filesystem";
import { ConfigurationService } from "./interfaces/ConfigurationService";
import { ConfigurationServiceImpl } from "./impl/ConfigurationServiceImpl";

export class ConfigurationServiceFactory {
  public static create(
    filesystemAdapter: FilesystemAdapter
  ): ConfigurationService {
    return new ConfigurationServiceImpl(filesystemAdapter);
  }
}