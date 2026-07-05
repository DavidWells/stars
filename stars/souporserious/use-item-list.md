---
repo: souporserious/use-item-list
url: 'https://github.com/souporserious/use-item-list'
homepage: null
starredAt: '2021-04-08T01:11:52Z'
createdAt: '2020-03-18T01:39:38Z'
updatedAt: '2024-03-07T05:34:26Z'
language: JavaScript
license: NA
branch: main
stars: 74
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.352Z'
description: A primitive React hook used to coordinate indexed collections effortlessly.
tags: []
---

# 🕹 useItemList

A primitive React hook used to coordinate indexed collections effortlessly.

## Why?

The ergonmics of managing indexes in React is lacking. When building lower level components for accessibility purposes, managing indexes can become painful and expose internals of an API that consumers shouldn't necessarily need to know about.

This library aims to solve managing indexed collections of items as easily as possible while letting users still compose, optimize, and use React like they are used to.

## API

```jsx
import React, { useRef } from 'react'
import { useItemList } from 'use-item-list'

function Item({ useItem, children }) {
  const ref = useRef()
  const { id, index, highlight, select, selected, useHighlighted } = useItem({
    ref, // required ref used to scroll item into view when highlighted
    value: children, // value passed back in useItemList onSelect
    disabled: false, // prevents item from being highlighted/selected
    text: null, // used for highlightItemByString function
  })
  return (
    <li ref={ref} id={id}>
      {children}
    </li>
  )
}

function List({ value, onChange }) {
  const {
    controllerId,
    listId,
    getHighlightedIndex,
    getHighlightedItem,
    setHighlightedItem,
    moveHighlightedItem,
    clearHighlightedItem,
    selectHighlightedItem,
    useHighlightedItemId,
    highlightItemByString,
    useItem,
  } = useItemList({
    selected: value, // the current selected value
    onSelect: onChange, // callback when item has been selected
  })
  return (
    <ul>
      <Item useItem={useItem}>Item 1</Item>
      <Item useItem={useItem}>Item 2</Item>
      <Item useItem={useItem}>Item 3</Item>
    </ul>
  )
}
```

## Usage

In a somewhat trivial example, we can see how to build a custom select menu:

```jsx
import React, { createContext, useContext, useRef } from 'react'
import { useItemList } from 'use-item-list'

const SelectContext = createContext()

export function Select({ children, value, onChange }) {
  const itemList = useItemList({
    selected: value,
    onSelect: onChange,
  })
  const itemId = itemList.useHighlightedItemId()
  return (
    <SelectContext.Provider value={itemList}>
      <ul
        id={itemList.listId}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={itemId}
        style={{ padding: 0 }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            itemList.moveHighlightedItem(-1)
          }
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            itemList.moveHighlightedItem(1)
          }
          if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault()
            itemList.selectHighlightedItem()
          }
          itemList.highlightItemByString(event)
        }}
      >
        {children}
      </ul>
    </SelectContext.Provider>
  )
}

export function Option({ children, text, value }) {
  const { useItem, clearHighlightedItem } = useContext(SelectContext)
  const ref = useRef()
  const { id, highlight, select, selected, useHighlighted } = useItem({
    ref,
    text,
    value,
  })
  const highlighted = useHighlighted()
  return (
    <li
      ref={ref}
      id={id}
      role="option"
      aria-selected={selected}
      onMouseOver={highlight}
      onMouseOut={clearHighlightedItem}
      onMouseDown={select}
    >
      {children} {selected && '✅'}
    </li>
  )
}
```

Now users of our component have an easy-to-use API that resembles the ergonomics of the web's select element:

```jsx
<Select>
  <Option value="apple">Apple 🍎</Option>
  <Option value="banana">Banana 🍌</Option>
  <Option value="pear">Pear 🍐</Option>
</Select>
```

Please note this is not a fully accessible example. See the examples directory for more full-fledged examples.
