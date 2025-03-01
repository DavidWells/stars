---
repo: rsms/graphviz
url: 'https://github.com/rsms/graphviz'
homepage: 'https://rsms.me/graphviz/'
starredAt: '2019-11-06T01:07:19Z'
createdAt: '2019-10-31T22:17:32Z'
updatedAt: '2025-02-19T14:22:25Z'
language: JavaScript
license: MIT
branch: master
stars: 124
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:14.173Z'
description: Graphviz web app
tags: []
---

# Graphviz in the browser

Provides a very small JS library

- Exposes a global variable `graphvis`
- Very fast
- Runs graphviz compiled as WebAssembly in a background Worker thread
- Timeouts for preventing run-away "huge graph" computations


## Usage

```html
<head>
  <meta charset="utf-8">
  <script src="https://rsms.me/graphviz/graphviz.js"></script>
</head>
<body>
<script>
graphviz.layout(`
digraph {
  Hello -> World
  Hej -> Hello
  Värld -> World -> Hej
}
`).then(svg => {
  document.body.innerHTML = svg
})
</script>
</body>
```

## API

```ts
namespace graphviz {
  // Version string of this library (e.g. "1.2.3")
  export const version :string

  // Error raised on timeout
  export const TimeoutError :Error

  // layout performs Graphviz layout
  export function layout(
    source   :string,  // dot source code
    format?  :Format,  // Output format. Defaults to "svg"
    engine?  :Engine,  // Default engine type. Defaults to "dot"
    timeout? :number,  // Optional timeout in milliseconds
  ) :Promise<string>

  // Output formats
  export type Format = "dot"
                     | "json"
                     | "json0"
                     | "plain"
                     | "plain-ext"
                     | "ps"
                     | "ps2"
                     | "svg"
                     | "xdot"

  // Layout engine types
  export type Engine = "circo"  // for circular layout of graphs
                     | "dot"    // for drawing directed graphs
                     | "fdp"    // for drawing undirected graphs
                     | "neato"  // for drawing undirected graphs
                     | "osage"  // for drawing large undirected graphs
                     | "twopi"  // for radial layouts of graphs
}
```


## Notes

This is essentially a wrapper around [viz.js](https://github.com/mdaines/viz.js).

See [Graphviz documentation here](https://www.graphviz.org/doc/info/attrs.html)
