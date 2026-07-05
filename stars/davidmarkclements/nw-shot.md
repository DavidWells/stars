---
repo: davidmarkclements/nw-shot
url: 'https://github.com/davidmarkclements/nw-shot'
homepage: null
starredAt: '2015-03-13T00:04:15Z'
createdAt: '2015-02-18T23:57:11Z'
updatedAt: '2021-06-14T02:52:09Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:49.229Z'
description: Create screenshots using nw.js
tags: []
---

nw-shot
---
> Create screenshots using [nw.js](https://github.com/nwjs/nw.js)

## Install

```shell
npm install nw-shot
```


## Usage

```js
var fs = require('fs');
var screenshot = require('nw-shot');

screenshot({
  url : 'http://google.com',
  width : 1024,
  height : 768
}).pipe(fs.createWriteStream('./out.png'));
```

#### screenshot(options)

##### delay

Type: `number` *(milliseconds)*
Default: `0`

Delay between page load and first snapshot, set

##### evalDelay
Type: `number` *(milliseconds)*
Default: `0`

Delay between last eval and next snapshot


##### format

Type: `string` png|jpeg
Default: `png`

Specify the image type fot he screenshot

##### width

Type: `int`
Default: `0`

Specify the with of the browser window

##### height

Type: `int`
Default: `0`

Specify the height of the browser window


##### eval

Type: `string`|`array<string>`
Default: `undefined`

Evaluate JavaScript in browser window context, if supplied
as an array of strings, each string will be evaluated and 
a shot will be taken after each evaluation. The result will
stream images seperated by new lines. 

Protip: use the [`line-stream`](http://npmjs.org/line-stream) 
module to group image data into a single buffer that can
be streamed in one go.

##### encoding

Type: `string`  base64|binary
Default: 'binary'

##### app

Type: `string` 
Default: 'nw-shot/nw-screeshot'

The path to the NW.js app responsible for capturing screen shots,
this allows for ultimate control, see the `nw-screenshot` folder 
for an example/boilerplate.

##### nwPath

Type: `string`|`function`
Default: [OS dependent - as returned by `nw.findPath`]

The path to the NW.js binary. As a string nwPath simply holds the
path, as a function it must return a string with the path, the function will receive the nw.findPath value which can be
mutated and returned accordingly. 

## Troubleshooting

If you like to use this on travis or with a framebuffer like xvfb than you need to set the environment variable
`NODESCREENSHOT_SHOW` to `1`. (`export NWSHOT_SHOW`).
See this [`.travis.yml`](https://github.com/FWeinb/node-webkit-screenshot/blob/master/.travis.yml) for more information



