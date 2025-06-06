---
repo: arnaudambro/react-swipe-to-delete-ios
url: 'https://github.com/arnaudambro/react-swipe-to-delete-ios'
homepage: 'https://arnaudambro.github.io/react-swipe-to-delete-ios/'
starredAt: '2025-03-25T16:08:32Z'
createdAt: '2019-07-07T11:37:08Z'
updatedAt: '2025-03-25T16:08:32Z'
language: TypeScript
license: NA
branch: master
stars: 52
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-29T22:30:02.319Z'
description: A simple React component to reproduce the way iOS deletes an item in a list
tags: []
---

# react-swipe-to-delete-ios

![Version](https://img.shields.io/badge/version-2.1.0-blue)

A simple React component to reproduce the way iOS deletes an item in a list. 0 dependency.
[Demo](https://arnaudambro.github.io/react-swipe-to-delete-ios)

![GIF Demo](./demo.gif?raw=true "Title")

Config very much insipred by [this post](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe)

## Installation

```
npm i --save react-swipe-to-delete-ios
```

```
yarn add react-swipe-to-delete-ios
```

## Usage

```js
import React from 'react'
import SwipeToDelete from 'react-swipe-to-delete-ios'

...

<SwipeToDelete
  onDelete={handleDelete} // required
  // optional
  height={50} // default
  transitionDuration={250} // default
  deleteWidth={75} // default
  deleteThreshold={75} // default
  showDeleteAction={true} //default
  deleteColor="rgba(252, 58, 48, 1.00)" // default
  deleteText="Delete" // default
  deleteComponent={<DeleteComponent/>} // not default
  disabled={false} // default
  id="swiper-1" // not default
  className="my-swiper" // not default
  rtl={false} // default
  onDeleteConfirm={(onSuccess, onCancel) => {
    // not default - default is null
    if (window.confirm("Do you really want to delete this item ?")) {
      onSuccess();
    } else {
      onCancel();
    }
  }}
>
  {children}
</SwipeToDelete>
```

## Props

| Prop               | Type        | Default                                    |
| ------------------ | ----------- | ------------------------------------------ |
| **onDelete**       | function    | _required_                                 |
| onDeleteConfirm    | function    | null                                       |
| height             | number      | 50                                         |
| transitionDuration | number (ms) | 250                                        |
| deleteWidth        | number (px) | 75                                         |
| deleteThreshold    | number (%)  | 75                                         |
| showDeleteAction   | bool        | true                                       |
| deleteColor        | string      | "rgba(252, 58, 48, 1.00)"                  |
| deleteText         | string      | "Delete" (_deleteText or deleteComponent_) |
| deleteComponent    | node        | null (_deleteText or deleteComponent_)     |
| disabled           | bool        | false                                      |
| rtl                | bool        | false                                      |
| id                 | string      | ''                                         |
| className          | string      | ''                                         |

## Component structure

Knowing the Component structure might help you customise with your own CSS.

```jsx
<div id={id} className={`rstdi${deleting ? " deleting" : ""} ${className}`}>
  <div className={`delete${deleting ? " deleting" : ""}`}>
    <button>Delete</button>
  </div>
  <div className={`content${deleting ? " deleting" : ""}${!touching ? " transition" : ""}`}>
    {children}
  </div>
</div>
```

## Changelog

### v2

rewrite the whole library:

- remove `styled-components` - 0 dependency
- rewrite in Hooks
- `height` is now optional
- update `README`
- `onDeleteConfirm` is now in production
- new props `className` and `id`
- React > 16.18 (with Hooks) as peerDependencies
