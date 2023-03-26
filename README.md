# CommitCraft

[![Coverage Status](https://coveralls.io/repos/github/Lokicoule/CommitCraft/badge.svg?branch=main)](https://coveralls.io/github/Lokicoule/CommitCraft?branch=main)

Commit Craft is a command-line tool that helps you generate high-quality commit messages with ease. With support for both conventional and red-green-refactor commit message patterns, it provides an interactive prompt that guides you through the process of writing a commit message and a flexible and customizable solution for your commit message needs.

## Installation

```sh
npm install -g commit-craft
```

## Usage

To use the Commit Craft CLI tool, simply run the `commit-craft` command in your terminal.

```sh
commit-craft
```

This will start the wizard in interactive mode, prompting you for the necessary information to generate a commit message. You can customize the behavior of the wizard using various command-line options and configuration file.

### Options

- `-c, --config <path>`: Path to the configuration file. Default: ./commit-wizard.json.
- `-D, --no-display-staged-files`: Do not display staged files before prompting for commit message.
- `-S, --no-select-files`: Do not prompt user to select files to stage before prompting for commit message.
- `-s, --strategy <strategy>`: Commit message strategy to use. Can be either conventional or red-green-refactor.
- `-e, --with-emoji`: Prefix message with a relevant emoji.

### Examples

Here are some examples of how to use the Commit Wizard:

```sh
commit-craft --strategy conventional
commit-craft -s conventional
```

Similarly, to use the red-green-refactor convention, you would run:

```sh
commit-craft --strategy red-green-refactor
commit-craft -s red-green-refactor
```

You can also specify a configuration file to use with the `--config` option:

```sh
commit-craft --config ./my-commit-wizard-config.json
commit-wizard -c ./my-commit-wizard-config.json
```

This will use the configuration file at _./my-commit-wizard-config.json_ instead of the default configuration file.

The Commit Craft CLI tool also offers some additional options, such as displaying staged files before prompting for a commit message (`--display-staged-files`), prompting the user to select files to stage before prompting for a commit message (`--select-files`) and adding a relevant emoji as a prefix to the commit message (`--with-emoji`).

For more information on how to use the Commit Wizard CLI tool, run:

```sh
commit-craft --help
```

## Contributing

Contributions to the Commit Craft are welcome! To contribute, please fork the repository and submit a pull request.
