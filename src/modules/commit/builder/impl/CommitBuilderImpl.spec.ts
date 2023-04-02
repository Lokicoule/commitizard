import { CommitBuilder } from "../CommitBuilder";
import { CommitBuilderImpl } from "./CommitBuilderImpl";

describe("CommitBuilderImpl", () => {
  let commitBuilder: CommitBuilder;

  beforeEach(() => {
    commitBuilder = new CommitBuilderImpl();
  });

  it("should build a commit", () => {
    const commit = commitBuilder
      .withType({ message: "feat" })
      .withScope({ message: "scope" })
      .withSubject({ message: "subject" })
      .withBreakingChanges({ message: "breaking changes" })
      .withReferences({ message: "references" })
      .withBody({ message: "body" })
      .withFooter({ message: "footer" })
      .build();

    expect(commit).toEqual({
      body: {
        message: "body",
      },
      breakingChanges: {
        message: "breaking changes",
      },
      footer: {
        message: "footer",
      },
      references: {
        message: "references",
      },
      scope: {
        message: "scope",
      },
      subject: {
        message: "subject",
      },
      type: {
        message: "feat",
      },
    });
  });
});
