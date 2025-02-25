---
repo: mafintosh/create-project
url: 'https://github.com/mafintosh/create-project'
homepage: null
starredAt: '2021-01-08T18:01:30Z'
createdAt: '2014-08-21T15:13:02Z'
updatedAt: '2022-02-07T15:04:55Z'
language: JavaScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:08.655Z'
description: >-
  Create a new project based on a branch in a github repo. Supports basic format
  strings
tags: []
---

# create-project

Create a new project based on a branch in a github repo. Supports basic format strings

```
npm install -g create-project
create-project # prints out a help
```

## Usage

To use this first create a new repo to contain your project templates.
An example of this could be [mafintosh/templates](https://github.com/mafintosh/templates)

To create a new project simply do

```
create-project new-project-name mafintosh/templates
```

If files in your template repo contains format string (`{{variable}}`) you can override the value using
a command line parameter with the same name (`--variable [value]`)

Per default the variable `name` is set to the project name

## Other Sources

Sometimes your templates dont live in github, so here are some alternate ways to retrieve them

```
create-project new-project-name --url=http://gitlab.internal.com/project-templates/npm-module/repository/archive.tar.gz?ref=master
create-project new-project-name --file=archive.tar.gz
```


## Defaults

If you don't want to type the repo name everytime or want to store default format variables, use `--configure`

```
create-project --configure
Set repository: mafintosh/templates
Set key=value: (blank to skip) foo=bar
```

Then to create a new project just do

```
create-project new-project-name
```

## License

MIT
