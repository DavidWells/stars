---
repo: Raynos/npm-bin-deps
url: 'https://github.com/Raynos/npm-bin-deps'
homepage: ''
starredAt: '2020-12-14T18:28:41Z'
createdAt: '2019-12-19T11:25:26Z'
updatedAt: '2023-04-10T12:24:32Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:16.900Z'
description: >-
  NPR allows you to run your CLI dependencies without having a copy in
  node_modules.
tags: []
---

# npm-bin-deps

A tool `npr` that allows you to run your CLI dependencies
without having a copy in `node_modules`.

## Goal

The goal of this module is to reduce the number of visible
dependencies in `node_modules` ; `npm ls` & `package-lock.json`
that are NOT related to production code.

`npm-bin-deps` solves half the problem, look at the sister
project [`pre-bundled`][pre-bundled] to solve the other half.

## Docs :

```sh
$ npr --help
usage: npr [bindep] [...args]
`npr` will execute your binary dependency

`npr` respects the dependencies listed in "binDependencies" in package.json
These are command `npr` commands used in various situations:

Run a binary command
    npr [bindep]       Run a command; e.g. npr standard or npr tap
    npr exec [bindep]  Run a command; e.g. npr exec standard or npr exec tap

Install or remove a binary dependency
    npr install [bindep]  Install a new binary dependency
    npr rm [bindep]       Remove a binary dependency

Clean the cache; if corrupted or broken
    npr cache clean       Clean the npr install cache.

Inspect existing bin dependencies
    npr which [bindep]  Return the binary location for bindep
    npr ls              List all binary deps installed.

When running `npr`; you can hand-edit "binDependencies" in package.json and
the `npr exec [bindep]` command will make sure to download the new version
before executing the binary dependency.

```

## Example

Add a top level `binDependencies` to your `package.json` that
has all of the npm cli dependencies.

Then use `npr ${module}` to execute the cli

```json
{
  "devDependencies": {
    "npm-bin-deps": "1.3.1",
  },
  "scripts": {
    "cover": "npr nyc -- node test/index.js && npr nyc report",
    "lint": "npr tslint -t stylish -p .",
    "build": "npr tsc --pretty -p ."
  },
  "binDependencies": {
    "dtslint": "2.0.2",
    "nyc": "13.3.0",
    "opn": "1.0.1",
    "tslint": "5.20.1",
    "tslint-microsoft-contrib": "6.2.0",
    "type-coverage": "2.0.1",
    "typescript": "3.7.2"
  }
}
```

## Benefits

Imagine you have a simple typescript project that has some
binary dependencies for compiling & linting your code.

```json
{
  "devDependencies": {
    "dtslint": "2.0.2",
    "nyc": "13.3.0",
    "opn": "1.0.1",
    "tslint": "5.20.1",
    "tslint-microsoft-contrib": "6.2.0",
    "type-coverage": "2.0.1",
    "typescript": "3.7.2"
  }
}
```

Your project now has a lot of dependencies

```sh
~/projects/fake-cloudwatch-logs on npr*
$ npm ls | wc -l
npm ERR! peer dep missing: typescript@>=2.1.0 || >=2.1.0-dev || >=2.2.0-dev || >=2.3.0-dev || >=2.4.0-dev || >=2.5.0-dev || >=2.6.0-dev || >=2.7.0-dev || >=2.8.0-dev || >=2.9.0-dev || >=3.0.0-dev || >= 3.1.0-dev || >= 3.2.0-dev, required by tslint@5.14.0
454
```

```sh
~/projects/fake-cloudwatch-logs on npr*
$ ls node_modules
ajv               combined-stream                find-up                  istanbul-lib-coverage    nice-try          qs                     tslib
ansi-regex        commander                      forever-agent            istanbul-lib-instrument  npm-bin-deps      querystring            ts-lib-utils
ansi-styles       command-exists                 form-data                is-typedarray            npm-run-path      request                tslint
argparse          concat-map                     fs-extra                 jmespath                 number-is-nan     require-directory      tslint-microsoft-contrib
asn1              core-util-is                   fs.realpath              jsbn                     nyc               require-main-filename  tsutils
assert-plus       cross-spawn                    get-caller-file          jsesc                    oauth-sign        resolve                tunnel-agent
asynckit          dashdash                       getpass                  jsonfile                 once              safe-buffer            tweetnacl
aws4              debug                          get-stream               json-schema              opn               safer-buffer           type-coverage
aws-sdk           decamelize                     glob                     json-schema-traverse     os-locale         sax                    type-coverage-core
aws-sign2         definitelytyped-header-parser  globals                  json-stringify-safe      parsimmon         semver                 @types
@babel            delayed-stream                 graceful-fs              jsprim                   path-exists       set-blocking           typescript
babel-code-frame  diff                           har-schema               js-tokens                path-is-absolute  shebang-command        universalify
balanced-match    dts-critic                     har-validator            js-yaml                  path-key          shebang-regex          uri-js
base64-js         dtslint                        has-ansi                 lcid                     path-parse        signal-exit            url
bcrypt-pbkdf      ecc-jsbn                       has-flag                 locate-path              p-defer           source-map             uuid
brace-expansion   end-of-stream                  http-signature           lodash                   performance-now   sprintf-js             verror
buffer            escape-string-regexp           ieee754                  map-age-cleaner          p-finally         sshpk                  which
builtin-modules   esprima                        inflight                 mem                      p-is-promise      string-width           which-module
camelcase         esutils                        inherits                 mime-db                  p-limit           strip-ansi             wrap-ansi
caseless          events                         invert-kv                mime-types               p-locate          strip-eof              wrappy
chalk             execa                          isarray                  mimic-fn                 @pre-bundled      strip-json-comments    xml2js
cliui             extend                         isexe                    minimatch                psl               supports-color         xmlbuilder
code-point-at     extsprintf                     is-fullwidth-code-point  minimist                 p-try             tape-cluster           y18n
color-convert     fast-deep-equal                isstream                 mkdirp                   pump              to-fast-properties     yargs
color-name        fast-json-stable-stringify     is-stream                ms                       punycode          tough-cookie           yargs-parser
```

```sh
~/projects/fake-cloudwatch-logs on npr*
$ cat package-lock.json | wc -l
2747
```

By moving all of these packages to `binDependencies`

```json
{
  "binDependencies": {
    "dtslint": "2.0.2",
    "nyc": "13.3.0",
    "opn": "1.0.1",
    "tslint": "5.20.1",
    "tslint-microsoft-contrib": "6.2.0",
    "type-coverage": "2.0.1",
    "typescript": "3.7.2"
  },
}
```

You can remove them all from your local copy.

All of a sudden `npm ls` is readable

```bash
~/projects/fake-cloudwatch-logs on npr
$ npm ls
fake-cloudwatch-logs@1.2.0 /home/raynos/projects/fake-cloudwatch-logs
├── @pre-bundled/rimraf@3.0.0
├── @pre-bundled/tape@4.10.2
├── @types/node@12.0.2
├─┬ aws-sdk@2.549.0
│ ├─┬ buffer@4.9.1
│ │ ├── base64-js@1.3.1
│ │ ├── ieee754@1.1.13 deduped
│ │ └── isarray@1.0.0
│ ├── events@1.1.1
│ ├── ieee754@1.1.13
│ ├── jmespath@0.15.0
│ ├── querystring@0.2.0
│ ├── sax@1.2.1
│ ├─┬ url@0.10.3
│ │ ├── punycode@1.3.2
│ │ └── querystring@0.2.0 deduped
│ ├── uuid@3.3.2
│ └─┬ xml2js@0.4.19
│   ├── sax@1.2.1 deduped
│   └── xmlbuilder@9.0.7
├── npm-bin-deps@1.3.0
└── tape-cluster@3.2.1
```

The `package-lock.json` is managable

```
~/projects/fake-cloudwatch-logs on npr
$ cat package-lock.json | wc -l
146
```

And the amount of dependencies in `node_modules` fits without
scroll bars in your directory explorer in your text editor
and on your terminal

```
~/projects/fake-cloudwatch-logs on npr
$ ls -l node_modules/
total 72
drwxrwxr-x 10 raynos raynos 4096 Dec 19 12:32 aws-sdk
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 base64-js
drwxrwxr-x  4 raynos raynos 4096 Dec 19 12:32 buffer
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:32 events
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 ieee754
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 isarray
drwxrwxr-x  4 raynos raynos 4096 Dec 19 12:32 jmespath
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 npm-bin-deps
drwxrwxr-x  4 raynos raynos 4096 Dec 19 12:34 @pre-bundled
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 punycode
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:32 querystring
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:32 sax
drwxrwxr-x  4 raynos raynos 4096 Dec 19 12:32 tape-cluster
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:57 @types
drwxrwxr-x  2 raynos raynos 4096 Dec 19 12:32 url
drwxrwxr-x  4 raynos raynos 4096 Dec 19 12:32 uuid
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:32 xml2js
drwxrwxr-x  3 raynos raynos 4096 Dec 19 12:32 xmlbuilder
```

### Docs how it works

The way this module works is that it installs all your
`binDependencies` in a temporarly location.

Namely `~/.config/npm-bin-deps/${package.name}`
It creates a temporary `package.json` where the `dependencies`
are your `binDependencies` and runs `npm install` in that
location instead of in your current working directory.

`npr tslint` then just resolves to
`~/.config/npm-bin-deps/${package.name}/node_modules/.bin/tslint`

### Docs `npr which {module}`

If you want to find the executable name you can run `npr which testcafe`
for example and it will return the location of the binary.

This is useful if you need to cd for some reason

```json
{
  "scripts: {
    "testcafe": "export TESTCAFE=npr which testcafe; cd ./tests/testcafe; $TESTCAFE *.ts"
  }
}
```

## install

```
% npm install npm-bin-deps -g
```

## MIT Licensed

  [pre-bundled]: https://github.com/Raynos/pre-bundled
