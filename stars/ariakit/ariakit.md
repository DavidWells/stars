---
repo: ariakit/ariakit
url: 'https://github.com/ariakit/ariakit'
homepage: 'https://ariakit.org'
starredAt: '2019-05-14T15:56:36Z'
createdAt: '2017-09-19T22:00:42Z'
updatedAt: '2025-02-25T15:51:32Z'
language: TypeScript
license: MIT
branch: main
stars: 8003
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:37.253Z'
description: Toolkit for building accessible web apps with React
tags:
  - a11y
  - accessibility
  - accessible
  - aria
  - ariakit
  - components
  - react
  - reactjs
  - reakit
  - wai-aria
---

<h1 align="center">Ariakit</h1>

<p align="center">
  Toolkit for building accessible web apps with <a href="https://reactjs.org">React</a>.
  <br>
  <a href="https://ariakit.org"><strong>Explore website »</strong></a>
</p>

<br>

<div align="center">
  <a href="https://npmjs.org/package/@ariakit/react">
    <img alt="NPM version" src="https://img.shields.io/npm/v/@ariakit/react.svg?logo=npm&color=007acc" />
  </a>
  <a href="https://github.com/ariakit/ariakit/releases">
    <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/ariakit/ariakit?logo=github&color=007acc">
  </a>
  <a href="https://github.com/ariakit/ariakit/discussions">
    <img alt="GitHub Discussions" src="https://img.shields.io/github/discussions/ariakit/ariakit?logo=github&color=007acc">
  </a>
  <br>
  <a href="https://npmjs.org/package/@ariakit/react">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/@ariakit/react.svg?logo=npm&style=social">
  </a>
  &nbsp;
  <a href="https://github.com/ariakit/ariakit/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ariakit/ariakit?style=social">
  </a>
  &nbsp;
  <a href="https://x.com/ariakitjs">
    <img alt="Follow Ariakit on Twitter" src="https://img.shields.io/twitter/follow/ariakitjs.svg">
  </a>
</div>

<br>

## Installation

npm:

```
npm i @ariakit/react
```

pnpm:

```
pnpm add @ariakit/react
```

Yarn:

```
yarn add @ariakit/react
```

## Usage

```jsx
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Dialog, DialogHeading } from "@ariakit/react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogHeading>Ariakit</DialogHeading>
        <p>Welcome to Ariakit!</p>
      </Dialog>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
```

## Core Team

- [Diego Haz](https://bsky.app/profile/haz.dev)
- [Ben Rodri](https://bsky.app/profile/ben.ariakit.org)
- [Dani Guardiola](https://bsky.app/profile/dio.la)

## Attribution

Browser testing provided by
<a href="https://www.browserstack.com" target="_blank"><img src="https://user-images.githubusercontent.com/15015324/45184727-368fbf80-b1fe-11e8-8827-08dbc80b0fb1.png" height="80" align="center"></a>

## Contributing

Follow the instructions on the [contributing guide](https://github.com/ariakit/ariakit/blob/main/contributing.md).
