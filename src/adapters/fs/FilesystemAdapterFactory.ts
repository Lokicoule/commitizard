import { FilesystemAdapter } from "./FilesystemAdapter";
import { LocalFilesystemAdapter } from "./impl/LocalFilesystemAdapter";

export class FilesystemAdapterFactory {
  static create(): FilesystemAdapter {
    return new LocalFilesystemAdapter();
  }
}
