---
repo: emilkowalski/vaul
url: 'https://github.com/emilkowalski/vaul'
homepage: 'https://vaul.emilkowal.ski'
starredAt: '2024-04-04T20:52:31Z'
createdAt: '2023-07-16T11:24:46Z'
updatedAt: '2025-02-25T13:49:17Z'
language: TypeScript
license: MIT
branch: main
stars: 6947
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:32.299Z'
description: A drawer component for React.
tags:
  - dialog
  - drawer
  - react
---

https://github.com/emilkowalski/vaul/assets/36730035/fdf8c5e8-ade8-433b-8bb0-4ce10e722516

Vaul is an unstyled drawer component for React that can be used as a Dialog replacement on tablet and mobile devices. You can read about why and how it was built [here](https://emilkowal.ski/ui/building-a-drawer-component).

## Usage

To start using the library, install it in your project:,

```bash
npm install vaul
```

Use the drawer in your app.

```jsx
import { Drawer } from 'vaul';

function MyComponent() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

## Documentation

Find the full API reference and examples in the [documentation](https://vaul.emilkowal.ski/getting-started).
