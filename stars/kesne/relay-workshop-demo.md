---
repo: kesne/relay-workshop-demo
url: 'https://github.com/kesne/relay-workshop-demo'
homepage: null
starredAt: '2021-10-24T05:57:52Z'
createdAt: '2021-10-21T00:47:14Z'
updatedAt: '2023-08-30T02:19:49Z'
language: TypeScript
license: NA
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.869Z'
description: null
tags: []
---

# Relay Workshop Demo

This is intended to demonstrate:

- How Relay is setup in projects
- How to setup and use the Relay Compiler
- What Fragments are, and how components can use them to define their data dependencies
- How to make fully re-usable components, leveraging fragments.
- Basic implementations of pagination (infinite loading)
- The basics of queries
- The basics of mutations
- Automatic cache updates through mutations
- Basic project architecture

This project is explicitly **not designed** to demonstrate the following:

- **Preloading**: Preloading is incredibly important, and actaully how Relay wants you load data themselves! However, it is incredibly tied to your specific router and application patterns. It'd be possible to outline it here, but the resulting code wouldn't actually be particularly useful. The [Relay website has documentation](https://relay.dev/docs/guided-tour/rendering/queries/#rendering-queries) that can help you understand how it works conceptually.

## Getting Started

First, install the dependencies:

```bash
yarn
```

Then run the setup script, which will setup and seed the database, and ensure all generated artifacts are compiled:

```bash
yarn setup
```

Now you can start the application. This will run a server on http://localhost:3000/. Open it in your browser to see the demo application.

```bash
yarn dev
```

### Development Workflow

Feature development of Relay features is mostly the same as normal React feature development. When updating any queries/fragments/mutations within the `graphql` tagged templates, you will need to run `yarn relay` to trigger re-running the Relay Compiler. Alternatively, you can start the relay compiler in a separate tab in watch mode:

```bash
yarn relay --watch
```

## Where to Start

With the exception of the `relay.config.js` file, all of the relevant code lives in the `src` directory. Every file is annotated, trying to explain. I generally recommend that you start at `src/pages/posts/index.tsx`, and follow the components you see to gain a full understanding of how everything comes together.

## Additional Resources

- https://graphql.org/
- https://relay.dev/docs/guided-tour/
- https://relay.dev/docs/guides/graphql-server-specification/
- https://relay.dev/docs/principles-and-architecture/thinking-in-relay/
