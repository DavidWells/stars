---
repo: val-town/codemirror-codeium
url: 'https://github.com/val-town/codemirror-codeium'
homepage: 'https://val-town.github.io/codemirror-codeium/'
starredAt: '2024-03-25T22:55:20Z'
createdAt: '2024-03-22T21:02:26Z'
updatedAt: '2025-02-19T07:50:12Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 72
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:33.565Z'
description: Codeium code completion integration for CodeMirror 6
tags:
  - codeium
  - codemirror
  - codemirror6
  - copilot
---

# codemirror-codeium

[![npm](https://img.shields.io/npm/v/@valtown/codemirror-codeium)](https://www.npmjs.com/package/@valtown/codemirror-codeium)

```mermaid
flowchart TD
	Keystroke --> SetTimeout
	Keystroke -->|ignoreUpdate| Cancelled
	SetTimeout -->|edits| Cancelled
	SetTimeout --> GetCompletions
	GetCompletions -->|edits| Cancelled
	X[ ] -->|focusChanged| Cancelled
	GetCompletions --> DispatchEdits
	DispatchEdits -->|mousedown| Cancelled
	DispatchEdits --> SameKeyCommand
	SameKeyCommand -->|tab| AcceptSuggestionCommand
```

_Very experimental and unofficial_

Copilot-like ghost text code from [modeling-app](https://github.com/KittyCAD/modeling-app)
by [Jess Frazelle](https://github.com/jessfraz) and based on [Cursor](https://cursor.sh/).

## Documentation

See the [demo source code](https://github.com/val-town/codemirror-codeium/tree/main/demo) for
a reference to how it's used.

```ts
import { copilotPlugin } from "@valtown/codemirror-codeium";

// This is a CodeMirror extension
copilotPlugin();
```

### CSS

This adds a `.ghostText` class to CodeMirror decorations for the AI-written
text. You can add your own style for this class. The demo uses this style:

```css
.cm-ghostText,
.cm-ghostText * {
  opacity: 0.6;
  filter: grayscale(20%);
  cursor: pointer;
}

.cm-ghostText:hover {
  background: #eee;
}
```

### Architecture

This makes requests against the [Codeium](https://codeium.com/) hosted product,
using their Protocol Buffer-based interface. That's what the `buf` and `connectrpc`
modules are doing - generating and using bindings to their service.

The extension is a composite of facets, decorations, state fields, and more
that are encapsulated.
