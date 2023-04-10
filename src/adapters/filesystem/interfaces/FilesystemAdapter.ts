export interface AsyncFilesystemAdapter {
  readAsync(path: string): Promise<string>;
  writeAsync(path: string, data: string): Promise<void>;
  deleteAsync(path: string): Promise<void>;
  renameAsync(oldPath: string, newPath: string): Promise<void>;
  existsAsync(path: string): Promise<boolean>;
}

export interface FilesystemAdapter {
  read(path: string): string;
  write(path: string, data: string): void;
  delete(path: string): void;
  rename(oldPath: string, newPath: string): void;
  exists(path: string): boolean;
}
