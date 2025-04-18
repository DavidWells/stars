---
repo: RadLikeWhoa/bookmarklets
url: 'https://github.com/RadLikeWhoa/bookmarklets'
homepage: 'https://sacha.me/bookmarklets'
starredAt: '2015-03-12T23:40:50Z'
createdAt: '2013-08-07T16:27:18Z'
updatedAt: '2025-02-22T07:31:55Z'
language: HTML
license: MIT
branch: gh-pages
stars: 88
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.009Z'
description: >-
  bookmarklets is a curated list of, you guessed it, bookmarklets that are
  useful on the web.
tags:
  - bookmarklet
  - bower
  - css
  - gulp
  - js
  - node
  - web
---

# [bookmarklets](http://radlikewhoa.github.io/bookmarklets)

Bookmarklets are awesome. They sit in your favourites quietly without hogging any resources, being quick to they're quick to add and even quicker to use. They provide a wide variety of features on all kinds of sites. But some sites make it terribly hard to find their bookmarklets, others don't even officially provide one. That's why I created this site. This is a place to find bookmarklets for your favourite websites, be it social media sites like Twitter, Facebook or Tumblr, or sites like GitHub, Gist, and Zootool.

The list is frequently updated with new and even more awesome entries. Read on to find out how you can add new bookmarklets yourself in order to help improve the site.

## Working with the code

bookmarklets is built using [gulp](). The default gulp task sets up a local server, some watchers for all filetypes so you're ready to go.

```
git clone https://github.com/RadLikeWhoa/bookmarklets.git
cd bookmarklets
gulp
```

Only files in the `src` directory should be edited. If all you want to do is add a new bookmarklet you only need to work inside the `networks` directory.

## Adding new bookmarklets

Add new bookmarklets to the `networks` folder.

If a .json file for the network you're trying to add already exists, you can add further bookmarks to the the same file as part of the `bookmarklets` collection (and following the standard format). You can read more about the format in the table further down this page.

If there is no existing .json file you'll need to add one yourself. Your new file should look like this:

```javascript
{
  "network": "",
  "category": "",
  "color": "",
  "bookmarklets": [{
    "name": "",
    "code": ""
  }]
}
```

| Property     | Descripton                                                                 |
|--------------|----------------------------------------------------------------------------|
| network      | The name of your network (e.g. "Twitter", "Facebook", etc.)                |
| category     | Your network's category. (e.g. "social", "news")                           |
| color        | Your network's primary color, or [brand color](http://brandcolors.net).    |
| bookmarklets | An array representing the network's bookmarklets. Each bookmarklet is an object, consisting of a `name` (the bookmarklet's action) and  a `code` (the bookmarklet's actual code) entry. |

After you've added your new bookmarklet you need to run `gulp dry` (build without preview) or `gulp` (build with preview).
