config:

- init:

  - move current .commitcraft.json to .commitcraft.json.v
  - create new .commitcraft.json

- clean:

  - remove .commitcraft.json

- variant of .commitcraft.json:
  - emoji

docs:

- design doc
  - why state machine and chain of responsibility for the wizard
  - why chain of responsibility for conventional and red-green-refactor
  - describe the config file and how to customize it to feat the need
  - give example with scopes options
  - generate gif showing each use cases

red-green-refactor:

- refactor the config options
- rewrite it without the use of state machine which won't be needed anymore
- update tests
