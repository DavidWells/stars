---
repo: SiddharthShyniben/yason
url: 'https://github.com/SiddharthShyniben/yason'
homepage: null
starredAt: '2022-03-13T07:13:46Z'
createdAt: '2022-02-14T02:47:11Z'
updatedAt: '2023-07-02T18:02:06Z'
language: JavaScript
license: NA
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:00.089Z'
description: Yet Another JSON object notation
tags: []
---

# yason

Yason is a data interchange format based on JSON. It aims to be a more user
friendly JSON without completely changing everything like Yaml or Toml does.

```jsonc
{
	// comments
	/* yeye */

	// we are fully json compatible!
	"foo": "bar",

	// quotes can change
	'yey': 'single',

	// no need to quote keys tho
	key: 'val',

	list: [
		1, 2, 3, // trailing commas are good
	],

	// speaking of commas, who needs commas?
	foo: 1
	baz: 2

	// as long as values are separated by whitespace, they are valid

	// you can even do some weird stuff like this, but I wouldn't advise it
	this: 1 that: 2 those: 3

	// for... reasons, strings are multiline
	long: '
	hey there, this is a long string

	notice how we need to \'escape\' single quotes

	the only problem with this is that it doesn\'t trim those newlines and
	leading whitespace, which brings me to...
	'

	// backticks!
	multiline: `
		hey there, this is a long string
		the benefit of this is that it will trim those newlines and leading
		spaces
		but it still preserves other indentation

			- like this list
		
		or this:

			- another list
			  some stuff here for testing
	`
}
```

## Installation

```sh
~$ npm install --global @siddharthshyniben/yason
```

## Usage

```sh
$ yason --help
Usage: yason [options]
	Flags:
		-i, --input	The file to parse
		-o, --output	The file to output to, if ommited the output will be printed to stdo
ut
		-h, --help	Print this help message

```

## License

MIT
