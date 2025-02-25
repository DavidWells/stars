---
repo: noahsug/updatable-log
url: 'https://github.com/noahsug/updatable-log'
homepage: null
starredAt: '2022-10-17T01:39:47Z'
createdAt: '2018-10-15T23:38:33Z'
updatedAt: '2022-10-17T01:39:47Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:21.261Z'
description: pretty logger with the ability to update lines in place
tags: []
---

# updatable-log
> pretty logger with the ability to update lines in place

## Example
```js
const log = require('updatable-log');
const chalk = require('chalk');
const delay = require('delay');

async function exampleApp({ quiet }) {
  // ignore everything except log.important() and log.error()
  log.quiet = quiet;

  log.info(chalk.green('E X A M P L E - A P P'));
  log.info('v1.2.0');

  for (let page = 0; page < 40; page++) {
    await fetchData(page);
  }

  log.clear();
  console.log('call log.clear() before printing with the built-in console.log()');

  try {
    printResult();
  } catch (e) {
    log.error(e);
  }
}

async function fetchData(page) {
  log.update('fetching data from:', `http://get-data.com?page=${page}`);
  await delay(100);

  if (page === 10) {
    log.warn('invalid data, skipping page', page);
  }
}

function printResult() {
  log.important(
    JSON.stringify(
      {
        age: 6,
        name: 'Ender Wiggin',
      },
      null,
      2
    )
  );

  this.willThrow.a.null.pointer.exception();
}

```

To run this example yourself:
```
git clone https://github.com/noahsug/updatable-log.git
cd updatable-log
npm i
npm run example
```
