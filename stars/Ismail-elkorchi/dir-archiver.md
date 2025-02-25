---
repo: Ismail-elkorchi/dir-archiver
url: 'https://github.com/Ismail-elkorchi/dir-archiver'
homepage: ''
starredAt: '2021-12-18T05:53:44Z'
createdAt: '2020-05-11T09:05:33Z'
updatedAt: '2023-12-12T14:32:12Z'
language: JavaScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.467Z'
description: "Compress a whole directory (including subdirectories) into a\_zip file, with options to exclude specific files, or directories."
tags:
  - archive
  - archiver
  - compression
  - directory
  - folder
  - nodejs
  - npm
  - zip
---

[![npm][npm-image]][npm-url] [![license][license-image]][license-url]
[![changelog][changelog-image]][changelog-url]

# Dir Archiver
Compress a whole directory (including subdirectories) into a zip file, with options to exclude specific files, or directories.

# Installation

```sh
$ npm install dir-archiver
```

# Usage

## API

```javascript
// Require modules.
var DirArchiver = require('dir-archiver');

// Create an array with the files and directories to exclude.
const excludes = ['directory_name', 'file.extension'];

/**
 * Create a dir-archiver object. 
 * @param {string} directoryPath - The path of the folder to archive.
 * @param {string} zipPath - The path of the zip file to create.
 * @param {Boolean} includeBaseDirectory - Includes a base directory at the root of the archive.
 * For example, if the root folder of your project is named "your-project", setting
 * includeBaseDirectory to true will create an archive that includes this base directory.
 * If this option is set to false the archive created will unzip its content to
 * the current directory.
 * @param {array} excludes - A list with the names of the files and folders to exclude.
*/
var archive = new DirArchiver('path/to/directory', 'path/to/desination/zipfile.zip', true, excludes);

// Create the zip file.
archive.createZip();
```
## Command Line Interface

```sh
Usage: dir-archiver --src <path-to-directory> --dest <path-to-file>.zip --includebasedir true|false --exclude folder-name file-name.extention

Options:
  --src             The path of the folder to archive.                            [string][required]
  --dest            The path of the zip file to create.                           [string][required]
  --includebasedir  Includes a base directory at the root of the archive.
                    For example, if the root folder of your project is named
                    "your-project", setting this option to true will create
                    an archive that includes this base directory.
                    If this option is set to false the archive created will
                    unzip its content to the current directory.                               [bool]
  --exclude         A list with the names of the files and folders to exclude.               [array]
```



[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg?style=flat-square
[changelog-url]: CHANGELOG.md
[license-image]: https://img.shields.io/npm/l/dir-archiver.svg?style=flat-square
[license-url]: LICENSE
[npm-image]: https://img.shields.io/npm/v/dir-archiver.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/dir-archiver
