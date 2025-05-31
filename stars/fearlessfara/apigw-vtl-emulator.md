---
repo: fearlessfara/apigw-vtl-emulator
url: 'https://github.com/fearlessfara/apigw-vtl-emulator'
homepage: 'https://fearlessfara.github.io/apigw-vtl-emulator/'
starredAt: '2025-05-30T01:21:32Z'
createdAt: '2025-05-22T21:26:15Z'
updatedAt: '2025-05-30T01:21:33Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-31T21:04:40.912Z'
description: >-
  A browser-based editor and emulator for AWS API Gateway VTL templates — with
  live preview, debug tools, and full in-browser execution.
tags:
  - api-gateway
  - aws
  - emulator
  - serverless
  - velocity
  - vtl
---

# VTL Emulator Pro

**VTL Emulator Pro** is a browser-based editor and emulator
for [Apache Velocity Template Language (VTL)](https://velocity.apache.org/engine/1.7/user-guide.html), designed to
simulate AWS API Gateway integration request/response templates.

---

## 🔍 What is this?

This tool lets you:

- Write and preview VTL templates live
- Simulate `$input`, `$util`, and `$context` variables
- Render and debug request/response flows
- Manage variables for headers, query params, stage variables, and paths
- Quickly test conditional blocks, loops, and transformations

---

## 🌐 Try it online

👉 **[https://fearlessfara.github.io/apigw-vtl-emulator](https://fearlessfara.github.io/apigw-vtl-emulator)**

⚠️ **No data is ever sent to any backend.** Everything runs 100% in your browser. Perfect for privacy-sensitive
workflows.

---

## 📁 Repository Structure

This repository contains:

| Path               | Description                                      |
|--------------------|--------------------------------------------------|
| `/index.html`      | The browser UI HTML entry point                  |
| `/script.js`       | All the logic powering the editor UI             |
| `/emulator/`       | The standalone VTL engine used by the UI and NPM |
| `/emulator/tests/` | Unit tests for the engine                        |
| `/img.png`         | Screenshot used in documentation                 |
| `/CONTRIBUTING.md` | Contribution guide for engine and UI development |

You can contribute to either the visual interface or the evaluation engine.

---

## 🧰 Features

- 🖊️ Monaco-based editor with syntax highlighting and autocompletion
- 📦 Snippets for common AWS API Gateway use-cases
- 📄 Compare VTL templates side-by-side
- 📥 Import/export template configurations
- 🎨 Light/Dark theme toggle
- 📋 Output preview with copy/share/download support
- 🔍 Debug panel showing render steps

---

## 📘 Screenshot

![img.png](img.png)

---

## ⚙️ VTL Engine (Published on NPM)

The engine simulates AWS API Gateway’s `$input`, `$util`, and `$context` using `velocityjs`, and is available as a
package:

- **NPM:** [`apigw-vtl-emulator`](https://www.npmjs.com/package/apigw-vtl-emulator)
- **CDN (ESM):
  ** [https://cdn.jsdelivr.net/npm/apigw-vtl-emulator@1.0.3/dist/index.mjs](https://cdn.jsdelivr.net/npm/apigw-vtl-emulator@1.0.3/dist/index.mjs)

---

## 🚀 Quick Start (for the UI)

```bash
git clone https://github.com/fearlessfara/apigw-vtl-emulator.git
cd apigw-vtl-emulator
open index.html  # or use `npx live-server` / `python3 -m http.server`
```

---

## 📦 Quick Usage (VTL Engine via NPM)

```bash
npm install apigw-vtl-emulator
```

```js
import {renderVTL} from 'apigw-vtl-emulator';

const output = renderVTL('$input.json("$.name")', {
  body: JSON.stringify({name: "Velocity"})
});
console.log(output); // "Velocity"
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines on contributing to either the UI or engine.

---

## 📝 License

MIT — © 2025 [Christian Gennaro Faraone](https://github.com/fearlessfara)
