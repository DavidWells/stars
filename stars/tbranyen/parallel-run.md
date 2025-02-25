---
repo: tbranyen/parallel-run
url: 'https://github.com/tbranyen/parallel-run'
homepage: null
starredAt: '2023-02-14T18:44:07Z'
createdAt: '2017-04-26T21:11:44Z'
updatedAt: '2023-03-04T17:46:43Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:56.188Z'
description: Run npm scripts multiplexed
tags: []
---

Parallel Run
------------

Parses a project's package.json and executes npm scripts identically to `npm
run`. The benefit this module brings is that you can pass multiple scripts,
while npm is limited to a single script. These scripts will execute in
separate child processes.

This module operates in two phases. First it locates and parses the project's
`package.json` file to get a list of scripts. The second phase is parsing the
command line arguments for tasks to run along with additional arguments like
port forwarding and more.

### Installation

``` sh
npm install parallel-run
```

```sh
yarn add --dev parallel-run
```

*Note:* This module is temporarily pinned to an old version of React "0.14.0"
since the underlying CLI renderer integration "react-blessed" has not yet been
updated to React 15.x. This shouldn't affect your usage of this module in any
way.

### How to Use

Command line format: `parallel-run scriptNameOne scriptNameTwo ...`

This module exports a binary that gets linked into your project's npm `PATH`.
Unless you have modiufied your shell environment to source binaries direction
from `node_modules/.bin` you will need to execute this module exclusively
through the `npm run` cli.

Minimal project implementation:


``` json
{
  "name": "some-project",
  "scripts": {
    "watch": "parallel-run lint test",
    "lint": "eslint -w",
    "test": "mocha -w"
  }
}
```

### Keyboard shortcuts

The following keyboard shortcuts are available:

- Down / J - Move window selection down
- Up / K - Move window selection up
- CTRL + R - Refreshes the process by terminating and respawning

### Restarting a process

You can toggle a process window's focus by using the mouse and clicking on the
window you want to activate. To restart this process, simply press CTRL+R like
you would in a web browser to refresh.

### Cleaning a window

To clean the window, select it and press CTRL+K.

### Runtime configuration

In order to keep the CLI clean and simple, you can create a `.parallel-run`
configuration file in your project to store configuration options as JSON. To
configure, simply add a key that aligns with the script name in your
package.json.

**Note: This file is not required if you don't have configuration**

For instance:

```
{
  "serve": {/* Configuration options */}
}
```

Where the `package.json` contains:

``` json
{
  "name": "some-project",
  "scripts": {
    "serve": "node bin/server",
  }
}
```

#### Waiting for port readiness

In some applications it may be necessary to wait for a port to be ready before
starting another process. If your UI application server requires a Zuul proxy
server to be started first, this could be configured to wait for the Zuul port
to be bound before spinning up your app.

Example `.parallel-run` configuration:


``` json
{
  "serve": {
    "waitFor": {
      "port": 8078
    }
  }
}
```

Where the `package.json` would look like:

``` json
{
  "name": "some-project",
  "scripts": {
    "serve": "node bin/server",
    "prana": "run-prana",
    "start": "parallel-run serve prana"
  }
}
```

This would create two windows and hold off spawning the `serve` script until
the `prana` script has bound to port 8078.

### Sink wrapper implementation

This module uses a lighweight internal abstraction over the Node
`child_process` module, that provides a simple API for getting the initial
output and hooking into when the output changes. Therefore the two properties
of a "sink" are `output` (immediate output after execution) and  `getOutput`,
which is a functional hook into the stdout/stderr changes.

## TODO

Ordered by difficulty:

- [ ] Display colors from `child_process` output, this already appears to work
      for some things
- [ ] Once the output reaches the bottom, pin the output to the bottom and if
      the user scrolls, do not attempt to auto scroll. (Should be doable w/
      setState).
- [ ] Windows `kill -9` support.
  - Look into abstraction library
- [ ] Truncate stdout size to avoid memory issues
- [ ] Add `--primary` flag to set a half width/full height panel, pushing the
      remaining tasks to stack horizontally in the remaining space
- [ ] Handle scrolling or any other animated output that utilizes
      `readline.clearLine()`. This is complex because currently we read
      `stdout` like a stream that constantly produces a linear set of messages.
      Once `clearLine` is used to reset back, `stdout` has no idea and only
      receives more data to print (which it does). Itd be greeat to figure out
      a better way to display `stdout` in these cases
- [ ] Add `--forward` flag to allow a single port to be forwarded to each
      `child_process` listening

### License

MIT
