---
repo: mfix22/actionsack
url: 'https://github.com/mfix22/actionsack'
homepage: ''
starredAt: '2022-02-24T06:48:31Z'
createdAt: '2019-08-08T20:19:47Z'
updatedAt: '2024-06-18T09:44:21Z'
language: JavaScript
license: MIT
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:09.749Z'
description: "\U0001F392React UX components for handling common interactions"
tags: []
---

# Action Sack 🎒

> Collection of React user-experience hooks + containers for common interactions

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## Getting Started

```bash
yarn add actionsack
```

## Usage

### `useAsyncCallback`

> 🎣 `hook`

Takes any function and gives you a loading and error state. Good for handling
general asynchronous interactions.

```js
import { useAsyncCallback } from 'actionsack'

function MyAsyncButton(props) {
  const [onClick, { loading, error, data }] = useAsyncCallback(props.onClick)

  return (
    <>
      {error && <span>{error}!</span>}
      <button onClick={onClick}>{loading ? 'Saving...' : 'Save'}</button>
      {data && <span>Success! {data}</span>}
    </>
  )
}
```

### `useKeyboardListener`

> 🎣 `hook`

Pass it a keyboard key and a handler to automatically listen for keyboard clicks.

##### Example

```js
import { useKeyboardListener } from 'actionsack'

function Modal(props) {
  useKeyboardListener('Escape', props.onClose)

  return <div>Hello World</div>
}
```

### `useTempValue`

> `hook` 🎣

Hook that gives you a temporary state value that you can either commit with `submit` or revert with `reset`.

##### Example

```javascript
import { useTempValue } from 'actionsack'

function MyForm(props) {
  const initialName = props.name
  const { hasChanged, value, onInputChange, submit, reset } = useTempValue(initialName)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input value={value || ''} onChange={onInputChange} />
      <button disabled={!hasChanged} onClick={submit}>
        Submit
      </button>
      <button disabled={!hasChanged} onClick={reset}>
        Cancel
      </button>
    </form>
  )
}
```

### `useCopyTextHandler`

> `hook` 🎣

Creates an `onClick` handler that copies the text you pass in, and updates the `copied` field accordingly.
**Note**: you must pass `onClick` to a `<button>` in order to copy the text.

For more information about `options`, see [API](https://github.com/sudodoki/copy-to-clipboard#api).

##### Example

```javascript
import { useCopyTextHandler } from 'actionsack'

const options = {
  interval: 2 * 1000, // 2 seconds
  format: "text/html",
}

function MyCopyButton() {
  const { onClick, copied } = useCopyTextHandler('https://github.com/mfix22/actionsack', options)

  return <button onClick={onClick}>{copied ? 'COPIED!' : 'Copy URL'}</button>
}
```

### `useOnline`

> `hook` 🎣

Subscribes to whether the network is online or off

##### Example

```javascript
import { useOnline } from 'actionsack'

function MyComponent() {
  const online = useOnline()
  return <span>You are {online ? 'online' : 'offline'}</span>
}
```

### `TimeWindow`

Show children after a certain amount of time, for a certain amount of time.

##### Example

```js
import { TimeWindow } from 'actionsack'

function MyMessage() {
  return (
    <TimeWindow showAfter={3000} showUntil={6000}>
      Timed Message!
    </TimeWindow>
  )
}
```

### `Modal`

> `wrapper HOC` component

Class controlled Modal component with click-away and ESC-key to close

##### Example

```javascript
import {Modal} from 'actionsack'

<Modal open={this.state.open} onClickAway={() => this.setState({ open: false})}>
  <form>
    <input placeholder="Enter name here . . ." />
  </form>
</>
```

### License

MIT
