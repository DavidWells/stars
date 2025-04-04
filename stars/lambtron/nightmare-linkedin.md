---
repo: lambtron/nightmare-linkedin
url: 'https://github.com/lambtron/nightmare-linkedin'
homepage: null
starredAt: '2015-05-10T01:50:43Z'
createdAt: '2014-11-29T00:22:39Z'
updatedAt: '2023-11-17T06:45:10Z'
language: JavaScript
license: MIT
branch: master
stars: 64
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:43.774Z'
description: Nightmare plugin for LinkedIn.
tags: []
---

nightmare-linkedin
=================

[Nightmare](https://github.com/segmentio/nightmare) plugin for LinkedIn.com. Refer to the [examples](https://github.com/lambtron/nightmare-linkedin/tree/master/examples) for more details.

#### .login(email, password)

Login to a LinkedIn account. Both email and password are passed as strings.

#### .search(type, query)

Adds the query to the LinkedIn omni search box, submits it, and waits until responses are returned on the page, then filters by type. Both type and query are passed as strings. Accepted type consists of the LinkedIn drop downs: `people`, `jobs`, `companies`, `groups`, `universities`, `posts`, `inbox`. If `type` is blank or undefined, defaults to `all`.

#### .filter(array)

Filters search results based on an array of strings. Filters include Relationship (`1st Connections`, `2nd Connections`, `Group Members`, etc), Location (`All`, `United States`, `San Francisco Bay Area`, etc), Current Company (`All`, `Segment`, `Facebook`, etc).

#### .crawl(pages)

From results page, click through to each profile, then return back to the results page. The `pages` parameter indicates the number of pages you want to crawl. Intended to be used on user profiles so they can see that your LinkedIn account has viewed them.

#### .connect(user)

_(Work in progress)_ Sends an invite to connect on LinkedIn.

#### .viewedMe(cb)

_(Work in progress)_ Retrieves a list of all users who has viewed your profile. The callback signature is `cb(users)`.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

