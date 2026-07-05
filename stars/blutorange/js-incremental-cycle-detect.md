---
repo: blutorange/js-incremental-cycle-detect
url: 'https://github.com/blutorange/js-incremental-cycle-detect'
homepage: null
starredAt: '2022-10-22T18:24:53Z'
createdAt: '2018-05-24T23:36:32Z'
updatedAt: '2023-05-27T14:00:41Z'
language: TypeScript
license: Unlicense
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:18.488Z'
description: >-
  Keeps a directed acyclic graph topologically sorted each time you add an edge
  or vertex.
tags: []
---

Lets you add edges to a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) and be told whether this edge
introduces a [cycle](https://en.wikipedia.org/wiki/Cycle_(graph_theory)). If it would, it is not added. Useful when trying to build
an acyclic graph.

Based on [the paper](https://dl.acm.org/citation.cfm?id=1210590):

```text
A Dynamic Topological Sort Algorithm for Directed Acyclic Graphs
   DAVID J. PEARCE / PAUL H. J. KELLY
   Journal of Experimental Algorithmics (JEA)
   Volume 11, 2006, Article No. 1.7
   ACM New York, NY, USA
```

# Documentation

[See here for documentation](https://blutorange.github.io/js-incremental-cycle-detect/)

# Install

The [drill](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install --save incremental-cycle-detect
```

Typings for [Typescript](https://www.typescriptlang.org/) are available (this is written in typescript).

Use the `dist.js` or `dist.min.js` for [browser usage](http://browserify.org/) if you must.

Exposes a [global object](https://softwareengineering.stackexchange.com/questions/277279/why-are-globals-bad-in-javascript) `window.IncrementalCycleDetect` with the same methods you can when importing this lib:

```javascript
import * as IncrementalCycleDetect from "incremental-cycle-detect";
```

# Usage

The main purpose of this library is to add edges to a directed acyclic graph and be told when
that makes the graph cyclic.

```javascript
const { GenericGraphAdapter } = require("incremental-cycle-detect");
const graph = GenericGraphAdapter.create();
graph.addEdge(0, 1) // => true
graph.addEdge(1, 2) // => true
graph.addEdge(2, 3) // => true
graph.addEdge(3, 0) // => false because this edge introduces a cycle
// The edge (3,0) was not added.

graph.deleteEdge(2, 3);
graph.addEdge(3, 0) // => true, no cycle because we deleted edge (2,3)
```

The main algorithm is implemented by `CycleDetectorImpl`. To allow for this lib to work with different
graph data structures, its methods take a `GraphAdapter` object for accessing the graph. You must
called it every time an edge is added or removed, see the [docs for GraphAdapter](https://blutorange.github.io/js-incremental-cycle-detect/interfaces/graphadapter.html) for more details.

For convenience this library also provide a few graph data structures that ready to be used.
The following all implement the methods from [CommonAdapter](https://blutorange.github.io/js-incremental-cycle-detect/interfaces/commonadapter.html):

- [GenericGraphAdapter](https://blutorange.github.io/js-incremental-cycle-detect/classes/genericgraphadapter.html): Uses `Map`s to associate data with a vertex, allowing any type of vertex. In the above example, you could use strings, booleans, objects etc. instead of numbers. Seems to perform pretty well.
- [MultiGraphAdapter](https://blutorange.github.io/js-incremental-cycle-detect/classes/multigraphadapter.html) Similar to `GenericGraphAdapter`, but allows for multiple edges between two vertices. Edges are identified by an additional label.
- [GraphlibAdapter](https://blutorange.github.io/js-incremental-cycle-detect/classes/graphlibadapter.html): For the npm module [graphlib](https://www.npmjs.com/package/graphlib). Vertices are strings. Does not support multigraphs currently.

Example for using the GraphlibAdapter:

```javascript
const { Graph } = require("graphlib");
const graph = GraphlibAdapter.create({graphlib: Graph});
graph.addEdge(0, 1) // => true
```

You can add vertices explicitly, but it is not required. They are added if they do not exist.

See the documentation linked above for all methods available.

# Performance

Incremental cycle detection performs better than checking for cycles from scratch every time you add an edge.
Tests done with [benchmark](https://www.npmjs.com/package/benchmark). Compared with running a full topological
sort with `graphlib` (via `alg.isAcyclic(graph)`) each time a vertex is added. Measured time is the time that
was needed for creating a new graph and adding `n` vertices, checking for a cycle after each edge insertion.

> **incremental-cycle-detection**(insert 15000, RandomSource) x **38.21** ops/sec ±1.78% (47 runs sampled)
>
> **incremental-cycle-detection-multi**(insert 15000, RandomSource) x **31.58** ops/sec ±2.77% (52 runs sampled)
>
> **graphlib**(insert15000, RandomSource) x **0.19** ops/sec ±1.83% (5 runs sampled)

(node v8.9.4, graph with 200 vertices, 15000 random -- same for each algorithm -- edges added)

Also, even inserting into graphlib without checking for cycles seems to be slower:

> **graphlib-no-cycle-check** (insert 15000, RandomSource) x **21.59** ops/sec ±6.63% (37 runs sampled)

# JavaScript environment

Some parts need `Map`. You can either

- use this lib in an enviroment that [supports these](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [polyfill](https://en.wikipedia.org/wiki/Polyfill_%28programming%29) [Map](https://www.npmjs.com/package/core-js)
- pass an implementation of `Map` to the constructor of the graph adapter. This way you don't have to [monkey patch](https://stackoverflow.com/questions/5741877/is-monkey-patching-really-that-bad):

```javascript
import * as Map from "core-js/es6/map";
const graph = GenericGraphAdapter.create({mapConstructor: Map}):
```

# Use your own graph data structure

As mentioned above, You can also use the CycleDetector (implemented by `PearceKellyDetector`) directly and
roll your own graph data structure. See the [docs](https://blutorange.github.io/js-incremental-cycle-detect/classes/pearcekellydetector.html).

Essentially, you need to call the `CycleDetector` every time you add modify the graph. Then it tells you
whether adding an edge is allowed. You can also use an existing `GraphAdapter` (see above) as the starting point.

# Build

May not to work on [Windows](https://xkcd.com/196/).

```sh
git clone https://github.com/blutorange/js-incremental-cycle-detect
cd js-incremental-cycle-detection
npm install
npm run build
```

# Test

```sh
git clone https://github.com/blutorange/js-incremental-cycle-detect
cd js-incremental-cycle-detection
npm install
npm run test
```

# Change log

I use the following keywords:

- `Added` A new feature that is backwards-compatible.
- `Changed` A change that is not backwards-compatible.
- `Fixed` A bug or error that was fixed.

From newest to oldest:

# 0.4.0
- Fixed bug with `MultiGraphAdapter`: `#getLabelledEdge()` updated incorrectly.
- Added an additional method `#contractLabeledEdge`, While `#contractEdge` contract all edges (irrespective of their label) between two vertices, `#contractEdge` contracts just one particular edge with a specific label. Note that since cycle are forbidden, a certain labeled edge between two vertices can only be contracted if it is the only edge between those two vertices. `#contractLabeled` refuses two contract in such a case, while `#contractVertices` contract all edges. You can check with `#canContractEdge` and `#canContractLabeledEdge`.
- Removed deprecated `MultiGraphAdapter#addLabeledEdge(from: TVertex, to: TVertex, label?: TEdgeLabel, data?: TEdgeData): boolean`

# 0.3.0
- Added `Algorithm#findWeaklyConnectedComponents`.
- Added a `getEdgesWithData`, `getEdgesWithDataFrom`, `getEdgesWithDataTo` method when both the edge and its data are needed.
- Added a `clone` and `map` method for creating a copy of a graph.
- Changed the graph adapter implementations so that instances are now created with the factory method `create` instead of the constructor. This was necessary for the `clone` method.

# 0.2.2
- Added two methods for accessing edge data of incoming / outgoing edges: `getEdgeDataFrom`, `getEdgeDataTo`
- Added a method for checking whether an edge can be added: `canAddEdge`.

# 0.2.1
- Fixed typings for typescript.

# 0.2.0
- Added the method `getOrder` to the graph adapters. It allows you to access the topological order of each vertex.
- Added a `MultiGraphAdapter` data structure that allows for multiple edges between two vertices.
- Changed `GenericGraphAdapter`, it now only allows for one kind of edge data to be compatible with the `CommonAdapter` interface. You can use objects if you need to store more data.
- Added more test cases for the `MultiGraphAdapter` and fixed some bugs, updated dependencies.

# 0.1.1
- 0.1.1 Fixed package.json and dependencies (was missing tslib).

# 0.1.0
- 0.1.0 Initial version.
