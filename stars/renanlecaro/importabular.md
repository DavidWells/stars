---
repo: renanlecaro/importabular
url: 'https://github.com/renanlecaro/importabular'
homepage: 'https://importabular.lecaro.me/'
starredAt: '2020-09-26T22:40:02Z'
createdAt: '2020-09-14T10:39:03Z'
updatedAt: '2025-01-19T01:12:46Z'
language: JavaScript
license: MIT
branch: master
stars: 148
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:29.212Z'
description: >-
  5kb spreadsheet editor for the web, let your users import their data from
  excel.
tags:
  - keyboard-shortcut
  - npm
  - spreadsheet
  - table
---

# importabular

Lightweight spreadsheet editor for the web, to easily let your users import their data from excel.

-   Lightweight (under 5kb gzipped) 
-   Mobile friendly
-   Copy / paste
-   MIT License


# Quickstart

The quick and dirty way :

```
<div id="editor"/>
<script src="https://cdn.jsdelivr.net/npm/importabular"></script>
<script>
const sheet = new Importabular({
  node: document.getElementById("editor"),
  columns: [
    {
      label: "Contact name",
    },
    {
      label: "Phone number",
    },
    {
      label: "Email address",
    },
  ],
});
</script>
```
# Demo and doc

The website will give you more details : https://importabular.lecaro.me/

NPM : https://www.npmjs.com/package/importabular

![Screenshot of the demo website](./src/demo/screenshot.jpg)
