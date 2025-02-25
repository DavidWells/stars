---
repo: addyosmani/firew0rks
url: 'https://github.com/addyosmani/firew0rks'
homepage: ''
starredAt: '2025-01-04T06:54:19Z'
createdAt: '2024-12-31T21:39:29Z'
updatedAt: '2025-02-25T15:18:15Z'
language: JavaScript
license: MIT
branch: main
stars: 531
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:32.054Z'
description: "Fireworks in your terminal \U0001F386"
tags:
  - ascii-fireworks
  - fireworks
  - fireworks-algorithm
  - fireworks-animation
---

# firew0rks

Play text art animations in your terminal! This package includes several pre-made animations like fireworks and a cozy fireplace.

![Eowzf_jWMAAk43x](https://github.com/user-attachments/assets/58d4c0ef-9f0b-49ae-80f0-4e12db3e34f0)

## Installation

```bash
npx firew0rks
```

## Usage

```bash
npx firew0rks [folder] [loops]
```

Parameters (all optional):
- `[folder]`: Folder containing text art frames (numbered 0.txt, 1.txt, etc.). Defaults to 'fireworks'
- `[loops]`: Number of times to loop the animation (-1 for infinite). Defaults to 20

## Examples

Run with defaults (fireworks animation, 20 loops):
```bash
npx firew0rks
```

Play the fireworks animation with custom loops:
```bash
npx firew0rks fireworks 3
```

Enjoy a cozy fireplace forever:
```bash
npx firew0rks fireplace -1
```

## Local Development

To run the package locally:

1. Clone the repository
2. Run directly with Node:
```bash
node index.js
# Or with custom parameters:
node index.js fireplace 5
```

## Creating Your Own Animations

1. Create a new folder for your animation
2. Add text art frames as numbered .txt files (0.txt, 1.txt, 2.txt, etc.)
3. Run firew0rks with your folder name

## Acknowledgments

This project is a JavaScript port of [text_art_animations](https://github.com/rvizzz/text_art_animations) by rvizzz. Thank you for the inspiration and the amazing ASCII art animations!

## License

MIT
