---
repo: janwilmake/contextarea
url: 'https://github.com/janwilmake/contextarea'
homepage: 'https://contextarea.com'
starredAt: '2025-07-24T20:20:11Z'
createdAt: '2025-05-15T15:47:59Z'
updatedAt: '2025-07-24T20:20:12Z'
language: TypeScript
license: NA
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-02T22:32:27.921Z'
description: js and cloudflare libraries allowing easy context-building
tags: []
---

# contextarea.js - textarea for context-building

> Submission to [this hackathon](https://x.com/mattzcarey/status/1926186148369408354): to make humans better we have to optimise for truth and human understanding. to do that, we have to make the interface be a map of reality. this is why URLs, universal resource locators, are perfect, and we should not hide them away, we should embrace them for what they are: they are maps to expand our perception.

## Usage

In your head, add the following

```html
<link rel="stylesheet" href="https://contextarea.com/style.css" />
<script src="https://contextarea.com/lib.js" defer></script>
```

To your textarea, add `id="contextarea"` and poof! It's all there.

> [!IMPORTANT]
>
> This is meant to be self-hosted.
>
> Please do not use the widget as-is in production, it's better to self-host from the start!

## Components

| Component                  | Description                                                  | URL                                           |     |
| -------------------------- | ------------------------------------------------------------ | --------------------------------------------- | --- |
| [pastebin](./pastebin)     | for OS-provided text or binary files (via copy or drag/drop) | https://pastebin.contextarea.com/openapi.json |     |
| [context](./context)       | for fetching/caching any URL into the belonging metadata     | https://context.contextarea.com/openapi.json  |     |
| [lib.js](lib.js)           | the js lib                                                   | https://contextarea.com/lib.js                |     |
| [style.css](style.css)     | the styles                                                   | https://contextarea.com/style.css             |     |
| [index.html](./index.html) |                                                              | https://contextarea.com                       |     |

| Summary                                             | Prompt it                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| High-level overview of the ContextArea project      | [![](https://b.lmpify.com/overview)](https://letmeprompt.com?q=https%3A%2F%2Fuuithub.com%2Fjanwilmake%2Fcontextarea%2Ftree%2Fmain%3FpathPatterns%3DREADME.md%26pathPatterns%3DSPEC.md%0A%0AWhat%20is%20ContextArea%20and%20what%20are%20its%20main%20components%3F)                                                                                                      |
| Core implementation of the ContextArea library      | [![](https://b.lmpify.com/core_implementation)](https://letmeprompt.com?q=https%3A%2F%2Fuuithub.com%2Fjanwilmake%2Fcontextarea%2Ftree%2Fmain%3FpathPatterns%3Dlib.js%26pathPatterns%3Dstyle.css%26pathPatterns%3Dindex.html%0A%0AHow%20does%20the%20ContextArea%20component%20work%3F%20What%20features%20does%20it%20provide%3F)                                        |
| Context API service for URL metadata extraction     | [![](https://b.lmpify.com/context_api)](https://letmeprompt.com?q=https%3A%2F%2Fuuithub.com%2Fjanwilmake%2Fcontextarea%2Ftree%2Fmain%3FpathPatterns%3Dcontext%252Fmain.ts%26pathPatterns%3Dcontext%252Fopenapi.json%26pathPatterns%3Dcontext%252FREADME.md%0A%0AHow%20does%20the%20Context%20API%20work%20for%20extracting%20and%20caching%20URL%20metadata%3F)          |
| Pastebin service for storing and retrieving content | [![](https://b.lmpify.com/pastebin_api)](https://letmeprompt.com?q=https%3A%2F%2Fuuithub.com%2Fjanwilmake%2Fcontextarea%2Ftree%2Fmain%3FpathPatterns%3Dpastebin%252Fpastebin.ts%26pathPatterns%3Dpastebin%252Fopenapi.json%26pathPatterns%3Dpastebin%252FREADME.md%0A%0AHow%20does%20the%20Pastebin%20service%20work%20for%20storing%20text%20and%20binary%20content%3F) |
