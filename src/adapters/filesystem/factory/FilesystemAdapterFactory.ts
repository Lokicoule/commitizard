import { FilesystemAdapter } from "../FilesystemAdapter";
import { LocalFilesystemAdapter } from "../impl/LocalFilesystemAdapter";

export class FilesystemAdapterFactory {
  static createLocalFilesystemAdapter(): FilesystemAdapter {
    return new LocalFilesystemAdapter();
  }
}
