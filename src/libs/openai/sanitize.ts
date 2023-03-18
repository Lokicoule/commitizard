export const sanitize = (diff: string): string => {
  // Remove unnecessary whitespace
  diff = diff.trim().replace(/\s+/g, " ");

  // Remove line numbers
  diff = diff.replace(/^\s*\d+\s*(\|\||[-+])/, "$1");

  // Remove file paths
  diff = diff.replace(/^(\s*---|\s*\+\+\+)\s+[\S ]*\s*/, "");

  // Collapse similar lines
  diff = diff
    .split("\n")
    .reduce((result: string[], line: string) => {
      if (result.length > 0 && result[result.length - 1] === line) {
        return result;
      } else {
        return [...result, line];
      }
    }, [])
    .join("\n");

  diff = diff.replace(/\s+$/, "");

  return diff.replace(/[\n\r]/g, "");
};
