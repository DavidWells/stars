---
repo: purplefish32/sublime-text-2-wordpress
url: 'https://github.com/purplefish32/sublime-text-2-wordpress'
homepage: ''
starredAt: '2011-12-13T15:16:27Z'
createdAt: '2011-12-13T15:16:27Z'
updatedAt: '2024-11-13T23:35:52Z'
language: null
license: MIT
branch: master
stars: 330
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:11.814Z'
description: sublime text 2 wordpress package
tags: []
---

Sublime Text 3 WordPress Package
---

Sublime Text 3 WordPress Package is a collection of WordPress snippets and autocompletions for Sublime Text 2 or 3

### Features

Autocomplete for:

    WP version : 4.8.1

    Functions          : 2909
    Hooks              : 2045
    Constants/Classes  :  866

### Notes

Deprecated functions (219) have been removed

The first "tab" deletes all parameters instead of having to tab through each one:

- First Tab-->Select all parameters
- Each Tab Thereafter-->Selects each individual parameter or block

### Snippets

Some updated snippets use the same name as the function, the autocomplete will show an "ALL Options" selection. For example to
register a custom post type you would write `register_post...`. Please review the snippets `<tabTrigger>` to see how to call the rest.


### Special thanks for updated scraping:

Original TextMate author : [Gipetto](https://github.com/Gipetto/wordpress.tmbundle)  
Original scraper : [@ericandrewlewis](https://github.com/purplefish32/sublime-text-2-wordpress-scraper )  
Scraper :[@wycks](https://github.com/wycks/SublimeText-WordPress-Autocomplete)  
Latest scraper :[@jtsternberg](https://github.com/jtsternberg/sublime-text-3-wordpress/)  

### Tip

Sublime won't autocomplete PHP files when there is no closing `?>` tags , so in "Preferences-->Settings-User" add this snippet:

    "auto_complete_selector": "source, text",

###  Install instructions

Just install via package control (WordPress) or clone into your sublime-text-3 package directory.

