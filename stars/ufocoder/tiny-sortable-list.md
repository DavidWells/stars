---
repo: ufocoder/tiny-sortable-list
url: 'https://github.com/ufocoder/tiny-sortable-list'
homepage: ''
starredAt: '2021-08-29T06:10:03Z'
createdAt: '2021-08-22T14:52:50Z'
updatedAt: '2024-02-14T21:36:51Z'
language: JavaScript
license: NA
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:46.790Z'
description: Tiny react component for sortable list
tags:
  - drag-and-drop
  - hacktoberfest
  - react
  - sortable-lists
---

Tiny sortable list
==================

![Build](https://github.com/ufocoder/tiny-sortable-list/actions/workflows/build.yml/badge.svg)

React component for sortable list based on HTML [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)


## Features

- No dependencies
- Mobile touch support
- Horizonal and vertical lists

## Usage

Minimal working example

```typescript
import { useState } from 'react'
import { SortableList, SortableItemProps } from 'tiny-sortable-list'

interface Item {
  title: string
}

const itemStyle = {
  padding: '20px 10px',
  background: 'white',
  border: '2px black solid'
};

function ItemVerticalComponent(props: SortableItemProps<Item>) {
  const { item, isDragged, isDragItemInsertAfter, isDragItemInsertBefore } = props

  return (
    <div
      style={{
        ...itemStyle,
        opacity: isDragged ? '0.3' : undefined,
        borderTopColor: isDragItemInsertBefore ? 'yellow' : 'black',
        borderBottomColor: isDragItemInsertAfter ? 'yellow' : 'black',
      }}>
        {item.title}
    </div>
  )
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { title: 'item #1'},
    { title: 'item #2'},
    { title: 'item #3'},
    { title: 'item #4'},
    { title: 'item #5'},
  ])

  return (
    <SortableList items={items} setItems={setItems}>
      {props => <ItemVerticalComponent {...props} />}
    </SortableList>
  )
};
```

## Demo

![demo](./demo.gif)

## Note

Component use [dragdroptouch](https://github.com/Bernardo-Castilho/dragdroptouch) pollyfill source under the hood
