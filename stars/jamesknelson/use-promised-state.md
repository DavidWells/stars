---
repo: jamesknelson/use-promised-state
url: 'https://github.com/jamesknelson/use-promised-state'
homepage: null
starredAt: '2019-10-20T01:19:48Z'
createdAt: '2019-10-18T04:19:08Z'
updatedAt: '2019-11-18T14:39:41Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:15.387Z'
description: A state hook for React that doesn't whinge if used once used after unmount.
tags: []
---

# use-promised-state

<a href="https://www.npmjs.com/package/use-promised-state"><img alt="NPM" src="https://img.shields.io/npm/v/use-promised-state.svg"></a>


## What?

Like `useState()`, but it doesn't complain when used after unmount.

```bash
yarn add use-promised-state
```

```js
import usePromisedState from 'use-promised-state'

function MyComponent(props) {
  let [state, setState] = usePromisedState(props.initialValue)

  // ...
}
```

[See demo](https://frontarm.com/demoboard/?id=acaa79a8-a64c-4d8b-8a91-a03b519988f4)


## Why?

When working with Promises in React, you'll sometimes come across errors like this one:

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

While there are a number of situations where you *do* have a memory leak, there's another common situation where this occurs: *you've called `setState()` from a promise handler.*

For example:

```js
const [username, setUsername] = useState('')
const [availability, setAvailability] = useState({})

const handleChange = event => {
  const username = event.target.value
  setUsername(username)
  if (username !== availability.username) {
    getUsernameAvailability(username).then(
      // If the component is unmounted before the username's
      // availability is known, then calling `setAvailability`
      // will result in the above error.
      isAvailable => setAvailability({ username, isAvailable })
    )
  }
}
```

Because JavaScript promises are not cancellable, there's no way to avoid the fact that the handler will eventually be called -- you haven't actually got a memory leak. But you *do* have an error, and *fixing* that error has taken a lot of code -- until now.

The `usePromisedState()` hook is just like `useState()`. The only difference is that **it won't emit an error on the first time that you try to set the state after unmount.**

```js
const [availability, setAvailability] = usePromisedState({})
```

The `usePromisedState()` hook is a signal that *yes, I know that calling setState after unmount doesn't do anything, and I don't care.* It makes working with promises easier, and it'll still emit an error if you *keep* trying to set state after unmount, because that probably *does* indicate a memory leak.

