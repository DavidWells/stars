---
repo: artlogic/nabs
url: 'https://github.com/artlogic/nabs'
homepage: null
starredAt: '2021-09-11T06:19:07Z'
createdAt: '2016-08-12T22:41:27Z'
updatedAt: '2024-10-14T16:15:56Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.008Z'
description: Not Another Build System
tags: []
---

# Not Another Build System (nabs)

nabs is a compiler that turns a nicely structured YAML file into script entries in your `package.json`. npm is a great minimal task runner that's already installed along with node. However, a large number of multi-action tasks in your `package.json` can be hard to manage. That's where nabs comes in. You can write your tasks in much easier to manage format and then compile them into standard script entries.

Note: nabs is only designed to work in Bourne shell compatible environments. It should work with Node 10.x or greater.

```
  Usage: nabs [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -d, --disable         disable the default nabs regenerate task
    -n, --nabs <file>     nabs.yml file (defaults to nabs.yml in current dir)
    -p, --package <file>  package.json file (defaults to package.json in current dir)
    -v, --verbose         pass up to 3 times to increase verbosity
```

## Getting Started

Start by installing nabs:

`npm install -g nabs`

Then, create a `nabs.yml` (see below) along side your `package.json` and execute:

`nabs`

You should see your tasks represented as script entries in `package.json`

## Basic format

`nabs.yml` is a mapping (dictionary) of task names to actions:

```yaml
# my tasks
lint: eslint .
minify: uglifyjs js/main.js -o js/main.min.js
```

The key is the task name, the value is a shell command to run. This is already a slight improvement over `package.json` because you can add comments and generally omit quotes. Task names starting with `$` are reserved for use by nabs.

## Nested tasks

Actions can be nested, creating a hierarchy. Only leaves in the hierarchy can have action values (unless you [override the defaults](#overriding-defaults)). Nested action names will be separated by colons in `package.json`.

```yaml
test:
  server: mocha --recursive test/server
  client: mocha --recursive test/client
```

This will create three entries in `package.json`:

```json
"scripts": {
  "test": "npm run test:client && npm run test:server",
  "test:server": "mocha --recursive test/server",
  "test:client": "mocha --recursive test/client"
}
```

Parent tasks run their subtasks in alphabetical order. It is possible to [override](#overiding-defaults) that behavior.

Note: Because colon is used as the task separator, you probably should avoid embedding colons in your nabs task names.

## Multi-action tasks

You can create a multi-action task by embedding a sequence as the mapping's value:

```yaml
publish-spec:
  - git checkout gh-pages
  - mv spec.html index.html
  - git add index.html
  - git commit -m 'Publishing...'
  - git push
  - git checkout master
```

This will create a `package.json` entry like this:

```json
"scripts": {
  "publish-spec": "git checkout gh-pages && mv spec.html index.html && git add index.html && git commit -m 'Publishing...' && git push && git checkout master"
}
```

If any individual action fails, the entire task will fail.

## Dependencies

Any task can have dependencies that must be run prior to execution. They can be specified by setting the value of the task to a mapping with a `$depend` property and an `$action` property. The `$action` property contains either a single action (a string) or a list of actions (sequence). The `$depend` property contains either a single task name (a string) or a sequence of task names that must be run prior to this task.

```yaml
spec:
  generate: jsdoc -c .jsdocrc
  publish:
    $depend: spec:generate
    $action:
      - rm prod
      - mv out prod
```

The above will generate the following `package.json` entries:

```json
"scripts": {
  "spec": "npm run spec:generate && npm run spec:publish",
  "spec:generate": "jsdoc -c .jsdocrc",
  "spec:publish": "npm run spec:generate && rm prod && mv out prod"
}
```

In the future, nabs will be smart enough to know that running `spec:publish` will run `spec:generate` so it's not run twice by the `spec` task.

## Overriding defaults

Parent tasks in a hierarchy have a default set of dependencies - namely, their children in alphabetical order. This can be overridden by setting the `$depend` property on the parent to any valid sequence of tasks, including the empty sequence or null (both disable the default).

Generally the `$action` property on parent tasks is empty. It's possible to set this as well if desired. This is useful when you'd like to use parent tasks to group related tasks that shouldn't neccesarily exhibit the default parent/child relationship. For example:

```yaml
migrate:
  $depend: []
  $action: sequelize db:migrate
  create: sequelize migration:create
  undo: sequelize db:migrate:undo
```

This will create a `package.json` with the following entries:

```json
"scripts": {
  "migrate:create": "sequelize migration:create",
  "migrate:undo": "sequelize db:migrate:undo",
  "migrate": "sequelize db:migrate"
}
```

### Child task shorthand

One potential use of `$depend` is to override the default alphabetical order parents tasks run their child in. In this case, shorthand can be used to write the task names that omits the parent name:

```yaml
test:
  $depend:
    - :server  # instead of test:server
    - :client  # instead of test:client

  server: mocha --recursive test/server
  client: mocha --recursive test/client
```

This will generate the following script entries:

```json
"scripts": {
  "test": "npm run test:server && npm run test:client",
  "test:server": "mocha --recursive test/server",
  "test:client": "mocha --recursive test/client"
}
```

A leading colon in a `$depend` task name will always be replaced by the full name of the parent, even in deeply nested tasks. For instance:

```yaml
very:
  deep:
    task:
      $depend: [:server, :client]
      server: echo "first!"
      client: echo "second!"
```

Compiles to:

```json
"scripts": {
  "very": "npm run very:deep",
  "very:deep": "npm run very:deep:task",
  "very:deep:task": "npm run very:deep:task:server && npm run very:deep:task:client",
  "very:deep:task:server": "echo \"first!\"",
  "very:deep:task:client": "echo \"second!\""
}
```

Notice that `:server` becomes `very:deep:task:server`.

## Future enhancements

* Integration tests.
* Better error handling.
* Look at using Flow for type checking
* Info messages when using npm's special names (e.g. publish, install, uninstall, version, and all variations).
* Consider allowing nabs to run a task after compilation: `nabs migrate:create --name 'test-migrate'` which would just execute: `npm run migrate:create -- --name 'test-migrate'`. This is a little tricky now that commander is being used. Consider tab completion via bash/zsh. Also take a look at `ntl`'s menu system.
* Ignore action errors (use `;` instead of `&&` for certain tasks)... end with `; true` if necessary (won't work on windows). How do you mark an action as ok to fail?
* Platform independence? (https://github.com/shelljs/shx, https://www.npmjs.com/package/bashful) - the only bashism we use currently is `&&` and that works in cmd.exe.
* Allow actions to be embedded JS snippets as an alternative to shell commands. They might be output into `./scripts`. Use $type. Look at scripty: https://www.npmjs.com/package/scripty
* File based tasks - that is, operate on all .js files... Need to be able to ignore dirs globally, and on case by case... Look at grunt for this. Any set of params should compile to a find command. Is there a platform independent (js based) find? Use $files.
* Support for watching files/folders and kicking off tasks (nodemon, onchange). Use $watch.
* Support for parallel tasks (parallelshell). Use $parallel.
* Reusable actions?
* Look for dependency problems. These problem are always caused by manual dependencies, and can be fixed manually as well. It might be helpful to identify problems. Things I can find:
  * Dependency loops. If a dependency is a child of itself, there's s loop. Relatively easy.
  * Problems with auto-generated dependencies. An auto-generated dependency can interact with a manual dependency in such a way that a dependency is run twice unnecessarily.

## References/inspiration

* https://docs.npmjs.com/misc/scripts
* https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
* https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8
* https://css-tricks.com/why-npm-scripts/
