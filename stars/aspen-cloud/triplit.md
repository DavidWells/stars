---
repo: aspen-cloud/triplit
url: 'https://github.com/aspen-cloud/triplit'
homepage: 'https://triplit.dev'
starredAt: '2024-12-21T22:46:56Z'
createdAt: '2023-07-20T21:34:02Z'
updatedAt: '2025-02-25T11:48:39Z'
language: TypeScript
license: AGPL-3.0
branch: main
stars: 2571
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:16.275Z'
description: >-
  A full-stack, syncing database that runs on both server and client. Pluggable
  storage (indexeddb, sqlite, durable objects), syncs over websockets, and works
  with your favorite framework (React, Solid, Vue, Svelte).
tags:
  - bun
  - cloudflare-workers
  - crdt
  - database
  - deno
  - durable-objects
  - firebase
  - firestore
  - fullstack
  - indexeddb
  - leveldb
  - multiplayer
  - nextjs
  - pwa
  - react
  - rxdb
  - sqlite
  - supabase
  - websockets
---

![Triplit banner](https://www.triplit.dev/opengraph-image.png)

# Overview

[Triplit](https://www.triplit.dev) is an open-source database that syncs data between server and browser in real-time.

Triplit provides a real-time syncing datastore that you can drop into your app as a Typescript package. Triplit handles storing your data on the server and intelligently syncs your queries to your clients. **We call this type of system a “full stack database”**—you can watch our presentation to the [Local First community](https://localfirstweb.dev/) on this new paradigm [here](https://www.youtube.com/watch?v=SEB-hF1F-UU&t=1465s).

Triplit brings together:

🔄 **Real-time sync** with incremental updates and conflict resolution at the property level

🏠 **Local caching** powered by a full-fledged client-side database

💽 **Durable server-side storage** with an admin dashboard

🔌 **Pluggable storage providers** like SQLite, IndexedDB, LevelDB, Memory, etc

😃 **Optimistic updates** to make every interaction feel fast

🔗 **Relational querying** for complex data models

🛫 **Offline-mode** with automatic reconnection and consistency guarantees

🔙 **Rollback and retry management** on failed updates

🗂️ **Schemas** for data safety and Typescript autocompletion

🔐 **Authorization** that's enforced on the server for both read and writes

🤝 **Collaboration/Multiplayer** powered by [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)

🏎️ **Low latency** with minimal network traffic using delta patches

📝 **Simple API** for querying and mutating data in both vanilla Javascript and React

✅ **Fully open-source!**

# Monorepo Overview

In `triplit/packages` you can find the various projects that power Triplit:

- [TriplitDB](https://github.com/aspen-cloud/triplit/tree/main/packages/db) - Designed to run in any JS environment (browser, node, deno, React Native, etc) and provide expressive, fast, and live updating queries while maintaining consistency with many writers over a network.
- [Client](https://github.com/aspen-cloud/triplit/tree/main/packages/client) - Browser library to interact with local and remote TriplitDBs.
- [CLI](https://github.com/aspen-cloud/triplit/tree/main/packages/cli) - CLI tool with commands to scaffold a project, run the full-stack development environment, migrate a server, and more.
- [React](https://github.com/aspen-cloud/triplit/tree/main/packages/react) - React bindings for @triplit/client.
- [Svelte](https://github.com/aspen-cloud/triplit/tree/main/packages/svelte) - Svelte bindings for @triplit/client.
- [Console](https://github.com/aspen-cloud/triplit/tree/main/packages/console) - App for viewing and mutating data in Triplit projects and managing their schemas.
- [Server](https://github.com/aspen-cloud/triplit/tree/main/packages/server) - Node server for syncing data between Triplit clients.
- [Server-core](https://github.com/aspen-cloud/triplit/tree/main/packages/server-core) - Protocol agnostic library for building servers running Triplit.
- [Docs](https://github.com/aspen-cloud/triplit/tree/main/packages/docs) - Triplit docs, built with Nextra.
- [Types](https://github.com/aspen-cloud/triplit/tree/main/packages/types) - Shared types for various Triplit projects.
- [UI](https://github.com/aspen-cloud/triplit/tree/main/packages/ui) - Shared UI components for Triplit frontend projects, built with [shadcn](https://ui.shadcn.com/).

# Quick Start

Start a new project.

```bash
npm create triplit-app@latest my-app
```

Or add the dependencies to an existing project.

```bash
npm install --save-dev @triplit/cli
npm run triplit init
```

Define a [schema](https://www.triplit.dev/docs/schemas) in `my-app/triplit/schema.ts`.

```ts
import { Schema as S, ClientSchema } from '@triplit/client';

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
    }),
  },
} satisfies ClientSchema;
```

Start the Triplit development [sync server](https://www.triplit.dev/docs/local-development).

```bash
npm run triplit dev
```

This will output some important [environmental variables](https://www.triplit.dev/docs/local-development#additional-environment-variables) that your app will need to sync with the server. Add them to your `.env` file (Vite example below).

```bash
VITE_TRIPLIT_SERVER_URL=http://localhost:6543
VITE_TRIPLIT_TOKEN=copied-in-from-triplit-dev
```

Define a [query](https://www.triplit.dev/docs/client/query) in your App (React example below).

```tsx
import { TriplitClient } from '@triplit/client';
import { useQuery } from '@triplit/react';
import { schema } from '../triplit/schema';

const client = new TriplitClient({
  schema,
  serverUrl: import.meta.env.VITE_TRIPLIT_SERVER_URL,
  token: import.meta.env.VITE_TRIPLIT_TOKEN,
});

function App() {
  const { results: todos } = useQuery(client.query('todos'));

  return (
    <div>
      {Array.from(todos.values()).map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              client.update('todos', todo.id, (todo) => ({
                todo.completed = !todo.completed,
              })
            }
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

Start your app, open another browser tab, and watch the data sync in real-time.

Read the full getting started guide [here](https://www.triplit.dev/docs/getting-started). For an even more detailed and explanatory tutorial, check out this step-by-step guide to [building a real-time todo app with Triplit, Vite, and React](https://www.triplit.dev/docs/react-tutorial).

# Contact us

If you're interested in getting early access to Triplit Cloud (currently in developer preview), sign up [here](https://www.triplit.dev/waitlist) to join the waitlist.

The best way to get in touch is to join our [Discord](https://discord.gg/q89sGWHqQ5)! We're here to answer questions, help developers get started with Triplit and preview new features.

You can follow us on [Twitter/X](https://twitter.com/triplit_dev) to see our latest announcements.
