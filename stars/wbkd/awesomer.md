---
repo: wbkd/awesomer
url: 'https://github.com/wbkd/awesomer'
homepage: null
starredAt: '2023-01-13T00:47:30Z'
createdAt: '2018-06-13T12:59:53Z'
updatedAt: '2023-11-07T10:12:43Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:58.784Z'
description: Turn your awesome list into an HTTP API
tags: []
---

# awesomer

Convert any awesome-list into JSON data.

# Run

Requirements:

- npm >= v5

You can configure the following options:

| name           | description                                                     | default                              |
| -------------- | --------------------------------------------------------------- | ------------------------------------ |
| GITHUB_API_KEY | The API key obtained by Github (**required**)                   | `""`                                 |
| LIST_URL       | The URL of the awesome list (should return text) (**required**) | `""`                                 |
| DEST           | The filename for the static JSON file                           | `data.json`                          |
| IMAGE_DEST     | The folder where you want to save the screenshots               | `false` (don't save the screenshots) |

Either passing them as command-line arguments or exporting them as environment variables or even write them to a `config.json` file like the following one:

```JSON
{
  "GITHUB_API_KEY": "...",
  "LIST_URL": "https://raw.githubusercontent.com/wbkd/awesome-d3/master/README.md",
  "DEST": "static/data/projects.json",
  "IMAGE_DEST": "static/images/"
}
```

Then you can run:

```
npx github:wbkd/awesomer
```
