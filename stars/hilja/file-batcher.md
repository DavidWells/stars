---
repo: hilja/file-batcher
url: 'https://github.com/hilja/file-batcher'
homepage: ''
starredAt: '2023-04-18T17:41:14Z'
createdAt: '2019-07-07T09:48:24Z'
updatedAt: '2024-09-18T21:16:39Z'
language: JavaScript
license: NA
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:51.864Z'
description: Bulk edit Front Matter Markdown files with ease
tags: []
---

# File Batcher

A tool to batch process large quantities of files asynchronously. It provides you some convenient tools to edit Front Matter fueled Markdown files (the stuff that most static site generators use). But is not limited to any specific filetype or format.

It could be used for for example to:

- Search and replace text in multiple files.
- To rename large quantities of files.
- Find unused packages by scanning source files.
- Reformatting chunks of text.
- Analyzing the readability of text in blog posts.
- Minifying files attached to blog posts.

## Features

- Is asynchronous.
- Can glob.
- Can do bulk edits without you writing any iterators.
- Provides a sane API to edit complex shapes with ([`immutability-helper`](https://github.com/kolodny/immutability-helper#update))
- The `remove` method doesn’t delete the files, but chugs them into the trash.
- Exposes `read`, `write`, and `remove` methods to edit individual posts.
- Is probably fast.

## Install

```
npm i file-batcher
```

## Usage

Imagine having thousands upon thousands of files like this:

```yaml
---
title: Foo
description: Very Foo
date: '2019-07-12 07:28'
categories:
  - images
  - trains
---
Hello!
```

We can edit them like so:

```js
import { batch } from 'file-batcher'

// A sane limit of 100 concurrent operations.
batch('fixtures/test-content/**', 100, async ({ goods, actions }) => {
  const { author } = goods.data
  const { update, save } = actions

  if (!author) return

  // Update the author’s name with the provided immutability-helper. The update
  // function is prepopulated with the data (`goods`) from the post.
  const newData = update({
    data: { author: { $set: 'Slartibartfast' } }
  })

  // At the end you can save your post with the new data.
  await save(newData)

  console.log('Just saved:', goods.path)
})
```

See [examples](./examples) for more examples.

## API

You've got 4 public methods at your disposal: batch, read, remove, and write.

### batch(input[, limit, onEach])

Return a promise that resolves to an array with the parsed Front Matter.

#### input

Type: `string|array`

If string, it uses uses [glob](https://www.npmjs.com/package/glob). Or an array of file paths, relative to the current working directory.

#### limit

Type: `string|array`<br> Default: `Infinite`

The concurrency.

#### onEach(args)

The function that runs on every iteration. It provides you a set of handy tools in the args. See below.

**args**

Type: `object`

**args.goods**

Type: `object|any`

If the target file is Front Matter, then `goods` will be an object provided by [gray-matter](https://www.npmjs.com/package/gray-matter), with a following shape:

```
{
  content: 'Hello\n',
  data: {
    title: 'foo',
    description: 'bar',
    categories: ['images']
  },
  isEmpty: false,
  excerpt: '',
  path: '/path/to/the/articles/bar.md'
}
```

If the file is not Front Matter, then `goods` will be the file’s contents verbatim.

**args.actions**

Type: `object`

Actions has all the tools you need to edit/save the files.

#### args.actions.update(pattern)

Type: `function`

This is a prepopulated [`immutability-helper`](https://github.com/kolodny/immutability-helper#update). It's just a tool that provides a syntax for editing complex shapes. Using it is completely optional.

The syntax:

```js
const newData = update({
  data: { author: { $set: 'Slartibartfast' } }
})
```

See more [advanced examples in the `immutability-helper` docs](https://github.com/kolodny/immutability-helper#update).

#### args.actions.save(data[, path])

Type: `function`

Saves the currently iterated file with the data passed to it. See the [`write`](#writepath-data-options) method for more info.

**data**

Type: `object`

The data to save, in the [upper-mentioned shape](#argsgoods).

Example:

```js
// Inside the `onEach`.
const capitalize = string => string[0].toUpperCase() + string.substring(1)

goods.data.name = capitalize(goods.data.name)

await save(goods)
```

**path?**

Type: `string`

This helper function is prepopulated with with the current file, so, if you’re operating on that file, you don’t need to pass in a path. You can, tho, if you want to save it to a new location.

#### args.actions.remove(path?)

Type: `function`<br> Returns: `Promise`

This one doesn't actually delete anything, but moves it to your computers Trash.

**path?**

Type: `string`

It’s prepopulated with the current file, so use this param only if you want to delete another file, that isn’t the one in the iteration.

#### args.index

Type: `number`

#### args.files

Type: `array`

The original array of files we’re looping over.

#### delay(milliseconds[, options])

Type: `function`<br> Return: `Promise`

See [delay](https://github.com/sindresorhus/delay).

Throttles the current iteration, good if you’re using somehow constricted API.

Example:

```js
const onEach = ({ throttle }) => {
  // Make only 20 calls per minute.
  await delay(3000)
  // Call your API or whatever.
  const data = fetch('https://example.com/rpm-limited-api')
}
```

### read(file)

Returns: `Promise<object>`

Reads a file asynchronously and returns its contents. If it’s a markdown file, the Frontmatter will be parsed and it will return the the following shape:

```
{
  content: '',
  data: {
    description: 'You literally took a shit in the blender',
    title: 'Kitchen nightmares'
  },
  isEmpty: false,
  excerpt: '',
  path: '/path/to/kitchen-nightmares.md'
}
```

**file**

Type: `string`

A path to a file. Relative to the current working directory.

### remove(path[, options])

Returns: `Promise`

Moves a given file into your computers trash, where you can then recover it, if you so like.

**path**

Type: `string`

A path to a file. Relative to the current working directory.

**options?**

Type: `object`

Options to pass to the underlying library [`trash`](https://www.npmjs.com/package/trash).

### write(path, data[, options])

An asynchronous function that takes some data and writes it into a file. If the data looks like it's meant to be parsed into a Front Matter, then it will be parsed into Front Matter. E.g. it has a shape: `{ content: '', data: {} }`.

**path**

Type: `string`

Where to write the data. Relative to the current working directory.

**data**

Type: `object|any`

If it's an object that has `data` and `content` in it, then it's parsed into Front Matter. Otherwise it's just written into the file as is.

**options.writeFile?**

Type: `object`

Options to pass to Node's [`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback).

**options.stringify?**

Options to pass to [`gray-matter`'s `stringify` method](https://www.npmjs.com/package/gray-matter#stringify).

## Similar packages

If you need something more generic and with more API, then [Gulp](https://github.com/gulpjs/gulp) might be your thing.
