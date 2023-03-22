import { ProcessBuilderFactory } from "~/core/process/factory/ProcessBuilderFactory";

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
  const gitProcessBuilder = ProcessBuilderFactory.create()
    .addArg("rev-parse")
    .addArg("--is-inside-work-tree");

  const gitProcess = gitProcessBuilder.spawn("git");
  const stdout = await streamToString(gitProcess.stdout);

  return Boolean(stdout);
}

export const getFiles = async () => {
  const unstagedFiles = await getUnstagedFiles();
  const untrackedFiles = await getUntrackedFiles();
  const stagedFiles = await getStagedFiles();

  const files = [...unstagedFiles, ...untrackedFiles];

  return files.filter((file) => !stagedFiles?.includes(file));
};

export const getUnstagedFiles = async () => {
  const gitProcessBuilder = ProcessBuilderFactory.create()
    .addArg("diff")
    .addArg("--name-only");
  excludeFromDiff.forEach((file) => gitProcessBuilder.addArg(file));

  const gitProcess = gitProcessBuilder.spawn("git");
  const files = (await streamToString(gitProcess.stdout))
    .split("\n")
    .filter(Boolean);

  return files || [];
};

export const getUntrackedFiles = async () => {
  const gitProcessBuilder = ProcessBuilderFactory.create()
    .addArg("ls-files")
    .addArg("--others")
    .addArg("--exclude-standard");
  excludeFromDiff.forEach((file) => gitProcessBuilder.addArg(file));

  const gitProcess = gitProcessBuilder.spawn("git");
  const files = (await streamToString(gitProcess.stdout))
    .split("\n")
    .filter(Boolean);

  return files || [];
};

export const getStagedFiles = async () => {
  const gitProcessBuilder = ProcessBuilderFactory.create()
    .addArg("diff")
    .addArg("--cached")
    .addArg("--name-only");
  excludeFromDiff.forEach((file) => gitProcessBuilder.addArg(file));

  const gitProcess = gitProcessBuilder.spawn("git");
  const files = (await streamToString(gitProcess.stdout))
    .split("\n")
    .filter(Boolean);

  return files || [];
};

export const getStagedDiff = async (file?: string) => {
  const diffProcessBuilder = ProcessBuilderFactory.create()
    .addArg("diff")
    .addArg("--cached")
    .addArg("--no-prefix")
    .addArg("--no-commit-id")
    .addArg("--summary")
    .addArg("--no-ext-diff")
    .addArg("--unified=0")
    .addArg("--ignore-all-space")
    .addArg("--ignore-blank-lines")
    .addArg("--ignore-space-at-eol")
    .addArg("--ignore-space-change")
    .addArg("--diff-algorithm=minimal");

  excludeFromDiff.forEach((file) => diffProcessBuilder.addArg(file));

  if (file) {
    diffProcessBuilder.addArg(file.toString());
  }

  const diffProcess = diffProcessBuilder.spawn("git");

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
