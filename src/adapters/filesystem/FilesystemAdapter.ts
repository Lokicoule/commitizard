export interface FilesystemAdapter {
  read(path: string): string;
  write(path: string, data: string): void;
  delete(path: string): void;
  rename(oldPath: string, newPath: string): void;
  exists(path: string): boolean;
}
