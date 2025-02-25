---
repo: jsonata-js/jsonata
url: 'https://github.com/jsonata-js/jsonata'
homepage: ''
starredAt: '2022-03-22T22:47:35Z'
createdAt: '2016-09-27T13:03:14Z'
updatedAt: '2025-02-25T15:20:58Z'
language: JavaScript
license: MIT
branch: master
stars: 2206
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.397Z'
description: 'JSONata query and transformation language - http://jsonata.org'
tags: []
---

# JSONata

JSON query and transformation language

Reference implementation of the [JSONata query and transformation language](http://jsonata.org/).

* [JSONata in 5 minutes](https://www.youtube.com/embed/ZBaK40rtIBM)
* [JSONata language documentation](http://docs.jsonata.org/)
* [Try it out!](http://try.jsonata.org/)

## Installation

- `npm install jsonata`

## Quick start

In Node.js:

```javascript
const jsonata = require('jsonata');

const data = {
    example: [
        {value: 4},
        {value: 7},
        {value: 13}
    ]
};

(async () => {
    const expression = jsonata('$sum(example.value)');
    const result = await expression.evaluate(data);  // returns 24
})()
```

In a browser:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>JSONata test</title>
    <script src="https://cdn.jsdelivr.net/npm/jsonata/jsonata.min.js"></script>
    <script>
      async function greeting() {
        var json = JSON.parse(document.getElementById('json').value);
        var result = await jsonata('"Hello, " & name').evaluate(json);
        document.getElementById('greeting').innerHTML = result;
      }
    </script>
  </head>
  <body>
    <textarea id="json">{ "name": "Wilbur" }</textarea>
    <button onclick="greeting()">Click me</button>
    <p id="greeting"></p>
  </body>
</html>
```

## More information
- JSONata [documentation](http://docs.jsonata.org/)
- [JavaScript API](http://docs.jsonata.org/embedding-extending)
- [Intro talk](https://www.youtube.com/watch?v=TDWf6R8aqDo) at London Node User Group

## Contributing

See the [CONTRIBUTING.md](CONTRIBUTING.md) for details of how to contribute to this repo.
