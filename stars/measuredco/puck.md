---
repo: measuredco/puck
url: 'https://github.com/measuredco/puck'
homepage: 'https://puckeditor.com'
starredAt: '2023-09-12T18:55:17Z'
createdAt: '2023-06-02T12:23:41Z'
updatedAt: '2025-02-25T15:59:46Z'
language: TypeScript
license: MIT
branch: main
stars: 6262
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:47.228Z'
description: The visual editor for React
tags: []
---

# Puck

The visual editor for React.

<p align="left">
  <a aria-label="Measured logo" href="https://measured.co">
    <img src="https://img.shields.io/badge/MADE%20BY%20Measured-000000.svg?style=for-the-badge&labelColor=000">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@measured/puck">
    <img alt="" src="https://img.shields.io/npm/v/@measured/puck.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/measuredco/puck/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/@measured/puck.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on Discord" href="https://discord.gg/D9e4E3MQVZ">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20Discord-blueviolet.svg?style=for-the-badge&logo=Discord&labelColor=000000&logoWidth=20">
  </a>
 <a aria-label="Browse the awesome-puck community repo" href="https://github.com/measuredco/awesome-puck">
    <img alt="" src="https://img.shields.io/badge/repo-awesome--puck-fc60a8.svg?style=for-the-badge&labelColor=000000&logoWidth=20">
  </a>
</p>

## Demo

Visit https://demo.puckeditor.com/edit to try the demo.

## Documentation

Visit https://puckeditor.com to view the full documentation.

## Quick start

Install the package:

```sh
npm i @measured/puck --save # or npx create-puck-app my-app
```

Render the editor:

```jsx
// Editor.jsx
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};

// Describe the initial data
const initialData = {};

// Save the data to your database
const save = (data) => {};

// Render Puck editor
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
```

Render the page:

```jsx
// Page.jsx
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";

export function Page() {
  return <Render config={config} data={data} />;
}
```

## Recipes

Use `create-puck-app` to quickly spin up a a pre-configured app based on our provided [recipes](https://github.com/measuredco/puck/tree/main/recipes):

```sh
npx create-puck-app my-app
```

Available recipes include:

- [**next**](https://github.com/measuredco/puck/tree/main/recipes/next): Next.js example, using App Router and static page generation
- [**remix**](https://github.com/measuredco/puck/tree/main/recipes/remix): Remix Run v2 example, using dynamic routes at root-level

## Community

- [Discord server](https://discord.gg/D9e4E3MQVZ) for discussions
- [awesome-puck](https://github.com/measuredco/awesome-puck) community repo for plugins, custom fields & more

## Get support

If you have any questions about Puck, please open a [GitHub issue](https://github.com/measuredco/puck/issues) or join us on [Discord](https://discord.gg/D9e4E3MQVZ).

Or [book a discovery call](https://app.cal.com/chrisvxd/puck-enquiry/) for hands-on support and consultancy.

## License

MIT © [Measured Corporation Ltd](https://measured.co)
