---
repo: juliankrispel/react-text-selection-popover
url: 'https://github.com/juliankrispel/react-text-selection-popover'
homepage: 'https://juliankrispel.github.io/react-text-selection-popover'
starredAt: '2018-07-24T14:46:09Z'
createdAt: '2018-07-12T21:24:21Z'
updatedAt: '2025-02-24T15:47:42Z'
language: TypeScript
license: NA
branch: master
stars: 290
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:18.199Z'
description: Selection based Text UI made easy
tags:
  - draft-js
  - popover
  - react
  - rich-text-editor
  - slatejs
  - text-editor
  - text-selection
  - wysiwyg-editor
---

# react-text-selection-popover

A react component that lets you render a popover in relation to the current text selection. 

[![NPM](https://img.shields.io/npm/v/react-text-selection-popover.svg)](https://www.npmjs.com/package/react-text-selection-popover) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save react-text-selection-popover
```

## Usage

```tsx
import css from '@emotion/css'

<Popover
  render={
    ({ clientRect, isCollapsed, textContent }) => {
      if (clientRect == null || isCollapsed) return null

      // I'm using emotion for this example but you can use anything really
      const style = css`
        position: absolute;
        left: ${clientRect.left + clientRect.width / 2}px;
        top: ${clientRect.top - 40}px;
        margin-left: -75px;
        width: 150px;
        background: blue;
        font-size: 0.7em;
        pointer-events: none;
        text-align: center;
        color: white;
        border-radius: 3px;
      `

      return <div className={style}>
        Selecting {(textContent || '').length} characters
      </div>
    }
  }
/>
```

### Props

| name | type | description |
| --- | ---- | --- |
| `render`  | `({ clientRect, isCollapsed, textContent }) => {}` | __required__ Render prop for rendering your popover, see above for usage |
| `mount`     | `HTMLElement` |  Dom Element that Popover will be rendered into (This component uses [React Portals](https://reactjs.org/docs/portals.html). Defaults to `document.body` |
| `target`    | `HTMLElement` | Dom Element which the popover is constrained to |

# Shoutouts

This was originally written during some freelance work for [Spectrum](https://spectrum.chat/). Shoutout to their awesomeness for letting me do all my work for them in the open!

## Work with me?

I build editors for companies, or help their teams do so. Hit me up on [my website](http://jkrsp.com) to get in touch about a project.
