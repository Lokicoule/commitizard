# Bypassing Hooks in the Content Hook vs Using `--no-verify`

## Overview

This design document explains the rationale behind using an environment variable (i.e., `COMMITIZARD_BYPASS`) to bypass specific hooks inside the content hook, as opposed to using the `--no-verify` option when running git commands.

## Background

Git hooks allow custom scripts to be run during specific git events, such as committing changes. In our use case, we have one hook, `prepare-commit-msg`. The `prepare-commit-msg` hook generates a commit message.

To avoid an infinite loop when the `prepare-commit-msg` hook runs the same command it is triggered by, we use an environment variable `COMMITIZARD_BYPASS` to bypass the hook execution.

An alternative approach to bypass hooks is to use the `--no-verify` option with git commands, such as `git commit --no-verify`.

## Problem Statement

Determine whether it is better to bypass hooks using an environment variable inside the content hook or using the `--no-verify` option when running git commands.

## Design Rationale

### Bypassing Hooks Using an Environment Variable

Using an environment variable like `COMMITIZARD_BYPASS` to bypass hooks has the following benefits:

1. Selective bypass: It allows developers to selectively bypass certain hooks while still running others. This provides fine-grained control over hook execution.

2. Consistency: It ensures that the hook bypass mechanism is consistent across different platforms and environments. This is important because different platforms may have different ways of handling environment variables.

### Bypassing Hooks Using `--no-verify`

Using the `--no-verify` option to bypass hooks has the following drawbacks:

1. All-or-nothing approach: The `--no-verify` option bypasses all hooks associated with a git command, not just specific ones. This is less flexible and could cause unintended side effects.

2. Potential for misuse: The `--no-verify` option may be inadvertently used by developers, causing hooks to be skipped when they should be run. This could lead to unexpected behavior and decreased code quality.

## Conclusion

Given the design rationale, using an environment variable like `COMMITIZARD_BYPASS` to selectively bypass specific hooks inside the content hook is a better solution than using the `--no-verify` option when running git commands. This approach provides greater flexibility, consistency, and control over hook execution.
