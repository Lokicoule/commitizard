import { FilesystemAdapter } from "../interfaces/FilesystemAdapter";
import { LocalFilesystemAdapter } from "../impl/LocalFilesystemAdapter";

export class FilesystemAdapterFactory {
  static createLocalFilesystemAdapter(): FilesystemAdapter {
    return new LocalFilesystemAdapter();
  }
}
