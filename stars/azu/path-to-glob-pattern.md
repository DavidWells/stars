---
repo: azu/path-to-glob-pattern
url: 'https://github.com/azu/path-to-glob-pattern'
homepage: ''
starredAt: '2021-11-21T23:15:36Z'
createdAt: '2017-03-03T13:27:41Z'
updatedAt: '2023-08-12T12:15:42Z'
language: TypeScript
license: NOASSERTION
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.331Z'
description: Convert file/directory path to glob pattern.
tags:
  - file
  - glob
  - nodejs
  - util
---

# path-to-glob-pattern [![Actions Status: test](https://github.com/azu/path-to-glob-pattern/workflows/test/badge.svg)](https://github.com/azu/path-to-glob-pattern/actions?query=workflow%3A"test")

Convert file/directory path to glob pattern. 

For example, 

```
src/ => src/**/*
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install path-to-glob-pattern

## Usage

`pathToGlobPattern` return process function.

```js
import { pathToGlobPattern } from "path-to-glob-pattern";
const processPatternJs = pathToGlobPattern({
    extensions: ["js"],
    cwd: __dirname
});
/* ## Pass directory */
console.log(processPatternJs("src"));
// => src/**/*.js

/* ## Pass file path */
console.log(processPatternJs("src/path-to-glob-pattern.js"));
// => src/path-to-glob-pattern.js

/* ## Pass not match file path */
console.log(processPatternJs("src/unknown.ext"));
// => src/unknown.ext

/* ## Multiple extensions */
const processPatternMultiple = pathToGlobPattern({
    extensions: ["js", "md"],
    cwd: __dirname
});
console.log(processPatternMultiple("."));
// => **/*.{js,md}
````

## Changelog

See [Releases page](https://github.com/azu/path-to-glob-pattern/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/path-to-glob-pattern/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

and 

ESLint
Copyright JS Foundation and other contributors, https://js.foundation
https://github.com/eslint/eslint/blob/master/tests/lib/util/glob-util.js
