---
repo: expo/hyperinstall
url: 'https://github.com/expo/hyperinstall'
homepage: ''
starredAt: '2022-10-16T05:28:30Z'
createdAt: '2015-05-23T10:03:28Z'
updatedAt: '2024-10-05T04:39:16Z'
language: JavaScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:23.217Z'
description: >-
  Runs "yarn" and "npm install" in several directories with extreme speed when
  possible
tags: []
---

# Hyperinstall

[![npm package](https://nodei.co/npm/hyperinstall.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hyperinstall/)

Hyperinstall is a program that runs `yarn` or `npm install` in multiple directories. Most companies have several npm packages in a project. Whenever you update your local copy of the code, you need to run `npm install` in case any of these packages has different dependencies since the last time you ran `npm install`. Hyperinstall automates and accelerates this with one command.

#### Hyperinstall automatically runs `yarn` and `npm install`

```
$ ./npm-hyperinstall
Package "a" has been updated; installing...
...
Finished installing "a"

Package "b" has been updated; installing...
...
Finished installing "b"

Updated 2 packages:
  a
  b
```

#### Hyperinstall is efficient when your dependencies haven't changed
```
$ time ./npm-hyperinstall

real  0m0.232s
user  0m0.206s
sys   0m0.032s
```

## Installation

The only prerequisite is Node.js 4.0 or newer. The best way to install Node.js is with [nvm](https://github.com/creationix/nvm).

1. Install Hyperinstall globally: `npm install -g hyperinstall`. Now the `hyperinstall` command is in your path. Everyone on your team must do this.
2. Run `hyperinstall init` in the root directory of your project, or wherever your project scripts are stored. Make sure this is a directory that is under version control and is shared with your teammates. Hyperinstall creates two files: hyperinstall.json and npm-hyperinstall.
3. **hyperinstall.json** is a configuration file containing a JSON object.
 * The keys of the object are paths to npm packages in which you want Hyperinstall to run `npm install`. Both absolute and relative paths are supported; relative paths are resolved relative to hyperinstall.json.
 * The values of the object are cache breakers. Start with 0 and bump it to 1, 2, 3, etc. if you need to force Hyperinstall to run `npm install` in the respective package. This usually isn't necessary since Hyperinstall tracks whether each package's dependencies have changed since the last time it ran, but the cache breakers serve as an escape hatch if necessary.
 * For example, if your repository were to look like this:

      ```
      .
      ├── hyperinstall.json
      ├── npm-hyperinstall
      ├── server
      │   ├── index.js
      │   ├── node_modules
      │   └── package.json
      └── website
         ├── index.js
         ├── node_modules
         └── package.json
      ```
   Then to run `npm install` in your server and website packages, hyperinstall.json should look like this:

      ```
      {
        "server": 0,
        "website": 0
      }
      ```

4. **npm-hyperinstall** is a script that runs `yarn` or `npm install` in each of your npm packages and can be run from anywhere. It is a shortcut for `cd your/project/root && hyperinstall install`.
5. Add `/.hyperinstall-state.json` to your .gitignore file. This file is created by npm-hyperinstall and records the dependencies that are installed in each npm package.
6. After testing Hyperinstall (see the Usage section), commit hyperinstall.json, npm-hyperinstall, and .gitignore to your repository.

## Usage

Run npm-hyperinstall. It will run `yarn` or `npm install` in each of your npm packages and create a file called `.hyperinstall-state.json` that records the dependencies that were installed.

The next time you run npm-hyperinstall, it will check if any of the packages' dependencies have changed since the last time you ran Hyperinstall. It will run `npm install` in each package with different dependencies. When the dependencies haven't changed at all, Hyperinstall is very fast and exits quickly.

### Options

To locally force Hyperinstall to reinstall all of your npm packages, run it with `-f` (short for `--force`). Hyperinstall will first delete each package's node_modules directory before running `npm install` in each one.

## Contributions

Contributions are welcome. We're most interested in improving the workflow so feedback in that vein is especially interesting to us. Also bug fixes are appreciated. We might be more selective with diffs that add a fair bit of complexity since we generally want Hyperinstall to be a simple script on top of `yarn` and `npm install`.
