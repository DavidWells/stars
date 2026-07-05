---
repo: fatihege/downarea
url: 'https://github.com/fatihege/downarea'
homepage: ''
starredAt: '2022-01-19T22:06:51Z'
createdAt: '2021-07-04T12:51:10Z'
updatedAt: '2023-08-15T10:52:58Z'
language: TypeScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.353Z'
description: 'An easy to use, lightweight and extensible JavaScript markdown editor library.'
tags:
  - editor
  - javascript-library
  - markdown
  - markdown-editor
  - rich-text-editor
  - text-editor
---

![DownArea Logo](./img/downarea-500x200.png "DownArea Logo")

---

# DownArea
An easy to use, lightweight and extensible JavaScript markdown editor library.

---

> CDN Links
> > https://cdn.jsdelivr.net/gh/fatihege/downarea@1.3.0/src/downarea.min.js
> > https://cdn.jsdelivr.net/gh/fatihege/downarea@1.3.0/src/downarea.min.css
> 
> > https://cdn.jsdelivr.net/gh/fatihege/downarea@1.3.0/src/downarea.js
> > https://cdn.jsdelivr.net/gh/fatihege/downarea@1.3.0/src/downarea.css

---

## Tools

| Key         | Name             |
|        ---: | :---             |
| heading     | Headings         |
| bold        | Bold             |
| italic      | Italic           |
| bold-italic | Bold Italic      |
| link        | Links            | 
| image       | Image            |
| blockquote  | Blockquote       |
| u-list      | Unordered List   |
| o-list      | Ordered List     |
| sl-code     | Single Line Code |
| code-block  | Code Block       |

---

## Simple Usage

Usage with the `<div>` element:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DownArea</title>
    <link rel="stylesheet" href="downarea.min.css">
</head>
<body>

<div class="editor"></div>

<script src="downarea.min.js"></script>
<script>
    var downarea = new DownArea({
        elem: document.querySelector('.editor'), // Required - Container element
        resize: DownArea.RESIZE_BOTH, // Optional - RESIZE_OFF | RESIZE_VERTICAL | RESIZE_HORIZONTAL | RESIZE_BOTH
        hide: ['heading'], // Optional - Type the keys of the tools you want to hide here.
        name: 'body', // Optional - `name` attribute value.
        value: 'Lorem ipsum dolor sit amet.', // Optional - Textarea value.
    });
</script>
</body>
</html>
```
---

Usage with the `<textarea>` element:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DownArea</title>
    <link rel="stylesheet" href="downarea.min.css">
</head>
<body>

<textarea class="editor" name="content"></textarea>

<script src="downarea.min.js"></script>
<script>
    var downarea = new DownArea({
        elem: document.querySelector('.editor'), // Required - Textarea element.
        attr: { // Optional - Values of the `id` and `class` attributes. 
            id: ['editor-id'], // Optional - ID of the element.
            class: ['editor-class'], // Optional - Class of the element.
        },
        resize: DownArea.RESIZE_BOTH, // Optional - RESIZE_OFF | RESIZE_VERTICAL | RESIZE_HORIZONTAL | RESIZE_BOTH
        hide: ['heading'], // Optional - Type the keys of the tools you want to hide here.
        name: 'body', // Optional - `name` attribute value. Overwrites if the name attribute is defined.
        value: 'Lorem ipsum dolor sit amet.', // Optional - Textarea value.
    });
</script>
</body>
</html>
```

---

## All Arguments

| Key    | Description                                   |
| ------ | --------------------------------------------- |
| elem   | DownArea container DIV or TextArea            |
| attr   | If the `elem` key is given the `textarea` element, the values of the ID and class attributes of the container element. |
| resize | Editor's resizer options.                     |
| hide   | Tools to hide.                                |
| name   | The value of the textarea's `name` attribute. |
| value  | The content of the textarea.                  |

---

## Tool Methods (Public Methods)

| Tool Key    | Method                           | Args          |
| ----------- | -------------------------------- | ------------- |
| heading-1   | `.addHeading(level: number = 1)` | *default (1)* |
| heading-2   | `.addHeading(level: number = 1)` | 2             |
| heading-3   | `.addHeading(level: number = 1)` | 3             |
| heading-4   | `.addHeading(level: number = 1)` | 4             |
| heading-5   | `.addHeading(level: number = 1)` | 5             |
| heading-6   | `.addHeading(level: number = 1)` | 6             |
| bold        | `.addBold()`                     | *empty*       |
| italic      | `.addItalic()`                   | *empty*       |
| bold-italic | `.addItalic()`                   | *empty*       |
| normal-link | `.addLink(type: number = 0)`     | *default (0)* |
| quick-link  | `.addLink(type: number = 0)`     | 1             |
| email       | `.addEmail()`                    | *empty*       |
| image       | `.addImage()`                    | *empty*       |
| blockquote  | `.addBlockquote()`               | *empty*       |
| u-list      | `.addUnorderedList()`            | *empty*       |
| o-list      | `.addOrderedList()`              | *empty*       |
| sl-code     | `.addSingleLineCode()`           | *empty*       |
| code-block  | `.addCodeBlock()`                | *empty*       |
