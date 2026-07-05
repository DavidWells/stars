---
repo: henrycunh/haxx
url: 'https://github.com/henrycunh/haxx'
homepage: ''
starredAt: '2022-03-04T03:46:55Z'
createdAt: '2022-02-22T15:32:40Z'
updatedAt: '2023-12-27T16:41:54Z'
language: TypeScript
license: NA
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:03.435Z'
description: ⚡️ Makes writing scripts absurdly easy
tags:
  - fetch
  - io
  - javascript
  - json
  - scripts
  - typescript
  - yaml
  - zx
---

<div align="center">

# haxx
  <sup>easily create and run scripts using javascript</sup>

</div>


<p align="center">
  <table>
    <tbody>
      <td align="center">
        <img width="2000" height="0"><br>
        <a href="#getting-started">getting started</a> • <a href="#installation">commands</a> • <a href="#api">api</a><br>
        <img width="2000" height="0">
      </td>
    </tbody>
  </table>
</p>

## Features
- 🔀 **Process DX** - easily manage and run processes
- 📦 **Javascript ESM** - makes writing scripts easier, through javascript
- 🔌 **Great IO** - provides easy to use IO functions, for known formats
- 🧑‍💻 **Opinionated** - it's a great tool for writing tools, with tools inside

## Getting started
It's as simple as creating a script file with a `.mjs` extension
```js
#!/usr/bin/env haxx

const lastTag = await $`git tag | tail -n 1`
const tagMessage = String(await $`git tag -l -n9 ${lastTag}`)
    .match(/\s{2,}(.+)/)[1]
console.log(`Last tag message: ${tagMessage}`)
```
And running it
```bash
haxx my-script.mjs
```
## Installation
You can either install it globally
```bash
npm i -g haxx
haxx my-script.mjs
```
Or run it through `npx` or any other package manager execute
```bash
npx -y haxx my-script.mjs
```
## API
### `$`
**Executes a given command and returns a promise of the output.**

Everything passed through `${...}` will be automatically escaped and quoted.


```js
const dirToRemove = 'my nice dir'
await $`rm -rf ${dirToRemove}` // rm -rf 'my nice dir'
```

You can pass arrays as arguments
```js
const dirs = ['dir1', 'dir2']
await $`ls ${dirs}` // ls dir1 dir2
```

You can catch process exit codes upon a failing
```js
try {
    await $`exit 1`
} catch (process) {
    console.log(`Exit code: ${process.exitCode}`)
    console.log(`Error: ${process.stderr}`)
}
```

You can pipe directly from the promise to any other stream
```js
$`watch -n1 ls`.pipe(process.stdout)
```

### `read`
Lets you read files easily, and specify formats
```js
const content = await read`my-file.txt`

const package = await read.json`package.json`
console.log(package.version)

const deployment = await read.yaml`deployment.yaml`
console.log(deployment.metadata.name)
```

### `write`
Lets you write files easily, and specify formats
```js
await write('my-file', 'Hello world') 
// Hello World

await write.json('object.json', { hello: 'world' })
// { "hello": "world" }

await write.yaml('object.yaml', { hello: 'world' })
// hello: world
```

### `io`
Gives you a nice interface for reading and saving files

```js
const { data: pkg, save } = await io.json`package.json`
pkg.version = '1.0.1'
await save()

const { data: deployment, save: saveDeployment } = await io.yaml`deployment.yaml`
deployment.spec.template.spec.containers[0].image = 'my-new-image'
await saveDeployment()
```

### `exists`
Checks if a file or directory exists
```js
if (!exists('key')) {
    await write('key', Math.random().toString().slice(2))
}
```

### `remove`
Removes a file or directory
```js
remove('my-file')
```

### `cd`
Changes the directory
```js
await $`ls`
cd('another-directory')
await $`ls`
```

### `template`
Lets you replace variables in a template
```js
const phrase = template({ name: 'world'}, 'Hello {{ name }}')

const filled = template.file({ GITHUB_TOKEN: '...' }, 'my-template')
```

### Included batteries

- `kleur` - a nice color library
- `kleur-template` - easier coloring through templating
- `glob` - utility for globbing files
- `yaml` - a yaml parser
- `os` - the os package
- `path` - the path package
- `minimist` - your arguments parsed, availabe through the global constant `argv`
## Acknowledgements
This project is **heavily** inspired by [**zx**](https://github.com/google/zx) and [**fsxx**](https://github.com/antfu/fsxx), down to the code. 

Check them out!




