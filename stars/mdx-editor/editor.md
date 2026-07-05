---
repo: mdx-editor/editor
url: 'https://github.com/mdx-editor/editor'
homepage: 'https://mdxeditor.dev'
starredAt: '2024-12-21T23:30:32Z'
createdAt: '2023-01-19T09:45:10Z'
updatedAt: '2025-02-25T16:28:27Z'
language: TypeScript
license: MIT
branch: main
stars: 2342
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:14.881Z'
description: A rich text editor React component for markdown
tags:
  - editor
  - lexical
  - markdown
  - markdown-editor
  - mdx
  - react
  - reactjs
  - rich-text-editor
---

# MDXEditor

![npm](https://img.shields.io/npm/v/@mdxeditor/editor)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@mdxeditor/editor)

> Because markdown editing can be even more delightful.

MDXEditor is an open-source React component that allows users to author markdown documents naturally. Just like in Google docs or Notion. [See the live demo](https://mdxeditor.dev/editor/demo) that has all features turned on. 
The component supports the core markdown syntax and certain extensions, including tables, images, code blocks, etc. It also allows users to edit JSX components with a built-in JSX editor or a custom one.

```jsx
import {MDXEditor, headingsPlugin} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export default function App() {
  return <MDXEditor markdown={'# Hello World'} plugins={[headingsPlugin()]} />;
}
```
## Get Started

The best place to get started using the component is the [documentation](https://mdxeditor.dev/editor/docs/getting-started).

## Help and support

If you find a bug, check if something similar is not reported already in the [issues](https://github.com/mdx-editor/editor/issues). If not, [create a new issue](https://github.com/mdx-editor/editor/issues/new?assignees=&labels=bug&projects=&template=1.bug.md&title=%5BBUG%5D).

If you're integrating the component in your commercial project and need dedicated assistance with your issues in exchange of sponsorship, [contact me over email](mailto:petyo@mdxeditor.dev).

If you want to discuss ideas [join the Discord server](https://discord.gg/4q7U2Hc) or start a discussion in the [Discussions](https://github.com/mdx-editor/editor/discussions) section.

## License

MIT &copy; Petyo Ivanov.
