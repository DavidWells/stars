---
repo: mfix22/eitherx
url: 'https://github.com/mfix22/eitherx'
homepage: 'https://www.npmjs.com/package/eitherx'
starredAt: '2022-02-24T06:49:35Z'
createdAt: '2017-10-15T20:02:37Z'
updatedAt: '2024-11-21T06:29:41Z'
language: JavaScript
license: MIT
branch: master
stars: 91
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:09.537Z'
description: ':pill: Your go-to, prescribed, error-boundary component for React'
tags:
  - binary
  - boundaries
  - either
  - error-boundaries
  - express
  - render-prop
  - wrapper-component
---

# `<Eitherx />`

:pill: Super simple, reusable either-or [error boundaries][react-error-docs] for React. Your go-to, prescribed, error-boundary component.

[![bundle size](https://badgen.net/bundlephobia/min/eitherx)](https://bundlephobia.com/result?p=eitherx)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![MIT License](https://img.shields.io/github/license/mfix22/eitherx.svg)](https://github.com/mfix22/eitherx/blob/master/LICENSE)

## Usage

```shell
$ npm i --save eitherx
```

```javascript
import Either from 'eitherx'

// Wrapper-component Style
<Either>
  {/* Either . . . */}
  <p>"Happy Child 😄"</p>
  {/* Or . . . */}
  <p>"Error child ☹️ (but at least your UI is happy)"</p>
</Either>

// OR use the `render` and `catchError` props

// Render-prop Style
<Either
  render={() => (<p>"Happy Child 😄"</p>)}
  catchError={({ error }) => (
    <div>
      <p>{`Error: ${error}`}</p>
    </div>
  )}
/>
```

### Wrapper Component Style

`Eitherx` either renders the first child component, unless an error occurred while rendering, then the second child is rendered. Easy enough 😄.

If you do not pass a second child, and an error occurs, `null` will be return to React to render.

### Render-prop Style

Using this style, you must pass a function for both `render` _and_ `catchError`. If an error occurs, the component
returned from `catchError` will be rendered. Otherwise `Eitherx` will render the component returned from `render`.

The `catchError` function receives an object with the field `error` set, both of which are passed directly from
[React Error Boundaries][react-error-docs-target].

[react-error-docs]: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
[react-error-docs-target]: https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries

### Handling Errors

With either style, you can pass an `handleError` callback prop to add additional error handling, logging, etc.

##### Example

```javascript
<Eitherx
  handleError={({ error, info }) => {
    console.log(info)
    console.error(error)
  }}
  render={() => <Component>"Render Prop"</Component>}
  catchError={() => <p>"Catch Prop"</p>}
/>
```
