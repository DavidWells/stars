---
repo: tomsouthall/split-match
url: 'https://github.com/tomsouthall/split-match'
homepage: null
starredAt: '2022-03-23T00:08:15Z'
createdAt: '2022-02-25T17:22:51Z'
updatedAt: '2022-08-31T19:12:48Z'
language: JavaScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:54.574Z'
description: >-
  Split a text string into separate React elements. In addition, wrap any text
  that matches the supplied search text in a React element, even when the
  matched text is divided across the elements created by the split.
tags: []
---

# SplitMatch React Component

A React component for finding matches within a split string

- [Introduction](#introduction)
- [Installation &amp; Usage](#installation-amp-usage)
- [API](#api)
- [Contributing](#contributing)
- [Release Checklist](#release-checklist)
- [License](#license)

## Introduction

`SplitMatch` splits a supplied string into separate React elements. Yeah, no big deal! But in addition, it also wraps any text that matches the supplied search text in a React element, even when the matched text is divided across the elements created by the split. If this makes no sense, read on...

### Why would I need this?

`SplitMatch` is particularly useful for building components like an autocomplete, where the text entered is highlighted in the accompanying listbox options:

![Entering text into an autocomplete control](https://github.com/tomsouthall/split-match/raw/main/media/autocomplete1.gif)

The markup for the example above is simple. Each listbox option looks something like this, with the `<strong>` element denoting the matched search text:

```html
<li><strong>New Yor</strong>k City, New York, United States</li>
```
Converting this into a React component would be straightforward.

However, what if we wanted to pretty things up a little and apply some formatting to our listbox options? We may want the state and country names to appear in a smaller font than the city name, like in this `SplitMatch` example:

![Entering text into an autocomplete control with formatted results](https://github.com/tomsouthall/split-match/raw/main/media/autocomplete2.gif)

Here we may need to take a string such as `"Springfield, Michigan, United States"` and split it at the first comma so we can apply different styling to each element. For example:

```html
<li>
  <span class="split1">Springfield,</span>
  <span class="split2"> Michigan, United States</span>
</li>
```

Things get complicated when we add the text matching back, because the matched text may span across more than one of the splits. An example in this case would be a search for `"Springfield, Mi"`. Given all the Springfields in the United States (incidentally it's [34](https://en.wikipedia.org/wiki/Springfield_(toponym))!), the likelihood is you'd need to type past the comma to find your match. This would require listbox markup such as this:


```html
<li>
  <span class="split1"><strong>Springfield,</strong></span>
  <span class="split2"><strong> Mi</strong>chigan, United States</span>
</li>
```

Here's where the `SplitMatch` component comes in handy. It takes a string, a separator character and some search text and converts it into customisable React Elements with markup such as the example above.

This allows lots of flexibility in formatting and at the same time allows matched text to be easily displayed, even when it is split between different block elements. Note that in this example, you can also choose whether to hide the delimiter/separator character, in this case the first comma in the top listbox option.

![Entering text into an autocomplete control with formatted results](https://github.com/tomsouthall/split-match/raw/main/media/autocomplete3.gif)

## Installation &amp; Usage

### Installing

```bash
$ npm install split-match
```

### Usage

#### Basic Example:

```jsx
import React from 'react'
import SplitMatch from 'split-match'

export default ListboxOption = () => {
  return (
    <li>
      <SplitMatch searchText={'New York City, New'} separator=",">
        New York City, New York, United States
      </SplitMatch>
    </li>
  )
}
```

This would produce the following markup inside the `<li>` element:

```html
<span><strong>New York City,</strong></span>
<span><strong> New</strong> York,</span>
<span> United States</span>
```

#### Full Example:

```jsx
import React from 'react'
import SplitMatch from 'split-match'

const SplitComponent = (props) => {
  const { children, index } = props
  return <div className={`split${index}`}>{children}</div>
}

const MatchComponent = (props) => {
  const { children } = props
  return <span className={'match'}>{children}</span>
}

export default ListboxOption = () => {
  return (
    <li>
      <SplitMatch
        caseSensitiveMatch={false}
        caseSensitiveSplit={false}
        globalMatch={false}
        globalSplit={false}
        includeSeparator={false}
        searchText={'new york city, new'}
        separator=","
        MatchComponent={MatchComponent}
        SplitComponent={SplitComponent}>
        New York City, New York, United States
      </SplitMatch>
    </li>
  )
}
```

This would produce the following markup inside the `<li>` element:

```html
<div class="split0"><span class="match">New York City</span></div>
<div class="split1"><span class="match"> New</span> York, United States</div>
```

### API

The following props can be supplied to the `<SplitMatch>` component:

#### `caseSensitiveMatch`
- Type: `boolean`
- Default: `false`
- If `true` the `searchText` value is matched with case sensitivity applied.

#### `caseSensitiveSplit`
- Type: `boolean`
- Default: `false`
- If `true` the `separator` character is searched for with case sensitivity applied.

#### `globalMatch`
- Type: `boolean`
- Default: `true`
- If `true` every instance of `searchText` is matched in the supplied string.
- If `false` only the first instance of `searchText` is matched in the supplied string.

#### `globalSplit`
- Type: `boolean`
- Default: `true`
- If `true` the supplied string is split at every instance of `separator`.
- If `false` the supplied string is split only at the first instance of `separator`.

#### `includeSeparator`
- Type: `boolean`
- Default: `true`
- Whether or not to include or remove the `separator` character(s) within the supplied string.
- If `true` the `separator` remains in the supplied string.
- If `false` the `separator` is removed from supplied string. If `globalSplit` is also `true`, all instances of `separator` are removed. If `globalSplit` is `false`, only the first instance of `separator` is removed.

#### `searchText`
- Type: `string`
- Default: `''`
- This text is matched within the larger string.
- Use `globalMatch` to determine whether to match every instance of `searchText` in the string, or just the first instance. If the search text is case sensitive, specifiy using `caseSensitiveMatch`.

#### `separator`
- Type: `string`
- Default: `','`
- It is recommended that this be a single character delimiter, by which to split the supplied string. Use `globalSplit` to determine whether to split at every instance of `separator` or just the first instance. If the separator is case sensitive, specifiy using `caseSensitiveSplit`.

The following components can be supplied to the `<SplitMatch>` component as props:

#### `MatchComponent`
- Type: React Component
- Default: `undefined`
- This component is passed the following props:
  - `children` - The matched text string
- This is a customisable wrapper element (or elements) for the matched text

#### `SplitComponent`
- Type: React Component
- Default: `undefined`
- This component is passed the following props:
  - `children` (string) - The matched text string
  - `index` (number) - The index of the split text (starts at `0`)
- This is a customisable wrapper element (or elements) for the split text

## Contributing
- Fork the project
- Run the project in development mode: `$ npm run dev`
- Make changes.
- Add appropriate tests
- `$ npm test` (or `$ npm run watch`)
- Ensure all tests pass and any snapshot changes are fully reviewed
- Update README with appropriate docs.
- Commit and PR

## Release checklist
- Update CHANGELOG
- Update version number in package.json
- `$ git tag vN.N.N`
- Push tag `$ git push --tags`
- `$ npm run build`
- `$ npm publish`

## License

MIT
