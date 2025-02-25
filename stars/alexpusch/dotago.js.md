---
repo: alexpusch/dotago.js
url: 'https://github.com/alexpusch/dotago.js'
homepage: null
starredAt: '2020-06-23T22:38:18Z'
createdAt: '2020-06-20T12:16:49Z'
updatedAt: '2024-06-02T21:36:03Z'
language: JavaScript
license: MIT
branch: master
stars: 111
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:48.418Z'
description: >-
  Silly syntactic sugar for creating relative dates and time durations with
  Javascript
tags: []
---

dotago.js
==========

Silly syntactic sugar for creating relative dates and time durations with Javascript

Work with dates:
```js
// now: 2020-06-18T10:00:00Z
1..minute.ago.asDate // 2020-06-18T09:59:00Z
2..hours.ago.asDate // 2020-06-18T08:00:00Z
3..hours.fromNow.asDate // 2020-06-18T13:00:00Z
```

Work with timestamps: 
```js
// now: 2020-06-18T10:00:00Z
1..minute.ago // 1592474340000
1..hour.ago // 1592470800000
1..hour.fromNow // 1592478000000
```

Just get the duration in milliseconds:
```js
1..second // 1000
1..minute // 6000
1..hour // 3600000
```

Do math
```js
// now: 2020-06-18T10:00:00Z
(1..hour.ago + 2..minutes).asDate // 2020-06-18T09:02:00Z
```

How does it work? 
-----------------
Our beloved javascript allows us to run methods on primitive numbers. The thing is that `1.foo()` is parsed as an illegal Float number. 

`1.` translates into `1.0` and so `1..foo()` translates into `1.0.foo()` which is totally legal Javascript. 


Usage
-----
`npm i --save dotago`

```js
require('dotago').load();

console.log(2..hours.fromNow.asDate)
```

API
----
- load() - monkeypatch Number.prototype with dotago methods
- unload() - remove dotago methods from Number.prototype

We add the following getter methods to Number.prototype
- second/seconds
- minute/minutes
- hour/hours
- day/days
- week/weeks
- ago
- fromNow
- asDate
