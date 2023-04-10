import { FilesystemAdapterFactory } from "./FilesystemAdapterFactory";
import { LocalFilesystemAdapter } from "../impl/LocalFilesystemAdapter";

describe("FilesystemAdapterFactory", () => {
  it("should create a local filesystem adapter", () => {
    expect(
      FilesystemAdapterFactory.createLocalFilesystemAdapter()
    ).toBeInstanceOf(LocalFilesystemAdapter);
  });
});
