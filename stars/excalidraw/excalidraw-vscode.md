---
repo: excalidraw/excalidraw-vscode
url: 'https://github.com/excalidraw/excalidraw-vscode'
homepage: 'https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor'
starredAt: '2022-02-18T05:58:15Z'
createdAt: '2021-04-04T14:52:30Z'
updatedAt: '2025-02-22T07:47:40Z'
language: TypeScript
license: MIT
branch: master
stars: 503
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:19.440Z'
description: Excalidraw for Visual Studio Code
tags:
  - vscode
---

# Excalidraw VSCode Extension

## Development

### Requirements

- [Node.js](https://nodejs.org/en/)
- [vsce](https://github.com/microsoft/vscode-vsce)

### Install the dependencies

```bash
npm install # from the extension directory
```

### Run the extension

Use the `Debug: Start Debugging` command to launch the extension in a new vscode window.

To inspect/debug the webview, use the `Developer: Open Webview Developer Tools` command.

### Package the extension to a vsix archive

```console
vsce package # from the extension directory
```

The vsix archive can then be installed using the `Extensions: Install from VSIX...` command

### Releasing the extension

Go to the actions tab, and trigger the bump extension version workflow.
