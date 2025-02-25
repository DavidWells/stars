---
repo: metamagic-games/handbooker
url: 'https://github.com/metamagic-games/handbooker'
homepage: 'https://www.npmjs.com/package/handbooker'
starredAt: '2022-04-03T19:35:32Z'
createdAt: '2018-06-19T09:51:26Z'
updatedAt: '2023-01-17T08:41:46Z'
language: SCSS
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:51.533Z'
description: Turn markdown into a player's handbook
tags:
  - generator
  - handbook
  - html
  - markdown
  - pdf
---

# handbooker

[![npm version](https://badge.fury.io/js/handbooker.svg)](https://badge.fury.io/js/handbooker)

Turn markdown into a Player's Handbook-style document. 

Based on [Homebrewery](https://github.com/stolksdorf/homebrewery)'s stylesheet.

---

## Usage

For a working example, take a look at [handbooker-sample-project](https://github.com/paragon-games/handbooker-sample-project)

```
  const { handbooker, } = require("handbooker");
  
  const target = "./rulebook.md";
  
  const destination = "./rulebook.pdf";

  const options = {
    "debug": true,
    "style": "dnd",
    "printOptions": {
      displayHeaderFooter: false,
    },
  };

  handbooker( target, destination, options);
```

## Combining multiple markdown files

To merge many different Markdown files, simply replace:
```
    const target = "./rulebook.md";
```

With:
```
    const target = [ "./rulebook.md", "./rulebook2.md", ];
```

---

## Styles

This package can support creation of documents in the style of several different games. 

### Included styles

The default style is the 5e D&D Player's Handbook. Feel free to add other stylesheets to this package.

To select from an included style sheet:

```
  const options = {
    "style": "dnd",
  };
```

### Custom styles

To use your own:

```
  const options = {
    "customStyles": "your/custom/stylesheet.css",
  };
```

## Why not just use [Homebrewery](http://homebrewery.naturalcrit.com/)?

Homebrewery is a fantastic tool, and this project wouldn't be possible without their fantastic stylesheet. However, Homebrewery doesn't make collaboration and tracking changes to your document easy. If you're just working alone, and you're not used to working with git, npm, or Markdown, this might not be the tool for you.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome!
