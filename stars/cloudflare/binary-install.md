---
repo: cloudflare/binary-install
url: 'https://github.com/cloudflare/binary-install'
homepage: null
starredAt: '2021-07-01T01:52:54Z'
createdAt: '2019-11-08T19:14:03Z'
updatedAt: '2024-09-20T01:54:12Z'
language: JavaScript
license: NA
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:30.610Z'
description: Install binary applications via npm
tags: []
---

# binary-install

Install .tar.gz binary applications via npm

## Usage

This library provides a single class `Binary` that takes a download url and some optional arguments. You **must** provide either `name` or `installDirectory` when creating your `Binary`.

| option           | decription                                    |
| ---------------- | --------------------------------------------- |
| name             | The name of your binary                       |
| installDirectory | A path to the directory to install the binary |

If an `installDirectory` is not provided, the binary will be installed at your OS specific config directory. On MacOS it defaults to `~/Library/Preferences/${name}-nodejs`

After your `Binary` has been created, you can run `.install()` to install the binary, and `.run()` to run it.

### Example

This is meant to be used as a library - create your `Binary` with your desired options, then call `.install()` in the `postinstall` of your `package.json`, `.run()` in the `bin` section of your `package.json`, and `.uninstall()` in the `preuninstall` section of your `package.json`. See [this example project](/packages/binary-install-example) to see how to create an npm package that installs and runs a binary using the Github releases API.
