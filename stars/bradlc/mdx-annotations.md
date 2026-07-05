---
repo: bradlc/mdx-annotations
url: 'https://github.com/bradlc/mdx-annotations'
homepage: ''
starredAt: '2022-12-30T00:53:13Z'
createdAt: '2022-11-30T10:28:08Z'
updatedAt: '2025-02-24T13:02:41Z'
language: JavaScript
license: MIT
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:00.994Z'
description: Markdoc-style annotations for MDX
tags:
  - markdoc
  - markdown
  - mdx
  - recma
  - rehype
  - remark
---

# mdx-annotations

> [Markdoc](https://markdoc.dev/)-style annotations for [MDX](https://mdxjs.com/)

## Installation

```
npm install mdx-annotations
```

To maximise compatibility `mdx-annotations` is provided as **three separate plugins that must be used together**:

```js
import { compile } from '@mdx-js/mdx'
import { mdxAnnotations } from 'mdx-annotations'

let mdx = `# Hello, world! {{ id: 'intro' }}`

await compile(mdx, {
  remarkPlugins: [mdxAnnotations.remark],
  rehypePlugins: [mdxAnnotations.rehype],
  recmaPlugins: [mdxAnnotations.recma],
})
```

> **Note**\
> It is recommended to include each plugin _first_ in their respective plugin arrays.

## Usage

An annotation is a JavaScript object associated with an MDX node. The object properties are passed to the resulting JSX element as props.

**Input:**

```markdown
# Hello, world! {{ id: 'intro' }}
```

**Output:**

```html
<h1 id="intro">Hello, world!</h1>
```

## Examples

<details>
  <summary>Headings</summary>

```markdown
# Hello, world! {{ id: 'intro' }}

## Hello, world! {{ id: 'intro' }}

### Hello, world! {{ id: 'intro' }}

#### Hello, world! {{ id: 'intro' }}
```

</details>

<details>
  <summary>List items</summary>

```markdown
- Hello, world! {{ id: 'intro' }}
```

When a list item contains multiple children the annotation is attached to the child:

**Input:**

```markdown
- Hello, world! {{ className: 'text-lg' }}

  Lorem ipsum {{ className: 'text-sm' }}
```

**Output:**

```html
<ul>
  <li>
    <p className="text-lg">Hello, world!</p>
    <p className="text-sm">Lorem ipsum</p>
  </li>
</ul>
```

</details>

<details>
  <summary>Code</summary>

````markdown
```{{ title: 'Example' }}
Hello, world!
```

```php {{ title: 'Example' }}
echo 'Hello, world!';
```
````

</details>

<details>
  <summary>Thematic breaks</summary>

```markdown
--- {{ className: 'my-10' }}

*** {{ className: 'my-10' }}
```

</details>

<details>
  <summary>Inline elements</summary>

To annotate an inline element ensure that there is no whitespace between the element and the annotation:

```markdown
**Hello world**{{ className: 'text-red-500' }}
_Hello world_{{ className: 'text-red-500' }}
`Hello world`{{ className: 'text-red-500' }}
[Hello world](#){{ className: 'text-red-500' }}
![](/img.png){{ className: 'object-cover' }}
```

</details>
