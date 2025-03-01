---
repo: mholt/json-to-go
url: 'https://github.com/mholt/json-to-go'
homepage: 'https://mholt.github.io/json-to-go/'
starredAt: '2022-10-25T00:23:56Z'
createdAt: '2014-01-21T18:11:13Z'
updatedAt: '2025-02-25T03:35:56Z'
language: JavaScript
license: MIT
branch: master
stars: 4546
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:16.811Z'
description: Translates JSON into a Go type in your browser instantly (original)
tags:
  - go
  - golang
  - json
  - translates-json
---

[<img src="https://mholt.github.io/json-to-go/resources/images/json-to-go.png" alt="JSON-to-Go converts JSON to a Go struct"></a>](https://mholt.github.io/json-to-go)

Translates JSON into a Go type definition. [Check it out!](http://mholt.github.io/json-to-go)

This is a sister tool to [curl-to-Go](https://mholt.github.io/curl-to-go), which converts curl commands to Go code.

Things to note:

- The script sometimes has to make some assumptions, so give the output a once-over.
- In an array of objects, it is assumed that the first object is representative of the rest of them.
- The output is indented, but not formatted. Use `go fmt`!

Contributions are welcome! Open a pull request to fix a bug, or open an issue to discuss a new feature or change.

### Usage

- Read JSON file:

  ```sh
  node json-to-go.js sample.json
  ```

- Read JSON file from stdin:

  ```sh
  node json-to-go.js < sample.json
  cat sample.json | node json-to-go.js
  ```

### Credits

JSON-to-Go is brought to you by Matt Holt ([mholt6](https://twitter.com/mholt6)).

The Go Gopher is originally by Renee French. This artwork is an adaptation.
