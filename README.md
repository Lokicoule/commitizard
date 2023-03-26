# CommitCraft

The Commit Craft CLI is a tool that helps you generate better commit messages. It provides an interactive prompt that guides you through the process of writing a commit message, based on different strategies.

The tool is built with TypeScript and uses Commander to create the CLI interface.

## Requirements

To use this tool, you need to have Git installed on your machine.

## Installation

todo later

### Options

The following options are available:

```sh
-c, --config <path>: Path to the configuration file. Default is ./config.json.
    -D, --no-display-staged-files: Do not display the staged files before prompting for a commit message.
    -S, --no-select-files: Do not prompt the user to select files to stage before prompting for a commit message.
    -s, --strategy <strategy>: Specify the commit message strategy to use. The available options are red-green-refactor and conventional.
    -e, --with-emoji: Add emoji to the configuration.
```

### Subcommands

The following subcommands are available:

```sh
init: Initialize the application. Options:
        -p, --path <path>: Path to initialize the application. Default is ./config.json.
        -e, --with-emoji: Add emoji to the configuration.
    clean: Clean up the application. Options:
        -p, --path <path>: Path to clean up the application. Default is ./config.json.
    reset: Reset the application. Options:
        -p, --path <path>: Path to reset the application. Default is ./config.json.
```
