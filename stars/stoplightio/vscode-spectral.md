---
repo: stoplightio/vscode-spectral
url: 'https://github.com/stoplightio/vscode-spectral'
homepage: 'https://marketplace.visualstudio.com/items?itemName=stoplight.spectral'
starredAt: '2021-04-26T21:44:05Z'
createdAt: '2019-12-12T13:02:36Z'
updatedAt: '2024-11-25T07:13:59Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 72
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:46.198Z'
description: >-
  VS Code extension bringing the awesome Spectral JSON/YAML linter with
  OpenAPI/AsyncAPI support
tags: []
---

# Spectral Linter for VS Code

The Spectral VS Code Extension brings the power of [Spectral](https://stoplight.io/open-source/spectral?utm_source=github.com&utm_medium=referral&utm_campaign=github_repo_vs_code_spectral) to your favorite editor.

Spectral is a flexible object linter with out of the box support for [OpenAPI](https://openapis.org/) v2 and v3, [Arazzo](https://www.openapis.org/arazzo), [JSON Schema](https://json-schema.org/), and [AsyncAPI](https://www.asyncapi.com/) v2 and v3.

## Features

- Lint-on-save
- Lint-on-type
- Custom ruleset support (`.spectral.json`, `.spectral.yaml`, `.spectral.yml` or `.spectral.js`)
- Intellisense for custom ruleset editing
- Support for JSON and YAML input

![screenshot](assets/screenshot1.png)

## Requirements

- Node.js ^12.21 or >=14.13
- Visual Studio Code version 1.48 or higher.

## Installation

- Install from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral)
- Install via the CLI: `code --install-extension stoplight.spectral`

## Extension Settings

This extension contributes the following settings:

- `spectral.enable`: Controls whether or not Spectral is enabled.
- `spectral.rulesetFile`: Location of the ruleset file to use when validating. If omitted, the default is a `.spectral.(json|yaml|yml)` in the same folder as the document being validated. Paths are relative to the workspace. This can also be a remote HTTP url.
- `spectral.run`: Run the linter on save (`onSave`) or as you type (`onType`).
- `spectral.validateFiles`: An array of file globs (e.g., `**/*.yaml`) which should be validated by Spectral. If language identifiers are also specified, the file must match both in order to be validated. You can also use negative file globs (e.g., `!**/package.json`) here to exclude files.
- `spectral.validateLanguages`: An array of language IDs (e.g., `yaml`, `json`) which should be validated by Spectral. If file globs are also specified, the file must match both in order to be validated.

## Thanks

- [Mike Ralphson](https://github.com/MikeRalphson)
- [Travis Illig](https://github.com/tillig)

## License

[Apache-2.0](LICENSE.txt)
