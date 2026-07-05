---
repo: HiDeoo/Typedown
url: 'https://github.com/HiDeoo/Typedown'
homepage: 'https://marketplace.visualstudio.com/items?itemName=hideoo.typedown'
starredAt: '2023-01-24T21:06:05Z'
createdAt: '2021-09-05T06:40:27Z'
updatedAt: '2023-01-24T21:29:12Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:57.334Z'
description: >-
  Visual Studio Code extension - Quickly export your TypeScript definitions to
  Markdown
tags:
  - definition
  - export
  - extension
  - markdown
  - typescript
  - vscode
---

<div align="center">
  <img alt="Typedown" src="https://i.imgur.com/bwwZ63Z.png" width="128" />
  <h1 align="center">Typedown</h1>
</div>

<div align="center">
  <p><strong>Quickly export your TypeScript definitions to Markdown…</strong></p>
  <p>
  <a href="https://github.com/HiDeoo/Typedown/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/Typedown/workflows/integration/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/Typedown/blob/main/LICENSE.md">
    <img alt="License" src="https://badgen.net/github/license/hideoo/Typedown" />
  </a>
  </p>
  <p>
  <a href="https://i.imgur.com/PlPbJnF.png" title="Screenshot of the Typedown Extension">
    <img alt="Screenshot of the Typedown Extension" src="https://i.imgur.com/PlPbJnF.png" width="1024" />
  </a>
  </p>
</div>

## Motivations

I often need to convert TypeScript definitions to Markdown to include them in a `README` file, discuss them in a GitHub issue or pull request, etc. so I decided to build a quick way to select in a custom Visual Studio Code editor various definitions from either a file or folder from a TypeScript project and export them to my clipboard in Markdown.

For more advanced use cases, you may want to check other solutions like [TypeDoc](https://typedoc.org) (used internally).

## Usage

You can export TypeScript definitions from either a file or a folder by invoking the associated Typedown command from the Visual Studio Code Command Palette (<kbd>⌘ + ⇧ + P</kbd> on macOS or <kbd>Ctrl + ⇧ + P</kbd> on Windows & Linux by default):

- **`Typedown: File Definitions to Markdown`** for a file.
- **`Typedown: Folder Definitions to Markdown`** for a folder.

The extension will collect your exported TypeScript definitions and present them to you in a custom Visual Studio Code editor fitting your theme where you will be able to select which definitions to export to Markdown. You can also select the heading level to use for the definition names.

When done, press the **`Export`** button to export the selected definitions to your clipboard in Markdown.

## Definitions

Currently, only TypeScript [interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) & [type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) exported from your code are converted to Markdown.

Some comments and JSDoc tags in your code can also be used when exporting your definitions to infer a description, a default value, etc.

For example, imagine the following interface:

```typescript
/**
 * A round plane figure whose boundary consists of points equidistant from a fixed point.
 */
export interface Circle extends Shape {
  kind: 'circle'
  /**
   * In pixels.
   * @default 10
   */
  radius?: number
}
```

The generated Markdown code is:

```markdown
# Circle

A round plane figure whose boundary consists of points equidistant from a fixed point.

| Name   | Description | Type       | Optional | Default value |
| ------ | ----------- | ---------- | :------: | ------------- |
| kind   |             | `'circle'` |          |               |
| radius | In pixels.  | `number`   |    ✓     | 10            |
```

The rendered Markdown for this interface is:

> # Circle
>
> A round plane figure whose boundary consists of points equidistant from a fixed point.
>
> | Name   | Description | Type       | Optional | Default value |
> | ------ | ----------- | ---------- | :------: | ------------- |
> | kind   |             | `'circle'` |          |               |
> | radius | In pixels.  | `number`   |    ✓     | 10            |

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/Typedown/blob/main/LICENSE.md) for more information.
