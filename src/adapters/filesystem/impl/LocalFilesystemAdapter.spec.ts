import { LocalFilesystemAdapter } from "./LocalFilesystemAdapter";
import mockFs from "mock-fs";

describe("LocalFilesystemAdapter", () => {
  let adapter: LocalFilesystemAdapter;

  beforeEach(() => {
    adapter = new LocalFilesystemAdapter();
    mockFs({
      "test-file.txt": "This is a test file.",
      "test-dir": {
        "test-file-2.txt": "This is another test file.",
      },
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("should read a file", () => {
    const content = adapter.read("test-file.txt");
    expect(content).toEqual("This is a test file.");
  });

  it("should write a file", () => {
    adapter.write("new-file.txt", "This is a new file.");
    const content = adapter.read("new-file.txt");
    expect(content).toEqual("This is a new file.");
  });

  it("should delete a file", () => {
    expect(adapter.exists("test-file.txt")).toBeTruthy();
    adapter.delete("test-file.txt");
    expect(adapter.exists("test-file.txt")).toBeFalsy();
  });

  it("should rename a file", () => {
    expect(adapter.exists("test-file.txt")).toBeTruthy();
    adapter.rename("test-file.txt", "test-dir/test-file-renamed.txt");
    expect(adapter.exists("test-file.txt")).toBeFalsy();
    expect(adapter.exists("test-dir/test-file-renamed.txt")).toBeTruthy();
  });

  it("should check if a file exists", () => {
    expect(adapter.exists("test-file.txt")).toBeTruthy();
    expect(adapter.exists("non-existent-file.txt")).toBeFalsy();
  });
});
