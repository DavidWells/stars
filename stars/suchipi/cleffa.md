---
repo: suchipi/cleffa
url: 'https://github.com/suchipi/cleffa'
homepage: null
starredAt: '2022-03-02T06:27:40Z'
createdAt: '2022-02-27T22:11:09Z'
updatedAt: '2022-12-25T22:08:25Z'
language: JavaScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:03.843Z'
description: >-
  CLI utility that parses argv, loads your specified file, and passes the parsed
  argv into your file's exported function. Supports ESM/TypeScript/etc out of
  the box.
tags: []
---

# cleffa

CLI tool that:

- Parses argv into an object (of command-line flags) and an array of positional arguments
- Loads a function from the specified file (supports JavaScript, TypeScript, ESM, etc)
- Calls your function with that object and any positional args, and, if an error occurs (via sync throw or Promise rejection):
  - Pretty-prints the error
  - Exits the process with status code 1

It's an untyped CLI version of [clefairy](https://npm.im/clefairy), suitable for use in simple scripts/programs.

## Usage Example

`some-file.js`:

```ts
export default async function main(options, ...args) {
  console.log({ options, args });
}
```

Then, if you run:

```
npx cleffa ./some-file.js --user-name Jeff one two -v -- --hi
```

It logs:

```js
{
  options: { userName: 'Jeff', v: true },
  args: [ 'one', 'two', '--hi' ]
}
```

## Supported Syntax

Your input file will be compiled with [kame](https://npm.im/kame) prior to execution. As such, you can use ESM and TypeScript syntax in your input file.

## Shebang Usage (use without installing)

You can put this line at the top of any executable JavaScript/TypeScript file to make it run with cleffa anywhere that node is installed:

```
#!/usr/bin/env -S npx --yes cleffa
```

For example, if you made a file named `print-files` (this is a contrived example):

```ts
#!/usr/bin/env -S npx --yes cleffa
import fs from "fs";

export default function main(options, ...args) {
  for (const file of args) {
    console.log(fs.readFileSync(file, "utf-8"));
  }
}
```

Then marked it as executable:

```
$ chmod +x ./print-files
```

Then ran it:

```
$ ./print-files ./index.js ./index.ts
```

It would print the contents of index.js and index.ts.

## License

MIT
