---
repo: scottrippey/react-use-event-hook
url: 'https://github.com/scottrippey/react-use-event-hook'
homepage: 'https://www.npmjs.com/package/react-use-event-hook'
starredAt: '2025-02-26T22:30:40Z'
createdAt: '2022-05-05T17:09:09Z'
updatedAt: '2025-02-26T22:30:41Z'
language: TypeScript
license: MIT
branch: main
stars: 224
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:47.669Z'
description: 'Same as React''s useCallback, but returns a stable reference.'
tags:
  - react
  - react-memo
  - usecallback
  - useevent
  - useref
---

# react-use-event-hook
Same as React's `useCallback`, but returns a stable reference.

This library is a user-land implementation of the `useEvent` hook, [proposed in this RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md).

# Installation

```sh
npm install react-use-event-hook
```

# Usage
(this example was copied from the RFC)

You can wrap any event handler into `useEvent`.

```js
import useEvent from 'react-use-event-hook';

function Chat() {
  const [text, setText] = useState('');

  const onClick = useEvent(() => {
    sendMessage(text);
  });

  return <SendButton onClick={onClick} />;
}
```

The code inside `useEvent` “sees” the props/state values at the time of the call. 
The returned function has a stable identity even if the props/state it references change. 
There is no dependency array.

# See more
- [The proposed `useEvent` RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)
- [A hearty discussion on the naming, and edge-case considerations, of this hook](https://github.com/reactjs/rfcs/pull/220)
