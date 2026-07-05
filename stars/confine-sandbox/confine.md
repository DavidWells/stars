---
repo: confine-sandbox/confine
url: 'https://github.com/confine-sandbox/confine'
homepage: ''
starredAt: '2021-12-21T00:24:59Z'
createdAt: '2021-12-02T02:05:51Z'
updatedAt: '2023-06-29T15:56:39Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:26.027Z'
description: A NodeJS framework for creating sandboxed runtimes for untrusted code.
tags: []
---

# Confine: a secure sandboxing framework

*Work in progress*

A NodeJS framework for creating sandboxed runtimes for untrusted code. Uses OS process isolation (supported: [macos](./docs/macos.md), [linux](./docs/linux.md)) along with a pluggable runtime.

All runtimes are a subclass of [abstract-confine-runtime](https://npm.im/abstract-confine-runtime). Current runtimes include:

- [jseval-confine-runtime](https://github.com/confine-sandbox/jseval-confine-runtime) Runs javascript with no additional sandboxing.
- [jsisolate-confine-runtime](https://github.com/confine-sandbox/jsisolate-confine-runtime) Runs javascript in an isolate using [isolated-vm](https://github.com/laverdet/isolated-vm).

```
npm i confine-sandbox
```

Usage example:

```js
import { Sandbox } from 'confine-sandbox'

const sbx = new Sandbox({
  runtime: 'jseval-confine-runtime', // the name of the runtime module; must conform to abstract-confine-runtime
  nodeModulesPath: path.join(__dirname, 'node_modules'), // the path to your project's node_modules
  strace: false, // print an strace of the execution?
  logSpawn: false, // log the spawn() call parameters?
  noSandbox: false, // disable the process-level isolation?
  pipeStdout: false, // pipe the spawned process's stdout to the parent stdout?
  pipeStderr: false, // pipe the spawned process's stderr to the parent stderr?
  globals: {
    // ... methods that should be injected into the global context
  }
})
const {cid} = await sbx.execContainer({
  source: 'module.exports.addOne = (num) => num + 1',
  sourcePath: '/path/to/source/file.js',
  // ...any other opts specific to the runtime
})
await sbx.configContainer({cid, opts: {/*...*/}})
const res = await sbx.handleAPICall(cid, 'addOne', [5]) // => 6
```

## Process isolation

Allowed access to the host environment will be tuned as the runtime environment is developed and the threats are identified. Please file issues with any concerns.

Notes:

- On MacOS, it's not currently possible to stop a readdir() on the cwd. No subsequent files can be read.

## API

```typescript
import { EventEmitter } from 'events'
import { Server } from 'net'
import { ChildProcess } from 'child_process'

export declare interface SandboxConstructorOpts {
  runtime?: string
  globals?: any
  strace?: boolean
  logSpawn?: boolean
  noSandbox?: boolean
  pipeStdout?: boolean
  pipeStderr?: boolean
}

export declare interface SandboxExecContainerOpts {
  source?: string
  sourcePath?: string
}

export declare interface ConfineContainer {
  cid: number
  opts?: any
}

export type ConfineIPC = any

export declare class Sandbox extends EventEmitter {
  opts: SandboxConstructorOpts
  guestProcess?: ChildProcess
  ipcServer?: Server
  ipcServerPort?: number
  ipcClientPort?: number
  ipc?: ConfineIPC
  whenGuestProcessClosed: Promise<number>
  globalsMap: Map<string, Function>

  constructor (opts: SandboxConstructorOpts)
  get guestExitCode (): number
  get guestExitSignal (): string
  get isGuestProcessActive (): boolean
  get runtimePath (): string
  init (): Promise<void>
  teardown (): Promise<number>
  listContainers (): Promise<ConfineContainer[]>
  execContainer (opts: SandboxExecContainerOpts|any): Promise<ConfineContainer>
  killContainer (container: ConfineContainer): Promise<void>
  handleAPICall (cid: number, methodName: string, params: any[]): Promise<any>
}
```
