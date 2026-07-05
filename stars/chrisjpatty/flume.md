---
repo: chrisjpatty/flume
url: 'https://github.com/chrisjpatty/flume'
homepage: 'https://flume.dev'
starredAt: '2020-09-10T01:34:35Z'
createdAt: '2020-03-01T07:46:21Z'
updatedAt: '2025-02-19T07:43:57Z'
language: TypeScript
license: MIT
branch: master
stars: 1498
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:35.205Z'
description: >-
  Extract logic from your apps with a user-friendly node editor powered by
  React.
tags:
  - flume
  - javascript
  - node
  - react
---

![](https://raw.githubusercontent.com/chrisjpatty/flume/master/logo.png?token=ADRZXI4TFKM3FXBEBQHQURK6QIJ6Q)

[![NPM](https://img.shields.io/npm/v/flume.svg)](https://www.npmjs.com/package/flume) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Minzip Size](https://badgen.net/bundlephobia/minzip/flume)](https://bundlephobia.com/result?p=flume)

# Flume

## Guides & Examples

[flume.dev](https://flume.dev)

## Install

```bash
npm install --save flume
```

## Usage

### Defining your nodes

Import `FlumeConfig` and use it to define the nodes and ports that will make up your node editor.

```jsx
import { FlumeConfig, Controls, Colors } from "flume";

const flumeConfig = new FlumeConfig()

flumeConfig
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({
        name: "num",
        label: "Number"
      })
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 150,
    inputs: ports => [
      ports.number()
    ],
    outputs: ports => [
      ports.number()
    ]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({name: "num1"}),
      ports.number({name: "num2"})
    ],
    outputs: ports => [
      ports.number({name: "result"})
    ]
  })
```

### Rendering the node editor

To render the node editor, import `NodeEditor` and pass it your nodeTypes and portTypes from the configuration you created.

```jsx
import React from 'react'
import { NodeEditor } from 'flume'
import config from './config'

const App = () => {

  return (
    <div style={{width: 600, height: 800}}> // Give the wrapper a width & height
      <NodeEditor
        nodeTypes={config.nodeTypes}
        portTypes={config.portTypes}
      />
    </div>
  )
}
```

For more complete documentation visit: [flume.dev](https://flume.dev)

## License

MIT © [chrisjpatty](https://github.com/chrisjpatty)
