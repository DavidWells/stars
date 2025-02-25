---
repo: egoist/preader
url: 'https://github.com/egoist/preader'
homepage: 'https://preader.egoist.dev'
starredAt: '2021-06-01T04:26:10Z'
createdAt: '2021-05-30T10:15:10Z'
updatedAt: '2025-02-25T18:47:55Z'
language: TypeScript
license: NA
branch: main
stars: 113
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:37.755Z'
description: Extract the main content from a web page.
tags: []
---

# preader

Extract the main content from a web page.

[Try some article.](https://preader.egoist.dev/?url=https://foreignpolicy.com/2021/05/28/fragile-india-strong-india/)

Note that scrapper code is ported from [miniflux.app](https://miniflux.app/).

## Bookmarklet

```js
javascript:void function(){window.location=`https://preader.egoist.dev/%3Furl=${window.location.href}`}();
```

Create a bookmark in your browser with the above code as the URL for the bookmark. Now when you activate that new bookmark, it will take the current page your on and open it in the prereader site.

## License

MIT.
