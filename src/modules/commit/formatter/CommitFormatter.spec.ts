import { ConventionalOptions } from "../../../core/config/types";
import { CommitFormatter } from "./CommitFormatter";

const stubOptions = {
  commitOptions: {
    template: {
      type: "{{type}}",
      scope: "({{scope}})",
      subject: ": {{subject}}",
      body: "\n\n{{body}}",
      footer: "\n\n{{footer}}",
      breaking: "\n\nBREAKING CHANGE:\n {{breaking}}",
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
} as ConventionalOptions;

describe("CommitFormatter", () => {
  it("should format commit", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      footer: {
        message: "footer",
      },
      breakingChanges: {
        message: "breaking",
      },
      references: {
        message: "references",
      },
    };

    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type(scope): subject\n\nbody\n\nBREAKING CHANGE:\n breaking\n\nfooter\n\nRefs: references"
    );
  });

  it("should format commit without scope", () => {
    const commit = {
      type: {
        message: "type",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      footer: {
        message: "footer",
      },
      breakingChanges: {
        message: "breaking",
      },
      references: {
        message: "references",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type: subject\n\nbody\n\nBREAKING CHANGE:\n breaking\n\nfooter\n\nRefs: references"
    );
  });

  it("should format commit without body", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      footer: {
        message: "footer",
      },
      breakingChanges: {
        message: "breaking",
      },
      references: {
        message: "references",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type(scope): subject\n\nBREAKING CHANGE:\n breaking\n\nfooter\n\nRefs: references"
    );
  });

  it("should format commit without footer", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      breakingChanges: {
        message: "breaking",
      },
      references: {
        message: "references",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type(scope): subject\n\nbody\n\nBREAKING CHANGE:\n breaking\n\nRefs: references"
    );
  });

  it("should format commit without breaking", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      footer: {
        message: "footer",
      },
      references: {
        message: "references",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type(scope): subject\n\nbody\n\nfooter\n\nRefs: references"
    );
  });

  it("should format commit without references", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      footer: {
        message: "footer",
      },
      breakingChanges: {
        message: "breaking",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe(
      "type(scope): subject\n\nbody\n\nBREAKING CHANGE:\n breaking\n\nfooter"
    );
  });

  it("should format commit without references and breaking", () => {
    const commit = {
      type: {
        message: "type",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      body: {
        message: "body",
      },
      footer: {
        message: "footer",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe("type(scope): subject\n\nbody\n\nfooter");
  });

  it("should format commit with type and subject", () => {
    const commit = {
      type: {
        message: "type",
      },
      subject: {
        message: "subject",
      },
    };
    const formattedCommit = CommitFormatter.format(commit, stubOptions);
    expect(formattedCommit).toBe("type: subject");
  });
});
