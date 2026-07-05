---
repo: amio/nls
url: 'https://github.com/amio/nls'
homepage: 'https://www.npmjs.com/package/nls'
starredAt: '2021-11-22T05:56:18Z'
createdAt: '2017-12-30T11:08:58Z'
updatedAt: '2025-02-22T11:26:23Z'
language: JavaScript
license: NA
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.613Z'
description: Missing inspector for npm packages.
tags:
  - cli
  - list
  - npm
  - npm-package
  - npm-scripts
  - npm-why
---

# nls [![npm-version][npm-badge]][npm-link] [![install size][size-badge]][size-link]

Missing inspector for npm packages.

```bash
npm install -g nls
```

![nls-screenshot][screenshot]

## Usage

```bash
nls - Missing inspector for npm packages.

Usage

  $ nls                     List available npm scripts
  $ nls deps                List dependencies table (d for short)
  $ nls view [prop-path]    Extract info from package.json (v for short)
  $ nls read <package-name> Print readme file from a dependency (r for short)
  $ nls why <package-name>  Identify why a package has been installed (w for short)

Options

  -d, --dir       Target directory
  -h, --help      Output usage information
  -v, --version   Output the version number

Examples

  # List npm scripts in current dir
  $ nls

  # List who depend upon package 'chalk'
  $ nls why chalk

  # Print value of "engines.node" from package.json
  $ nls v engines.node
```

## Related

- [yarn-why](https://github.com/amio/yarn-why) - Identifies why a package has been installed (with `yarn.lock`)
- [npm-why](https://github.com/amio/npm-why) - Identifies why a package has been installed (with `package-lock.json`)

## License

MIT @ Amio

[screenshot]: ./nls-screenshot.png
[amio-link]: https://github.com/amio
[npm-badge]: https://badgen.net/npm/v/nls
[npm-link]: https://www.npmjs.com/package/nls
[size-badge]: https://badgen.net/packagephobia/install/nls
[size-link]: https://packagephobia.now.sh/result?p=nls
