---
repo: vunguyentuan/vscode-postcss
url: 'https://github.com/vunguyentuan/vscode-postcss'
homepage: >-
  https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss
starredAt: '2022-09-05T04:46:24Z'
createdAt: '2022-01-08T14:38:08Z'
updatedAt: '2024-10-16T18:36:59Z'
language: TypeScript
license: MIT
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:33.740Z'
description: VSCode extension that support PostCSS language & autocomplete
tags: []
---

![Banner](https://github.com/vunguyentuan/vscode-postcss/raw/master/banner.jpg)

> This extension is a mixed of two famous extensions [postcss-language](https://github.com/csstools/postcss-language.git) and [vscode-postcss-language](https://github.com/MhMadHamster/vscode-postcss-language).

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss"><img src="https://vsmarketplacebadge.apphb.com/installs-short/vunguyentuan.vscode-postcss.svg" alt="Installs"/></a>
<a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss"><img src="https://vsmarketplacebadge.apphb.com/version/vunguyentuan.vscode-postcss.svg" alt=""/></a>
<a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss"><img src="https://vsmarketplacebadge.apphb.com/rating-star/vunguyentuan.vscode-postcss.svg" alt=""/></a>
</p>

## Installation

**[Install via the Visual Studio Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss)**



## Features
- Basic autocomplete
- Syntax highlighting
- Support color preview
- Play nicely with [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) extension.

## Support for Emmet

1. Open the command palette and select **Preferences: Open Settings (JSON)**
2. Add the following configuration:

```json
{
  "emmet.includeLanguages": {
    "postcss": "css"
  }
}
```

## Disable validation
```
"postcss.validate": false
```

## Future development
- Add real postcss language service server (currently using SASS language service with some tweaks)
