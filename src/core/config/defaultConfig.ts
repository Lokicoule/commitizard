import { Config } from "./types";

export const defaultConfig = {
  commitOptions: {
    template: {
      type: "{{type}}",
      scope: "({{scope):}} ",
      subject: "{{subject}}",
      body: "\n\n{{body}}",
      footer: "\n\n{{footer}}",
      breaking: "\n\nBREAKING CHANGE: {{breaking}}",
      refs: "\n\nRefs: {{refs}}",
    },
    templateOrder: [
      "type",
      "scope",
      "subject",
      "body",
      "breaking",
      "footer",
      "refs",
    ],
  },
  cliOptions: {
    types: [
      { value: "feat", label: "feat: A new feature" },
      { value: "fix", label: "fix: A bug fix" },
      { value: "docs", label: "docs: Documentation only changes" },
      {
        value: "style",
        label: "style: Changes that do not affect the meaning of the code",
      },
      {
        value: "refactor",
        label:
          "refactor: A code change that neither fixes a bug nor adds a feature",
      },
      {
        value: "perf",
        label: "perf: A code change that improves performance",
      },
      {
        value: "test",
        label: "test: Adding missing tests or correcting existing tests",
      },
      {
        value: "ci",
        label: "ci: Changes to our CI configuration files and scripts",
      },
      {
        value: "chore",
        label:
          "chore: Changes to the build process or auxiliary tools and libraries",
      },
    ],
  },
} satisfies Config;