---
repo: brussell98/discord-markdown
url: 'https://github.com/brussell98/discord-markdown'
homepage: null
starredAt: '2025-01-17T02:07:25Z'
createdAt: '2017-11-11T20:26:04Z'
updatedAt: '2025-01-17T02:07:26Z'
language: JavaScript
license: MIT
branch: master
stars: 117
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:12.769Z'
description: A markdown parser with the same rules as Discord
tags: []
---

# discord-markdown
A markdown parser for Discord messages.

## Using

```bash
yarn add discord-markdown
npm i discord-markdown
```

For browser use, import `dist/discord-markdown.min.js`

```js
const { parser, htmlOutput, toHTML } = require('discord-markdown');

console.log(toHTML('This **is** a __test__'));
// => This <strong>is</strong> a <u>test</u>
```

Fenced codeblocks will include highlight.js tags and classes.

## Options

```js
const { toHTML } = require('discord-markdown');
toHTML('This **is** a __test__', options);
```

`options` is an object with the following properties (all are optional):

* `embed`: Boolean (default: false), if it should parse embed contents (rules are slightly different)
* `escapeHTML`: Boolean (default: true), if it should escape HTML
* `discordOnly`: Boolean (default: false), if it should only parse the discord-specific stuff
* `discordCallback`: Object, callbacks used for discord parsing. Each receive an object with different properties, and are expected to return an HTML escaped string
  * `user`: (`id`: Number) User mentions "@someperson"
  * `channel`: (`id`: Number) Channel mentions "#somechannel"
  * `role`: (`id`: Number) Role mentions "@somerole"
  * `everyone`: () Everyone mention "@everyone"
  * `here`: () Here mention "@here"
* `cssModuleNames`: Object, maps CSS class names to CSS module class names

### Mention and Emoji Handling

Using the `discordCallback` option you can define custom functions to handle parsing mention and emoji content. You can use these to turn IDs into names.

Example:

```js
const { toHTML } = require('discord-markdown');
toHTML('This is a mention for <@95286900801146880>', {
	discordCallback: {
		user: node => '@' + users[node.id];
	}
}); // -> This is a mention for @Brussell
```

## Customizing

It is possible to change the rules used by discord-markdown. Take a look at the code to see how to create your own modified rule set.

## Contributing

Find an inconsistency? File an issue or submit a pull request with the fix and updated test(s).
