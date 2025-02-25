---
repo: seldomU/dasdashboard
url: 'https://github.com/seldomU/dasdashboard'
homepage: null
starredAt: '2022-12-20T19:06:49Z'
createdAt: '2022-11-06T19:53:38Z'
updatedAt: '2024-06-15T12:44:25Z'
language: JavaScript
license: MIT
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:02.517Z'
description: local dashboard with focus on easy editing
tags: []
---


<p align="center">

  <h1 align="center">Das Dashboard</h1>

  <p align="center">
    local dashboard with focus on easy editing
    <br />
  </p>
</p>

[dasdashboard demo.webm](https://user-images.githubusercontent.com/10736677/200197206-2efe78dc-3c3b-4157-9c3f-3889d434dbb3.webm)


## About

Dasdashboard can be used as dashboard, control panel or to add a GUI for CLI scripts. A board is made up of pages, which are made up of cells. Similar to a wiki or CMS, you can edit the cell contents inside the app. But here the content is JS code that can create UI elements as well as run scripts or load files from your system. All cell contents are stored as git-friendly plaintext files.

Even though the app runs a web server, it is only reachable from the local machine.

## Usage

This section is about running the app. Content editing is documented in the in-app editor.

### Quick start

 * make sure you have Node.js installed, at least version 12.20
 * open a terminal in any directory
 * run `npx dasdashboard --demo --open`
 * this should create a *dasdashboard* subfolder, start a local server and open the demo dashboard in a browser tab
 * play around with the demo
 * if you want to keep your changes, keep that *dasdashboard* folder

### Use as a global tool

Install dasdashboard globally like this:
```
sudo npm i -g dasdashboard
```

Initialize a dashboard by running `dasdashboard` in any directory. This will create a *dasdashboard* folder in the working directory and start a server based on it, using any free port. The server URL gets printed to the console.

Use the same command to run a server for an existing dashboard. To specify a different content folder, add the argument `--content /my/other/folder`. To specify a port, use `--port 12345`.

To add content to a dashboard, open the URL and start adding pages and filling them with cells. To automatically open the URL, add the `--open` option.

A new dashboard will be empty be default. Add the `--demo` option to start with some demo content instead.


### Use as part of a node project

Install it as dev dependency of your project:
```
npm i --save-dev dasdashboard
```

Then initialize a dashboard as described in the section above.

## Development

Both server and client are written in JavaScript. There is no bundler, transpiler or minifier involved. The server (index.js) is based on express.js, the client (client/client.js) uses Bootstrap.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

dasdashboard is mainly built upon [Bootstrap](https://github.com/twbs/bootstrap) and [Express](https://github.com/expressjs/express).
