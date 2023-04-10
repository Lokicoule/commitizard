import { FilesystemAdapterFactory } from "../../factories/FilesystemAdapterFactory";
import { LocalFilesystemAdapter } from "../../impl/LocalFilesystemAdapter";

describe("FilesystemAdapterFactory", () => {
  it("should create a local filesystem adapter", () => {
    expect(
      FilesystemAdapterFactory.createLocalFilesystemAdapter()
    ).toBeInstanceOf(LocalFilesystemAdapter);
  });
});
