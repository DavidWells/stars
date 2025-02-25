---
repo: bukinoshita/holiday
url: 'https://github.com/bukinoshita/holiday'
homepage: ''
starredAt: '2017-12-24T22:24:01Z'
createdAt: '2017-02-25T16:33:30Z'
updatedAt: '2019-10-07T16:25:03Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:33.383Z'
description: ':calendar: List of Federal Public Holidays in 2017'
tags:
  - holidays
  - javascript
  - nodejs
---

# holiday [![Build Status](https://travis-ci.org/bukinoshita/holiday.svg?branch=master)](https://travis-ci.org/bukinoshita/holiday)

> List of Federal Public Holidays in 2017


## Install

```bash
$ yarn add holiday
```


## Usage

```js
const holiday = require('holiday')

// today: 1/1/2017

await holiday()
// => New Years Day
```

## API

### holiday([options])

#### options

Type: `object`<br/>

##### country

Type: `string`<br/>
Default: `us`<br/>
Options: `us` and `br`

Country holiday

##### range

Type: `string`<br/>
Default: `day`<br/>
Options: `day` || `month` || `year`


## Related

- [is-holiday](https://github.com/bukinoshita/is-holiday) — Get todays Federal Public Holidays


## License
MIT © [Bu Kinoshita](https://bukinoshita.io)
