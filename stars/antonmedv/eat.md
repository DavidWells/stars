---
repo: antonmedv/eat
url: 'https://github.com/antonmedv/eat'
homepage: ''
starredAt: '2021-01-06T01:42:27Z'
createdAt: '2018-09-07T17:46:09Z'
updatedAt: '2025-01-31T07:15:04Z'
language: JavaScript
license: MIT
branch: master
stars: 293
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:08.888Z'
description: "Eats anything, spits out JSON \U0001F9C0"
tags: []
---

# Eat 🧀

CLI for converting **anything** to JSON. 

**Eat** tries to apply 
parsers in the next order:

```
json
 ↪json5
   ↪toml
     ↪yaml
       ↪xml
         ↪html
           ↪ini
             ↪csv
               ↪tsv
```

## Install

```
npm i -g @medv/eat
```

## Usage

```
eat [file...]

cat config.yaml | eat
eat *.json
ls | eat
```

Use **eat** with [fx](https://github.com/antonmedv/fx):

```
cat response.xml | eat | fx .Document.Title
```

## Related

* [fx](https://github.com/antonmedv/fx) – terminal JSON viewer.

## License

[MIT](LICENSE)
