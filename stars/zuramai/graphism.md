---
repo: zuramai/graphism
url: 'https://github.com/zuramai/graphism'
homepage: 'https://zuramai.github.io/graphism'
starredAt: '2022-06-07T19:12:19Z'
createdAt: '2022-02-13T03:45:00Z'
updatedAt: '2024-06-06T03:44:15Z'
language: TypeScript
license: NA
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:43.919Z'
description: A tool to create graph visualization and run algorithms on top of it
tags:
  - algorithm
  - canvas
  - graph
  - graph-visualization
  - visualization
---

<p align="center">
    <img src="https://user-images.githubusercontent.com/45036724/172974810-4ba481f9-bd24-4128-99aa-ebfdd61cf19a.svg" alt="Graphism Logo" width="400" height="120" align="center">
</p>
<p align="center">
A tool to create graph visualization 
</p>
<p align="center">
    <a href="https://zuramai.github.io/graphism">Playground</a> • <a href="https://zuramai.github.io/graphism/docs">Documentation</a>
</p>

## Features

- Vanilla JavaScript - integrate into any framework you like
- Run algorithms on the graph (like Kruskal's algorithm, Dijkstra's algorithm, etc)
- Design your own graph
- Save graph in .png

## Install

```bash
npm i graphism
```

```html
<canvas id="canvas">
```

```js
import { createGraphism } from 'graphism'

const graphism = createGraphism({
    el: '#canvas',
    canvasBackground: '#eee'
})

// Generate an random graph
graphism.generateGraph()

```

## API
```ts
// Create new node and return the Node instance
createNode: (name: string, coordinate: Coordinate, config?: NodeConfig) => NodeInterface

// Clear selected
clearSelectedNode: () => void
clearSelectedLine: () => void

// Select a node
selectNode: (node: NodeInterface, mode: CanvasMode = "normal") => NodeInterface

// Connect two node
addNodeNeighbor: (from: NodeInterface, to: NodeInterface, distance: number) => void

// Generate random graph 
generateGraph: () => void

// Event listener
on: (event: string, callback: any, once: boolean = false) => void
```


## Events

### Event Usage

Example of event usage
```js
graphism.on("node:select", (node1: NodeInterface) => {
    console.log(`The node clicked contains value = ${node1.value}`)
})

// If you want the event only trigger once, add `true` to the third param
graphism.on("grab", () => {
    console.log("You are grabbing the canvas, this will only run once")
}, true)
```

### Event list

| Name | Param | Description |
| ---- | ----- | ----------- |
| mounted |  | Graphism is successfully mounted |
| grab | | User grabbing on the canvas |
| error | (message: string) | Triggered when error occured |
| canvas:click | (coordinate: Coordinate) | Canvas clicked by user |
| node:created | | New node created |
| node:move | (node: NodeInterface) | Node moved |
| node:mouseover | | The cursor is on the node | 
| node:mouseleave | | The cursor is going out from the node |
| node:select | | Node is selected |
| node:deselect | | Node is deselected |
| node:clearSelect |  | All nodes is deselected |
| node:connect | | Two nodes are connected |
| line:select | | Line is selected |
| line:deselect | | Line is deselected |
| line:clearSelect | | All lines is deselected |
| line:mouseover | | The cursor is on the line |

## License
MIT License	
