import { GitProcessBuilderFactory } from "../process/factory/git-process-builder-factory";

const excludeFromDiff: readonly string[] = [
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "yarn-error.log",
  "pnpm-lock.yaml",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/npm-shrinkwrap.json",
  "**/package-lock.json",
  "**/yarn-error.log",
  "**/*.lock-w",
  "**/yarn.lock.*",
  "**/yarn.lock/*.log",
  "**/.yarn/cache",
  "**/.yarn/unplugged",
].map((file) => `:(exclude)${file}`);

export async function isInsideGitRepo(): Promise<boolean> {
  const gitProcessBuilder = GitProcessBuilderFactory.create()
    .addArg("rev-parse")
    .addArg("--is-inside-work-tree");

  const gitProcess = gitProcessBuilder.spawn();
  const stdout = await streamToString(gitProcess.stdout);

  return Boolean(stdout);
}

export const getStagedFiles = async () => {
  const gitProcessBuilder = GitProcessBuilderFactory.create();
  gitProcessBuilder.addArg("diff");
  gitProcessBuilder.addArg("--cached");
  excludeFromDiff.forEach((file) => gitProcessBuilder.addArg(file));

  const gitProcess = gitProcessBuilder.spawn();
  const files = (await streamToString(gitProcess.stdout))
    .split("\n")
    .filter(Boolean);

  if (!files.length) {
    return null;
  }

  return files;
};

export const getStagedDiff = async (file?: string) => {
  const diffProcessBuilder = GitProcessBuilderFactory.create();
  diffProcessBuilder.addArg("diff");
  diffProcessBuilder.addArg("--cached");
  excludeFromDiff.forEach((file) => diffProcessBuilder.addArg(file));

  if (file) {
    diffProcessBuilder.addArg(file.toString());
  }

  const diffProcess = diffProcessBuilder.spawn();

  return await streamToString(diffProcess.stdout);
};

function streamToString(
  stream: NodeJS.ReadableStream,
  encoding: BufferEncoding = "utf8"
): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("data", (chunk) => {
      data += chunk.toString(encoding);
    });
    stream.on("end", () => {
      resolve(data);
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
}
