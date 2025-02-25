---
repo: vdyalex/json-chewer
url: 'https://github.com/vdyalex/json-chewer'
homepage: ''
starredAt: '2021-03-16T16:21:18Z'
createdAt: '2018-02-06T18:29:02Z'
updatedAt: '2023-11-07T05:41:46Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:58.187Z'
description: >-
  Generate random JSON file using pure javascript. It removes the complexity and
  inconsistences from creating string-based methods such as in madoka.
tags:
  - data-samples
  - faker
  - generator
  - json
  - madoka
  - node
  - random
  - random-generation
  - sample
---

# JSON Chewer

**TL;DR:**
> Generate random JSON file using pure javascript. It removes the complexity and inconsistences from creating string-based methods such as in [madoka](https://www.npmjs.com/package/madoka).

---

## Benefits

1.  Write reliable code and avoid mistakes with real javascript code.
1.  Write complex algorithms in your own way.
1.  Use the libraries you need for the seed file.
1.  Use highlight from your favorite code editor.
1.  Use all Javascript (ES5 and ES6) features.
1.  Get rid of RegEx and eval methods to evaluate your own code.
1.  Use both API and CLI for generating files.


Instead of using string notations, you can write full javascript code:
```javascript
// Madoka style
{
  company: '{{ company().toUpperCase() }}'
}

// JSON Chewer style
{
  company: () => faker.company.companyName().toUpperCase()
}
```

## Installation

Install it locally or globally as a npm package:
```bash
# Local
$ npm install --save json-chewer

# Global
$ npm install --global json-chewer
```

## Getting started

*  Create a Node.js file with the seed:
  ```javascript
  const { faker, repeat } = require('json-chewer');

  module.exports = {
    users: repeat(5, () => faker.name.firstName())
  };
  ```

*  Run the command line:
  ```bash
  $ json-chewer my-seed.js
  ```

*  Get the output:
```json
{
  "users": ["Mariela", "Shanny", "Misael", "Tyrell", "Elian"]
}
```

---

**IMPORTANT:** There are differences between creating repeated values and creating repeated values into functions:
```javascript
module.exports = {
  users: repeat(5, faker.name.firstName())
};
// Output example
{
  "user": [ "Mariela", "Mariela", "Mariela", "Mariela", "Mariela" ]
}
```

## Scope inheritance

There is a scope management on each parsing step. The generator automatically modifies the children properties' functions to bind their parent scopes.

```javascript
module.exports = {
  username: () => faker.internet.userName(),
  profile: function () {
    // 'this' inherited from parent object
    return `http://example.com/${this.username}`;
  }
}

// Output example
{
  "username": "Verdie30",
  "profile": "http://example.com/Verdie30"
}
```

In case of arrays, it also binds the parent scope. However, it refers to the immediate parent object, not to the array:
```javascript
module.exports = {
  name: () => faker.commerce.product(),
  slogans: repeat(1, 5, function () {
    // 'this' inherited from immediate parent object, skipping its array
    const product = this.name;

    const adjective = faker.commerce.productAdjective();

    return `${adjective} ${product}`;
  })
}

// Output example
{
  "name": "Chair",
  "slogans": [
    "Ergonomic Chair",
    "Fantastic Chair",
    "Intelligent Chair"
  ]
}

```
---

**IMPORTANT:** Due to arrow function specifications, it's only possible to use `this` from lexical environment if it's **enclosed into a regular function**:
```javascript
module.exports = {
  username: () => faker.internet.userName(),
  link: function() {
    return {
      profile: () => this.username  // 'this' inherited from regular function
    }
  }
}

// Output example
{
  "username": "Alaina_Klocko70",
  "link": {
    "profile": "Alaina_Klocko70"
  }
}
```

## Built-in features

### Faker

It includes [Faker](https://www.npmjs.com/package/faker) as a library for generating fake data samples.

Check the Faker.js documentation before using it: [https://github.com/Marak/faker.js/wiki](https://github.com/Marak/faker.js/wiki).

It might be imported directly from the JSON Chewer:

```javascript
const { faker } = require('json-chewer');
```

### Repeat

There is a built-in function for generating arrays with specific values.

#### Repeated values
```javascript
const { repeat } = require('json-chewer');

module.exports = {
  foo: repeat(3, 'bar')
}

// Output example
{
  "foo": [ "bar","bar","bar" ]
}
```

#### Random values
```javascript
const { repeat } = require('json-chewer');

module.exports = {
  values: repeat(3, () => Math.random())
}

// Output example
{
  "values": [ 0.6866788951130716, 0.1538252618213385, 0.4480162893196198 ]
}
```

#### Random range of items
```javascript
const { repeat } = require('json-chewer');

module.exports = {
  hello: repeat(1, 5, 'world')
}

// Output example
{
  "hello": [ "world", "world" ]
}
```

#### Random range of items with random values
```javascript
const { repeat } = require('json-chewer');

module.exports = {
  values: repeat(1, 10, () => Math.random())
}

// Output example
{
  "values": [ 0.4480162893196198, 0.1538252618213385 ]
}
```

## CLI
```bash
$ json-chewer

  Usage: json-chewer [options] <file>

  Generate random JSON file using pure javascript


  Options:

    -O, --output <file>  Define the output file.
    -p, --pretty         Use pretty formatting to output file.
    -v, --verbose        Display additional information about the generation processing.
    -V, --version        output the version number
    -h, --help           output usage information
```


## To-dos

- [ ] Add built-in support for [moment](https://www.npmjs.com/package/moment)
- [ ] Add built-in support for [lodash](https://www.npmjs.com/package/lodash)
