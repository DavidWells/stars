---
repo: geut/jsdast
url: 'https://github.com/geut/jsdast'
homepage: ''
starredAt: '2021-01-20T05:50:33Z'
createdAt: '2020-12-16T11:57:50Z'
updatedAt: '2024-05-23T03:49:11Z'
language: JavaScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:05.955Z'
description: JSDoc Abstract Syntax Tree
tags:
  - ast
  - jsdoc
  - tsdoc
  - unist
---

# jsdast
Syntax tree JSDoc based on Unist spec

[![Build Status](https://travis-ci.com/geut/jsdast.svg?token=yjuaa2ubUupz6ACajDgF&branch=main)](https://travis-ci.com/geut/jsdast)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[![Made by GEUT][geut-badge]][geut-url]

## Install

```
$ npm install @geut/jsdast
```

## Usage

```javascript
const unified = require('unified')
const { parser } = require('@geut/jsdast')

const tree = unified().use(parser).parse(`
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  function sum(a, b) {
    return a + b
  }
`)

console.log(JSON.stringify(tree, null, 2))

/*
{
  "type": "Root",
  "children": [
    {
      "type": "Module",
      "name": "Index",
      "doc": {
        "description": "",
        "tags": []
      },
      "children": [
        {
          "type": "FunctionDeclaration",
          "name": "sum",
          "doc": {
            "tags": [
              {
                "tagName": "returns",
                "fullText": "@returns {number}",
                "typeExpression": "number"
              }
            ]
          },
          "isExported": false,
          "isDefaultExport": false,
          "valueType": "number",
          "isGenerator": false,
          "isAsync": false,
          "children": [
            {
              "type": "Parameter",
              "name": "a",
              "doc": {
                "tags": []
              },
              "isRestParameter": false,
              "valueType": "number",
              "isOptional": false
            },
            {
              "type": "Parameter",
              "name": "b",
              "doc": {
                "tags": []
              },
              "isRestParameter": false,
              "valueType": "number",
              "isOptional": false
            }
          ]
        }
      ]
    }
  ]
}
*/
```


## Issues

:bug: If you found an issue we encourage you to report it on [github](https://github.com/geut/jsdast/issues). Please specify your OS and the actions to reproduce it.

## Contributing

:busts_in_silhouette: Ideas and contributions to the project are welcome. You must follow this [guideline](https://github.com/geut/jsdast/blob/main/CONTRIBUTING.md).

## License

MIT © A [**GEUT**](http://geutstudio.com/) project

[geut-url]: https://geutstudio.com
[geut-badge]: https://img.shields.io/badge/Made%20By-GEUT-4f5186?style=for-the-badge&link=https://geutstudio.com&labelColor=white&logo=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABAYDBQACBwH/xAA0EAACAQMBBAcGBgMAAAAAAAABAgMABBEFBhIhQRMiMVFhgcEUIzJxkbFCUmKh0fAkcuH/xAAYAQADAQEAAAAAAAAAAAAAAAABAwQCAP/EACARAAMAAwACAgMAAAAAAAAAAAABAgMRIRIxBEEiM1H/2gAMAwEAAhEDEQA/AOgVlau6xoXdgqqMkk8AKV9U2oYs0WngBRw6VhxPyFamXXoDeiz1PUbmzuujQIUKgjIqGLXnz72FSO9TikfVbi6uXWSSaWRuzixNBx3VzCepNIvgTw+hpjwv+iGr3tM6xa30F2PdP1uangRRNc70fUbi4JLIVaPskXgM/wA076Ze+2W+WwJF4MPWlNaemajI2/GvYbWVlZQHCptZqLNKLGJsKoDSY5nkKorKzlvrlYIRlm5nsA7zWX8pnv55SfikJ/emPZGDcs7m6CguTuL5DPrVf64Me2F2mzNhAg6ZTO/MsSB9BW15s1pt1GVEPRHvQ+hqbTNT9sZ0kCpIOIA5ij5ZEijaSRgqqMkmpVkb7sMuWtoV73S49L3I4B7kjq57c881BZ6vFpuoKjq7dIvYBw8PtUOqX1xcSxoJXw8mQuewVW3vX1eFR+Fcn96OLVvpFzz8kM020kp4QwIvixzVpot5Je2bSTEFw5HAY7qUKadnIymm7x/G5I+3pTskzM8G4rqq6JGpI8E1wi8HR2H0NT7P6rcRKUEzYR9/czgEf0VabV2JgvhdKPdzdvg399aVG37K4Esfw/3hTU1S2NpNrSHqax9q/wAzTm3lY5KA4ZTQl2mo9CWljncL+cnA+tVVhqeSGt5mik5qDg/9o+XVb6aFonuDusMHqjP2qavjbfGTPX3xgTstrm4uGDSEYVV+woWPMKy3dzwd+JHcOQrdkgtyZpXJb87nJ8qqr68a7cKgIjB4DmadGNQjohs9i1C66Xqtvbx+EjIp10jaOMLBaPasDwRTGc5PyNJ1rb9EN5/jP7U17KaaZJvbpV6icI88z3+VG0vH8ipJJ8Ga8tIr22eCYZVh5g94pC1TTJtPmMU67yH4XxwYV0So54IriIxzRrIh7QwzSIyOTbWzlElkCcxtjwNedHeKMCVseDmnq72UgkJa1maL9LDeH81XvspfA9WSBh/sR6U9XD+zDQp+yTSNmR/MnJomG3SLiBlu80zQ7JXTH31xEg/Tlj6Vb2OzljaEO6meQc5OweVc8koOmUGjaFLfuss4MdsOOewv8v5p0ijSGNY41CoowAOQrbsr2p7t0zSWj//Z
