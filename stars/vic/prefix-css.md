---
repo: vic/prefix-css
url: 'https://github.com/vic/prefix-css'
homepage: 'http://vic.github.com/prefix-css'
starredAt: '2015-01-26T02:13:43Z'
createdAt: '2012-06-13T08:03:00Z'
updatedAt: '2023-06-14T20:56:07Z'
language: CoffeeScript
license: NA
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:53.989Z'
description: Prefix all rules from a css-file with a namespace selector.
tags: []
---

# prefix-css

A tool for prefixing all rules from css-files with some selector.

[DEMO](http://vic.github.com/prefix-css)

### Installation

`npm install -g prefix-css`

### Why?

Well, sometimes you find that you'd like all rules from a css-file to apply but only while scoped under a specific selector.

ie, we all love using [Twitter Bootstrap](http://twitter.github.com/bootstrap/), imagine you could easily combine themes from [BootSwatch](http://bootswatch.com/) on a single page by having each theme prefixed by a css selector.  

## Use case

suppose, for example that you're happily using the [cyborg theme](http://bootswatch.com/cyborg/), but for some particular portion you want to apply the colors from the [slate theme](http://bootswatch.com/slate/). 

if you downloaded both themes as `cyborg.min.css` and `slate.min.css`, you could use `prefix-css` to 
 namespace each theme under a css-selector:

```shell
$ prefix-css .cyborg cyborg.min.css > cyborg.prefixed.min.css
$ prefix-css .slate  slate.min.css  > slate.prefixed.min.css
```

```html
<div class='cyborg'>
  <a href='#' class="btn btn-primary">A Cyborg Button</a>
</div>

<div class='slate'>
  <a href='#' class="btn btn-primary">An Slate Button</a>
</div>
```

[see it in action](http://vic.github.com/prefix-css)


## Links

 [Bootswatchr](http://bootswatchr.com/) Generate your own Bootstrap themes.
 
 [Bootswatch](http://bootswatch.com/) Some free Bootstrap themes.
 
 [Bootstrap](http://twitter.github.com/bootstrap) Twitter Bootstrap
