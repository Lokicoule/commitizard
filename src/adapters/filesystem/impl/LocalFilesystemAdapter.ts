import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
  accessSync,
} from "fs";
import { FilesystemAdapter } from "../FilesystemAdapter";

export class LocalFilesystemAdapter implements FilesystemAdapter {
  read(path: string): string {
    return readFileSync(path, { encoding: "utf-8" });
  }

  write(path: string, data: string): void {
    writeFileSync(path, data, { encoding: "utf-8" });
  }

  delete(path: string): void {
    unlinkSync(path);
  }

  rename(oldPath: string, newPath: string): void {
    renameSync(oldPath, newPath);
  }

  exists(path: string): boolean {
    return existsSync(path);
  }

  access(path: string, mode?: number): void {
    accessSync(path, mode);
  }
}
