---
repo: cpojer/copy-as-markdown
url: 'https://github.com/cpojer/copy-as-markdown'
homepage: ''
starredAt: '2021-05-12T22:44:38Z'
createdAt: '2021-05-03T05:34:19Z'
updatedAt: '2024-05-10T09:18:20Z'
language: TypeScript
license: MIT
branch: main
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:43.180Z'
description: A React hook to copy text as Markdown.
tags: []
---

# copy-as-markdown

A React hook to copy text as Markdown.

## Why?

Copying text as Markdown is helpful for blog posts or documentation pages that were authored in Markdown and may be copied into other documents or code comments. Instead of copying plain text or rich text, this utility will copy the selected content as Markdown.

![Example](https://raw.githubusercontent.com/cpojer/copy-as-markdown/main/example.gif)

## See it in action

Check out blog posts on cpojer.net, for example [Principles of Developer Experience](https://cpojer.net/posts/principles-of-devx), and copy text within the article. The text will be copied as Markdown.

## Usage

Install:

```
yarn add @nkzw/copy-as-markdown
```

Use:

```jsx
import useCopyAsMarkdown from '@nkzw/copy-as-markdown';

export default function MyComponent() {
  const setRef = useCopyAsMarkdown();

  return (
    <div ref={setRef}>
      <h1>When copied, this will turn into Markdown</h1>
      Any <em>rich content</em> inside of this container will be copied as <strong>
        Markdown
      </strong>.
    </div>
  );
}
```

This library uses [`turndown`](https://github.com/domchristie/turndown) to convert HTML to Markdown. You can pass any [`turndown` Options](https://github.com/domchristie/turndown#options) to the `useCopyAsMarkdown` hook:

```jsx
const setRef = useCopyAsMarkdown({
  bulletListMarker: '-',
  strongDelimiter: '__',
});
```
