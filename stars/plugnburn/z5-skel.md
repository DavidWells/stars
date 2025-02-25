---
repo: plugnburn/z5-skel
url: 'https://github.com/plugnburn/z5-skel'
homepage: null
starredAt: '2016-04-13T02:23:00Z'
createdAt: '2016-03-13T16:39:32Z'
updatedAt: '2017-11-04T13:04:43Z'
language: HTML
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:28.633Z'
description: A starter skeleton for creating Z5-powered web apps
tags: []
---

Z5 Skeleton
===========

This is a starting point to create modern HTML5 apps with absolute minimum of library overhead. 

Features
--------

### Minimal prerequisites

To use Z5 Skeleton, you just need to have Node.js and NPM installed, and a Bash-compatible shell.

### Powered by Z5

Move all your frontend development to real programming with [Z5 nano-library bundle](https://gist.github.com/plugnburn/07c8cd7387c9d7bdc610) that contains:

- [Zen.js (v2)](https://gist.github.com/plugnburn/295342f92883ff562084#zenjs-v2) for reactive in-memory storage;
- [Q.js](https://gist.github.com/plugnburn/daed387b8c9046f19572) for DOM manipulation;
- [R.js](https://gist.github.com/plugnburn/67b2736ef7387de151b7) for client-side routing;
- [XT.js](https://gist.github.com/plugnburn/07c383da5f151a54d0b2) for dynamic DOM construction/templating;
- [XS.js](https://gist.github.com/plugnburn/9229beaadbe23819f118) for dynamic stylesheet construction.

And all that comes in less than 3 KB (more exactly, 2782 bytes not gzipped).

### Just barebones

No boilerplate code to remove. The skeleton includes `src/assets/index.html` (a minimal entry point), `src/lib/z5.js` (Z5 bundle itself) and `src/actions/startup.js` file with a single `console.log`.

### Freely structure your app not creating a mess

While top source directories, each responsible for its own logical section, cannot be changed by default, you can arrange your files within them in any way as you see fit. All JavaScript and CoffeeScript code is automatically recognized and compiled into your app independent of subdirectory nesting.

### Two languages out of the box

You can seamlessly mix JavaScript and CoffeeScript source code in your app and still get everything in place.

### No third-party build systems

NPM itself exposes enough to be used as a build system to compile your app into a small and redistributable asset bundle.

### Test and deploy easily

A simple local server is shipped as a dependency. Additionally, an ability to easily deploy your app to [Surge](https://surge.sh) hosting is provided.

Creating a new app
------------------

It's just as easy as cloning this skeleton and installing the dependencies:

```
git clone https://github.com/plugnburn/z5-skel.git MyApp
cd MyApp && npm install
```

Directory structure
-------------------

The directory where you must place all your source code is the `src` directory. It contains the following required component sections:

- `assets` - anything that will be copied into the release directory without modifications, i.e. anything not related to source code (images etc). Includes mandatory entry point file named `index.html`. Most probably you will either never need to touch this file, or perform minimal modifications there.
- `lib` - JS and CS third-party library files. Includes Z5 bundle by default.
- `styles` - place any code responsible for XS stylesheet construction here.
- `views` - place any code responsible for XT DOM construction and/or presentation layer in general here.
- `modules` - application modules independent on each other should go here.
- `actions` - place the code that will run on application start here (all the initialization, routing etc). Includes `startup.js` by default, which can be removed safely.

Please note that source files from `lib`, `styles`, `views`, `modules` and `actions` dirs are combined in this very same order on build. This way everything else has access to third-party libraries (declared in `lib`), modules have access to them and everything declared in `styles` and `views` sections, and actions have access to all the previous sections. This is the principle of universal component accessibility.

How to arrange the code inside these mandatory sections, is really up to you.

Build process
-------------

To build your app, just run `npm run build` in your project directory. When you run it, the following actions are performed:

1. The `dist` directory is cleaned up (or re-created if it doesn't exist).
2. Everything from `src/assets` directory (including `index.html` app entry point) is copied straight into `dist` directory with no modifications.
3. Each CoffeeScript source file found in `src` subdirectories other than `src/assets` is temporarily compiled into a file next to it. Compilation is performed in the bare mode (i.e. without a toplevel wrapper function) in order to enable the aforementioned universal accessibility conditions between JS and CS components.
4. All JavaScript source files (including temporary source files compiled by CoffeeScript, if any) found in `src` subdirectories other than `src/assets` are concatenated in the following order: `lib`, `styles`, `views`, `modules`, `actions`. Then they are minified and output to `dist/app.js` file.
5. A cleanup is run after the build process to remove any found temporary source files compiled by CoffeeScript.

Running a local debug server
----------------------------

For your convenience, a simple debug HTTP server is shipped for each project. Just run `npm run server` in the project directory. When you run it, the following actions are performed:

1. App is rebuilt (`npm run build` runs automatically).
2. The `dist/index.html` is renamed into `dist/200.html` as a catch-all index page for the server.
3. The server runs on the port specified in the `debug_port` variable in the `config` section of `package.json`.

To stop the server, press Ctrl+C in the terminal.

Deploying your app to Surge
---------------------------

You can also easily deploy a Z5-based app to [Surge](https://surge.sh) hosting:

1. Fill the desired domain in the `domain` variable in the `config` section of `package.json`. See [Surge docs on custom domain configuration](https://surge.sh/help/adding-a-custom-domain) if you wish to do so instead of using a `.surge.sh` subdomain.
2. Run `npm run deploy`, wait until the app builds and enter your Surge login/password if prompted.

If you need to take down your project from Surge, just run `npm run undeploy`.
