---
repo: huozhi/devjar
url: 'https://github.com/huozhi/devjar'
homepage: 'https://devjar.vercel.app'
starredAt: '2024-04-04T20:55:28Z'
createdAt: '2022-04-20T19:02:48Z'
updatedAt: '2025-02-24T00:45:24Z'
language: TypeScript
license: NA
branch: main
stars: 231
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:32.260Z'
description: nobuild react live code runtime in browser
tags:
  - bundless
  - esm
  - live-coding
  - livebundle
  - livecode
  - nobuild
  - playground
  - react
  - react-live-code
  - tailwindcss
---

# devjar
> live code runtime for your react project in browser


![image](https://repository-images.githubusercontent.com/483779830/55bf67ee-fcc6-4a12-ad0c-5221a5f78c26)

### Introduction

devjar is a library that enables you to live test and share your code snippets and examples with others. devjar will generate a live code editor where you can run your code snippets and view the results in real-time based on the provided code content of your React app. 

Notice: devjar only works for browser runtime at the moment. It will always render the default export component in `index.js` as the app entry.

### Install

```sh
pnpm add devjar
```


### Usage

#### `<DevJar>`

`DevJar` is a react component that allows you to develop and test your code directly in the browser, using a CDN to load your dependencies.

**Props**

* `files`: An object that specifies the files you want to include in your development environment.
* `getModuleUrl`: A function that maps module names to CDN URLs.
* `onError`: Callback function of error event from the iframe sandbox. By default `console.log`.


```jsx
import { DevJar } from 'devjar'

const CDN_HOST = 'https://esm.sh'

const files = {
  'index.js': `export default function App() { return 'hello world' }`
}

function App() {
  return (
    <DevJar
      files={files}
      getModuleUrl={(m) => {
        return `${CDN_HOST}/${m}`
      }}
    />
  )
}
```

#### `useLiveCode(options)`

**Parameters**

* `options`
  * `getModulePath(module)`: A function that receives the module name and returns the CDN url of each imported module path. For example, import React from 'react' will load React from skypack.dev/react.

**Returns**

* `state`
  * `ref`: A reference to the iframe element where the live coding will be executed.
  * `error`: An error message in case the live coding encounters an issue.
  * `load(codeFiles)`: void: Loads code files and executes them as live code.

```jsx
import { useLiveCode } from 'devjar'

function Playground() {
  const { ref, error, load } = useLiveCode({
    // The CDN url of each imported module path in your code
    // e.g. `import React from 'react'` will load react from skypack.dev/react
    getModulePath(modPath) {
      return `https://cdn.skypack.dev/${modPath}`
    }
  })

  // logging failures
  if (error) {
    console.error(error)
  }

  // load code files and execute them as live code
  function run() {
    load({
      // `index.js` is the entry of every project
      'index.js': `export default function App() { return 'hello world' }`,

      // other relative modules can be used in the live coding
      './mod': `export default function Mod() { return 'mod' }`,
    })
  }

  // Attach the ref to an iframe element for runtime of code execution
  return (
    <div>
      <button onClick={run}>run</button>
      <iframe ref={ref} />
    </div>
  )
}
```

### License

The MIT License (MIT).

