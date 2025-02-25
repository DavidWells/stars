---
repo: hstemplewski/react-dialog-hook
url: 'https://github.com/hstemplewski/react-dialog-hook'
homepage: 'https://www.npmjs.com/package/react-dialog-hook'
starredAt: '2022-01-30T01:08:50Z'
createdAt: '2021-11-03T13:07:53Z'
updatedAt: '2024-02-25T20:36:05Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.300Z'
description: React hook for manage dialogs state in promise based way.
tags:
  - async
  - asyncronous
  - dialog
  - hook
  - hooks
  - modal
  - promise
  - promises
  - react
  - react-dialog
  - react-dialog-hook
  - typescript
---

# React dialog hook

This hook was made to manage dialog state in React. The main feature is a possibility to get results passed as an argument of the `close` method as a returned value from the `open` dialog method. See [example](#example).

All data (params and results) are also available as returned object keys from the hook.

_It's fully written in Typescript._

## Usage

### Installing

```sh
npm i react-dialog-hook
```

### Importing

```typescript
import { useDialog } from "react-dialog-hook";
```

It is possible to use already prepared context for dialog:

```typescript
import { DialogConsumer, DialogProvider, DialogContext } from "react-dialog-hook";
```

### Example

Live demo in codesandbox is available here: https://codesandbox.io/s/react-dialog-hook-demo-b99uy?file=/src/App.tsx

```typescript
import { useDialog } from "react-hook-dialog";

function Dialog({ isOpen, close, params }) {
  const dialogResult = "RESULT"
  return (
    <>
      {isOpen && (
        <div>
          <h1>DIALOG HEADER</h1>
          <button onClick={() => close(dialogResult)}>close</button>
        </div>
      )}
    </>
  )
}

function Example() {
  const {
    isOpen
    open
    close
    params,
    results
  } = useDialog<ParamsType, ResultsType>({
    isDefaultOpen: false; // Set dialog open after first render
  });

  const openHandler = useCallback(async () => {
    const dialogParams = "PARAM"
    const resultsFromDialog = await open(dialogParams); // It returns results passed as argument to close method
  }, []);

  return (
    <>
      <button onClick={openHandler}>OPEN DIALOG</button>
      <Dialog isOpen={isOpen} close={close} params={params} />
    </>
  )
}
```

## Config

| Key           | Default | Description                                                                |
| ------------- | :-----: | -------------------------------------------------------------------------- |
| isDefaultOpen | `false` | Allows opening dialog on the first render without the user's intervention. |

## Results

| Key     | Type                        | Description                                                                                                                     |
| ------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| isOpen  | `boolean`                   | Opening state of dialog                                                                                                         |
| params  | `any`                       | Params which can be passed into hook via `open` method.                                                                         |
| results | `any`                       | Results passed into `close` method accesible via this key and also as returned value from `open` method.                        |
| open    | `async (params) => results` | Method which change dialog state to open and set params passed as argument. Returns results which were set from `close` method. |
| close   | `async (results) => void`   | Method which change dialog state to close and set results passed as argument.                                                   |

## Bugs reporting

To report a bug connected with lib, please open a new issue, assign one of the [authors](#authors) into it and add the `bug` label.

## Contributing

If you have any idea how to improve this lib, please fork this repo, suggest changes, make a PR and add one of the [authors](#authors) as a reviewer. Don't forget to add a proper description of this feature/bugfix.

# Authors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/hstemplewski"><img src="https://avatars.githubusercontent.com/u/25898331?s=460&u=a1489c65ba165f83cdbca99778f224882ea7cdff&v=4" width="100px;" alt=""/><br /><sub><b>Hubert Stemplewski</b></sub></a></td>
    <td align="center"><a href="https://github.com/benedyktdryl"><img src="https://avatars.githubusercontent.com/u/576068?s=400&u=60be2bede95aad024ead28cfc91ece157ec51f70&v=4" width="100px;" alt=""/><br /><sub><b>Benedykt Dryl</b></sub></a></td>
    <td align="center"><a href="https://github.com/witoldmetel"><img src="https://avatars.githubusercontent.com/u/31034370?v=4" width="100px;" alt=""/><br /><sub><b>Witold Mętel</b></sub></a></td>
  </tr>
</table>
