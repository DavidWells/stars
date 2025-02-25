---
repo: CloudCannon/filer
url: 'https://github.com/CloudCannon/filer'
homepage: null
starredAt: '2022-12-09T05:11:15Z'
createdAt: '2022-11-20T23:43:47Z'
updatedAt: '2023-12-26T22:11:30Z'
language: JavaScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:05.266Z'
description: >-
  Provides an API for accessing parsed file content in a collection-like file
  structure.
tags: []
---

# Filer

Provides an API for accessing parsed file content in a collection-like file structure.

[<img src="https://img.shields.io/npm/v/@cloudcannon%2Ffiler?logo=npm" alt="version badge">](https://www.npmjs.com/package/@cloudcannon%2Ffiler)
[<img src="https://img.shields.io/npm/dt/@cloudcannon%2Ffiler" alt="downloads badge">](https://www.npmjs.com/package/@cloudcannon%2Ffiler)

***

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

***

## Installation

```bash
npm i @cloudcannon/filer
```

***

## Usage

JavaScript-based SSGs often have no standard approach to reading content from local files. This package aims to address this.

This package assumes a file structure where files are grouped into top-level folders called collections.
This mimics the file structure seen in a number of SSGs with standard approaches to reading local files.

Here's an example file tree with three collections inside a `content` folder:

```
content
├── pages
│   ├── about.md
│   └── index.md
├── posts
│   ├── my-first-post.md
│   ├── another-post.md
│   └── my-last-post-ever.md
└── authors
    ├── jane.md
    └── john.md
```

> At the moment, this is limited to Markdown files only.

### Setup

Where these functions are called depends on the SSG you are using.
This package simply wraps file reading and parsing into a consistent API.

```javascript
import Filer from '@cloudcannon/filer';
const filer = new Filer({
  path: 'content' // The base path containing your collection folders
});
```

### Getting all parsed items in collection

```javascript
// Can be called with no options
await filer.getItems('posts');

await filer.getItems('posts', {
  excerpt: true, // Produces excerpts/summaries from the first paragraph of content for each item
  sortKey: 'date', // Sorts items from this parsed data
  sortReverse: true // Reverses the sorted items (defaults to false)
});
```

### Getting filtered items in a collection

You can provide a `filter` function to the `options` object.

This function should return a boolean value. The item will be returned if `filter` returns `true`.

```javascript
await filer.getItems('posts', {
  filter: (item) => { // checks each item in 'posts' before returning
    return item.data.tags.includes('category');
  }
});
```

### Getting paginated items in collection
```javascript

await filer.getPaginatedItems('posts', {
  sortKey: 'date', // Accepts all valid options for getItems()
  pagination: { // Requires a 'pagination' object in options
    size: 10, // Number of items per page
    page: 3 // The page number
  }
});
```

If the `page` requested is greater than the number of pages, will return the last page.

If the `size` requested is greater than the number of items, will return one page with all items.

This function returns data in the following format:
```javascript
{
  data: [], // An array containing the paginated files (for this page).
  start: 20, // The index of the first item on this page (starting at 0)
  end: 29, // The index of the first item on this page (starting at 0)
  total: 42, // The total number of items in this collection
  currentPage: 3, // The page number being returned
  size: 10, // The number of items on this page
  lastPage: 5, // The number of the last page (equal to the number of pages)
  prevPage: 2, // The number of the previous page (undefined if current page is first page)
  nextPage: 4 // The number of the next page (undefined if current page is last page)
};
```

### Getting one parsed item in collection

```javascript
await filer.getItem('my-first-post.md', { folder: 'posts' });

await filer.getItem('my-first-post.md', {
  folder: 'posts', // Reads the file from this folder/collection
  excerpt: true // Produces excerpts/summaries from the first paragraph of content
});
```

### Listing slugs for a collection

This is useful for providing Next.js with static paths.

```javascript
await filer.listItemSlugs('posts');
```

***

## Development

Install dependencies:

```sh
$ npm i
```

Run tests:

```sh
$ npm test
$ npm run test:watch
$ npm run test:coverage
```

Lint code:

```sh
$ npm run lint
```

## License

MIT
