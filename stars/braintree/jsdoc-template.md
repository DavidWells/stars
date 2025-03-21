---
repo: braintree/jsdoc-template
url: 'https://github.com/braintree/jsdoc-template'
homepage: ''
starredAt: '2019-09-26T00:02:45Z'
createdAt: '2016-05-26T17:37:00Z'
updatedAt: '2025-01-28T00:49:08Z'
language: CSS
license: NOASSERTION
branch: main
stars: 176
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:22.818Z'
description: >-
  A clean, responsive documentation template with search and navigation
  highlighting for JSDoc 3
tags: []
---

# Braintree JSDoc Template

A clean, responsive documentation template with search and navigation highlighting for JSDoc 3. Forked from [github.com/nijikokun/minami](https://github.com/nijikokun/minami).

![Braintree JS Doc Template Screenshot](https://puu.sh/rWvW0/2831fd69d6.png)

## Responsive

![Braintree JS Doc Template Screenshot](https://puu.sh/rWvZ6/aee92a4787.png)

## Uses

- [the Taffy Database library](http://taffydb.com/)
- [Underscore Template library](http://documentcloud.github.com/underscore/#template)
- [Algolia DocSearch](https://community.algolia.com/docsearch/)

## Usage

Clone repository to your designated `jsdoc` template directory, then:


### Node.js Dependency

In your projects `package.json` file add a generate script:

```json
"script": {
  "generate-docs": "node_modules/.bin/jsdoc --configure .jsdoc.json --verbose"
}
```

In your `.jsdoc.json` file, add a template option.

```json
"opts": {
  "template": "node_modules/jsdoc-template"
}
```

### Example JSDoc Config

```json
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": ["lib", "package.json", "README.md"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "templates": {
        "referenceTitle": "My SDK Name",
        "disableSort": false,
        "collapse": true,
        "resources": {
            "google": "https://www.google.com/"
        }
    },
    "opts": {
        "destination": "./docs/",
        "encoding": "utf8",
        "private": true,
        "recurse": true,
        "template": "./node_modules/jsdoc-template"
    }
}
```

Note: `referenceTitle` and `disableSort` will affect the output of this theme.

If you would like to enable [Algolia DocSearch](https://community.algolia.com/docsearch/), you can pass a `search` object into the `templates` object.

```json
"templates": {
    "search": {
        "apiKey": "your-api-key",
        "indexName": "Your index name. Defaults to braintree.",
        "hitsPerPage": "Number of Results to show. Defaults to 7.",
    }
}
```

## License

Licensed under the Apache2 license.
