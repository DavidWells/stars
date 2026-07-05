---
repo: mafintosh/trace-console-log
url: 'https://github.com/mafintosh/trace-console-log'
homepage: null
starredAt: '2019-10-20T03:50:40Z'
createdAt: '2019-10-16T08:30:11Z'
updatedAt: '2024-09-12T18:49:18Z'
language: JavaScript
license: MIT
branch: master
stars: 68
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:15.155Z'
description: Have a stray console.log but too lazy to find it?
tags: []
---

# trace-console-log

Have a stray console.log but too lazy to find it?

trace-console-log is here to help

```
npm install trace-console-log
```

## Usage

Simply require it and it will prefix any console.log/error with the
file and line it was printed from.

``` js
node -r trace-console-log my-program.js
```

For example assuming the following is called app.js

``` js
console.log('hi!')
```

Running this with `-r trace-console-log` prints

```
app.js:1 - hi!
```

Easy!

## License

MIT
