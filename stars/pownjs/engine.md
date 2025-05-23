---
repo: pownjs/engine
url: 'https://github.com/pownjs/engine'
homepage: ''
starredAt: '2021-04-07T17:01:52Z'
createdAt: '2021-03-12T16:25:39Z'
updatedAt: '2023-01-27T19:58:05Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.636Z'
description: Pown generic scripting and task execution environment.
tags: []
---

> The project has moved to monorepo. See https://github.com/pownjs/pown for more information.

[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/engine.svg)](https://www.npmjs.com/package/@pown/engine)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://github.com/pownjs/lobby)
![default workflow](https://github.com/pownjs/engine/actions/workflows/default.yaml/badge.svg)
[![SecApps](https://img.shields.io/badge/credits-SecApps-black.svg)](https://secapps.com)

# Pown Engine

Pown Engine is a generic scripting and execution environment. It is used by other pown tools to provide a simle extension mechanism for task-based plugins. For example, [recon](https://github.com/pownjs/recon) is using this library to for its own template-based scripting language. SecApps is using this module as part of the RayGun Service (https://secapps.com/docs/raygun).

## Credits

This tool is part of [secapps.com](https://secapps.com) open-source initiative.

```
  ___ ___ ___   _   ___ ___  ___
 / __| __/ __| /_\ | _ \ _ \/ __|
 \__ \ _| (__ / _ \|  _/  _/\__ \
 |___/___\___/_/ \_\_| |_|  |___/
  https://secapps.com
```

### Authors

* [@pdp](https://twitter.com/pdp) - https://pdp.im

## Quickstart

This tool is meant to be used as part of [Pown.js](https://github.com/pownjs/pown), but it can be used separately as an independent library.

### Standalone Use

Install this module locally from the root of your project:

```sh
$ npm install @pown/engine --save
```

## Programming

See `./examples` for examples how to use this library in your own projects.

## Templates

The following is a quick and dirty tutorial what templates are and how to use it.

### What is a template

A template is effectively a simplified scripting language with limited capabilities. It is based on YAML and it is meant to be used for simple task-based executions. You may already be familiar with some template scripting languages such as GitHub Actions, GitLab CI Templates and others.

Like other template languages task execution only proceeds to the next if the current one succeeds. The task execution will also fail if matcher fails. More on that later. In all other cases, execution will proceed one task at the time until it completes.

Each task is provided with an input. The current input is combination between the original input and any output from the current task. The output is what the tasks extracts or exports. More on that later.

The template language does not have the concept of loops and conditions. These types of programming privimitives are better implemented as tasks themselves.

### Matching

The template language has the concept of matching. A matcher is esentially a condition which is checked after the taks completes. If the condition is false then the execution terminates. The matcher is designed to be very versatile and expressive. You can use JavaScript expressions or a more complicated matcher object logic.

For example:

```yaml
task1:
  matcher: field === 'abc'

task2:
  ...
```

Task `task2` will only execute if the output of task1 has a field called `field` with the string value `abc`.

The same effect can be done more verbosely with the following sytanx:

```yaml
task1:
  matcher:
    eq: 'abc'
    part: field

task2:
  ...
```

## Extracting

Each task returns a result. The result is not automatically merged into the input of the next task. Instead, you need define what you want to do with the result using an extractor. In other words you need to define what parts of the task result should be merged into the input which is passed to the next task.

For example:

```yaml
task1:
  extractor: ret({ niceText: text })

task2:
  ...
```

Here task1 will export a filed with value `abc`. If the original input for `task1` is `{ text: 'Hi' }` the input for `task2` will be `{ text: 'Hi', niceText: 'Hi' }`.

The same effect can be achieved more verbosely with the following syntax:

```yaml
task1:
  extractor:
    value: niceText
    path: $.text

task2:
  ...
```
