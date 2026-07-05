---
repo: isaaclyman/js-powered-search
url: 'https://github.com/isaaclyman/js-powered-search'
homepage: >-
  https://marketplace.visualstudio.com/items?itemName=IsaacLyman.js-powered-search
starredAt: '2022-10-04T01:14:52Z'
createdAt: '2021-08-31T20:43:20Z'
updatedAt: '2024-06-16T19:33:42Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:26.712Z'
description: Array.filter for every file in your codebase
tags:
  - search-engine
  - vscode
  - vscode-extension
---

# JS Powered Search

**Array.filter for every file in your codebase**

JS Powered Search (JSPS) is a simple engine for searching a project using the full power of JavaScript. It's more powerful than RegEx and _way_ more powerful than a text search, although it has the ability to do both. Any stateful logic you can write with code, you can use in JSPS -- search depth, complexity, and performance are all up to you.

JSPS scaffolds a self-contained search definition file which you can alter by writing code to determine whether each file or line of code matches your search. You can save useful search definitions to your computer, making it easy to run them from the Command Palette or the JSPS Results pane later. If you commit your search definitions to version control, the whole team can use them just as easily.

Contribute here: https://github.com/isaaclyman/js-powered-search

Buy me a Coke: https://ko-fi.com/isaaclyman

## Features

Scaffold a powerful Search Definition file instantly:

![Scaffold search definition](media/demo-scaffold.gif)

Configure search settings and write matchers. In this case, we're looking for TypeScript files that have at least three imports and export a class whose name includes the term "Component".

![Configure search](media/demo-configure.gif)

Run the search whenever you're ready, and results will show up in the JSPS Results pane.

![Execute search](media/demo-search.gif)

## How to begin

Open the Command Palette with Ctrl + Shift + P and type `JSPS`, or visit the JSPS Results view in your activity bar to get started. JS Powered Search provides three commands:

### Scaffold

This creates a search definition file. JSPS will ask if you want to use a new unsaved editor window, create a new file at the project root, or overwrite the currently active file. Whatever you choose, you'll get a TypeScript file with three exported functions: one that returns general settings for your search, one that returns line matching functionality, and one that returns file matching functionality. TypeScript interfaces for every type you'll be interacting with are fully defined in the file.

From here, defining your search parameters is up to you. You can use multiple globs to include and exclude files by directory, filename, and extension. You can opt out of line matching, file matching, or both. You can write as much or as little logic in each matcher as you want, maintaining state with the provided closures (but keep in mind that files are not searched sequentially or in any particular order).

### Search

This executes a full workspace search using the currently active file as a search definition. JSPS will let you know if there's something wrong with your file, and the operation can be cancelled at any point. The JSPS Results pane will open to show results as they come in. Click any search result to jump to it in your codebase, or click the X icon to dismiss it.

### JSON Export

This exports all current search results to a JSON document, which will appear in a new text editor window.

## Known Issues

- Search definition files should not import other files. This is untested behavior and not currently in scope.

## Wishlist

- Allow passing in "test files" or "test lines" to the appropriate functions. The user indicates whether the contents should pass or fail the test defined by the predicate. Tests must pass before search begins; otherwise, the user sees an error message. This will give a quick understanding of what the test is looking for.
- Find-and-replace: for any matched line or file, let the user provide a function to pass it into that returns what it should be changed to.
