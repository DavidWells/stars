---
repo: emilkowalski/sonner
url: 'https://github.com/emilkowalski/sonner'
homepage: 'https://sonner.emilkowal.ski'
starredAt: '2023-02-23T18:42:49Z'
createdAt: '2023-02-23T11:01:18Z'
updatedAt: '2025-02-25T18:23:17Z'
language: TypeScript
license: MIT
branch: main
stars: 9707
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:55.593Z'
description: An opinionated toast component for React.
tags:
  - notifications
  - react
  - toast
---

https://github.com/vallezw/sonner/assets/50796600/59b95cb7-9068-4f3e-8469-0b35d9de5cf0

[Sonner](https://sonner.emilkowal.ski/) is an opinionated toast component for React. You can read more about why and how it was built [here](https://emilkowal.ski/ui/building-a-toast-component).

## Usage

To start using the library, install it in your project:

```bash
npm install sonner
```

Add `<Toaster />` to your app, it will be the place where all your toasts will be rendered.
After that you can use `toast()` from anywhere in your app.

```jsx
import { Toaster, toast } from 'sonner';

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>Give me a toast</button>
    </div>
  );
}
```

## Documentation

Find the full API reference in the [documentation](https://sonner.emilkowal.ski/getting-started).
