---
repo: geut/brode
url: 'https://github.com/geut/brode'
homepage: null
starredAt: '2022-09-12T17:28:27Z'
createdAt: '2021-10-08T15:03:55Z'
updatedAt: '2024-05-23T11:07:19Z'
language: JavaScript
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:31.435Z'
description: A polyfill Node.js runner for the browser
tags: []
---

# brode
Monorepo project for the polyfill Node.js browser platform: `brode` 🤜 🤛

![Test Status](https://github.com/geut/brode/actions/workflows/test.yml/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[![Made by GEUT][geut-badge]][geut-url]

## Intro

In Geut we are constantly creating Node.js modules with browser support and when is time to test one of those modules we have to think:

> How I'm going to test a JavaScript module in Chrome/Firefox?

That's why we created `brode`.

In summary, `brode` is a command-line tool that allows you to run JavaScript files in the browser on top of a Node.js polyfill environment. 

## Example

Take a look at this example, here we are testing some code that will run on firefox:

```javascript
// index.js
process.stdout.write('hello world')
process.exit(0)
```

```bash
$ node index.js
$ hello world
$
$ brode index.js --target firefox
$ hello world
```

`brode index.js --target firefox`

`brode` is doing the following for you:

1. Compiles the `index.js` with [esbuild](https://esbuild.github.io/).
1. Adds [polyfills](packages/esbuild-plugin-brode/README.md) for every Node.js core module/globals.
1. Runs the build with [playwright](https://playwright.dev/).

With `brode` you can use test runners like [uvu](https://github.com/lukeed/uvu) to test your modules in Node.js and browsers. 

_Quick, small and easy._ 🤜 🤛

## Modules

- [brode](packages/brode/README.md): Command-line tool and API for the polyfill Node.js browser platform.
- [brout](packages/brout/README.md): Command-line tool and API to log the output of JavaScript files using playwright.
- [browser-node-core](packages/browser-node-core/README.md): Core Node modules for the browser.
- [esbuild-plugin-brode](packages/esbuild-plugin-brode/README.md): A esbuild plugin to add web polyfills to support node core modules and globals.
- [esbuild-plugin-server](packages/esbuild-plugin-brode/README.md): A esbuild plugin to run a dev server.

## Issues

:bug: If you found an issue we encourage you to report it on [github](https://github.com/geut/brode/issues). Please specify your OS and the actions to reproduce it.

## Contributing

:busts_in_silhouette: Ideas and contributions to the project are welcome. You must follow this [guideline](https://github.com/geut/brode/blob/main/CONTRIBUTING.md).

## License

MIT © A [**GEUT**](http://geutstudio.com/) project

[geut-url]: https://geutstudio.com
[geut-badge]: https://img.shields.io/badge/Made%20By-GEUT-4f5186?style=for-the-badge&link=https://geutstudio.com&labelColor=white&logo=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABAYDBQACBwH/xAA0EAACAQMBBAcGBgMAAAAAAAABAgMABBEFBhIhQRMiMVFhgcEUIzJxkbFCUmKh0fAkcuH/xAAYAQADAQEAAAAAAAAAAAAAAAABAwQCAP/EACARAAMAAwACAgMAAAAAAAAAAAABAgMRIRIxBEEiM1H/2gAMAwEAAhEDEQA/AOgVlau6xoXdgqqMkk8AKV9U2oYs0WngBRw6VhxPyFamXXoDeiz1PUbmzuujQIUKgjIqGLXnz72FSO9TikfVbi6uXWSSaWRuzixNBx3VzCepNIvgTw+hpjwv+iGr3tM6xa30F2PdP1uangRRNc70fUbi4JLIVaPskXgM/wA076Ze+2W+WwJF4MPWlNaemajI2/GvYbWVlZQHCptZqLNKLGJsKoDSY5nkKorKzlvrlYIRlm5nsA7zWX8pnv55SfikJ/emPZGDcs7m6CguTuL5DPrVf64Me2F2mzNhAg6ZTO/MsSB9BW15s1pt1GVEPRHvQ+hqbTNT9sZ0kCpIOIA5ij5ZEijaSRgqqMkmpVkb7sMuWtoV73S49L3I4B7kjq57c881BZ6vFpuoKjq7dIvYBw8PtUOqX1xcSxoJXw8mQuewVW3vX1eFR+Fcn96OLVvpFzz8kM020kp4QwIvixzVpot5Je2bSTEFw5HAY7qUKadnIymm7x/G5I+3pTskzM8G4rqq6JGpI8E1wi8HR2H0NT7P6rcRKUEzYR9/czgEf0VabV2JgvhdKPdzdvg399aVG37K4Esfw/3hTU1S2NpNrSHqax9q/wAzTm3lY5KA4ZTQl2mo9CWljncL+cnA+tVVhqeSGt5mik5qDg/9o+XVb6aFonuDusMHqjP2qavjbfGTPX3xgTstrm4uGDSEYVV+woWPMKy3dzwd+JHcOQrdkgtyZpXJb87nJ8qqr68a7cKgIjB4DmadGNQjohs9i1C66Xqtvbx+EjIp10jaOMLBaPasDwRTGc5PyNJ1rb9EN5/jP7U17KaaZJvbpV6icI88z3+VG0vH8ipJJ8Ga8tIr22eCYZVh5g94pC1TTJtPmMU67yH4XxwYV0So54IriIxzRrIh7QwzSIyOTbWzlElkCcxtjwNedHeKMCVseDmnq72UgkJa1maL9LDeH81XvspfA9WSBh/sR6U9XD+zDQp+yTSNmR/MnJomG3SLiBlu80zQ7JXTH31xEg/Tlj6Vb2OzljaEO6meQc5OweVc8koOmUGjaFLfuss4MdsOOewv8v5p0ijSGNY41CoowAOQrbsr2p7t0zSWj//Z
