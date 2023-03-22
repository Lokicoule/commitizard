import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { FilesystemAdapter } from "../FilesystemAdapter";

export class LocalFilesystemAdapter implements FilesystemAdapter {
  read(path: string): string {
    return readFileSync(path, { encoding: "utf-8" });
  }

  write(path: string, data: string): void {
    return writeFileSync(path, data, { encoding: "utf-8" });
  }

  delete(path: string): void {
    return unlinkSync(path);
  }

  rename(oldPath: string, newPath: string): void {
    return renameSync(oldPath, newPath);
  }

  exists(path: string): boolean {
    return existsSync(path);
  }
}
