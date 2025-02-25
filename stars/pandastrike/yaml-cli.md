---
repo: pandastrike/yaml-cli
url: 'https://github.com/pandastrike/yaml-cli'
homepage: null
starredAt: '2023-04-18T17:35:33Z'
createdAt: '2016-02-28T02:33:17Z'
updatedAt: '2025-02-21T20:40:12Z'
language: Shell
license: ISC
branch: master
stars: 87
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:52.067Z'
description: A simple CLI for querying and updating YAML files
tags: []
---

# yaml-cli

> **Important** This project has been deprecated. We recommend [yq](https://github.com/mikefarah/yq).

A simple CLI for working with YAML files.

## Installation

```bash
$ npm install -g yaml-cli
```

## Shell Completion

You can set up shell completion like this:

```bash
$ eval $(yaml env -)
```

## Examples

Given the following `test.yml` file:

```yaml
foo:
  bar: 7
  baz:
    - 17
    - "hello world"
```

### get

You can get properties:

```bash
$ yaml get test.yaml foo.bar
7
```

or array accessors:

```bash
$ yaml get test.yaml foo.baz.1
hello world
```

### set

You can set values, too.

```bash
$ yaml set test.yaml foo.baz.1 goodbye
foo:
  bar: 7
  baz:
    - 17
    - "goodbye"
```

### template

You can instantiate template files, too. Given the following template:

```
I would like to say {{foo.baz.1}}
```

you can instantiate it like this:

```bash
$ yaml t test.yaml test.template
I would like to say hello world
```

### json

You can read and write JSON.

To convert from JSON to YAML:

```tty
$ yaml json read test.json
foo:
  bar: 7
  baz:
    - 17
    - "hello world"
```

To convert from YAML to JSON:

```tty
$ yaml json write test.yaml
{
  "foo": {
    "bar": 7,
    "baz": [
      17,
      "hello world"
    ]
  }
}
```

You can get more help by just typing `yaml`.

```bash
$ yaml
Usage: yaml <command> [<args>]

Some useful yaml commands are:
   commands  List all yaml commands
   get       Get a value from a YAML file
   set       Set a value in a YAML file
   template  Instantiate a template file with a YAML file.

See 'yaml help <command>' for information on a specific command.
```

## Limitations

See the [issues list](https://github.com/pandastrike/yaml-cli/issues)—and please open your own or `+1` your favorites.
