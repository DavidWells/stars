---
repo: mholt/PapaParse
url: 'https://github.com/mholt/PapaParse'
homepage: 'http://PapaParse.com'
starredAt: '2019-10-07T00:41:27Z'
createdAt: '2013-10-07T20:33:21Z'
updatedAt: '2025-02-25T15:33:54Z'
language: JavaScript
license: MIT
branch: master
stars: 12778
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:16.266Z'
description: >-
  Fast and powerful CSV (delimited text) parser that gracefully handles large
  files and malformed input
tags:
  - csv
  - csv-parser
  - javascript
---

Parse CSV with JavaScript
========================================

Papa Parse is the fastest in-browser CSV (or delimited text) parser for JavaScript. It is reliable and correct according to [RFC 4180](https://tools.ietf.org/html/rfc4180), and it comes with these features:

- Easy to use
- Parse CSV files directly (local or over the network)
- Fast mode
- Stream large files (even via HTTP)
- Reverse parsing (converts JSON to CSV)
- Auto-detect delimiter
- Worker threads to keep your web page reactive
- Header row support
- Pause, resume, abort
- Can convert numbers and booleans to their types
- Optional jQuery integration to get files from `<input type="file">` elements
- One of the only parsers that correctly handles line-breaks and quotations

Papa Parse has **no dependencies** - not even jQuery.

Install
-------

papaparse is available on [npm](https://www.npmjs.com/package/papaparse). It
can be installed with the following command:
```shell
npm install papaparse
```

If you don't want to use npm, [papaparse.min.js](https://unpkg.com/papaparse@latest/papaparse.min.js) can be downloaded to your project source.

Usage
-----
```js
import Papa from 'papaparse';

Papa.parse(file, config);
    
const csv = Papa.unparse(data[, config]);
```

Homepage & Demo
----------------

- [Homepage](http://papaparse.com)
- [Demo](http://papaparse.com/demo)

To learn how to use Papa Parse:

- [Documentation](http://papaparse.com/docs)

The website is hosted on [Github Pages](https://pages.github.com/). Its content is also included in the docs folder of this repository. If you want to contribute on it just clone the master of this repository and open a pull request.


Papa Parse for Node
--------------------

Papa Parse can parse a [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) instead of a [File](https://www.w3.org/TR/FileAPI/) when used in Node.js environments (in addition to plain strings). In this mode, `encoding` must, if specified, be a Node-supported character encoding. The `Papa.LocalChunkSize`, `Papa.RemoteChunkSize` , `download`, `withCredentials` and `worker` config options are unavailable.

Papa Parse can also parse in a node streaming style which makes `.pipe` available.  Simply pipe the [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) to the stream returned from `Papa.parse(Papa.NODE_STREAM_INPUT, options)`.  The `Papa.LocalChunkSize`, `Papa.RemoteChunkSize` , `download`, `withCredentials`, `worker`, `step`, and `complete` config options are unavailable.  To register a callback with the stream to process data, use the `data` event like so: `stream.on('data', callback)` and to signal the end of stream, use the 'end' event like so: `stream.on('end', callback)`.

Get Started
-----------

For usage instructions, see the [homepage](http://papaparse.com) and, for more detail, the [documentation](http://papaparse.com/docs).

Tests
-----

Papa Parse is under test. Download this repository, run `npm install`, then `npm test` to run the tests.

Contributing
------------

To discuss a new feature or ask a question, open an issue. To fix a bug, submit a pull request to be credited with the [contributors](https://github.com/mholt/PapaParse/graphs/contributors)! Remember, a pull request, *with test*, is best. You may also discuss on Twitter with [#PapaParse](https://twitter.com/search?q=%23PapaParse&src=typd&f=realtime) or directly to me, [@mholt6](https://twitter.com/mholt6).

If you contribute a patch, ensure the tests suite is running correctly. We run continuous integration on each pull request and will not accept a patch that breaks the tests.
