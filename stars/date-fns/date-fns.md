---
repo: date-fns/date-fns
url: 'https://github.com/date-fns/date-fns'
homepage: 'https://date-fns.org'
starredAt: '2017-01-19T19:48:54Z'
createdAt: '2014-10-06T10:24:22Z'
updatedAt: '2025-02-25T19:38:00Z'
language: TypeScript
license: MIT
branch: main
stars: 35352
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:48.888Z'
description: ⏳ Modern JavaScript date utility library ⌛️
tags:
  - date
  - date-fns
  - hacktoberfest
  - javascript
  - modules
  - nodejs
  - time
  - utilities
---

🔥️ **NEW**: [date-fns v4.0 with first-class time zone support is out!](https://blog.date-fns.org/v40-with-time-zone-support/)

<img alt="date-fns" title="date-fns" src="https://raw.githubusercontent.com/date-fns/date-fns/master/docs/logotype.svg" width="150" />

date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js

👉 [Documentation](https://date-fns.org/)

👉 [Blog](https://blog.date-fns.org/)

<hr>

It's like [Lodash](https://lodash.com) for dates

- It has [**200+ functions** for all occasions](https://date-fns.org/docs/Getting-Started/).
- **Modular**: Pick what you need. Works with webpack, Browserify, or Rollup and also supports tree-shaking.
- **Native dates**: Uses existing native type. It doesn't extend core objects for safety's sake.
- **Immutable & Pure**: Built using pure functions and always returns a new date instance.
- **TypeScript**: The library is 100% TypeScript with brand-new handcrafted types.
- **I18n**: Dozens of locales. Include only what you need.
- [and many more benefits](https://date-fns.org/)

```js
import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]
```

The library is available as an [npm package](https://www.npmjs.com/package/date-fns).
To install the package run:

```bash
npm install date-fns --save
```

## Docs

[See date-fns.org](https://date-fns.org/) for more details, API,
and other docs.

<br />

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
