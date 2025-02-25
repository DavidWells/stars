---
repo: Open-Federation/json-schema-editor-visual
url: 'https://github.com/Open-Federation/json-schema-editor-visual'
homepage: 'https://hellosean1025.github.io/json-schema-visual-editor/'
starredAt: '2022-01-19T22:32:23Z'
createdAt: '2018-03-13T02:37:55Z'
updatedAt: '2025-02-17T05:07:19Z'
language: JavaScript
license: MIT
branch: master
stars: 1040
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.155Z'
description: 'A json-schema editor of high efficient and easy-to-use, base on React.'
tags: []
---

# json-schema-editor-visual
A json-schema editor of high efficient and easy-to-use, base on React.

![avatar](json-schema-editor-visual.jpg)

## Usage
```
npm install json-schema-editor-visual
```

```js
const option = {}
import 'antd/dist/antd.css'
require('json-schema-editor-visual/dist/main.css')
const schemaEditor = require("json-schema-editor-visual/dist/main.js");
const SchemaEditor = schemaEditor(option)

render(
    <SchemaEditor />,
  document.getElementById('root')
)
```

## Option Object

| name | desc | default |
| ---- | ----------- | --------- |
| `lang` | language, support `en_US` or `zh_CN` | en_US 

## SchemaEditor Props

| name | type | default | desc
| ---- | ----------- | --------- | --------- |
| `data` | string | null | the data of editor
| `onChange`| function | null | 
| `showEditor` | boolean | false | 

## Links
https://github.com/zyqwst/json-schema-editor-vue
