---
repo: dineshsonachalam/markdown-autodocs
url: 'https://github.com/dineshsonachalam/markdown-autodocs'
homepage: 'https://github.com/marketplace/actions/markdown-autodocs'
starredAt: '2022-03-11T22:21:21Z'
createdAt: '2021-06-15T17:44:34Z'
updatedAt: '2025-02-05T04:28:45Z'
language: JavaScript
license: MIT
branch: master
stars: 186
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:00.927Z'
description: >-
  ✨ A GitHub Action that automatically generates & updates markdown content
  (like your README.md) from external or remote files.
tags: []
---

<h1 align="center"> 
  <a href="https://github.com/marketplace/actions/markdown-autodocs">
    <img src="https://i.imgur.com/ZAC4qPa.png"/>
  </a>
</h1>
<p align="center">A GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files.</p>
<p align="center">
    <a href="https://sonarcloud.io/dashboard?id=markdown-autodocs">
        <img src="https://sonarcloud.io/api/project_badges/quality_gate?project=markdown-autodocs"/>
    </a>
</p>
<p align="center">
    <a href="https://www.codacy.com/gh/dineshsonachalam/markdown-autodocs/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dineshsonachalam/markdown-autodocs&amp;utm_campaign=Badge_Grade">
        <img src="https://app.codacy.com/project/badge/Grade/55bdbc75c542444d86b8e900bb0f4f91"/>
    </a>
    <a href="https://snyk.io/test/github/dineshsonachalam/markdown-autodocs">
        <img src="https://snyk.io/test/github/dineshsonachalam/markdown-autodocs/badge.svg"/>
    </a>
    <a href="https://hub.docker.com/r/dineshsonachalam/markdown-autodocs" alt="Docker pulls">
        <img src="https://img.shields.io/docker/pulls/dineshsonachalam/markdown-autodocs.svg" />
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/tests.yml">
        <img src="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/tests.yml/badge.svg"/>
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/markdown-autodocs.yml">
        <img src="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/markdown-autodocs.yml/badge.svg"/>
    </a>
    <a href="https://sonarcloud.io/dashboard?id=markdown-autodocs">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=markdown-autodocs&metric=coverage"/>
    </a>
    <a href="https://www.npmjs.com/package/markdown-autodocs">
      <img src="https://img.shields.io/npm/v/markdown-autodocs?color=dark%20green&label=npm%20package" alt="npm version" height="20">     
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/blob/master/LICENSE" target="_blank">
        <img src="https://badgen.net/github/license/dineshsonachalam/markdown-autodocs" alt="MIT License" height="20">
    </a>
</p>

Ask questions in the <a href ="https://github.com/dineshsonachalam/markdown-autodocs/issues">GitHub issues</a>

## Table of contents

*   [Why markdown-autodocs?](#why-markdown-autodocs)
*   [Features](#features)
*   [Examples](#examples)
    *   [CODE Block](#code-block)
    *   [JSON to HTML table](#json-to-html-table)
    *   [Github Workflow Artifacts table](#github-workflow-artifacts-table)
*   [Example Repo which uses all the markdown-autodocs feature](#example-repo-which-uses-all-the-markdown-autodocs-feature)
*   [Local usage without Github action](#local-usage-without-github-action)
*   [Usage](#usage)
    *   [Adding markdown-autodocs in your workflow](#adding-markdown-autodocs-in-your-workflow)
    *   [Extended example with all possible options available for this Action](#extended-example-with-all-possible-options-available-for-this-action)
*   [Github Workflow Artifacts](#github-workflow-artifacts)
*   [Contributing](#contributing)
*   [Used By](#used-by)
*   [License](#license)

## Why markdown-autodocs
To make your repo more appealing and useful you need to provide example code snippets in your README.md. Manually copy and pasting each code snippet in their respective places in your README would be inefficient and time-consuming.

This problem can be solved using <b>markdown-autodocs</b> a GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files. You need to add markers in your README.md that will tell markdown-autodocs where to insert the code snippet.

## Features
*   <b>Code block:</b> Insert code snippet in your markdown file from external or remote files.
*   <b>JSON to HTML table:</b> Insert HTML Table in your markdown file by converting JSON file contents to HTML table.
*   <b>Github Workflow Artifacts table:</b> Insert the Github workflow artifacts table in your markdown file by getting the latest artifacts for a workflow run.

## Examples

### CODE Block

Get code from an external file or URL and insert it in your markdown.

**Options:**
* `src`: The relative path to the code to pull in, or the `URL` where the raw code lives
* `lines` (optional): a range with lines of code which will then be replaced with code from the file. The line range should be defined as: "lines=*startLine*-*EndLine*" (for example: "lines=22-44"). Please see the example below
* `syntax` (optional): Syntax will be inferred by fileType if not specified
* `header` (optional): Will add header comment to code snippet. Useful for pointing to relative source directory or adding live doc links

Options are concatenated via the ```&``` sign.
For example ```(CODE:src=readme.md&lines=10-20)```

<a href="./docs/examples.md#get-code-from-external-file" target="_blank">
    <img src="https://i.imgur.com/NUMReeR.png"/>
</a>

<a href="./docs/examples.md#get-code-from-remote-file" target="_blank">
  <img src="https://i.imgur.com/blYRUXN.png"/>
</a>

### JSON to HTML table
Get JSON contents from an external file and convert it into an HTML table and insert's it in your markdown.

**Options:**
*   `src`: The relative path to the JSON file to pull in.

<a href="./docs/examples.md#json-to-html-table" target="_blank">
  <img src="https://i.imgur.com/5pTHIpS.png"/>
</a>

### Github Workflow Artifacts table

Get the list of the latest artifacts generated from a workflow run. Generates a workflow artifacts table consists of artifacts download and workflow URL in an HTML table and inserts it in your markdown file.

<a href="./docs/examples.md#github-workflow-artifacts-table" target="_blank">
  <img src="https://i.imgur.com/gVHiSB8.png"/>
</a>

### [Example Repo which uses all the markdown-autodocs feature](https://github.com/dineshsonachalam/repo-using-markdown-autodocs)

## Local usage without Github action

**Install markdown-autodocs CLI:**
```sh
npm i -g markdown-autodocs
```

**markdown-autodocs CLI usage:**
```sh
dineshsonachalam@macbook ~ % markdown-autodocs --help
Usage: markdown-autodocs [options]

Options:
  -o, --outputFilePath <outputFilePaths...>  Output file paths
  -c, --category <categories...>             code-block, json-to-html-table, workflow-artifact-table
  -r, --repo <type>                          Repo name
  -b, --branch <type>                        Branch name
  -a, --accessToken <type>                   Github Access token
  -h, --help                                 display help for command
```

*   Code block

```sh
markdown-autodocs -c code-block -o ./README.md 
```
*   JSON to HTML table

```sh
markdown-autodocs -c json-to-html-table -o ./README.md
```
*   Github workflow artifacts table

```sh
markdown-autodocs -c workflow-artifact-table -o ./README.md -r $REPO -b $BRANCH -a $ACCESSTOKEN
```

## Usage

### Adding markdown-autodocs in your workflow
Add the following step at the end of your job, after other steps that might add or change files.
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./docs/latest-release.yml) -->
<!-- The below code snippet is automatically added from ./docs/latest-release.yml -->
```yml
uses: dineshsonachalam/markdown-autodocs@v1.0.7
```
<!-- MARKDOWN-AUTO-DOCS:END -->

### Extended example with all possible options available for this Action
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./docs/markdown-autodocs.yml) -->
<!-- The below code snippet is automatically added from ./docs/markdown-autodocs.yml -->
```yml
- name: Markdown autodocs
- uses: dineshsonachalam/markdown-autodocs@v1.0.7
  with:
    # Optional, defaults to author of the commit that triggered the run
    commit_author: Author <actions@github.com>

    # Optional, defaults to "actions@github.com"
    commit_user_email: actions@github.com

    # Optional, but recommended
    # Defaults to "Apply automatic changes"
    commit_message: Apply automatic changes

    # Optional branch name where commit should be pushed to.
    # Defaults to the current branch.
    branch: feature-123

    # Optional output file paths, defaults to '[./README.md]'.
    output_file_paths: '[./README.md]'

    # Categories to automatically sync or transform its contents in the markdown files.
    # Defaults to '[code-block,json-to-html-table,workflow-artifact-table]'
    categories: '[code-block,json-to-html-table,workflow-artifact-table]'
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Github Workflow Artifacts
<!-- MARKDOWN-AUTO-DOCS:START (WORKFLOW_ARTIFACT_TABLE) -->
<table class="ARTIFACTS-TABLE"><thead><tr><th class="artifact-th">Artifact</th><th class="workflow-th">Workflow</th></tr></thead><tbody ><tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/8035885415/artifacts/345434485>module-dependencies-license-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/2950852234>tests</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/8035885415/artifacts/345434487>size-of-dependencies</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/2950852234>tests</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/8035885415/artifacts/345434489>vulnerabilities-audit-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/2950852234>tests</a></td></tr></tbody></table>
<!-- MARKDOWN-AUTO-DOCS:END -->

## Contributing

*   [Code of Conduct](CODE_OF_CONDUCT.md)
*   [Contributing Guideline](CONTRIBUTING.md)

## Used By


|  Repo | Stars  | Usage |
|--|--|--|
| <a href="https://github.com/jaames/iro.js">Iro.js</a> |<img src="https://img.shields.io/github/stars/jaames/iro.js?style=social">| 🎨 Modular, design-conscious color picker widget for JavaScript - with support for a bunch of color formats|
| <a  href="https://github.com/crashmax-dev/fireworks-js"> Fireworks.js </a> | <img  src="https://img.shields.io/github/stars/crashmax-dev/fireworks-js?style=social"> | 🎆 A simple fireworks library! Ready to use components available for React, Vue 3, Svelte, Angular, Preact, Solid, and Web Components |
| <a  href="https://github.com/nitram509/lib-bpmn-engine"> BPMN engine </a> | <img  src="https://img.shields.io/github/stars/nitram509/lib-bpmn-engine?style=social"> | A BPMN engine, meant to be embedded in Go applications with minimal hurdles, and a pleasant developer experience using it. This approach can increase transparency for non-developers |
| <a  href="https://github.com/d-edge/foss-acronyms"> FOSS Community Acronyms</a> | <img  src="https://img.shields.io/github/stars/d-edge/foss-acronyms?style=social"> | List of abbreviations used within the FOSS community, and their definitions and usages |
| <a href="https://github.com/crashmax-dev/twallpaper"> TWallpaper  </a> | <img  src="https://img.shields.io/github/stars/crashmax-dev/twallpaper?style=social"> | 🌈 Multicolor gradient wallpaper created algorithmically and shimmers smoothly |
| <a  href="https://github.com/dusk-network/dusk-ui-kit"> Dusk UI Kit </a> | <img  src="https://img.shields.io/github/stars/dusk-network/dusk-ui-kit?style=social"> | 🧱 Dusk UI component library |
| <a  href="https://github.com/yapkhaichuen/LTSM-Stock-Predictor"> LTSM Stock Predictor </a> | <img  src="https://img.shields.io/github/stars/yapkhaichuen/LTSM-Stock-Predictor?style=social"> | Predicting different stock prices using Long Short-Term Memory Recurrent Neural Network in Python using TensorFlow 2 and Keras |
| <a  href="https://github.com/jimbrig/PowerShell"> PowerShell </a> | <img  src="https://img.shields.io/github/stars/jimbrig/PowerShell?style=social"> | PowerShell Core Profile Directory |
| <a  href="https://github.com/holly-cummins/quarkus-minecraft-observability-extension"> Mincecraft Observability extension </a> | <img  src="https://img.shields.io/github/stars/holly-cummins/quarkus-minecraft-observability-extension?style=social"> | Uses minecraft as a client for viewing observability metrics |
| <a  href="https://github.com/entelecheia/ekorpkit"> eKonomic Research Python Toolkit </a> | <img  src="https://img.shields.io/github/stars/entelecheia/ekorpkit?style=social"> | A NLP Library for Social Science Research |
| <a  href="https://github.com/seqan/sharg-parser"> The argument parser for bio-c++ tools </a> | <img  src="https://img.shields.io/github/stars/seqan/sharg-parser?style=social"> | The Sharg parser offers a neat and easy-to-use header-only library for argument parsing in C++ |

## License

[MIT](https://choosealicense.com/licenses/mit) © [dineshsonachalam](https://www.github.com/dineshsonachalam)
