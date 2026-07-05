---
repo: MikeDombo/graphPlayground
url: 'https://github.com/MikeDombo/graphPlayground'
homepage: 'https://MikeDombo.github.io/graphPlayground/'
starredAt: '2021-10-23T00:37:09Z'
createdAt: '2017-11-20T04:02:18Z'
updatedAt: '2025-02-01T13:33:43Z'
language: TypeScript
license: BSD-3-Clause
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:42.148Z'
description: A single-page web app to build graphs and run algorithms against them
tags:
  - graph
  - graph-coloring
  - progressive-web-app
  - single-page-app
  - visjs
---

# Graph Algorithm Playground
A single-page webapp to build graphs and run algorithms on them with no server-side components.

Use it on my [GitHub Pages](https://MikeDombo.github.io/graphPlayground/)

[![pipeline status](https://git.home.mikedombrowski.com/michael/graphPlayground/badges/master/pipeline.svg)](https://git.home.mikedombrowski.com/michael/graphPlayground/commits/master)
[![coverage report](https://git.home.mikedombrowski.com/michael/graphPlayground/badges/master/coverage.svg)](https://git.home.mikedombrowski.com/michael/graphPlayground/commits/master)

## [Usage](documentation/Usage.md)

## Supported Graph Types
- Undirected Unweighted - Just a regular graph
- Directed Unweighted - A digraph (directed graph) with unweighted edges
- Undirected Weighted - A graph with edge weights
- Directed Weighted - A digraph with weighted edges

## Supported Algorithms By Graph Type
### Undirected Unweighted
- Graph Coloring
- Eulericity
- Connected Components
- Breadth-First Shortest Path
- Dijkstra Shortest Path
- Cyclic **Not Yet Implemented**

### Directed Unweighted
- Eulericity
- Strongly Connected Components
- Dijkstra Shortest Path
- Cyclic
- Topological Sort

### Undirected Weighted
- Graph Coloring
- Eulericity
- Connected Components
- Breadth-First Shortest Path
- Dijkstra Shortest Path
- Kruskal MST
- Cyclic **Not Yet Implemented**

### Directed Weighted
- Eulericity
- Strongly Connected Components
- Dijkstra Shortest Path
- Bellman-Ford Shortest Path
- Ford-Fulkerson MinCut-MaxFlow
- Cyclic
- Topological Sort

## Features
### Builtin Graphs
- Petersen Graph
- Konigsberg Bridges Graph
- Configurable Complete Graph
- Configurable Hypergraph
- Custom Graphs

### Editing
- Graphically Add/Edit/Delete Vertices and Edges
    - Also can use DELETE key to delete selected edges and vertices
- Undo/Redo Change History
    - Also can use CTRL+Z and CTRL+Y or CTRL+SHIFT+Z for Undo/Redo

### Many Algorithms - [Enumerated Above](#supported-algorithms-by-graph-type)

### Multiple Graph Types - [Enumerated Above](#supported-graph-types)
