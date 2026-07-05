---
repo: mplewis/csvtomd-lib
url: 'https://github.com/mplewis/csvtomd-lib'
homepage: ''
starredAt: '2022-10-08T22:14:21Z'
createdAt: '2018-07-16T00:42:38Z'
updatedAt: '2024-01-29T16:19:42Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:26.090Z'
description: Generate Markdown tables from CSV data.
tags: []
---

# csvtomd-lib

Generate Markdown tables from CSV data.

# Usage

```js
import csvToMd from 'csvtomd-lib'

const csvString = `
Name,Position,Wanted
"Andromedus, Darrow au",Leader,Yes
"Augustus, Victoria au",Accomplice,Yes
`.trim()

const csvTable = [
  ['Name', 'Position', 'Wanted'],
  ['Andromedus, Darrow au', 'Leader', 'Yes'],
  ['Augustus, Victoria au', 'Accomplice', 'Yes']
]

// Both of these return the same Markdown table string
csvToMd.fromString(csvString)
csvToMd.fromTable(csvTable)
```

# Example Output

```
| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |
```

renders as:

| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |

# License

MIT
