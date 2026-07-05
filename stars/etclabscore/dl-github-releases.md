---
repo: etclabscore/dl-github-releases
url: 'https://github.com/etclabscore/dl-github-releases'
homepage: 'https://etclabscore.github.io/dl-github-releases/'
starredAt: '2022-11-12T21:12:26Z'
createdAt: '2019-04-01T11:32:36Z'
updatedAt: '2022-11-12T21:12:26Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.175Z'
description: A NodeJS module to download Github releases assets.
tags: []
---

# DL Github Releases

<center>
  <span>
    <img alt="CircleCI branch" src="https://img.shields.io/circleci/project/github/etclabscore/dl-github-releases/master.svg">
    <img alt="Dependabot status" src="https://api.dependabot.com/badges/status?host=github&repo=etclabscore/dl-github-releases" />
    <img alt="npm" src="https://img.shields.io/npm/dt/@etclabscore/dl-github-releases.svg" />
    <img alt="GitHub release" src="https://img.shields.io/github/release/etclabscore/dl-github-releases.svg" />
    <img alt="GitHub commits since latest release" src="https://img.shields.io/github/commits-since/etclabscore/dl-github-releases/latest.svg" />
  </span>
</center>

A node module to download Github assets for Github releases. It will also uncompress zip files.

## Command line

```
$ npm install -g @etclabscore/dl-github-releases


$ dl-github-releases --help

Usage: download-github-releases [options] <user> <repo>

Options:
  -V, --version                      output the version number
  -o, --outputDir [output]           output directory [output] (default: "/Users/zb/Code/etclabs/dl-github-releases")
  -p, --includePre                   download prerelease
  -d, --includeDraft                 download draft releases
  -a, --filterAssetsByName <rexexp>  filter assets name
  -z, --zipped                       don't extract zip files
  -h, --help                         output usage information
Usage: download-github-release [options] <user> <repo> [outputdir]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -p, --prerelease       download prerelease
  -s, --search <regexp>  filter assets name


$ dl-github-releases -a *.md open-rpc spec

Downloading open-rpc/spec@1.0.0...
spec.md                  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
spec.pdf                 ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇--------- 0.1s
```

## Javascript API

### Installation

```bash
npm install --save dl-github-releases
```

### Usage

```javascript
var downloadReleases = require('dl-github-releases');

var user = 'some user';
var repo = 'some repo';
var outputdir = 'some output directory';

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return release.prerelease === false;
}

// Define a function to filter assets.
function filterAsset(asset) {
  // Select assets that contain the string 'windows'.
  return asset.name.indexOf('windows') >= 0;
}

downloadReleases(user, repo, outputdir, filterRelease, filterAsset)
  .then(function() {
    console.log('All done!');
  })
  .catch(function(err) {
    console.error(err.message);
  });
```
