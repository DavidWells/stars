---
repo: heapwolf/timeseries-from-gitlog
url: 'https://github.com/heapwolf/timeseries-from-gitlog'
homepage: null
starredAt: '2022-10-25T00:16:30Z'
createdAt: '2018-06-07T15:02:40Z'
updatedAt: '2022-10-25T00:16:30Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:17.043Z'
description: Represent the git log as time-series data in JSON
tags: []
---

# SYNOPSIS
Represent the git log as time-series data (JSON).

## EXAMPLE
Git log can be formatted, we can also add some stats about each commit,
for example, running `git log --format=%cI%n%s --shortstat` will give you...

```
2018-06-07T16:44:26+02:00
add readme

 2 files changed, 93 insertions(+), 5 deletions(-)
2018-06-04T19:18:13+02:00
parse

 1 file changed, 8 insertions(+), 1 deletion(-)
2018-06-04T19:13:48+02:00
first

 1 file changed, 3 insertions(+)
```

This is pretty easy to parse, and we end up with something like this...

```js
[ { date: '2018-06-07T16:44:26+02:00',
    subject: 'add readme',
    impact: { files: 2, insertions: 93, deletions: 5 } },
  { date: '2018-06-04T19:18:13+02:00',
    subject: 'parse',
    impact: { files: 1, insertions: 8, deletions: 1 } },
  { date: '2018-06-04T19:13:48+02:00',
    subject: 'first',
    impact: { files: 1, insertions: 3, deletions: 0 } } ]
```

# USAGE
All options are optional.

```js
const ts = require('timeseries-from-gitlog')

const data = ts({
  cwd: '', // current working directory to execute git in
  limit: 1 // limit the number of logs that are parsed
  skip // how many logs to skip when starting
  mine: true, // only show commits from the current user
  reverse: true, // start from the beginning
  dateOnly: true, // gets '2018-06-04' instead of '2018-06-04T19:13:48+02:00'
  since: '1 year ago' // relative time, see git docs for more info
})

console.log(data)
```
