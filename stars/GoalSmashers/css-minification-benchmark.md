---
repo: GoalSmashers/css-minification-benchmark
url: 'https://github.com/GoalSmashers/css-minification-benchmark'
homepage: 'https://goalsmashers.github.io/css-minification-benchmark/'
starredAt: '2015-01-26T06:09:53Z'
createdAt: '2013-11-04T11:57:34Z'
updatedAt: '2024-12-12T05:11:34Z'
language: CSS
license: MIT
branch: master
stars: 337
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:53.729Z'
description: A comparison of CSS minifiers for node.js
tags: []
---

[![Build Status](https://github.com/GoalSmashers/css-minification-benchmark/workflows/CI/badge.svg)](https://github.com/GoalSmashers/css-minification-benchmark/actions?workflow=CI)

## What is css-minification-benchmark?

A comparison of CSS minification engines.

## FAQ

### Which engines are covered?

* [clean-css](https://github.com/GoalSmashers/clean-css)
* [cssnano](https://github.com/ben-eb/cssnano)
* [csso](https://github.com/css/csso)
* [esbuild](https://github.com/evanw/esbuild)

### How can I see the results?

Clone the repository, install the dependencies with `npm install` and then run `node ./bin/bench.js`. That's it!

If you prefer to see results without cloning the repo here are [the most recent ones](https://goalsmashers.github.io/css-minification-benchmark/).

### How can I generate the html report?

Just run `node ./bin/bench.js --html > report.html`

### How can I test my CSS file?

Just copy your file to the `data` directory (make sure the filename ends with `.css`) and re-run the benchmark.

### How can I add a new minifier to the list?

* add it to `package.json` as a `devDependency`
* run `npm install`
* require it in `lib/minify.js` and add it to `minifiers` hash
* run `npm run bench`
* add it to this file in "Which engines are covered?" section above
* send a PR (if you wish to have it included)

### How can I compare a subset of minifiers?

Just run `node ./bin/bench.js --only csso,cssnano` (it's turned into `/.*(csso|cssnano).*/` regex)

### Can I get the compressed gzip size as well?

Run `node ./bin/bench.js --gzip` to measure the gzip size instead of the regular file size.

## License

css-minification-benchmark is released under the [MIT License](https://github.com/GoalSmashers/css-minification-benchmark/blob/master/LICENSE).
