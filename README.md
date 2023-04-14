# Commitizard 🧙‍♂️

[![CI Pipeline](https://github.com/Lokicoule/commitizard/actions/workflows/ci.js.yml/badge.svg)](https://github.com/Lokicoule/commitizard/actions/workflows/ci.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/Lokicoule/commitizard/badge.svg?branch=main)](https://coveralls.io/github/Lokicoule/commitizard?branch=main)

**Commitizard** is a TypeScript-based Command Line Interface (CLI) wizard application designed to help developers write better commit messages. It supports **conventional** commits and **red-green-refactor** commit strategies. The project is fully configurable through the `.commitizard.json` file.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [Wizard (default)](#wizard-default)
    - [Options](#options)
    - [Overviews](#overviews)
  - [Config](#config)
    - [Options](#options-1)
  - [Hook](#hook)
    - [Options](#options-2)
- [Configuration](#configuration)
- [Examples](#examples)
- [Advanced Usages](#advanced-usages)
  - [Customizing Prompts](#1-customizing-prompts-for-conventional-strategy)
  - [Custom Commit Message Templates for Red-Green-Refactor Strategy](#2-custom-commit-message-templates-for-red-green-refactor-strategy)
  - [Bypassing Git Hooks with the environment variable](#3-bypassing-hooks-with-the-environment-variable)
    - [Unix based systems](#unix-based-systems)
    - [Windows](#windows)
- [Contributing](#contributing)
- [License](#license)

<a name="features">

## 🌟 Features

- Wizard-style commit message generation
- Supports conventional and red-green-refactor (TDD) commit strategies
- Fully configurable through `.commitizard.json`
- Git hook management
- Application configuration management

</a>

<a name="installation">

## 💻 Installation

**Commitizard** is designed for local use as part of a development workflow. Install it locally in your project:

```sh
npm install --save-dev commitizard
```

Or install it globally to use it from any git directory:

```sh
npm install -g commitizard
```

</a>

<a name="usage">

## 🚀 Usage

### Local Installation

When installed locally, it's recommended to create a script in your `package.json` file. This allows you to pass any desired options and helps you avoid potential side effects related to hooks.
Adding a Commitizard Script

To add a script to your `package.json` file, add the following line to the scripts section:

```json
"commitizard": "commitizard -s conventional -D"
```

Replace `-s conventional` and `-D` options with any Commitizard wizard options you want to use.

### Global Installation

For global installations, you can create a Git alias to easily run Commitizard from any git directory:

```sh
git config --global alias.cw "commitizard"
```

With this alias, you can use `git cw` to run Commitizard.

### General Usage

```sh
commitizard [command] [options]
```

For more detailed information on available commands and options, run:

```sh
commitizard --help
```

</a>

<a name="commands">

## 🛠️ Commands

**Commitizard** provides the following commands:

1. wizard: A CLI tool for generating commit messages.
2. config: Manage the application configuration.
3. hook: Manage the application hooks.

### Wizard (default)

The Wizard command is responsible for generating commit messages based on user input and the selected commit strategy. If the `-s`, `--strategy` option is not provided, **Commitizard** will prompt the user to choose between the _conventional_ and _red-green-refactor_ commit strategies before proceeding with the commit message generation. This interactive confirmation ensures that the appropriate commit message format is used based on the user's preference or project requirements.

#### Options

- `-p, --path <path>`: Path to the configuration file
- `-D, --display-staged-files`: Display staged files before prompting for commit message
- `-S, --select-files`: Prompt user to select files to stage before prompting for commit message
- `-s, --strategy`: Commit message strategy to use
- `-e, --with-emoji`: Use a relevant emoji as a prefix for the commit message type
- `--from-hook`: Indicates that the command was called from a git hook

#### Overviews

1. `commitizard --display-staged-files --strategy red-green-refactor`
   [![asciicast](https://asciinema.org/a/s3a9kBzZgeYGMBzD8h1C9BXLX.svg)](https://asciinema.org/a/s3a9kBzZgeYGMBzD8h1C9BXLX)
2. `commitizard --select-files`
   [![asciicast](https://asciinema.org/a/wqmj7Vh9gYfoM7cCRdBi25Su7.svg)](https://asciinema.org/a/wqmj7Vh9gYfoM7cCRdBi25Su7)

3. `commitizard --strategy conventional --with-emoji`
   [![asciicast](https://asciinema.org/a/vObWwGShHEXBRwjtY0ryboyHW.svg)](https://asciinema.org/a/vObWwGShHEXBRwjtY0ryboyHW)

4. `commitizard --display-staged-files`
   [![asciicast](https://asciinema.org/a/UUJb1jXv11j5PXyz0LR1F0iSR.svg)](https://asciinema.org/a/UUJb1jXv11j5PXyz0LR1F0iSR)

5. Using hooks: `git commit`
   [![asciicast](https://asciinema.org/a/H1t2ZK3DmdScB1Fs2UGQQrZPq.svg)](https://asciinema.org/a/H1t2ZK3DmdScB1Fs2UGQQrZPq)

### Config

The Config command is responsible for managing the application configuration.

#### Options

- `-p, --path <path>`: Path to the configuration file
- `-i, --install`: Install the configuration file
- `-e, --with-emoji`: Use the emoji configuration file
- `-b, --backup`: Backup the configuration file
- `-r, --restore`: Restore the configuration file
- `-d, --delete`: Delete the configuration file

### Hook

The Hook command is responsible for managing the application hooks.

#### Options

- `-i, --install`: Install the hooks
- `-u, --uninstall`: Uninstall the hooks
  </a>
  <a name="configuration">

## 🔧 Configuration

**Commitizard** is fully configurable via a JSON file. It can be generated into your project folder using the `commitizard config -i` or `commitizard config --install` command.

The configuration file includes settings for both **_conventional_** and **_red-green-refactor_** commit message patterns. Here is an example of the available configuration options:

1. Conventional Commits

- `types` (array): An array of commit **_types_**, with each item containing a `value` and `label`.
  - `value` represents the type of the commit (e.g. feat, fix, docs).
  - `label` is the text that will be displayed in the interactive prompt to describe the type of the commit.
- `scopes` (array): An array of commit **_scopes_**, with each item containing a `value` and `label`.
  - `value` represents the scope of the commit (e.g. core, ui, docs)
  - `label` is the text that will be displayed in the interactive prompt to describe the scope of the commit.

2. Red-Green-Refactor Commits

- `types` (array): An array of commit **_types_**, with each item containing a `value`, `label`, and `patterns`.
  - `value` represents the type of the commit (e.g. RED, GREEN, REFACTOR).
  - `label` is the text that will be displayed in the interactive prompt to describe the type of the commit.
  - `patterns` is an array of regular expressions or strings that will be used to match against the commit message when generating a commit. If a match is found, the commit type will be automatically set to the corresponding value.

The configuration file can be edited to add, remove, or modify the available options for commit types and scopes. This allows you to fully customize the prompts and messages generated by **Commitizard** to match your team's specific needs.
</a>

## 📚 Examples

<a name="examples">
Here's an example configuration file:

<details>
  <summary>Click to show</summary>

```json
{
  "version": "0.0.1",
  "settings": {
    "maxViewFilesToShow": 5,
    "excludePaths": [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/package-lock.json"
    ]
  },
  "conventional": {
    "commitOptions": {
      "template": {
        "type": "{{type}}",
        "scope": "({{scope}})",
        "subject": ": {{subject}}",
        "body": "\n\n{{body}}",
        "footer": "\n\n{{footer}}",
        "breaking": "\n\nBREAKING CHANGE:\n {{breaking}}",
        "refs": "\n\nRefs: {{refs}}"
      },
      "templateOrder": [
        "type",
        "scope",
        "subject",
        "body",
        "breaking",
        "footer",
        "refs"
      ]
    },
    "cliOptions": {
      "scopes": [
        {
          "value": "core",
          "label": "Core"
        },
        {
          "value": "common",
          "label": "Common"
        },
        {
          "value": "domain",
          "label": "Domain"
        },
        {
          "value": "infra",
          "label": "Infra"
        },
        {
          "value": "business",
          "label": "Business"
        }
      ],
      "types": [
        {
          "value": "feat",
          "label": "feat: A new feature"
        },
        {
          "value": "fix",
          "label": "fix: A bug fix"
        },
        {
          "value": "docs",
          "label": "docs: Documentation only changes"
        },
        {
          "value": "style",
          "label": "style: Changes that do not affect the meaning of the code"
        },
        {
          "value": "refactor",
          "label": "refactor: A code change that neither fixes a bug nor adds a feature"
        },
        {
          "value": "perf",
          "label": "perf: A code change that improves performance"
        },
        {
          "value": "test",
          "label": "test: Adding missing tests or correcting existing tests"
        },
        {
          "value": "ci",
          "label": "ci: Changes to our CI configuration files and scripts"
        },
        {
          "value": "chore",
          "label": "chore: Changes to the build process or auxiliary tools and libraries"
        }
      ]
    }
  },
  "redGreenRefactor": {
    "commitOptions": {
      "template": {
        "type": "[{{type}}]: ",
        "subject": "{{subject}}",
        "body": "\n\n{{body}}"
      },
      "templateOrder": ["type", "subject", "body"]
    },
    "cliOptions": {
      "types": [
        {
          "value": "RED",
          "label": "RED: Write a test that fails",
          "patterns": [
            "Add failing test for {{feature}}",
            "Write failing test for {{feature}}",
            "Create failing test for {{feature}}",
            "Implement failing test for {{feature}}",
            "Introduce failing test for {{feature}}",
            "Start failing test for {{feature}}",
            "Begin failing test for {{feature}}",
            "Initiate failing test for {{feature}}",
            "Setup failing test for {{feature}}"
          ]
        },
        {
          "value": "GREEN",
          "label": "GREEN: Make the test pass",
          "patterns": [
            "Make test pass for {{feature}}",
            "Fix failing test for {{feature}}",
            "Implement solution for {{feature}}",
            "Add code to pass test for {{feature}}",
            "Introduce passing test for {{feature}}",
            "Start passing test for {{feature}}",
            "Begin passing test for {{feature}}",
            "Initiate passing test for {{feature}}",
            "Setup passing test for {{feature}}"
          ]
        },
        {
          "value": "REFACTOR",
          "label": "REFACTOR: Refactor the code without changing functionality",
          "patterns": [
            "Refactor {{feature}} to improve {{performance/maintainability/readability/usability}}",
            "Restructure {{feature}} to {{simplify/consolidate/clarify}}",
            "Extract {{feature}} to {{separate file/module}}",
            "Inline {{feature}}",
            "Rename {{feature}} to {{new name}}",
            "Move {{feature}} to {{new location}}",
            "Reorganize {{feature}} to {{streamline/improve}}",
            "Simplify {{feature}} by {{removing unnecessary code/logic}}",
            "Optimize {{feature}} by {{reducing complexity/improving efficiency}}",
            "Improve {{feature}} by {{cleaning up/rewriting}} code for {{clarity/consistency}}"
          ]
        }
      ]
    }
  }
}
```

</details>
</a>

<a name="advanced-usages">

## ⚙️ Advanced Usages

### 1. Customizing Prompts for Conventional Strategy

You can customize the interactive prompts displayed by **Commitizard** by modifying the `label` property of the `types` and `scopes` objects in your `.commitizard.json` configuration file. This allows you to provide more descriptive or project-specific information to guide users when creating commit messages.

For example, if your project has a specific set of modules, you can define custom scope labels like this:

```json
"scopes": [
  {
    "value": "module-a",
    "label": "Module A (user management)"
  },
  {
    "value": "module-b",
    "label": "Module B (payment processing)"
  }
]
```

These custom labels will be displayed in the interactive prompts, making it easier for users to select the appropriate scope for their commit.

### 2. Custom Commit Message Templates for Red-Green-Refactor Strategy

You can create custom commit message templates for the Red-Green-Refactor strategy to fit your project's specific requirements. To do this, modify the **patterns** array for each commit type (**RED**, **GREEN**, and **REFACTOR**) in the `redGreenRefactor.cliOptions.types` section of your `.commitizard.json` configuration file.

For example, to add a custom pattern for the **RED** type, your configuration file could include the following entry:

```json
{
  "value": "RED",
  "label": "RED: Write a test that fails",
  "patterns": [
    ...,
      "New custom pattern for RED commits {{feature}}"  ]
}
```

Replace `New custom pattern for RED commits {{feature}}` with your desired pattern. The `{{feature}}` placeholder will be replaced by the user input when generating the commit message.

### 3. Bypassing Hooks with the Environment Variable

In some cases, you might want to bypass the git hooks managed by **Commitizard**. This can be done by setting the `COMMITIZARD_BYPASS` environment variable to true before executing the git command. [Here](https://github.com/Lokicoule/commitizard/blob/main/docs/bypassing_hooks.md), you can find more information about the technical choice

##### Unix-based Systems

On Unix-based systems (Linux, macOS), use the following command to bypass the `prepare-commit-msg` hook:

```sh
COMMITIZARD_BYPASS=true git commit -m "Your commit message"
```

or

```sh
COMMITIZARD_BYPASS=true git rebase -i HEAD~3
```

##### Windows

On Windows, you can bypass the `prepare-commit-msg` hook using the following command:

```sh
set COMMITIZARD_BYPASS=true && git commit -m "Your commit message"
```

or

```sh
set COMMITIZARD_BYPASS=true && git rebase -i HEAD~3
```

By setting the `COMMITIZARD_BYPASS` environment variable, you can control when the hooks should be executed, giving more flexibility during development.

</a>

<a name="contributing">

## 🤝 Contributing

Please feel free to submit issues and pull requests for bug fixes, features, or improvements. We appreciate your contribution to the project!
</a>
<a name="license">

## ⚖️ License

Commitizard is [MIT licensed](https://github.com/Lokicoule/commitizard/blob/main/LICENSE).
</a>
