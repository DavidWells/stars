---
repo: NodeSecure/ci
url: 'https://github.com/NodeSecure/ci'
homepage: ''
starredAt: '2022-01-12T00:27:28Z'
createdAt: '2021-12-15T21:29:35Z'
updatedAt: '2025-01-22T09:34:45Z'
language: TypeScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:21.994Z'
description: NodeSecure tool enabling secured continuous integration
tags: []
---

# Secure Continuous Integration

![ci-banner](https://user-images.githubusercontent.com/4438263/226020356-5790c025-bff1-40d5-b847-360863f53a9a.jpg)
![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/ci/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/ci/graphs/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/ci/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/ci)
[![mit](https://img.shields.io/github/license/NodeSecure/ci.svg?style=for-the-badge)](https://github.com/NodeSecure/ci/blob/master/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/ci/node.js.yml?style=for-the-badge)

## Installation

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/ci
# or
$ yarn add @nodesecure/ci
```

## Getting Started

@nodesecure/ci brings together a set of tools to identify dependencies vulnerabilities and track most common malicious code and patterns.

Before going further, here is an overview of the available features depending on your project configuration:

| Static Analysis | Compatibility |
| --------------- | ------------- |
| JavaScript      | ✅            |
| TypeScript      | ❌            |

Static Analysis is powered by [@nodesecure/js-x-ray](https://github.com/NodeSecure/js-x-ray) and [@nodesecure/scanner](https://github.com/NodeSecure/scanner).

> For now, TypeScript can't directly be analyzed on the fly. However as you might know, any transpiled TypeScript code is JavaScript code hence can be analyzed.
> Moreover, it is recommended to launch the Static Analysis with a source code state as
> close as possible to the state of your production code (and before minification).
> In fact, you want to make sure that you are not introducing anything malicious
> when you're compiling your code at some point (for production or when transpiling with TypeScript).

| Vulnerabilities Strategy | package-lock.json | yarn.lock | npm-shrinkwrap.json | none |
| ------------------------ | ----------------- | --------- | ------------------- | ---- |
| npm                      | ✅                | ❌       | ✅                 | ❌  |
| snyk                     | ✅                | ✅       | ✅                 | ✅  |
| sonatype                 | ✅                | ✅       | ✅                 | ✅  |
| [**DEPRECATED**] node    | ✅                | ✅       | ✅                 | ✅  |

Vulnerabilities strategies are powered by [@nodesecure/vulnera](https://github.com/NodeSecure/vulnera).

## Usage example

@nodesecure/ci can be used as a Script, as an API or [through the GitHub action](https://github.com/marketplace/actions/nodesecure-continuous-integration)

Let's see how to use @nodesecure/ci in these three different ways:

- API
- Script
- GitHub Action

### API

@nodesecure/ci exposes its pipeline runner as an API to allow use in any other combined workflow.

```ts
import { runPipeline } from "@nodesecure/ci";

const optionsExample = {
  directory: process.cwd(),
  strategy: "sonatype",
  vulnerabilities: "medium",
  warnings: {
    "unsafe-regex": "error",
    "obfuscated-code": "warning",
    "encoded-literal": "off"
  },
  reporters: ["console"]
};

await runPipeline(optionsExample);
// => the process can either exit with error code (1)
// or no error code (0), depending on the pipeline status.
```

If you need a more fine-grained control over the pipeline process, you can provide an **autoExitAfterFailure** property to the entry point options to manually exit or interpret the returned payload.

```ts
const { status, data } = await runPipeline({ autoExitAfterFailure: false });

if (status === "success") {
  console.log("Congrats, your code passed all security checks!");
} else {
  console.log("Whoops, the pipeline failed to pass all checks :(");
  // Interpret the data to explain why it failed
}
```

---

### Script

First, reference the **nsci** .bin in the package.json

```json
{
  "scripts": {
    "nsci": "nsci"
  }
}
```

Then run it

```bash
$ npm run nsci
```

Once the script is run, the @nodesecure/ci pipeline will look for dependencies warnings and vulnerabilities in the current working directory.
If any warning or dependency is met, the pipeline will eventually fail depending on the provided .nodesecurerc file.

<p align="center">
    <img src="https://user-images.githubusercontent.com/43391199/158816859-636dad37-e212-444b-beca-bda969dec205.gif">
</p>

---

### GitHub Action

[The documentation of the @nodesecure/ci GitHub Action is detailed here](https://github.com/marketplace/actions/nodesecure-continuous-integration)

### Custom configuration

#### .nodesecurerc (runtime configuration file)

A custom configuration can now be provided using the brand new **.nodesecurerc** config file.

> **When a .nodesecurerc file is present in the project it will take priority over any other
> configuration provided (through the CLI or when using the API).**

To generate this file, the best way is to use the **init** command exposed by the CLI.

```bash
$ npm run nsci init
```

Here is the content of the **.nodesecurerc** file generated by default:

```json
{
  "version": "1.0.0",
  "i18n": "english",
  "strategy": "github-advisory",
  "ci": {
    "reporters": ["console"],
    "vulnerabilities": {
      "severity": "medium"
    },
    "warnings": "error"
  }
}
```

In the same way as for the other types of configuration (API/CLI), **warnings** can be specifically configured to enable a custom analysis. When you configure a custom **warnings** section, only the warnings specified in that section will be
used by the runner.

```json
{
  "version": "1.0.0",
  "i18n": "english",
  "strategy": "github-advisory",
  "ci": {
    "reporters": ["console"],
    "vulnerabilities": {
      "severity": "medium"
    },
    "warnings": {
      "unsafe-regex": "error",
      "obfuscated-code": "warning",
      "encoded-literal": "off"
    }
  }
}
```

If you don't have the possibility to generate a **.nodesecurerc** file, there are three other configuration options left:

- via the CLI when using as a script
- via the API options when using the exposed Node.js module
- via the .yaml config file for the [GitHub action](https://github.com/marketplace/actions/nodesecure-continuous-integration)

The idea is to provide same options for all types of configuration. Nevertheless for now, the specific way to set a **warnings** dictionary (other than "error" | "warning" | "off" options) is only available when using the **.nodesecurerc** or **API** configurations.

#### .nodesecureignore (ignore file)

During your NodeSecure journey it's possible that you'll find false positives. The `.nodesecureignore` is the perfect tool to address these cases.

Let's say that you want to exclude `"unsafe-regex"` from `express`:

1. Create your `.nodesecureignore` file at the root of your project

2. Add the following JSON content:

```json
{
  "warnings": {
    "unsafe-regex": ["express"]
  }
}
```

3. Run your analysis as usual: no more `unsafe-regex` for `express` package.

> Found the list of warnings available [here](https://github.com/NodeSecure/js-x-ray#warnings)
---

#### CLI

Add CLI options directly in the package.json script

```json
{
  "scripts": {
    "nsci": "nsci --directory=/Users/user1/myproject"
  }
}
```

Or provide it from the "npm run [script]" command (don't forget to supply "--") or
the params will be applied to the "npm run [script]" command.

```bash
$ npm run nsci -- --directory=/Users/user1/myproject
$ npm run nsci -- --strategy=npm
$ npm run nsci -- --vulnerability=medium
$ npm run nsci -- --warnings=error
$ npm run nsci -- --reporters=console
```

Or use yarn (params are provided to the target script by default)

```bash
$ yarn nsci --reporters=console
```

To see all available options, you can run:

```bash
$ npm run nsci -- --help
```

---

#### API

```ts
import { runPipeline } from "@nodesecure/ci";

const optionsExampleWithGlobalWarningsRule = {
  directory: process.cwd(),
  strategy: "sonatype",
  vulnerabilities: "medium",
  // any warning met will be reported as an "error" hence will make the pipeline fail
  warnings: "error",
  reporters: ["console"]
};

const optionsExampleWithCustomWarningsRules = {
  directory: process.cwd(),
  strategy: "sonatype",
  vulnerabilities: "medium",
  /**
   * Set custom rules for specific types of warnings.
   * Only "unsafe-regex" warnings can make the pipeline fail.
   * "obfuscated-code" warnings will be reported but ignored by the pipeline checks.
   * "encoded-literal" is neither reported or included in the pipeline checks.
   */
  warnings: {
    "unsafe-regex": "error",
    "obfuscated-code": "warning",
    "encoded-literal": "off"
  },
  reporters: ["console"]
};

await runPipeline(optionsExample);
// => the process can either exit with error code (1)
// or no error code (0), depending on the pipeline checks status.
```

#### Mixing configurations when providing options from multiple sources

Given that it's possible to mix configurations between the one defined in **.nodesecurerc** and the one
defined either through the API or CLI, it is important to understand the order in which the options will be chosen.

| Priority | Type of configuration                       |
| -------- | ------------------------------------------- |
| 1️⃣       | .nodesecurerc                               |
| 2️⃣       | CLI or API (can't be both at the same time) |

Anything **valid and defined** in the .nodesecurerc file will be used no matter what options are defined in the CLI or the API.
However if anything is missing in the .nodesecurerc file, options provided from the CLI or API can naturally complete the runtime configuration.

## Reporters

Two reporters are targeted to work with the @nodesecure/ci. For now,
only the "Console" reporter is available.

- [x] Console
- [ ] HTML

## Requirements

- [Node.js](https://nodejs.org/en/) v20 or higher

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/antoine-coulon"><img src="https://avatars.githubusercontent.com/u/43391199?v=4?s=100" width="100px;" alt="Antoine"/><br /><sub><b>Antoine</b></sub></a><br /><a href="https://github.com/NodeSecure/ci/commits?author=antoine-coulon" title="Code">💻</a> <a href="https://github.com/NodeSecure/ci/commits?author=antoine-coulon" title="Documentation">📖</a> <a href="#maintenance-antoine-coulon" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tonygo.dev"><img src="https://avatars.githubusercontent.com/u/22824417?v=4?s=100" width="100px;" alt="Tony Gorez"/><br /><sub><b>Tony Gorez</b></sub></a><br /><a href="https://github.com/NodeSecure/ci/commits?author=tony-go" title="Code">💻</a> <a href="https://github.com/NodeSecure/ci/commits?author=tony-go" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt="PierreD"/><br /><sub><b>PierreD</b></sub></a><br /><a href="https://github.com/NodeSecure/ci/commits?author=PierreDemailly" title="Code">💻</a> <a href="https://github.com/NodeSecure/ci/commits?author=PierreDemailly" title="Documentation">📖</a> <a href="#maintenance-PierreDemailly" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="#maintenance-fraxken" title="Maintenance">🚧</a> <a href="https://github.com/NodeSecure/ci/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sofiand.github.io/portfolio-client/"><img src="https://avatars.githubusercontent.com/u/39944043?v=4?s=100" width="100px;" alt="Yefis"/><br /><sub><b>Yefis</b></sub></a><br /><a href="#maintenance-SofianD" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/halcin"><img src="https://avatars.githubusercontent.com/u/7302407?v=4?s=100" width="100px;" alt="halcin"/><br /><sub><b>halcin</b></sub></a><br /><a href="https://github.com/NodeSecure/ci/commits?author=halcin" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Yaziidev"><img src="https://avatars.githubusercontent.com/u/156483754?v=4?s=100" width="100px;" alt="Yaziidev"/><br /><sub><b>Yaziidev</b></sub></a><br /><a href="https://github.com/NodeSecure/ci/commits?author=Yaziidev" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
