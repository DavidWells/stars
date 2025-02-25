---
repo: apex/up-examples
url: 'https://github.com/apex/up-examples'
homepage: null
starredAt: '2017-07-20T18:37:19Z'
createdAt: '2017-07-11T22:57:50Z'
updatedAt: '2025-01-07T10:27:05Z'
language: HTML
license: NA
branch: master
stars: 390
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:43.499Z'
description: 'Example apps, apis, and sites for Up.'
tags:
  - aws
  - golang
  - java
  - lambda
  - nodejs
  - python
  - serverless
  - up
---


## Up Examples

Example applications, APIs, and sites for [Up](https://github.com/apex/up), organized by plan:

- [OSS](oss) – open-source edition.
- [Pro](pro) – commercial edition.

For real-world open source example applications visit the [Wiki](https://github.com/apex/up/wiki#applications).

## Notes

- Each example has a Readme.md with further details.
- Static examples with error pages, redirects, injection etc may also be applied to dynamic apps.
- For the best latency & cold start time set `.lambda.memory` in up.json to 1536
- All examples use the `.name` "app" so you don't have to provision the stack each time

## Running Tests

The test suite is used for QA testing, however if you're adding an example you may add a `test.sh`
and test it directly with `go run test.go -dir oss/someexample`.

<a href="https://apex.sh"><img src="http://tjholowaychuk.com:6000/svg/sponsor"></a>
