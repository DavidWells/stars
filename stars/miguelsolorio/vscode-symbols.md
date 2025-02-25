---
repo: miguelsolorio/vscode-symbols
url: 'https://github.com/miguelsolorio/vscode-symbols'
homepage: 'https://marketplace.visualstudio.com/items?itemName=miguelsolorio.symbols'
starredAt: '2022-09-07T02:09:04Z'
createdAt: '2022-08-01T20:52:50Z'
updatedAt: '2025-02-24T21:19:52Z'
language: JavaScript
license: MIT
branch: main
stars: 406
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:33.139Z'
description: A file icon theme for VS Code
tags:
  - file
  - icon
  - theme
  - vscode
---

<div align="center">

<img src="https://raw.githubusercontent.com/misolori/vscode-symbols/main/symbols.png" width="140" />

# Symbols

A file icon for VS Code

![Preview of extension](https://github.com/misolori/vscode-symbols/raw/main/preview.png)

</div>

## Contributing

If you'd like to contribute to this extension, please take a look at the issues or create a new one. If you'd like to create a new icon, please reference the [Symbols - File Icon Figma file](https://www.figma.com/file/HYLMyRbIdSbIJQlqnd9pSN/Symbols---File-Icons?node-id=20521%3A84115&t=PyBzZOlVG5TXyEdx-1), you can make a copy or reference the styles used (tailwind). Please try to limit your colors to the ones used in existing icons before choosing a different color style.

When submitting a PR, please ensure you've tested the extension locally and ensure that your new icons appear correctly in the file tree view with your new file extension. Include a screenshot of your proposed icon in your PR.

## Generating Icon Previews

Before submitting a PR, please run the preview generation script to update the icon previews:

```bash
npm run generate-previews
```

This script will update the preview markdown files with your new icons. Make sure to commit these changes along with your PR.

## Configuration

You can configure which folders and files icons are displayed by using the following settings:

### Folders

```json
"symbols.folders.associations": {
    "{folder name}": "{icon name}"
}
```

And here is an example using this setting:

```json
"symbols.folders.associations": {
    "entities": "folder-assets",
    "infra": "folder-app",
    "schemas": "folder-purple"
}
```

### Files

```json
"symbols.files.associations": {
    "{file name}": "{icon name}"
}
```

And here is an example:

```json
"symbols.files.associations": {
    "app.module.ts": "nest",
    "*.service.ts": "nest"
}
```

_Note: For file names, you can use `*` to match all files with a specific file extension._

## Icon Preview

You can preview the icons by reading the the [preview.md](./preview/preview.md) file.

## React Symbols
[Pablo Hdez](https://github.com/pheralb) has graciously created [React-Symbols](https://react-symbols.vercel.app) ([pheralb/react-symbols](https://github.com/pheralb/react-symbols)) to allow you to embed Symbol icons for your React projects.

<img src="https://raw.githubusercontent.com/pheralb/react-symbols/main/website/public/images/og.png">
