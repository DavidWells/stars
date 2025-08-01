---
repo: XaveScor/smartbundle
url: 'https://github.com/XaveScor/smartbundle'
homepage: ''
starredAt: '2025-06-23T21:50:11Z'
createdAt: '2024-07-25T23:32:16Z'
updatedAt: '2025-06-27T18:19:49Z'
language: TypeScript
license: NA
branch: master
stars: 59
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:13.125Z'
description: 'Just Code, No Configs. The Library Bundler That Respects Your Time'
tags: []
---

# SmartBundle

<div align="center">
  <h3>The Library Bundler That Respects Your Time</h3>

  <p>
    <a href="#getting-started">Getting Started</a> •
    <a href="#features">Features</a> •
    <a href="#compatibility">Compatibility</a> •
    <a href="#tool-integration">Tool Integration</a> •
    <a href="#advanced-usage">Advanced Usage</a> •
    <a href="#faq">FAQ</a>
  </p>
</div>

Build your library for any JavaScript environment without the complexity

## Getting Started

SmartBundle makes it easy to bundle your library for any JavaScript environment. Just create a minimal package.json (see below), install SmartBundle, and run the build command.

```json5
{
  // Your package name
  "name": "my-package",         
  // Package version
  "version": "1.0.0",           
  // Must be true to avoid accidental publishing
  "private": true,              
  // SmartBundle supports only ES modules
  "type": "module",             
  // Entry point used by SmartBundle
  "exports": "./src/index.js",  
  "scripts": {
    // Run this to build your package
    "build": "smartbundle"      
  }
}
```

Need more details? See our [package.json guide](./docs/package-json.md) for a full explanation of each field. If you plan to use TypeScript, check out our [TS guide](./docs/ts-guide.md) for tailored advice.

To build your package:

1) Create the package.json as shown above
2) Install SmartBundle:
```bash
npm install --save-dev smartbundle@latest
```
3) Build your package:
```bash
npm run build
```
4) Your built files (including an auto-generated package.json) will be in the ./sb-dist folder

## Features

- **Zero Configuration** - Point to your entry file and build
- **Universal Output** - ESM and CommonJS bundles generated automatically  
- **TypeScript Ready** - Full TypeScript support with type definitions
- **React Support** - Automatic JSX transformations for modern and legacy modes
- **Developer Friendly** - Source maps included for better debugging
- **Broad Compatibility** - Works with Node.js, Webpack, Vite, Rollup, Bun, and more


## Compatibility

Every bundled package is tested in real environments - from Node.js and Bun to Webpack and Metro - to ensure it just works.

### Runtimes
| Runtime    | Version | Supported | E2E Tests |
|------------|---------|:---------:|:---------:|
| Node.js    | ^18.0.0 | ✔        | ✔        |
|            | ^20.0.0 | ✔        | ✔        |
|            | ^22.0.0 | ✔        | ✔        |
|            | ^24.0.0 | ✔        | ✔        |
| Bun        | ^1.0.0  | ✔        | ✔        |
| Deno       | ^2.0.0  | ✔        | -        |

### Bundlers
| Bundler           | Version   | Supported | E2E Tests |
|-------------------|-----------|:---------:|:---------:|
| Webpack           | ^4.47.0   | ✔        | ✔        |
|                   | ^5.95.0   | ✔        | ✔        |
| Rspack           | ^1.0.0    | ✔        | ✔        |
| Vite             | ^5.0.0    | ✔        | -        |
| Rollup           | ^4.0.0    | ✔        | -        |
| Parcel           | ^2.0.0    | ✔        | -        |
| Browserify       | ^17.0.0   | ✔        | -        |
| Esbuild          | ^0.24.0   | ✔        | -        |
| Metro            | ^0.81.0   | ✔        | ✔        |
| Next.js/Turbopack| ^13.0.0   | ✔        | -        |

### TypeScript Module Resolution
| Strategy    | Supported | E2E Tests |
|-------------|:---------:|:---------:|
| bundler     | ✔        | ✔        |
| node10      | ✔        | ✔        |
| node16es    | ✔        | ✔        |
| node16cjs   | ✔        | ✔        |

We aim to support as many bundlers and runtimes as possible. If the bundled package doesn't work with your bundler, please let us know.

## Tool Integration

SmartBundle automatically detects and integrates with your tools - just add what you need to your project.

### TypeScript
Add `typescript@^5.0.0` as a dev dependency and start creating `.ts` files. SmartBundle will handle the rest.

### Babel
Add `@babel/core@^7.0.0` as a dev dependency and create a Babel configuration file in your project root. SmartBundle will automatically apply your transformations.

### React
Add `react` to your dependencies. SmartBundle automatically detects React and configures JSX transformations. Both modern and legacy modes are supported.

For detailed React configuration options, see our [React guide](./docs/react.md).

## Advanced Usage

SmartBundle enforces certain package.json conventions to ensure reliable builds. For detailed information about:
- Required and banned fields
- Configuration limitations
- Package.json best practices
- [Monorepo support](./docs/monorepo.md)

See our [package.json guide](./docs/package-json.md).

## Monorepo Support

SmartBundle provides specialized tooling for monorepo projects. For detailed information about setting up and managing monorepos with SmartBundle, see our [monorepo guide](./docs/monorepo.md).

## FAQ
### SmartBundle have an issue
Please, look at the [known fixable issues](./docs/issues.md) before creating your own one. Some bugs already have a solution but cannot be fixed without user action.

### Why don't you minify the output?
Minification is typically needed only for production. During development, readable, unminified output helps with debugging.

### Why do you require third-party tools for building?
We prioritize keeping the `node_modules` size manageable and avoid unnecessary dependencies. If your package does not require TypeScript, for instance, you don’t need to install those specific tools.

### Community and Support
If you need assistance or wish to contribute, please check out our [discussion forum](https://github.com/your-org/smartbundle/discussions) and [issue tracker](https://github.com/your-org/smartbundle/issues).
