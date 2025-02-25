---
repo: nalgeon/codapi
url: 'https://github.com/nalgeon/codapi'
homepage: 'https://codapi.org'
starredAt: '2024-02-24T04:28:39Z'
createdAt: '2023-11-24T22:24:22Z'
updatedAt: '2025-02-25T09:13:19Z'
language: Go
license: Apache-2.0
branch: main
stars: 1677
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:35.338Z'
description: 'Interactive code examples for documentation, education and fun'
tags:
  - code-playground
  - interactive-code
  - interactive-snippets
  - playground
  - sandbox
  - snippets
---

# Interactive code examples

_for documentation, education and fun_ 🎉

Codapi is a platform for embedding interactive code snippets directly into your product documentation, online course or blog post.

```
┌───────────────────────────────┐
│ def greet(name):              │
│   print(f"Hello, {name}!")    │
│                               │
│ greet("World")                │
└───────────────────────────────┘
  Run ►  Edit  ✓ Done
┌───────────────────────────────┐
│ Hello, World!                 │
└───────────────────────────────┘
```

Codapi manages sandboxes (isolated execution environments) and provides an API to execute code in these sandboxes. It also provides a JavaScript widget [codapi-js](https://github.com/nalgeon/codapi-js) for easier integration.

Highlights:

-   Automatically converts static code examples into mini-playgrounds.
-   Lightweight and easy to integrate.
-   Sandboxes for any programming language, database, or software.
-   Open source. Uses the permissive Apache-2.0 license.

For an introduction to Codapi, see this post: [Interactive code examples for fun and profit](https://antonz.org/code-examples/).

## Installation

See [Installing Codapi](docs/install.md) for details.

## Usage

See [API](docs/api.md) to run sandboxed code using the HTTP API.

See [codapi-js](https://github.com/nalgeon/codapi-js) to embed the JavaScript widget into a web page.

## Contributing

Contributions are welcome. For anything other than bugfixes, please first open an issue to discuss what you want to change.

Be sure to add or update tests as appropriate.

## Support

Codapi is mostly a [one-man](https://antonz.org/) project, not backed by a VC fund or anything.

If you find Codapi useful, please star it on GitHub and spread the word among your peers. It really helps to move the project forward.

★ [Subscribe](https://antonz.org/subscribe/) to stay on top of new features.
