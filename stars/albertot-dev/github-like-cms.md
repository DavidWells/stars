---
repo: albertot-dev/github-like-cms
url: 'https://github.com/albertot-dev/github-like-cms'
homepage: null
starredAt: '2023-02-04T21:35:47Z'
createdAt: '2023-01-21T17:51:06Z'
updatedAt: '2023-02-20T13:20:12Z'
language: JavaScript
license: NA
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:57.003Z'
description: null
tags: []
---

# github-like-cms

A javascript library for using GitHub as a simple CMS. Issues tagged with the "published" tag are used to generate posts.

## Installation

npm install github-like-cms

## Usage

```javascript
import glcms from 'github-like-cms'

// Make request with Github API to get the lasts issues with label published
/* @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @param {number} `nItems` Number of items to return, default 6
 * @param {number} `page` Number of page to return, default 1
 * @return {posts, actualPage, totalPosts}
 */
await glcms.getLastPosts(username, repo, nItems, page)

// Make request with Github API to get the issues with label published and paginated
/* @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @param {number} `nItems` Number of items to return, default 6
 * @param {number} `page` Number of page to return, default 1
 * @return {posts[], actualPage, totalPosts}
 */
await glcms.getPostsPagination(username, repo, nItems, page)

// Generate a post with custom fields and HTML content
/*
 *
 *
 * @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @param {String} `slug` String with slug of the post
 * @returns {Post} Array of posts
 */
await glcms.generatePages(username, repo, slug)

// Generate a path (or slug) from the issue title
/*
 * @param {String} `username` String, with name of the user or organization
 * @param {String} `repo` String with name of the repository
 * @returns {Paths[]} Array of posts
 */
await glcms.generatePaths(username, repo)
```

## Additional info

For private repositories, it is necessary to have a personal token. **If you use private repositories, comments and issues would not make sense, as no one would be able to open issues**.

## Objects

### Post

```
      id: string,
      slug: string,
      title: string,
      content: string (html render from markdown),
      description: string (html render from markdown),
      image: string (html render from markdown),
      comments: number,
      date: date,
      author: string,
      authorAvatar: string,
      reactions: Object {
                    '+1': number,
                    '-1': number,
                    laugh: number,
                    hooray: number,
                    confused: number,
                    heart: number,
                    rocket: number,
                    eyes: number
                }
```

## Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

```

```
