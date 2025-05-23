---
repo: mpchadwick/tracking-query-params-registry
url: 'https://github.com/mpchadwick/tracking-query-params-registry'
homepage: null
starredAt: '2021-12-01T08:09:46Z'
createdAt: '2016-12-09T01:35:09Z'
updatedAt: '2025-02-14T10:17:38Z'
language: HTML
license: Unlicense
branch: master
stars: 82
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:31.873Z'
description: A list of query params used for tracking by various marketing tools
tags: []
---

# tracking-query-params-registry

## What Is This?

Digital marketing tool such as email service providers and analytics platforms often append tracking parameters to URLs. These are helpful for marketers, but can also severely decrease the effectiveness of page caching tools such as [Varnish](https://www.varnish-cache.org/).

The purpose of this repository is to keep a centralized list of tracking query parameters used by the huge range of online marketing tools in use today.

## The List

{% include table.html %}

The lists is contained in [params.csv](https://github.com/mpchadwick/tracking-query-params-registry/blob/master/_data/params.csv). The file contains 4 columns...

- **Param** This is the query parameter appended to URLs
- **Platform** This is the platform that is responsible for appending this parameter
- **Confirmed In** A reference to the query parameter
- **Unique Per Visitor** Whether or not the parameter is unique for each visitor

The intention is to use this list to form an ignore list for your page cache implementation.

## Contributing

If you come across a tracking parameter that is missing from this list, by all means, make a contribution. In order to do so, please fork the repository and issue a pull request to the master branch. Please include the "Confirmed In" column to show where this query parameter is referenced.
