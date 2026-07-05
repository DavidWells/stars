---
repo: sgwilym/windups
url: 'https://github.com/sgwilym/windups'
homepage: 'https://windups.gwil.co'
starredAt: '2021-12-02T05:45:34Z'
createdAt: '2019-08-22T15:45:28Z'
updatedAt: '2025-02-15T12:32:22Z'
language: TypeScript
license: MIT
branch: master
stars: 875
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:31.050Z'
description: A unique typewriter effect library for React.
tags:
  - animation
  - javascript
  - react
  - reactjs
  - typewriter
  - typewriter-effect
  - windups
---

# windups

🐸 [Examples, guides, API docs, and more! Much of it presented by a talking frog!](https://windups.gwil.co)

---

A unique typewriter (or, ahem, "windup") effect library for React.

This effect can be applied to strings _or pretty anything you can put in React's `children` prop_.

## What's it look like?

For strings:

```jsx
import { useWindup } from "windups";

function MyWindup() {
  const [text] = useWindup(
    "This string will be rendered character by character!"
  );

  return <div>{text}</div>;
}
```

For pretty much everything else:

```jsx
import { WindupChildren } from "windups";

function MyWindup() {
  return (
    <WindupChildren>
      {"It's fun to do"}
      <em>{"wild"}</em>
      {"stuff with text!"}
    </WindupChildren>
  );
}
```

There are additional APIs for:

- Controlling the pacing of the text!
- Adding pauses!
- Firing effects (e.g. when each character is typed, or at arbitrary points)!
- Ahead of render-time line-breaking!

---

Want to see a codebase that makes extensive, real-word use of this package? Source for the docs site is at https://github.com/sgwilym/windups-docs
