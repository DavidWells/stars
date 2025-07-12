---
repo: idosal/mcp-ui
url: 'https://github.com/idosal/mcp-ui'
homepage: 'https://mcpui.dev'
starredAt: '2025-07-11T00:50:47Z'
createdAt: '2025-05-13T22:41:43Z'
updatedAt: '2025-07-12T13:13:39Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 450
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.152Z'
description: SDK for UI over MCP. Create next-gen UI experiences!
tags:
  - ai
  - llm
  - mcp
  - ui
---

## 📦 Model Context Protocol UI SDK

<p align="center">
  <img width="250" alt="image" src="https://github.com/user-attachments/assets/65b9698f-990f-4846-9b2d-88de91d53d4d" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mcp-ui/server"><img src="https://img.shields.io/npm/v/@mcp-ui/server?label=server&color=green" alt="Server Version"></a>
  <a href="https://www.npmjs.com/package/@mcp-ui/client"><img src="https://img.shields.io/npm/v/@mcp-ui/client?label=client&color=blue" alt="Client Version"></a>
  <a href="https://gitmcp.io/idosal/mcp-ui"><img src="https://img.shields.io/endpoint?url=https://gitmcp.io/badge/idosal/mcp-ui" alt="MCP Documentation"></a>
</p>

<p align="center">
  <a href="#-whats-mcp-ui">What's mcp-ui?</a> •
  <a href="#-core-concepts">Core Concepts</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-quickstart">Quickstart</a> •
  <a href="#-examples">Examples</a> •
  <a href="#-security">Security</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

----

**`mcp-ui`** brings interactive web components to the [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP). Deliver rich, dynamic UI resources directly from your MCP server to be rendered by the client. Take AI interaction to the next level!

> *This project is an experimental community playground for MCP UI ideas. Expect rapid iteration and enhancements!*

<p align="center">
  <video src="https://github.com/user-attachments/assets/7180c822-2dd9-4f38-9d3e-b67679509483"></video>
</p>

## 💡 What's `mcp-ui`?

`mcp-ui` is a TypeScript SDK comprising two packages:

* **`@mcp-ui/server`**: Utilities to generate UI resources (`UIResource`) on your MCP server.
* **`@mcp-ui/client`**: UI components (e.g., `<UIResourceRenderer />`) to render the UI resources and handle their events.

Together, they let you define reusable UI snippets on the server side, seamlessly and securely render them in the client, and react to their actions in the MCP host environment.

## ✨ Core Concepts

In essence, by using `mcp-ui` SDKs, servers and hosts can agree on contracts that enable them to create and render interactive UI snippets (as a path to a standardized UI approach in MCP).

### UI Resource
The primary payload returned from the server to the client is the `UIResource`:

```ts
interface UIResource {
  type: 'resource';
  resource: {
    uri: string;       // e.g., ui://component/id
    mimeType: 'text/html' | 'text/uri-list' | 'application/vnd.mcp-ui.remote-dom'; // text/html for HTML content, text/uri-list for URL content, application/vnd.mcp-ui.remote-dom for remote-dom content (Javascript)
    text?: string;      // Inline HTML, external URL, or remote-dom script
    blob?: string;      // Base64-encoded HTML, URL, or remote-dom script
  };
}
```

* **`uri`**: Unique identifier for caching and routing
  * `ui://…` — UI resources (rendering method determined by mimeType)
* **`mimeType`**: `text/html` for HTML content (iframe srcDoc), `text/uri-list` for URL content (iframe src), `application/vnd.mcp-ui.remote-dom` for remote-dom content (Javascript)
  * **MCP-UI requires a single URL**: While `text/uri-list` format supports multiple URLs, MCP-UI uses only the first valid `http/s` URL and warns if additional URLs are found
* **`text` vs. `blob`**: Choose `text` for simple strings; use `blob` for larger or encoded content.

### Resource Renderer

The UI Resource is rendered in the `<UIResourceRenderer />` component. It automatically detects the resource type and renders the appropriate component.

It accepts the following props:
- **`resource`**: The resource object from an MCP response. Should include `uri`, `mimeType`, and content (`text`, `blob`, or `content`)
- **`onUIAction`**: Optional callback for handling UI actions from the resource:
  ```typescript
  { type: 'tool', payload: { toolName: string, params: Record<string, unknown> } } |
  { type: 'intent', payload: { intent: string, params: Record<string, unknown> } } |
  { type: 'prompt', payload: { prompt: string } } |
  { type: 'notification', payload: { message: string } } |
  { type: 'link', payload: { url: string } }
  ```
- **`supportedContentTypes`**: Optional array to restrict which content types are allowed (`['rawHtml', 'externalUrl', 'remoteDom']`)
- **`htmlProps`**: Optional props for the internal `<HTMLResourceRenderer>`
  - **`style`**: Optional custom styles for the iframe
  - **`iframeProps`**: Optional props passed to the iframe element
- **`remoteDomProps`**: Optional props for the internal `<RemoteDOMResourceRenderer>`
  - **`library`**: Optional component library for Remote DOM resources (defaults to `basicComponentLibrary`)
  - **`remoteElements`**: remote element definitions for Remote DOM resources.

### Supported Resource Types

#### HTML (`text/html` and `text/uri-list`)

Rendered using the `<HTMLResourceRenderer />` component, which displays content inside an `<iframe>`. This is suitable for self-contained HTML or embedding external apps.

*   **`mimeType`**:
    *   `text/html`: Renders inline HTML content.
    *   `text/uri-list`: Renders an external URL. MCP-UI uses the first valid `http/s` URL.

#### Remote DOM (`application/vnd.mcp-ui.remote-dom`)

Rendered using the `<RemoteDOMResourceRenderer />` component, which uses Shopify's [`remote-dom`](https://github.com/Shopify/remote-dom). The server responds with a script that describes the UI and events. On the host, the script is securely rendered in a sandboxed iframe, and the UI changes are communicated to the host in JSON, where they're rendered using the host's component library. This is more flexible than iframes and allows for UIs that match the host's look-and-feel.

* **`mimeType`**: `application/vnd.mcp-ui.remote-dom; flavor={react | webcomponents}`

### UI Action

UI snippets must be able to interact with the agent. In `mcp-ui`, this is done by hooking into events sent from the UI snippet and reacting to them in the host. For example, an HTML may trigger a tool call when a button is clicked by sending an event which will be caught handled by the client.

## 🏗️ Installation

```bash
# using npm
npm install @mcp-ui/server @mcp-ui/client

# or pnpm
pnpm add @mcp-ui/server @mcp-ui/client

# or yarn
yarn add @mcp-ui/server @mcp-ui/client
```

## 🎬 Quickstart

You can use [GitMCP](https://gitmcp.io/idosal/mcp-ui) to give your IDE access to `mcp-ui`'s latest documentation! 

1. **Server-side**: Build your resource blocks

   ```ts
   import { createUIResource } from '@mcp-ui/server';
   import {
    createRemoteComponent,
    createRemoteDocument,
    createRemoteText,
   } from '@remote-dom/core';

   // Inline HTML
   const htmlResource = createUIResource({
     uri: 'ui://greeting/1',
     content: { type: 'rawHtml', htmlString: '<p>Hello, MCP UI!</p>' },
     delivery: 'text',
   });

   // External URL
   const externalUrlResource = createUIResource({
     uri: 'ui://greeting/1',
     content: { type: 'externalUrl', iframeUrl: 'https://example.com' },
     delivery: 'text',
   });

   // remote-dom
   const remoteDomResource = createUIResource({
     uri: 'ui://remote-component/action-button',
     content: {
       type: 'remoteDom',
       script: `
        const button = document.createElement('ui-button');
        button.setAttribute('label', 'Click me for a tool call!');
        button.addEventListener('press', () => {
          window.parent.postMessage({ type: 'tool', payload: { toolName: 'uiInteraction', params: { action: 'button-click', from: 'remote-dom' } } }, '*');
        });
        root.appendChild(button);
        `,
       flavor: 'react', // or 'webcomponents'
     },
     delivery: 'text',
   });
   ```

2. **Client-side**: Render in your MCP host

   ```tsx
   import React from 'react';
   import { UIResourceRenderer } from '@mcp-ui/client';

   function App({ mcpResource }) {
     if (
       mcpResource.type === 'resource' &&
       mcpResource.resource.uri?.startsWith('ui://')
     ) {
       return (
         <UIResourceRenderer
           resource={mcpResource.resource}
           onUIAction={(result) => {
             console.log('Action:', result);
             return { status: 'ok' };
           }}
         />
       );
     }
     return <p>Unsupported resource</p>;
   }
   ```

3. **Enjoy** interactive MCP UI — no extra configuration required.

## 🌍 Examples

**Client example**
* [ui-inspector](https://github.com/idosal/ui-inspector) - inspect local `mcp-ui`-enabled servers. 
* [MCP-UI Chat](https://github.com/idosal/scira-mcp-ui-chat) - interactive chat built with the `mcp-ui` client. Check out the [hosted version](https://scira-mcp-chat-git-main-idosals-projects.vercel.app/)!
* MCP-UI RemoteDOM Playground (`examples/remote-dom-demo`) - local demo app to test RemoteDOM resources (intended for hosts)

**Server example**
Try out the hosted app -
* **HTTP Streaming**: `https://remote-mcp-server-authless.idosalomon.workers.dev/mcp`
* **SSE**: `https://remote-mcp-server-authless.idosalomon.workers.dev/sse`

The app is deployed from `examples/server`.

Drop those URLs into any MCP-compatible host to see `mcp-ui` in action.

## 🔒 Security
Host and user security is one of `mcp-ui`'s primary concerns. In all content types, the remote code is executed in a sandboxed iframe.


## 🛣️ Roadmap

- [X] Add online playground
- [X] Expand UI Action API (beyond tool calls)
- [X] Support Web Components
- [X] Support Remote-DOM
- [ ] Add component libraries (in progress)
- [ ] Add SDKs for additional programming languages (in progress)
- [ ] Support additional frontend frameworks
- [ ] Add declarative UI content type
- [ ] Support generative UI?
      
## 🤝 Contributing

Contributions, ideas, and bug reports are welcome! See the [contribution guidelines](https://github.com/idosal/mcp-ui/blob/main/.github/CONTRIBUTING.md) to get started.


## 📄 License

Apache License 2.0 © [The MCP-UI Authors](LICENSE)

## Disclaimer

This project is provided "as is", without warranty of any kind. The `mcp-ui` authors and contributors shall not be held liable for any damages, losses, or issues arising from the use of this software. Use at your own risk.
