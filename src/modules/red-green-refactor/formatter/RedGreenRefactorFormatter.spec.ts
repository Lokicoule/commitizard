import { RedGreenOptions } from "../../../core/config/types";
import { RedGreenRefactorFormatter } from "./RedGreenRefactorFormatter";

const stubOptions = {
  commitOptions: {
    template: {
      type: "{{type}}",
      subject: ": {{subject}}",
    },
    templateOrder: ["type", "subject"],
  },
} as RedGreenOptions;

describe("RedGreenRefactorFormatter", () => {
  it("should format commit", () => {
    const formattedCommit = RedGreenRefactorFormatter.format(
      {
        type: "GREEN",
        message: "message",
      },
      stubOptions
    );
    expect(formattedCommit).toBe("GREEN: message");
  });
});
