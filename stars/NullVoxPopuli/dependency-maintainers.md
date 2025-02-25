---
repo: NullVoxPopuli/dependency-maintainers
url: 'https://github.com/NullVoxPopuli/dependency-maintainers'
homepage: null
starredAt: '2024-06-11T21:51:13Z'
createdAt: '2024-06-11T15:08:49Z'
updatedAt: '2025-01-20T08:22:35Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:29.319Z'
description: >-
  How much power do the maintainers of your dependencies have? Allows folks to
  audit who has access to publishing.
tags: []
---

# Dependency Maintainers

(aka `depmain`)

## Who maintains your project?

This tool recurses through your project's `node_modules` and gathers the maintainers, people with publish access on npm, and lists them out with a total of how many projects you use that they have access to.

For example:

```bash
$ npx dependency-maintainers@latest

  Number of maintainers: 333
  Number of packages: 462

┌─────────┬─────────────────────────────┬────────────┐
│ (index) │ NPM Name                    │ # Packages │
├─────────┼─────────────────────────────┼────────────┤
│ 0       │ 'ljharb'                    │ 80         │
│ 1       │ 'sindresorhus'              │ 53         │
│ 2       │ 'nicolo-ribaudo'            │ 32         │
│ 3       │ 'jlhwung'                   │ 31         │
│ 4       │ 'existentialism'            │ 31         │
│ 5       │ 'hzoo'                      │ 31         │
│ 6       │ 'isaacs'                    │ 27         │
│ 7       │ 'gar'                       │ 25         │
│ 8       │ 'fritzy'                    │ 25         │
│ 9       │ 'lukekarrys'                │ 23         │
│ 10      │ 'saquibkhan'                │ 23         │
...
```


## Arguments / Flags

```bash
--recursive, -r     In a monorepo, find the montainers of every (package in the monorepo)'s (dev)dependencies

                      npx dependency-maintainers --recursive

--verbose, -v       Print extra logging to stdout

                      npx dependency-maintainers --verbose

--force             Force a cache refresh

                      npx dependency-maintainers --force

--help, -h          show this message

                      npx dependency-maintainers --help
```
