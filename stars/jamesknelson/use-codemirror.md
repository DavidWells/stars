---
repo: jamesknelson/use-codemirror
url: 'https://github.com/jamesknelson/use-codemirror'
homepage: null
starredAt: '2020-09-13T00:44:46Z'
createdAt: '2019-11-04T11:00:47Z'
updatedAt: '2023-10-13T18:02:42Z'
language: JavaScript
license: MIT
branch: master
stars: 68
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:33.747Z'
description: CodeMirror support for React
tags: []
---

# use-codemirror

<a href="https://www.npmjs.com/package/use-codemirror"><img alt="NPM" src="https://img.shields.io/npm/v/use-codemirror.svg"></a>

**Add the excellent [CodeMirror](https://codemirror.net/) editor to your React app with a hook.**

📌 Supports multiple documents (e.g. for tabbed editors)<br />
📌 Built with TypeScript <br />
📌 Works with SSR<br />
📌 Built-in lazy loading for CodeMirror itself<br />
📌 Allows easy access to the underlying instance<br />

## Getting started

```bash
yarn add use-codemirror
```

Create your own Editor component by calling `useCodeMirror`, then passing the returned object's `ref` to a `<pre>` containing your initial value.

```jsx
import { useCodeMirror } from 'use-codemirror'

export function Editor({ className, style, ...options }) {
  let codeMirror = useCodeMirror(options)

  return (
    <StyledCodeMirrorEditor className={className} style={style}>
      <pre ref={codeMirror.ref} className={codeMirror.config.theme}>
        {options.value}
      </pre>
    </StyledCodeMirrorEditor>
  )
}
```

Then use your Editor:

```js
function App() {
  let [code, setCode] = useState(initialCode)

  return (
      <CodeMirrorEditor
        value={code}
        onChange={setCode}

        // Supports multiple documents with their own history,
        // and automatic syntax highlighting via file extension.
        docName="test.js"

        // Pass config to CodeMirror itself
        config={{
          autoCloseBrackets: false,
        }}
      />
  );
}
```

See the `example` directory for a working example.

## API

You can pass in the following settings:

```typescript
interface UseCodeMirrorOptions {
  cursor?: CodeMirror.Position
  doc?: CodeMirror.Doc
  docName?: string
  scroll?: SetScrollOptions
  selection?: { ranges: Array<SetSelectionOptions>; focus?: boolean }
  value: string

  config?: CodeMirror.EditorConfiguration

  onBlur?: () => void
  onChange?: (
    value: string,
    docName: string | undefined,
    changes: CodeMirror.EditorChange[],
    doc: CodeMirror.Doc,
  ) => void
  onCursor?: (data: CodeMirror.Position) => void
  onFocus?: () => void
  onGutterClick?: (lineNumber: number, gutter: string, event: Event) => void
  onScroll?: (scrollInfo: CodeMirror.ScrollInfo) => void
  onSelection?: (data: any) => void
  onViewportChange?: (start: number, end: number) => void

  // Only used on initial run
  importCodeMirror?: () => Promise<any>
  importCodeMirrorAddons?: () => Promise<any>
}
```

The returned `codeMirror` object has the following shape:

```typescript
interface ReactCodeMirror {
  // Pass this to a `<pre>` to turn it into a CodeMirror
  ref: CodeMirrorRefFunction

  // The configuration, with any default settings
  config: CodeMirror.EditorConfiguration

  // The underlying CodeMirror instance
  editor?: CodeMirror.Editor

  focus(): void
}
```

## Acknowledgements

This projects takes a lot of inspiration (and a bit of code) from [react-codemirror2](https://github.com/scniro/react-codemirror2/blob/a633e7dd673ddf5bdb07e2ed664a03aa47159bfa/src/index.tsx).

## License

use-codemirror is MIT licensed.
