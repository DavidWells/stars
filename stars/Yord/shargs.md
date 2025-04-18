---
repo: Yord/shargs
url: 'https://github.com/Yord/shargs'
homepage: ''
starredAt: '2021-01-06T01:32:25Z'
createdAt: '2020-01-14T07:53:31Z'
updatedAt: '2022-10-26T04:40:01Z'
language: JavaScript
license: MIT
branch: master
stars: 86
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:09.169Z'
description: "\U0001F988 shargs is a combinator library for building command-line argument parsers."
tags:
  - command-line
  - parser
  - shargs
---

<p align="center">
<img width="800" src="shargs.png" />
</p>

🦈 shargs (**sh**ell **args**) is a library for building command-line argument parsers.

[![node version][shield-node]][node]
[![npm version][shield-npm]][npm-package]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]
[![linux unit tests status][shield-unit-tests-linux]][actions]
[![macos unit tests status][shield-unit-tests-macos]][actions]
[![windows unit tests status][shield-unit-tests-windows]][actions]

## Features

+   Compose functions to build [highly customizable](#command-line-parsers) command-line argument [parsers](#the-parsersync-function).
+   35+ opt-in features, e.g. ([multiple](#multiple-subcommands)) [subcommands](#subcommand),
    [spelling mistake detection](#suggestOpts), [default values](#setDefaultValues),
    and ([best guess](#bestGuessCast)) [casting](#cast).
+   [Synchronous](#the-parsersync-function) and Promise-based [asynchronous](#async-parsers) modes
    with async/await support.
+   [Automatic usage documentation generation](#automatic-usage-documentation-generation) with fine-grained control over 
    [layouts](#automatic-usage-documentation-generation) and [styles](#style).
+   Easily extensible with your own [custom parser stages](#custom-checks-and-stages)
    and [custom usage layouts](#custom-usage-functions).
+   [Extensively documented](#documentation) and very well tested (800+ unit and integration tests).
+   [Modular library layout](#installation) with zero runtime dependencies.

## Installation

Install as a bundle (recommended):

<pre>
npm install --save <a href="https://github.com/Yord/shargs">shargs</a>
</pre>

Install as modules:

<pre>
npm install --save <a href="https://github.com/Yord/shargs-core">shargs-core</a>   # core functions like <a href="#the-parsersync-function">parserSync</a> (in bundle: shargs/core or shargs)
npm install --save <a href="https://github.com/Yord/shargs-opts">shargs-opts</a>   # a DSL for <a href="#command-line-options">command-line options</a> (in bundle: shargs/opts)
npm install --save <a href="https://github.com/Yord/shargs-parser">shargs-parser</a> # collection of <a href="#command-line-parsers">parser functions</a> (in bundle: shargs/parser)
npm install --save <a href="https://github.com/Yord/shargs-usage">shargs-usage</a>  # collection of <a href="#automatic-usage-documentation-generation">usage functions</a>  (in bundle: shargs/usage)
npm install --save <a href="https://github.com/Yord/shargs-repl">shargs-repl</a>   # <a href="#building-repls-with-shargs">build REPLs</a> powered by shargs  (not in bundle)
</pre>

The documentation assumes the bundle is installed,
but the only difference between the bundle and modules installation is how functions are imported:
The bundle uses `require('shargs/opts')`, while `require('shargs-opts')` is used by modules
(note the use of `/` vs. `-`).
Read [installing as bundle or modules](#installing-as-bundle-or-modules) for more details.

## Getting Started

<details>
<summary>
Describe your command and its options:

<p>

```js
const opts = [
  stringPos('question', {desc: 'Ask a question.', required: true}),
  number('answer', ['-a', '--answer'], {desc: 'The answer.', defaultValues: [42]}),
  flag('help', ['-h', '--help'], {desc: 'Print this help message and exit.'})
]

const deepThought = command('deepThought', opts, {desc: 'Ask the Ultimate Question.'})
```

</p>
</summary>

The `deepThought` command has three command-line options:

1.  A `required` string positional argument named `question`.
2.  An `answer` number option specified with `-a` or `--answer` that should default to `42` if not given.
3.  A `help` command-line flag given by `-h` or `--help`.

You may use the `shargs-opts` module to get a nice DSL for describing our options.
However, you could have also written them out as objects yourself or could have used a different DSL.

Read up on the details in the [command-line options](#command-line-options) section.

</details>

<details>
<summary>
Declare your own command-line parser:

<p>

```js
const parser = parserSync({
  argv: [splitShortOpts],
  opts: [setDefaultValues, requireOpts, cast],
  args: [flagsAsBools]
})
```

</p>
</summary>

Shargs gives you fine-grained control over how the options are parsed.
By using the `shargs-core` and `shargs-parser` modules, we have build the following `parser`:

1.  `splitShortOpts`: Short option groups like `-cvzf` are transformed to `-c -v -z -f`.
2.  `setDefaultValues`: Options with default values that were not provided are set.
3.  `requireOpts`: It is verified that all required options have been given.
4.  `cast`: Strings are cast to other types, like numbers or booleans.
5.  `flagsAsBools`: Command-line flags are transformed to booleans.

Note that you did not tell `parser` how exactly to do those things.
Everything is nice and declarative, and the details are hidden away in the parser stages.

The [parserSync function](#the-parserSync-function)
and [command-line parsers](#command-line-parsers) sections have all the details.

</details>

<details>
<summary>
Layout a usage documentation:

<p>

```js
const docs = usage([synopsis, space, optsList, space, desc])

const style = {
  line: [{width: 80}],
  cols: [{width: 25}, {width: 55}]
}
```

</p>
</summary>

You may use `shargs-usage` to automatically generate a usage documentation based on a command definition
(e.g. `deepThought` from before).
The module provides all components generally found in usage documentations, like:

1.  A `synopsis`, summarizing available options: e.g. `deepThought (<question>) [-a|--answer] [-h|--help]`.
2.  An options list (`optsList`), describing option details in a tabular format.

Note that `shargs-usage` is declarative:
You only specify what components our usage documentation should have.
The details on how exactly those components transform command-line options into text is hidden away.

See the [automatic usage documentation generation](#automatic-usage-documentation-generation)
and [style](#style) sections.

</details>

<details>
<summary>
Use the parser and the usage documentation in your program:

<p>

```js
const argv = process.argv.slice(2)
const {errs, args} = parser(deepThought)(argv)

errs.forEach(err => console.log(err.msg))

const help = docs(deepThought)(style)
if (args.help) console.log(help)
```

</p>
</summary>

The command-line option DSL, the parser DSL, and the usage documentation DSL combined
give you a very flexible way to write command-line programs.

Find out more in the [building command-line parsers with shargs](#building-command-line-parsers-with-shargs) section.

</details>

<details>
<summary>
Run your command with <code>node ./deepThought --help</code>:

<p>

```bash
deepThought (<question>) [-a|--answer] [-h|--help]                              
                                                                                
<question>               Ask a question. [required]                             
-a, --answer=<number>    The answer. [default: 42]                              
-h, --help               Print this help message and exit.                      
                                                                                
Ask the Ultimate Question.                                                      
```

</p>
</summary>

The [automatic usage documentation generation](#automatic-usage-documentation-generation)
and [building command-line parsers with shargs](#building-command-line-parsers-with-shargs) sections have more.

</details>

### Tutorials

+   [Beginners: Implementing a `git`-like interface.][shargs-tutorial-git]

### Examples

+   [An asynchronous version of deepThought.][shargs-example-async-deepthought]
+   [A synchronous version of deepThought.][shargs-example-sync-deepthought]
+   [deepThought with three layers of configuration: A config file, environment variables, and command-line arguments.][shargs-example-sync-deepthought-config-env-argv]
+   [A command-line arguments SQL parser.][shargs-example-sync-sql]
+   [A REPL (Real Eval Print Loop) build with `shargs-repl`.][shargs-example-repl]

## Documentation

This documentation encompasses the following shargs modules:

1.  [`shargs-opts`][shargs-opts] is documented in [command-line options](#command-line-options).
2.  [`shargs-core`][shargs-core] is documented in [the `parserSync` function](#the-parserSync-function).
3.  [`shargs-parser`][shargs-parser] is documented in [command-line parsers](#command-line-parsers).
4.  [`shargs-usage`][shargs-usage] is documented in [automatic usage documentation generation](#automatic-usage-documentation-generation).
5.  [`shargs-repl`][shargs-repl] is documented in [building REPLs with shargs](#building-repls-with-shargs).

### Command-line Options

Command-line options are the most important concept in shargs.
They are the basis for its two main features:
[Command-line parsers](#command-line-parsers)
and [automatic usage documentation generation](#automatic-usage-documentation-generation).

Shargs defines many different types of command-line options represented by objects with the following interfaces:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Interface&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="flag-option">
<td><a href="#flag-option">Flag Option</a></td>
<td><code>{<a href="#key">key</a>, <a href="#args">args</a>, <a href="#types">types</a>: []}</code></td>
<td>A present or absent value.</td>
</tr>
<tr name="primitive-option">
<td><a href="#primitive-option">Primitive Option</a></td>
<td><code>{<a href="#key">key</a>, <a href="#args">args</a>, <a href="#types">types</a>: [_]}</code></td>
<td>A unary value given by argument.</td>
</tr>
<tr name="array-option">
<td><a href="#array-option">Array Option</a></td>
<td><code>{<a href="#key">key</a>, <a href="#args">args</a>, <a href="#types">types</a>: [_, _, ...]}</code></td>
<td>An array of length n given by argument.</td>
</tr>
<tr name="variadic-option">
<td><a href="#variadic-option">Variadic Option</a></td>
<td><code>{<a href="#key">key</a>, <a href="#args">args</a>}</code></td>
<td>A variable length array given by argument.</td>
</tr>
<tr name="subcommand-option">
<td><a href="#subcommand-option">Subcommand Option</a></td>
<td><code>{<a href="#key">key</a>, <a href="#args">args</a>, <a href="#opts">opts</a>}</code></td>
<td>An option group given by argument.</td>
</tr>
<tr name="primitive-pos-arg">
<td><a href="#primitive-pos-arg">Primitive Positional Argument</a></td>
<td><code>{<a href="#key">key</a>, <a href="#types">types</a>: [_]}</code></td>
<td>A unary value given by position.</td>
</tr>
<tr name="array-pos-arg">
<td><a href="#array-pos-arg">Array Positional Argument</a></td>
<td><code>{<a href="#key">key</a>, <a href="#types">types</a>: [_, _, ...]}</code></td>
<td>An array of length n given by position.</td>
</tr>
<tr name="variadic-pos-arg">
<td><a href="#variadic-pos-arg">Variadic Positional Argument</a></td>
<td><code>{<a href="#key">key</a>}</code></td>
<td>A variable length array given by position.</td>
</tr>
<tr name="command-pos-arg">
<td><a href="#command-pos-arg">Command Positional Argument</a></td>
<td><code>{<a href="#key">key</a>, <a href="#opts">opts</a>}</code></td>
<td>An option group given by position.</td>
</tr>
<tr name="rest">
<td><a href="#rest">Rest</a></td>
<td><code>{<a href="#values">values</a>}</code></td>
<td>An argument value of unknown type.</td>
</tr>
</table>

Since writing objects following these interfaces by hand can be tedious,
[`shargs-opts`][shargs-opts] gives you a simple type-based DSL for defining valid command-line options:

```js
const {command, flag, number, subcommand} = require('shargs/opts')

const opts = [
  subcommand(askOpts)('ask', ['ask'], {required: true, desc: 'Ask a question.'}),
  number('answer', ['-a', '--answer'], {defaultValues: [42], desc: 'The answer.'}),
  flag('help', ['-h', '--help'], {desc: 'Print this help message and exit.'})
]

const deepThought = command('deepThought', opts, {
  desc: 'Deep Thought was created to come up with the Answer to ' +
        'The Ultimate Question of Life, the Universe, and Everything.'
})
```

In the example, using the type functions [`subcommand`](#subcommand), [`number`](#number), [`flag`](#flag),
and [`command`](#command) guarantees the generation of valid objects.

#### Type Functions

The following type functions are available:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type&nbsp;Function&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="array">
<td>
<code name="arrayPos"><a href="#array">array</a>(types)(key, args, fields)</code><br />
<code><a href="#arrayPos">arrayPos</a>(types)(key, fields)</code>
</td>
<td>
<details>
<summary>
<code>array</code> generates an <a href="#array-option">array option</a>,
while <code>arrayPos</code> generates an <a href="#array-pos-arg">array positional argument</a>,
representing arrays whose length is known in advance.
</summary>

<br />

The closely related <code><a href="#variadic">variadic</a></code>
and <code><a href="#variadicPos">variadicPos</a></code> represent arrays with unknown lengths.

<br />

`array` returns the following object:

```js
const array = types => (key, args, fields) => ({
  key, args, types, ...fields
})
```

`arrayPos` returns the following object:

```js
const arrayPos = types => (key, fields) => ({
  key, types, ...fields
})
```

</details>
</td>
</tr>
<tr name="bool">
<td>
<code name="boolPos"><a href="#bool">bool</a>(key, args, fields)</code><br />
<code><a href="#boolPos">boolPos</a>(key, fields)</code>
</td>
<td>
<details>
<summary>
<code>bool</code> generates a <a href="#primitive-option">primitive option</a>,
while <code>boolPos</code> generates a <a href="#primitive-pos-arg">primitive positional argument</a>,
representing the boolean values <code>'true'</code> and <code>'false'</code>.
</summary>

<br />

Note that the values are represented as strings and you may want to <code><a href="#cast">cast</a></code> them.
If you need more values representing <code>'true'</code> (e.g. <code>'t'</code>, <code>'yes'</code>)
or <code>'false'</code> (e.g. <code>'F'</code>, <code>'no'</code>),
have a look at <code><a href="#broadenBools">broadenBools</a></code>.
If you want to treat a value as its <code><a href="#reverse">reverse</a></code>,
see <code><a href="#reverseBools">reverseBools</a></code>.
If you need <code><a href="#flag">flag</a></code>s instead of <code>bool</code>s, have a look at the
<code><a href="#boolAsFlag">boolAsFlag</a></code> and <code><a href="#boolsAsFlags">boolsAsFlags</a></code> 
parser stages.

<br />

`bool` returns the following object:

```js
const bool = (key, args, fields) => ({
  key, args, types: ['bool'], ...fields
})
```

`boolPos` returns the following object:

```js
const boolPos = (key, fields) => ({
  key, types: ['bool'], ...fields
})
```

</details>
</td>
</tr>
<tr name="subcommand">
<td>
<code name="command"><a href="#subcommand">subcommand</a>(opts)(key, args, fields)</code><br />
<code><a href="#command">command</a>(key, opts, fields)</code>
</td>
<td>
<details>
<summary>
<code>subcommand</code> generates a <a href="#subcommand-option">subcommand option</a>,
while <code>command</code> generates a <a href="#command-pos-arg">command positional argument</a>.
Combined, they enable commands to do multiple things like <code>git init</code>, <code>git commit</code>, and <code>git push</code>.
</summary>

<br />

<code>subcommand</code>'s and <code>command</code>'s <code><a href="#opts">opts</a></code> fields
are arrays of command-line options used to parse their <code><a href="#values">values</a></code>.
Subcommands may have their own <a href="#substages">command-specific parsers</a>
or are parsed by <code>command</code>'s parser.
<code>command</code> or <code>subcommand</code> values are either terminated by the end of the input
or by <code>--</code>.

<br />

`subcommand` returns the following object:

```js
const subcommand = opts => (key, args, fields) => ({
  key, args, opts, ...fields
})
```

`command` returns the following object:

```js
const command = (key, opts, fields) => ({
  key, opts, ...fields
})
```

</details>
</td>
</tr>
<tr name="flag">
<td><code><a href="#flag">flag</a>(key, args, fields)</code></td>
<td>
<details>
<summary>
<code>flag</code> generates a <a href="#flag-option">flag option</a>,
representing command-line options that take no value.
</summary>

<br />

Shargs counts the number of times a <code>flag</code> occurs, so a <code>flag</code> may be amplified by repeating it.
If you don't need counts and prefer numbers or boolean values, have a look at the
<code><a href="#flagAsBool">flagAsBool</a></code>, <code><a href="#flagAsNumber">flagAsNumber</a></code>,
<code><a href="#flagsAsBools">flagsAsBools</a></code> and <code><a href="#flagsAsNumbers">flagsAsNumbers</a></code> 
parser stages.
If you need the presence of a <code>flag</code> to imply negativity (e.g. <code>--no-fun</code>),
see <code><a href="#complement">complement</a></code>,
<code><a href="#reverse">reverse</a></code> and <code><a href="#reverseFlags">reverseFlags</a></code>.

<br />

`flag` returns the following object:

```js
const flag = (key, args, fields) => ({
  key, args, types: [], ...fields
})
```

</details>
</td>
</tr>
<tr name="number">
<td>
<code name="numberPos"><a href="#number">number</a>(key, args, fields)</code><br />
<code><a href="#numberPos">numberPos</a>(key, fields)</code>
</td>
<td>
<details>
<summary>
<code>number</code> generates a <a href="#primitive-option">primitive option</a>,
while <code>numberPos</code> generates a <a href="#primitive-pos-arg">primitive positional argument</a>,
representing JavaScript numbers.
</summary>

<br />

Numbers are represented as strings and you may want to <code><a href="#cast">cast</a></code> them.
If you need <code><a href="#flag">flag</a></code>s instead of <code>number</code>s, have a look at the
<code><a href="#numberAsFlag">numberAsFlag</a></code> and <code><a href="#numbersAsFlags">numbersAsFlags</a></code> 
parser stages.

<br />

`number` returns the following object:

```js
const number = (key, args, fields) => ({
  key, args, types: ['number'], ...fields
})
```

`numberPos` returns the following object:

```js
const numberPos = (key, fields) => ({
  key, types: ['number'], ...fields
})
```

</details>
</td>
</tr>
<tr name="string">
<td>
<code name="stringPos"><a href="#string">string</a>(key, args, fields)</code><br />
<code><a href="#stringPos">stringPos</a>(key, fields)</code>
</td>
<td>
<details>
<summary>
<code>string</code> generates a <a href="#primitive-option">primitive option</a>,
while <code>stringPos</code> generates a <a href="#primitive-pos-arg">primitive positional argument</a>,
representing strings.
</summary>

<br />

`string` returns the following object:

```js
const string = (key, args, fields) => ({
  key, args, types: ['string'], ...fields
})
```

`stringPos` returns the following object:

```js
const stringPos = (key, fields) => ({
  key, types: ['string'], ...fields
})
```

</details>
</td>
</tr>
<tr name="variadic">
<td>
<code name="variadicPos"><a href="#variadic">variadic</a>(key, args, fields)</code><br />
<code><a href="#variadicPos">variadicPos</a>(key, fields)</code>
</td>
<td>
<details>
<summary>
<code>variadic</code> generates a <a href="#variadic-option">variadic option</a>,
while <code>variadicPos</code> generates a <a href="#variadic-pos-arg">variadic positional argument</a>.
These types represent arrays whose length is not known in advance.
</summary>

<br />

An <code>opts</code> array can have at most one <a href="#variadic-pos-arg">variadic positional argument</a>
and no other positional arguments (<code>*Pos</code>) may be defined after it.
The closely related <code><a href="#array">array</a></code>
and <code><a href="#arrayPos">arrayPos</a></code> represent arrays with known lengths, while
<code><a href="#command">command</a></code> and <code><a href="#subcommand">subcommand</a></code> are
<code>variadicPos</code> and <code>variadic</code> with <code><a href="#opts">opts</a></code> fields.
A <code>variadic</code>'s or <code>variadicPos</code>' values are either terminated by the end of the input
or by <code>--</code>.

<br />

`variadic` returns the following object:

```js
const variadic = (key, args, fields) => ({
  key, args, ...fields
})
```

`variadicPos` returns the following object:

```js
const variadicPos = (key, fields) => ({
  key, ...fields
})
```

</details>
</td>
</tr>
</table>

You may write out command-line options by hand, or write your own DSLs for creating them, they are just JavaScript objects:

```js
const askOpts = [
  {key: 'format', args: ['--format'], types: ['string'], only: ['json', 'xml'], defaultValues: ['json'],
   desc: 'Respond either with json or xml.'},
  {key: 'html', args: ['--no-html'], types: [], reverse: true, desc: 'Remove HTML tags.'},
  {key: 'help', args: ['-h', '--help'], types: [], desc: 'Print this help message and exit.'},
  {key: 'question', types: ['string'], required: true, desc: 'State your question.'}
]
```

Apart from [`key`](#key), [`args`](#args), [`types`](#types), [`opts`](#opts), and [`values`](#values)
that we have already seen and that determine an option's type,
command-line option objects may be given any other <code>fields</code>,
that may be used to provide information to parser stages
(e.g. [`defaultValues`](#defaultValues), [`only`](#only)),
or to provide descriptions for usage documentation generation
(e.g. <code><a href="#desc">desc</a></code>, <code><a href="#descArg">descArg</a></code>).
If you write your own parser stages, you may also define your own fields.

#### Option Fields

The following fields are used by [`shargs-core`][shargs-core], [`shargs-parser`][shargs-parser] stages
or [`shargs-usage`][shargs-usage] functions:

<table>
<tr>
<th>Field</th>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>

<tr name="args">
<td><code><a href="#args">args</a></code></td>
<td><code>string[]</code></td>
<td>
<details>
<summary>
<code>args</code> defines argument names for command-line options (e.g. <code>['-h', '--help']</code>).
</summary>

<br />

Argument names have no restrictions and can be any string.
E.g. <code>['-h', '--help']</code> could be used for a help <code><a href="#flag">flag</a></code>
or <code>['ask']</code> could be used for a <code><a href="#command">command</a></code>.
Positional arguments must not have an <code>args</code> field,
as they are not given by argument, but by their position.

</details>
</td>
</tr>
<tr name="contradicts">
<td><code><a href="#contradicts">contradicts</a></code></td>
<td><code><a href="#key">key</a>[]</code></td>
<td>
<details>
<summary>
<code>contradicts</code> defines what <code><a href="#key">key</a></code>s an option is incompatible with.
</summary>

<br />

This information is used by the <code><a href="#contradictOpts">contradictOpts</a></code> parser stage
to report errors if incompatible options are used together.
Note that <code>contradicts</code> is unidirectional and not transitive
(e.g. if <code>a</code> contradicts <code>b</code> and <code>b</code> contradicts <code>c</code>,
<code>a</code> does not contradict <code>c</code>, and thus <code>a</code> and <code>c</code> are compatible).
Only two <code><a href="#key">key</a></code>s that each contradict the other <code><a href="#key">key</a></code>
are mutually exclusive.

</details>
</td>
</tr>
<tr name="defaultValues">
<td><code><a href="#defaultValues">defaultValues</a></code></td>
<td>*</td>
<td>
<details>
<summary>
<code>defaultValues</code> defines default <code><a href="#values">values</a></code> for command-line options.
</summary>

<br />

They are used by the <code><a href="#setDefaultValues">setDefaultValues</a></code> parser stage
that sets the <code>values</code> field if no <code><a href="#values">values</a></code> are supplied.
The <code>defaultValues</code>' type depends on the command-line option type:
<a href="#subcommand-option">Subcommands</a> takes the same array of options as <code><a href="#opts">opts</a></code>.
<a href="#flag-option">Flag options</a>' values have to be a number.
All other options take an array of values,
that must have the same length as their <code><a href="#types">types</a></code> field.

</details>
</td>
</tr>
<tr name="desc">
<td><code><a href="#desc">desc</a></code></td>
<td><code>string</code></td>
<td>
<details>
<summary>
<code>desc</code> defines an option description used by various usage functions.
</summary>

<br />

More specifically, <code>desc</code> is used by
<code><a href="#usage-desc">desc</a></code>, <code><a href="#optsList">optsList</a></code>,
<code><a href="#optsLists">optsLists</a></code>, <code><a href="#optsDef">optsDef</a></code>,
and <code><a href="#optsDefs">optsDefs</a></code> and their <code>*With</code> versions.

</details>
</td>
</tr>
<tr name="descArg">
<td><code><a href="#descArg">descArg</a></code></td>
<td><code>string</code></td>
<td>
<details>
<summary>
<code>descArg</code> defines a description for an argument value
(e.g. <code>{descArg: 'format'}</code> would print <code>--format=&lt;format&gt;</code>
instead of <code>--format=&lt;string&gt;</code>).
</summary>

<br />

It is used by the <code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, and <code><a href="#optsDefs">optsDefs</a></code> usage functions
and their <code>*With</code> versions.
<code><a href="#only">only</a></code>, <code><a href="#types">types</a></code>, and <code><a href="#key">key</a></code> 
are other fields that change the argument value description.
These fields are applied in the following order (highest priority first):
<code>descArg</code>, <code><a href="#only">only</a></code>, <code><a href="#types">types</a></code>,
and <code><a href="#key">key</a></code>.
If <code>descArg</code> is an empty string, no argument value description is displayed.

</details>
</td>
</tr>
<tr name="descDefault">
<td><code><a href="#descDefault">descDefault</a></code></td>
<td><code>string</code></td>
<td>
<details>
<summary>
<code>descDefault</code> overrides the default shield (e.g. <code>[default: 42]</code>) displayed in several usage commands.
</summary>

<br />

It is used by the <code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, and <code><a href="#optsDefs">optsDefs</a></code> usage functions
and their <code>*With</code> versions.
If <code>descDefault</code> is an empty string, the default shield is hidden.

</details>
</td>
</tr>
<tr name="implies">
<td><code><a href="#implies">implies</a></code></td>
<td><code><a href="#key">key</a>[]</code></td>
<td>
<details>
<summary>
<code>implies</code> defines what <code><a href="#key">key</a></code>s an option must be defined with.
</summary>

<br />

This information is used by the <code><a href="#implyOpts">implyOpts</a></code> parser stage
to report errors if mandatory options are missing.
Note that <code>implies</code> is unidirectional
(e.g. if <code>a</code> implies <code>b</code> and <code>a</code> is present, <code>b</code> must be present as well,
but if <code>b</code> is present, <code>a</code> does not have to be present)
and transitive
(e.g. if <code>a</code> implies <code>b</code> and <code>b</code> implies <code>c</code>,
<code>a</code> also implies <code>c</code>,
and thus if <code>a</code> is present, <code>c</code> must also be present).
Only two <code><a href="#key">key</a></code>s that each imply the other <code><a href="#key">key</a></code>
are mutually inclusive.

</details>
</td>
</tr>
<tr name="key">
<td><code><a href="#key">key</a></code></td>
<td><code>string</code></td>
<td>
<details>
<summary>
<code>key</code> defines the name of a command-line option.
</summary>

<br />

It is used by the <code><a href="#the-parserSync-function">parser</a></code> function
as a field name for the parsed values in the resulting <code>args</code> object.
Most command-line options should have a unique <code>key</code> to avoid collisions with other options.
However, if two different options describe the same result field, it may make sense to give them a shared key.
See <code><a href="#complement">complement</a></code> for an example.
A <code>key</code> must not be named <code>_</code>.
It is also used by the
<code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, <code><a href="#optsDefs">optsDefs</a></code>,
<code><a href="#synopses">synopses</a></code>, and <code><a href="#synopsis">synopsis</a></code> usage functions
and their <code>*With</code> versions to describe argument values (e.g. <code>--format=&lt;format&gt;</code>).
<code><a href="#descArg">descArg</a></code>, <code><a href="#only">only</a></code>,
and <code><a href="#types">types</a></code> are other fields that change the argument value description.
These fields are applied in the following order (highest priority first):
<code><a href="#descArg">descArg</a></code>, <code><a href="#only">only</a></code>,
<code><a href="#types">types</a></code>, and <code>key</code>.

</details>
</td>
</tr>
<tr name="only">
<td><code><a href="#only">only</a></code></td>
<td><code>any[]</code></td>
<td>
<details>
<summary>
<code>only</code> defines valid values of an option.
</summary>

<br />

It is used by the <code><a href="#restrictToOnly">restrictToOnly</a></code> parser stage to validate user input.
<code>only</code> may be used to <a href="#can-i-use-enums">implement enumerations</a>.
It is also used by the <code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, and <code><a href="#optsDefs">optsDefs</a></code> usage functions
and their <code>*With</code> versions to describe argument values (e.g. <code>--format=&lt;json|xml&gt;</code>).
<code><a href="#descArg">descArg</a></code>, <code><a href="#types">types</a></code>,
and <code><a href="#key">key</a></code> are other fields that change the argument value description.
These fields are applied in the following order (highest priority first):
<code><a href="#descArg">descArg</a></code>, <code>only</code>, <code><a href="#types">types</a></code>,
and <code><a href="#key">key</a></code>.

</details>
</td>
</tr>
<tr name="opts">
<td><code><a href="#opts">opts</a></code></td>
<td><code><a href="#command-line-options">option</a>[]</code></td>
<td>
<code>opts</code> defines the command-line options of <code><a href="#command">command</a></code>s
and <code><a href="#subcommand">subcommand</a></code>s.
</td>
</tr>
<tr name="required">
<td><code><a href="#required">required</a></code></td>
<td><code>boolean</code></td>
<td>
<details>
<summary>
<code>required</code> defines whether a command-line option has to be present or not.
</summary>

<br />

It is used by the <code><a href="#requireOpts">requireOpts</a></code> stage that reports an error
if a <code>required</code> option does not have <code><a href="#values">values</a></code>.
A positional argument (<code>*Pos</code>) can only be <code>required</code>,
if all previously defined positional arguments are <code>required</code> as well.
The <code><a href="#synopsis">synopsis</a></code>, <code><a href="#synopses">synopses</a></code>,
<code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, and <code><a href="#optsDefs">optsDefs</a></code> usage functions
and their <code>*With</code> versions mark <code>required</code> options.

</details>
</td>
</tr>
<tr name="reverse">
<td><code><a href="#reverse">reverse</a></code></td>
<td><code>boolean</code></td>
<td>
<code>reverse</code> defines whether the <code><a href="#values">values</a></code> of a given option should be reversed by
the <code><a href="#reverseBools">reverseBools</a></code> or <code><a href="#reverseFlags">reverseFlags</a></code>
parser stages.
</td>
</tr>
<tr name="types">
<td><code><a href="#types">types</a></code></td>
<td><code>string[]</code></td>
<td>
<details>
<summary>
<code>types</code> defines what user input a command-line option takes.
</summary>

<br />

<a href="#flag-option">Flag options</a>' <code>types</code> must be <code>[]</code>.
<a href="#primitive-option">Primitive options</a>' and <a href="#primitive-pos-arg">primitive positional arguments</a>'
<code>types</code> must be <code>[\_]</code>,
and <a href="#array-option">array options</a>' and <a href="#array-pos-arg">array positional arguments</a>'
<code>types</code> must be <code>[\_, \_, ...]</code>,
where <code>_</code> is the name of a type given as a string.
<a href="#variadic-option">Variadic options</a>, <a href="#variadic-pos-arg">variadic positional arguments</a>,
<a href="#subcommand-option">subcommand options</a>, and <a href="#command-pos-arg">command positional arguments</a>
must not have a <code>types</code> field.
<code>types</code> is also used by the
<code><a href="#optsList">optsList</a></code>, <code><a href="#optsLists">optsLists</a></code>,
<code><a href="#optsDef">optsDef</a></code>, and <code><a href="#optsDefs">optsDefs</a></code> usage functions
and their <code>*With</code> versions to describe argument values
(e.g. <code>--format=&lt;bool&gt;</code> for a <code><a href="#bool">bool</a></code> option).
<code><a href="#descArg">descArg</a></code>, <code><a href="#only">only</a></code>,
and <code><a href="#key">key</a></code> are other fields that change the argument value description.
These fields are applied in the following order (highest priority first):
<code><a href="#descArg">descArg</a></code>, <code><a href="#only">only</a></code>, <code>types</code>,
and <code><a href="#key">key</a></code>.

</details>
</td>
</tr>
<tr name="values">
<td><code><a href="#values">values</a></code></td>
<td><code>any[]</code></td>
<td>
<details>
<summary>
<b>This field should only be set by parser stages and never manually.</b>
<code>values</code> are assigned by the parser.
You may want to use <code><a href="#defaultValues">defaultValues</a></code>.
</summary>

<br />

The length of a <code>values</code>' array depends on the command-line option type:
<a href="#flag-option">Flag options</a>, <a href="#primitive-option">primitive options</a>,
<a href="#primitive-pos-arg">primitive positional arguments</a>, and <a href="#rest">rest</a>
must each have <code>values</code> of length <code>1</code>.
<a href="#array-option">Array options</a>' and <a href="#array-pos-arg">array positional arguments</a>'
<code>values</code> field must match their <code><a href="#types">types</a></code> in length.
<a href="#subcommand-option">subcommand option</a>'s, <a href="#command-pos-arg">command positional argument</a>'s,
<a href="#variadic-option">variadic option</a>'s, and <a href="#variadic-pos-arg">variadic positional argument</a>'s
<code>values</code> may have any number of entries.

</details>
</td>
</tr>
</table>

#### Option Decorators

Certain changes to options are so frequent, that [`shargs-opts`][shargs-opts] provides decorators for them.
You may think of decorators as recurring patterns that are provided as functions.

[`shargs-opts`][shargs-opts] provides the following decorators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Decorator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="complement">
<td><code><a href="#complement">complement</a>(prefix)(opt)</code></td>
<td>
<details>
<summary>
<code>complement</code> transforms a <code><a href="#bool">bool</a></code> or <code><a href="#flag">flag</a></code> 
option into a complementary option prefixed with a given string
(e.g. <code>--no-html</code> if used on <code>--html</code>).
</summary>

<br />

The complementary option has the same <code><a href="#key">key</a></code> as the original option,
but <code><a href="#reverse">reverses</a></code> its value.
If <code>complement</code> is used,
you most probably want to also use the <code><a href="#reverseBools">reverseBools</a></code>
or <code><a href="#reverseFlags">reverseFlags</a></code> parser stage.

<br />

Example:

```js
const {flag, complement} = require('shargs/opts')

const no = complement('--no-')

const html = flag('html', ['-H', '--html'], {defaultValues: ['false']})
const noHtml = no(html)
```

Is the same as:

```js
const {flag} = require('shargs/opts')

const html = flag('html', ['-H', '--html'], {defaultValues: ['false']})
const noHtml = flag('html', ['--no-H', '--no-html'], {reverse: true})
```

Note the differences in `defaultValues` and `reverse`.

</details>
</td>
</tr>
<tr name="posArgToOpt">
<td><code><a href="#posArgToOpt">posArgToOpt</a>(args)(opt)</code></td>
<td>
<details>
<summary>
<code>posArgToOpt</code> transforms a positional argument into an option
by adding <code><a href="#args">args</a></code>.
</summary>

<br />

Example:

```js
const {command, stringPos} = require('shargs/opts')

const opts = [stringPos('question')]
const deepThought = command('deepThought', opts)

const args = ['deepThought', 'D']
posArgToOpt(args)(deepThought)
```

Is the same as:

```js
const {subcommand} = require('shargs/opts')

subcommand(opts)('deepThought', args)
```

</details>
</td>
</tr>
</table>

#### Verify Commands

Shargs provides a function for verifying that commands have the correct structure:

```js
const {verifyCommand} = require('shargs')

const {errs, opt} = verifyCommand(deepThought)
```

In the example, it would return a list of `errs` if `deepThought` was invalid.
If the command is valid, the `errs` list is empty.
`verifyCommand` is used internally by `parserSync` and `parser`, but may be used independently.

### The `parserSync` Function

The `parserSync` function is [`shargs`][shargs]' core abstraction.
It generates a command-line parser from a collection of parser stages
and is usually used alongside [`shargs-parser`][shargs-parser]:

```js
const {parserSync} = require('shargs')
const {cast, flagsAsBools, requireOpts, restrictToOnly} = require('shargs/parser')
const {reverseFlags, setDefaultValues, splitShortOpts} = require('shargs/parser')

const stages = {
  argv: [splitShortOpts],
  opts: [setDefaultValues, requireOpts, reverseFlags, cast],
  args: [flagsAsBools]
}

const substages = {
  ask: [...stages.opts, restrictToOnly]
}

const parser = parserSync(stages, substages)
```

`parserSync` takes two parameters:

1.  A [`stages`](#stages) object that takes [parser stages](#command-line-parsers)
    and defines what transformations should be applied in which order.
2.  An optional [`substages`](#substages) object that defines subcommand-specific `opts` parser stages.

`parserSync` has a twin function called [`parser`](#async-parsers) that does the same, but works asynchronously.

#### `stages`

Shargs has seven different processing steps called stages that are applied in a predefined order
and transform argument values (`process.argv`) via command-line options (`opts`) to arguments (`args`):

<table>
<tr>
<th>Stage</th>
<th>Field</th>
<th>Type</th>
</tr>
<tr name="toArgv-field">
<td align="right">1</td>
<td><code><a href="#toArgv-field">toArgv</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;any => {errs, argv}&nbsp;</code>
</summary>

<br />

Transforms a value into command-line argument values syntax, e.g.

```js
"-p commit -am 'First commit'"
```

could be transformed to

```js
['-p', 'commit', '-am', 'First commit']
```

</details>
</td>
</tr>
<tr name="argv-field">
<td align="right">2</td>
<td><code><a href="#argv-field">argv</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, argv} => {errs, argv}></code>
</summary>

<br />

Several stages that modify command-line argument values, e.g.

```js
['-p', 'commit', '-am', 'First commit']
```

could be transformed to

```js
['-p', 'commit', '-a', '-m', 'First commit']
```

</details>
</td>
</tr>
<tr name="toOpts-field">
<td align="right">3</td>
<td><code><a href="#toOpts-field">toOpts</a></code></td>
<td>
<details>
<summary>
<code>command => {errs, argv} => {errs, opts}&nbsp;</code>
</summary>

<br />

Transforms argument values into command-line options, e.g.

```js
['-p', 'commit', '-a', '-m', 'First commit']
```

could be transformed to

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: [], values: [1]},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

</details>
</td>
</tr>
<tr name="opts-field">
<td align="right">4</td>
<td><code><a href="#opts-field">opts</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, opts} => {errs, opts}></code>
</summary>

<br />

Several stages that modify command-line options, e.g.

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: [], values: [1]},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

could be transformed to

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: ['bool'], values: ['true']},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

</details>
</td>
</tr>
<tr name="toArgs-field">
<td align="right">5</td>
<td><code><a href="#toArgs-field">toArgs</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, opts} => {errs, args}&nbsp;</code>
</summary>

<br />

Transforms command-line options into arguments object arrays, e.g.

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: ['bool'], values: ['true']},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

could be transformed to

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: 'true', message: 'First commit'}
  ]}
]
```

</details>
</td>
</tr>
<tr name="args-field">
<td align="right">6</td>
<td><code><a href="#args-field">args</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, args} => {errs, args}></code>
</summary>

<br />

Several stages that modify arguments object arrays, e.g.

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: 'true', message: 'First commit'}
  ]}
]
```

could be transformed to

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: {
    {_: [], all: true, message: 'First commit'}
  }}
]
```

</details>
</td>
</tr>
<tr name="fromArgs-field">
<td align="right">7</td>
<td><code><a href="#fromArgs-field">fromArgs</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, args} => any&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
</summary>

<br />

Transforms argument object arrays into any result value:

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: true, message: 'First commit'}
  ]}
]
```

could be transformed to

```js
{
  _: [],
  paginate: {type: 'flag', count: 1},
  commit: {
    _: [],
    all: true,
    message: 'First commit'
  }
}
```

</details>
</td>
</tr>
</table>

The [`argv`](#argv-field), [`opts`](#opts-field), and [`args`](#args-field) stages
are the user-facing API to declare a parser's behavior.

The [`toOps`](#toOpts-field) and [`toArgs`](#toArgs-field) stages
define the core behavior of [`parserSync`](#the-parserSync-function) (and [`parser`](#async-parsers))
and shargs defines sensible defaults that should not have to be changed in most use cases.
However, if you do have a use case that needs adjustments to those stages, you may carefully swap them out.

If you read the types from top to bottom, you get a good impression of how `parserSync` works.

#### `substages`

`substages` define custom `opts` stages for subcommands.
That means, while most subcommands are parsed using the `opts` defined in `stages`,
those whose [`key`](#key) matches a key in the `substages` object are parsed using the `opts` defined under that key.

Keys may be deeply nested to account for [`subcommand`](#subcommand)s of [`subcommand`](#subcommand)s:
E.g. if `ask` had a subcommand with the `question` [`key`](#key), `{ask: {question: [...stages.opts, restrictToOnly]}}` would assign custom `opts` to `question`.

The `_` [`key`](#key) is special in `substages`:
It is a wildcard that is used by any [`subcommand`](#subcommand) that is not given explicitly by [`key`](#key).
E.g. `{ask: {_: [...stages.opts, restrictToOnly]}}` and `{_: {_: [...stages.opts, restrictToOnly]}}` both work for `question`.

#### Async Parsers

The [`parserSync`](#the-parsersync-function) function has an asynchronous alternative called `parser`.
It is used exactly like `parserSync`, but also works with stages returning
[JavaScript Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)
and returns a Promise itself:

```js
// stages, substages, deepThought, argv are taken from the Getting Started section

const {parser} = require('shargs')

const asyncParser = parser(stages, substages)
const parse = asyncParser(deepThought)
const {errs, args} = await parse(argv)
```

 In addition to `parserSync`'s parameters,
 `parser`'s [`stages`](#stages) and [`substages`](#substages) parameters also take parser stages that return Promises:

<table>
<tr>
<th>Stage</th>
<th>Field</th>
<th>Type</th>
</tr>
<tr name="toArgv-field-async">
<td align="right">1</td>
<td><code><a href="#toArgv-field-async">toArgv</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;any => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, argv}&nbsp;&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;any => Promise<{errs, argv}>&nbsp;</code>
</summary>

<br />

Transforms a value into command-line argument values syntax, e.g.

```js
"-p commit -am 'First commit'"
```

could be transformed to

```js
['-p', 'commit', '-am', 'First commit']
```

</details>
</td>
</tr>
<tr name="argv-field-async">
<td align="right">2</td>
<td><code><a href="#argv-field-async">argv</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, argv} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, argv}>&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, argv} => Promise<{errs, argv}>></code>
</summary>

<br />

Several stages that modify command-line argument values, e.g.

```js
['-p', 'commit', '-am', 'First commit']
```

could be transformed to

```js
['-p', 'commit', '-a', '-m', 'First commit']
```

</details>
</td>
</tr>
<tr name="toOpts-field-async">
<td align="right">3</td>
<td><code><a href="#toOpts-field-async">toOpts</a></code></td>
<td>
<details>
<summary>
<code>command => {errs, argv} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, opts}&nbsp;&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;command => {errs, argv} => Promise<{errs, opts}>&nbsp;</code>
</summary>

<br />

Transforms argument values into command-line options, e.g.

```js
['-p', 'commit', '-a', '-m', 'First commit']
```

could be transformed to

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: [], values: [1]},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

</details>
</td>
</tr>
<tr name="opts-field-async">
<td align="right">4</td>
<td><code><a href="#opts-field-async">opts</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, opts} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, opts}>&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, opts} => Promise<{errs, opts}>></code>
</summary>

<br />

Several stages that modify command-line options, e.g.

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: [], values: [1]},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

could be transformed to

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: ['bool'], values: ['true']},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

</details>
</td>
</tr>
<tr name="toArgs-field-async">
<td align="right">5</td>
<td><code><a href="#toArgs-field-async">toArgs</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, opts} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, args}&nbsp;&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, opts} => Promise<{errs, args}>&nbsp;</code>
</summary>

<br />

Transforms command-line options into arguments object arrays, e.g.

```js
[
  {key: 'paginate', args: ['-p'], types: [], values: [1]},
  {key: 'commit', args: ['commit'], opts: [...], values: [
    {key: 'all', args: ['-a'], types: ['bool'], values: ['true']},
    {key: 'message', args: ['-m'], types: ['string'], values: ['First commit']},
    ...
  ]},
  ...
]
```

could be transformed to

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: 'true', message: 'First commit'}
  ]}
]
```

</details>
</td>
</tr>
<tr name="args-field-async">
<td align="right">6</td>
<td><code><a href="#args-field-async">args</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, args} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, args}>&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Array<{errs, args} => Promise<{errs, args}>></code>
</summary>

<br />

Several stages that modify arguments object arrays, e.g.

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: 'true', message: 'First commit'}
  ]}
]
```

could be transformed to

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: {
    {_: [], all: true, message: 'First commit'}
  }}
]
```

</details>
</td>
</tr>
<tr name="fromArgs-field-async">
<td align="right">7</td>
<td><code><a href="#fromArgs-field-async">fromArgs</a></code></td>
<td>
<details>
<summary>
<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, args} => &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;any&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code><br />
&nbsp;<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errs, args} => Promise&lt;any&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
</summary>

<br />

Transforms argument object arrays into any result value:

```js
[
  {_: [], paginate: {type: 'flag', count: 1}},
  {commit: [
    {_: [], all: true, message: 'First commit'}
  ]}
]
```

could be transformed to

```js
{
  _: [],
  paginate: {type: 'flag', count: 1},
  commit: {
    _: [],
    all: true,
    message: 'First commit'
  }
}
```

</details>
</td>
</tr>
</table>

If you read the stages' field types from top to bottom, you get a good impression of what an asynchronous parser does.
Internally, an asynchronous shargs parser really differs only in one major way from a synchronous parser:
Instead of using function composition, it uses [Promise.prototype.then][then] to chain parser stages.

#### Advanced Parsers

+   [Multiple subcommands](#multiple-subcommands)

### Command-line Parsers

You do not have to write all parser stages yourself.
The [`shargs-parser`][shargs-parser] library offers a large collection of common parser stages, you can use.

The parser stages presented here are split into *checks* and *stages*.
While *checks* only report errors, *stages* also transform their `argv`, `opts`, or `args`.
Usually, it makes sense to declare *checks* before *stages*.

#### `argv` Checks

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="verifyArgv">
<td><code><a href="#verifyArgv">verifyArgv</a>(rules)</code></td>
<td>
<details>
<summary>
Reports a <a href="#FalseArgvRules"><code>FalseArgvRules</code></a> error
if the passed <code>rules</code> predicate returns <code>false</code> for an argument value.
</summary>

<br />

If `rules` is not a function, reports a [`WrongArgvRulesType`](#WrongArgvRulesType) error.

<br />

Example:

```js
const {verifyArgv} = require('shargs/parser')

const rules = argv => (
  argv.some(_ => _ === '--question') &&
  argv.some(_ => _ === '--answer')
)

const argv = ['--answer', '42']

verifyArgv(rules)({argv})
```

Result:

```js
{
  errs: [
    {
      code: 'FalseArgvRules',
      msg:  'Your argv rules returned false...',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
</table>

#### `argv` Stages

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="equalsSignAsSpace">
<td><code><a href="#equalsSignAsSpace">equalsSignAsSpace</a></code></td>
<td>
<details>
<summary>
Allows arguments of the form <code>--answer=42</code> to be interpreted like <code>--answer 42</code>.
</summary>

<br />

It only removes the first `=`,
so `['--question=1+2=3?']` is transformed into `['--question', '1+2=3?']`.

<br />

Example:

```js
const {equalsSignAsSpace} = require('shargs/parser')

const argv = ['--answer=42']

equalsSignAsSpace({argv})
```

Result:

```js
{
  argv: ['--answer', '42']
}
```

</details>
</td>
</tr>
<tr name="shortOptsNoSpace">
<td><code><a href="#shortOptsNoSpace">shortOptsNoSpace</a></code></td>
<td>
<details>
<summary>
Allows to omit whitespaces between short arguments and their values.
Passing <code>-a42</code> would be the same as passing <code>-a 42</code>.
Cannot be used together with <code><a href="#splitShortOpts">splitShortOpts</a></code>.
</summary>

<br />

Example:

```js
const {shortOptsNoSpace} = require('shargs/parser')

const argv = ['-a42']

shortOptsNoSpace({argv})
```

Result:

```js
{
  argv: ['-a', '42']
}
```

</details>
</td>
</tr>
<tr name="splitShortOpts">
<td><code><a href="#splitShortOpts">splitShortOpts</a></code></td>
<td>
<details>
<summary>
Allows using short option groups.
The group <code>-xvzf</code> would be interpreted as <code>-x -v -z -f</code>.
Cannot be used together with <code><a href="#shortOptsNoSpace">shortOptsNoSpace</a></code>.
</summary>

<br />

Example:

```js
const {splitShortOpts} = require('shargs/parser')

const argv = ['-ha', '42']

splitShortOpts({argv})
```

Result:

```js
{
  argv: ['-h', '-a', '42']
}
```

</details>
</td>
</tr>
<tr name="traverseArgv">
<td><code><a href="#traverseArgv">traverseArgv</a>(p)(f)</code></td>
<td>
<details>
<summary>
Transforms arguments by applying a function <code>f</code> to each argument satisfying a predicate <code>p</code>.
</summary>

<br />

While `p`'s signature is `arg => true|false`,
`f`'s signature must be `(arg, index, argv) => ({errs = [], argv = []})`.
Many other `argv` checks and stages are defined in terms of `traverseArgv`
and it is of great help for writing custom `argv` stages.

<br />

Example:

```js
const {traverseArgv} = require('shargs/parser')

const argv = [
  '--answer=42',
  '--help'
]

const hasEqualsSign = arg => arg.indexOf('=') > -1

const replaceFirstEqualsSign = arg => ({
  argv: [
    arg.slice(0, arg.indexOf('=')),
    arg.slice(arg.indexOf('=') + 1)
  ]
})

traverseArgv(hasEqualsSign)(replaceFirstEqualsSign)({argv})
```

Result:

```js
{
  argv: [
    '--answer', '42',
    '--help'
  ]
}
```

</details>
</td>
</tr>
</table>

#### `opts` Checks

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="contradictOpts">
<td><code><a href="#contradictOpts">contradictOpts</a></code></td>
<td>
<details>
<summary>
Reports a <a href="#ContradictionDetected"><code>ContradictionDetected</code></a> error if options with a <code><a href="#contradicts">contradicts</a></code> list violate their constraints.
</summary>

<br />

This is the case, if both, the option and an option from its [`contradicts`](#contradicts) list, have [`values`](#values).
If [`contradicts`](#contradicts) is not a list, it reports a [`WrongContradictsType`](#WrongContradictsType) error.

<br />

Example:

```js
const {contradictOpts} = require('shargs/parser')
const {number, string} = require('shargs/opts')

const opts = [
  number('age', ['-a'], {
    values: ['27']
  }),
  string('birthday', ['-b'], {
    contradicts: ['age'],
    values: ['27.7.1927']
  })
]

contradictOpts({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'ContradictionDetected',
      msg:  'Some given keys contradict each other.',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="demandASubcommand">
<td><code><a href="#demandASubcommand">demandASubcommand</a></code></td>
<td>
<details>
<summary>
Reports a <a href="#SubcommandRequired"><code>SubcommandRequired</code></a>
unless at least one <code><a href="#subcommand">subcommand</a></code> has <code><a href="#values">values</a></code>.
</summary>

<br />

Example:

```js
const {demandASubcommand} = require('shargs/parser')
const {flag, number, subcommand} = require('shargs/opts')

const opts = [
  subcommand([])('ask', ['ask'], {desc: 'Ask a question.'}),
  number('answer', ['-a', '--answer'], {
    values: ['42'],
    desc: 'The answer.'
  }),
  flag('help', ['-h', '--help'], {
    desc: 'Print this help message and exit.'
  })
]

demandASubcommand({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'SubcommandRequired',
      msg:  'No subcommand found. Please use at least one subcommand!',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="implyOpts">
<td><code><a href="#implyOpts">implyOpts</a></code></td>
<td>
<details>
<summary>
Reports an <a href="#ImplicationViolated"><code>ImplicationViolated</code></a> error
if options with an <code><a href="#implies">implies</a></code> list violate their constraints.
</summary>

<br />

This is the case, if the option has [`values`](#values), but an option from its [`implies`](#implies) list has not.
If [`implies`](#implies) is not a list, it reports a [`WrongImpliesType`](#WrongImpliesType) error.

<br />

Example:

```js
const {implyOpts} = require('shargs/parser')
const {number, string} = require('shargs/opts')

const opts = [
  number('answer', ['-a']),
  string('question', ['-q'], {
    implies: ['answer'],
    values: ['How much is the fish?']
  })
]

implyOpts({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'ImplicationViolated',
      msg:  'Some given keys that imply...',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="requireOpts">
<td><code><a href="#requireOpts">requireOpts</a></code></td>
<td>
<details>
<summary>
Reports a <a href="#RequiredOptionMissing"><code>RequiredOptionMissing</code></a> error
if an option whose <code><a href="#required">required</a></code> field is <code>true</code> is missing.
</summary>

<br />

If [`values`](#values) is not an array,
it reports a [`WrongFormatForRequiredOption`](#WrongFormatForRequiredOption) error.

<br />

Example:

```js
const {requireOpts} = require('shargs/parser')
const {string} = require('shargs/opts')

const opts = [
  string('question', ['--question'], {required: true})
]

requireOpts({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'RequiredOptionIsMissing',
      msg:  'A required option has not been provided.',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="suggestOpts">
<td><code><a href="#suggestOpts">suggestOpts</a></code></td>
<td>
<details>
<summary>
Corrects spelling mistakes by suggesting existing command-line arguments for all unknown provided arguments.
E.g. if <code>--asnwer</code> was provided, the <code>--answer</code> argument would be suggested.
</summary>

<br />

It checks all [rest](#rest) [`values`](#values),
assuming they are in the [rest](#rest) category because of spelling mistakes.
It collects all command-line options' [`args`](#args)
and computes a distance metric (currently Levenshtein distance) between each arg and each [`rest`](#rest).
It reports the results in a [`DidYouMean`](#DidYouMean) error,
suggesting probable [`args`](#args) replacements for spelling mistakes.

<br />

Example:

```js
const {suggestOpts} = require('shargs/parser')
const {number} = require('shargs/opts')

const opts = [
  number('answer', ['-a', '--ans']),
  {values: ['--asn']}
]

suggestOpts({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'DidYouMean',
      msg:  'An unknown command-line argument...',
      info: {
        argv: '--asn',
        options: [
          [],
          [],
          [{'--ans': number('answer', ['-a', '--ans'])}],
          [{'-a': number('answer', ['-a', '--ans'])}]
        ]
      }
    }
  ]
}
```

The `options` array looks a little bit strange, so an explanation is in order.
The array's index is the cost necessary to transform the unknown option in the arguments, represented as keys.
Because of this, you can conveniently work with the results, e.g. by only using the most probable ones:

```js
'Did you mean: ' + (
  options
  .slice(0, 3)
  .reduce((a, b) => a.concat(b))
  .flatMap(Object.keys)
  .join(', ')
)
```

Results in:

```bash
Did you mean: --age
```

</details>
</td>
</tr>
<tr name="validatePosArgs">
<td><code><a href="#validatePosArgs">validatePosArgs</a></code></td>
<td>
<details>
<summary>
Reports an <a href="#InvalidRequiredPositionalArgument"><code>InvalidRequiredPositionalArgument</code></a> error
if defined positional arguments (<code>*Pos</code>) violate their rules for the
<code><a href="#required">required</a></code> field
or the position of <code><a href="#variadicPos">variadicPos</a></code>.
</summary>

<br />

If a positional argument is [`required`](#required),
all previously defined positional arguments must be [`required`](#required), as well,
and no other positional arguments can be defined after a [`variadicPos`](#variadicPos).
In case of a violation of the second rule, `validatePosArgs` reports an
[`InvalidVariadicPositionalArgument`](#InvalidVariadicPositionalArgument) error.

<br />

Example:

```js
const {validatePosArgs} = require('shargs/parser')
const {stringPos, variadicPos} = require('shargs/opts')

const opts = [
  stringPos('name1', {required: true, values: ['Arthur']}),
  stringPos('name2', {required: false, values: ['Ford']}),
  stringPos('name3', {required: true, values: ['Trillian']}),
  variadicPos('names', {values: ['Zaphod', 'Marvin']}),
  stringPos('name4', {values: ['Douglas']})
]

validatePosArgs({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'InvalidRequiredPositionalArgument',
      msg:  'If a positional argument is required, all prev...',
      info: {...}
    },
    {
      code: 'InvalidVariadicPositionalArgument',
      msg:  'Only the last positional argument may be variadic.',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="verifyOpts">
<td><code><a href="#verifyOpts">verifyOpts</a>(rules)</code></td>
<td>
<details>
<summary>
Reports a <a href="#FalseOptsRules"><code>FalseOptsRules</code></a> error
if the <code>opts</code> array does not adhere to the <code>rules</code> predicate.
<code>rules</code> must have the following function signature: <code>opt => true|false</code>.
</summary>

<br />

If `rules` is not a function, `verifyOpts` reports a [`WrongOptsRulesType`](#WrongOptsRulesType) error.

<br />

Example:

```js
const {verifyOpts} = require('shargs/parser')
const {string} = require('shargs/opts')

const implies = (p, q) => !p || q

const rules = opts => implies(
  opts.some(_ => _.key === 'question' && _.values),
  opts.some(_ => _.key === 'answer' && _.values)
)

const opts = [
  string('question', ['--question'], {
    values: ['How much is the fish?']
  }),
  number('answer', ['-a'])
]

verifyOpts(rules)({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'FalseOptsRules',
      msg:  'Your opts rules returned false...',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="verifyValuesArity">
<td><code><a href="#verifyValuesArity">verifyValuesArity</a></code></td>
<td>
<details>
<summary>
Reports an error if an option's
<code><a href="#values">values</a></code> do not fit its <code><a href="#types">types</a></code>.
</summary>

<br />

See the [`values`](#values) documentations for the exact rules.
If the lengths of [`values`](#values) and [`types`](#types) do not match,
an [`InvalidArity`](#InvalidArity) error is reported.
If the [`types`](#types) field has an invalid value, an [`InvalidTypes`](#InvalidTypes) error is reported
and `verifyValuesArity` reports an [`InvalidValues`](#InvalidValues) error in case of invalid [`values`](#values).

<br />

Example:

```js
const {verifyValuesArity} = require('shargs/parser')
const {number} = require('shargs/opts')

const opts = [
  number('answer', ['--answer'], {values: ['42', '23']})
]

verifyValuesArity({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'InvalidArity',
      msg:  "An option's types arity does not match...",
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
</table>

#### `opts` Stages

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="arrayOnRepeat">
<td><code><a href="#arrayOnRepeat">arrayOnRepeat</a></code></td>
<td>
<details>
<summary>
Collects all repeated <code><a href="#key">key</a></code>s in an array,
instead of keeping only the first mention of a <code><a href="#key">key</a></code>.
</summary>

<br />

Example:

```js
const {arrayOnRepeat} = require('shargs/parser')
const {number, string} = require('shargs/opts')

const opts = [
  string('answer', ['-a'], {values: ['42']}),
  number('answer', ['-a'], {values: [42]})
]

arrayOnRepeat({opts})
```

Result:

```js
{
  opts: [
    array(['string', 'number'])('answer', ['-a'], {
      values: ['42', 42]
    })
  ]
}
```

</details>
</td>
</tr>
<tr name="bestGuessOpts">
<td><code><a href="#bestGuessOpts">bestGuessOpts</a></code></td>
<td>
<details>
<summary>
Takes a best guess approach to transform <a href="#rest">rest</a> values that did not match a command-line option
into new command-line options.
E.g. <code>{values: ['--version']}</code> becomes <code>{key: 'version', types: [], values: [1]}</code> and
<code>[{values: ['--not']}, {values: ['panic']}]</code>
becomes <code>{key: 'not', types: ['string'], args: ['--not'], values: ['panic']}</code>.
</summary>

<br />

Single [`rest`](#rest) options are interpreted as [`flag`](#flag)s
while two consecutive [`rest`](#rest) options are interpreted as [`string`](#string)s
if the first [`rest`](#rest) is in short option format
(one minus with a single character, e.g. `-n`, `-a`)
or in long option format (two minuses with any more characters, e.g. `--name`, `--answer`).
[`bestGuessArgs`](#bestGuessArgs) is very similar to `bestGuessOpts`,
but also considers non-consecutive rest [`values`](#values).

<br />

Example:

```js
const {bestGuessOpts} = require('shargs/parser')
const {flag, string} = require('shargs/opts')

const opts = [
  string('age', ['--age'], {values: ['unknown']}),
  {values: ['--paranoid']},
  {values: ['--name']},
  {values: ['Marvin']},
  {values: ['foo']}
]

bestGuessOpts({opts})
```

Result:

```js
{
  opts: [
    string('age', ['--age'], {values: ['unknown']}),
    flag('paranoid', [], {values: [1]}),
    string('name', [], {values: ['Marvin']}),
    {values: ['foo']}
  ]
}
```

</details>
</td>
</tr>
<tr name="broadenBools">
<td><code><a href="#broadenBools">broadenBools</a>(alt)</code></td>
<td>
<details>
<summary>
Transforms <code><a href="#bool">bool</a></code>s with
<code><a href="#values">values</a></code> like <code>'yes'</code> or <code>'no'</code> into
<code><a href="#bool">bool</a></code>s with <code>'true'</code> or <code>'false'</code>
<code><a href="#values">values</a></code> based on an <code>alt</code> mapping
(e.g. <code>{true: ['yes'], false: ['no']}</code>).
</summary>

<br />

Example:

```js
const {broadenBools} = require('shargs/parser')
const {bool, number} = require('shargs/opts')

const opts = [
  number('answer', ['-a', '--answer'], {values: ['42']}),
  bool('verbose', ['--verbose'], {values: ['no']})
]

const alt = {
  true: ['yes'],
  false: ['no', 'f']
}

broadenBools(alt)({opts})
```

Result:

```js
{
  opts: [
    number('answer', ['-a', '--answer'], {values: ['42']}),
    bool('verbose', ['--verbose'], {values: ['false']})
  ]
}
```

</details>
</td>
</tr>
<tr name="cast">
<td><code><a href="#cast">cast</a></code></td>
<td>
<details>
<summary>
Casts string <code><a href="#values">values</a></code>
into other JavaScript types (e.g. numbers, booleans)
according to the command-line options' <code><a href="#types">types</a></code>
(e.g. <code>{key: 'answer', types: ['number'], values: ['42']}</code> is transformed to
<code>{key: 'answer', types: ['number'], values: [42]}</code>).
</summary>

<br />

If [`types`](#types) contains `'number'`, but [`values`](#values)
cannot be cast into a number, an [`ArgumentIsNotANumber`](#ArgumentIsNotANumber) error is reported.
If [`types`](#types) contains `'bool'`, but [`values`](#values)
is not `['true']` or `['false']`, an [`ArgumentIsNotABool`](#ArgumentIsNotABool) error is reported.

<br />

Example:

```js
const {cast} = require('shargs/parser')
const {bool, number} = require('shargs/opts')

const opts = [
  number('answer', ['-a', '--answer'], {values: ['42']}),
  bool('verbose', ['--verbose'], {defaultValues: ['false']})
]

cast({opts})
```

Result:

```js
{
  opts: [
    number('answer', ['-a', '--answer'], {values: [42]}),
    bool('verbose', ['--verbose'], {defaultValues: [false]})
  ]
}
```

</details>
</td>
</tr>
<tr name="restrictToOnly">
<td><code><a href="#restrictToOnly">restrictToOnly</a></code></td>
<td>
<details>
<summary>
Validates all command-line options with both, <code><a href="#only">only</a></code>
and <code><a href="#values">values</a></code> fields,
by making sure that all values in <code><a href="#values">values</a></code>
are also contained in <code><a href="#only">only</a></code>.
</summary>

<br />

If values are not found in [`only`](#only),
a [`ValueRestrictionsViolated`](#ValueRestrictionsViolated) error is reported for each value.

<br />

Example:

```js
const {restrictToOnly} = require('shargs/parser')
const {number} = require('shargs/opts')

const opts = [
  number('answer', ['--answer'], {only: ['42'], values: ['23']})
]

restrictToOnly({opts})
```

Result:

```js
{
  errs: [
    {
      code: 'ValueRestrictionViolated',
      msg:  'A value lies outside the allowed values...',
      info: {...}
    }
  ],
  opts
}
```

</details>
</td>
</tr>
<tr name="reverseBools">
<td><code><a href="#reverseBools">reverseBools</a></code></td>
<td>
<details>
<summary>
Transforms
<code><a href="#values">values</a></code> of
<a href="#primitive-option">primitive options</a> and
<a href="#array-option">array options</a>
whose <code><a href="#types">types</a></code> contain <code>'bool'</code> and whose
<code><a href="#reverse">reverse</a></code> field is <code>true</code>
by replacing <code>'true'</code>/<code>true</code> with <code>'false'</code>/<code>false</code> and vice versa.
</summary>

<br />

Example:

```js
const {reverseBools} = require('shargs/parser')
const {bool} = require('shargs/opts')

const opts = [
  bool('verbose', ['-v'], {reverse: true, values: [true]}),
  bool('verbose', ['-v'], {reverse: true, values: ['true']})
]

reverseBools({opts})
```

Result:

```js
{
  opts: [
    bool('verbose', ['-v'], {reverse: true, values: [false]}),
    bool('verbose', ['-v'], {reverse: true, values: ['false']})
  ]
}
```

</details>
</td>
</tr>
<tr name="reverseFlags">
<td><code><a href="#reverseFlags">reverseFlags</a></code></td>
<td>
<details>
<summary>
Transforms
<code><a href="#values">values</a></code> of
<a href="#flag-option">flag options</a> whose <code><a href="#reverse">reverse</a></code> field is <code>true</code>
by inverting the <code><a href="#flag">flag</a></code>'s value (e.g. <code>1</code> becomes <code>-1</code>).
</summary>

<br />

Example:

```js
const {reverseFlags} = require('shargs/parser')
const {flag} = require('shargs/opts')

const opts = [
  flag('help', ['-h'], {reverse: true, values: [1]})
]

reverseFlags({opts})
```

Result:

```js
{
  opts: [
    flag('help', ['-h'], {reverse: true, values: [-1]})
  ]
}
```

</details>
</td>
</tr>
<tr name="setDefaultValues">
<td><code><a href="#setDefaultValues">setDefaultValues</a></code></td>
<td>
<details>
<summary>
Transforms all options that have no
<code><a href="#values">values</a></code>, but <code><a href="#defaultValues">defaultValues</a></code>,
by setting the <code><a href="#values">values</a></code> field
to the <code><a href="#defaultValues">defaultValues</a></code>' value.
</summary>

<br />

Example:

```js
const opts = [
  flag(['-f'], {defaultValues: [1]}),
  bool(['-b'], {defaultValues: ['true']})
]

setDefaultValues({opts})
```

Result:

```js
{
  opts: [
    flag(['-f'], {values: [1]}),
    bool(['-b'], {values: ['true']})
  ]
}
```

</details>
</td>
</tr>
<tr name="traverseOpts">
<td><code><a href="#traverseOpts">traverseOpts</a>(p)(f)</code></td>
<td>
<details>
<summary>
Transforms <code>opts</code> by applying a function <code>f</code>
to each option satisfying a predicate <code>p</code>.
</summary>

<br />

While `p`'s signature is `opt => true|false`,
`f`'s signature must be `(opt, index, opts) => ({errs = [], opts = []})`.
Many other `opts` checks and stages are defined in terms of `traverseOpts`
and it is of great help for writing custom `opts` stages.

<br />

Example:

```js
const {traverseOpts} = require('shargs/parser')
const {flag, number} = require('shargs/opts')

const opts = [
  number('answer', ['-a'], {values: ['42']}),
  flag('verbose', ['-v'], {values: [1]}),
  flag('help', ['-h'], {values: [1]})
]

const isFlag = _ => Array.isArray(_.types) && _.types.length === 0

const reverseFlags = opt => ({
  opts: [
    {...opt, values: [-opt.values[0]]}
  ]
})

traverseOpts(isFlag)(reverseFlags)({opts})
```

Result:

```js
{
  opts: [
    number('answer', ['-a'], {values: ['42']}),
    flag('verbose', ['-v'], {values: [-1]}),
    flag('help', ['-h'], {values: [-1]})
  ]
}
```

</details>
</td>
</tr>
</table>

#### `args` Checks

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="failRest">
<td><code><a href="#failRest">failRest</a></code></td>
<td>
<details>
<summary>
Reports an <code><a href="#UnexpectedArgument">UnexpectedArgument</a></code> error
for each value in the rest field <code>_</code>.
</summary>

<br />

Example:

```js
const {failRest} = require('shargs/parser')

const args = {
  _: ['--help']
}

failRest({args})
```

Result:

```js
{
  errs: [
    {
      code: 'UnexpectedArgument',
      msg:  'An unexpected argument was used...',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
<tr name="verifyArgs">
<td><code><a href="#verifyArgs">verifyArgs</a>(rules)</code></td>
<td>
<details>
<summary>
Reports a <a href="#FalseArgsRules"><code>FalseArgsRules</code></a> error for each <code>args</code> object
that does not adhere to the <code>rules</code> predicate (with the signature <code>arg => true|false</code>).
</summary>

<br />

Reports a [`WrongArgsRulesType`](#WrongArgsRulesType) error if `rules` is not a function.

<br />

Example:

```js
const {verifyArgs} = require('shargs/parser')

const rules = args => (
  typeof args.question !== 'undefined' &&
  typeof args.answer   !== 'undefined'
)

const args = {
  question: 'How much is the fish?'
}

verifyArgs(rules)({args})
```

Result:

```js
{
  errs: [
    {
      code: 'FalseArgsRules',
      msg:  'Your args rules returned false...',
      info: {...}
    }
  ]
}
```

</details>
</td>
</tr>
</table>

#### `args` Stages

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="bestGuessArgs">
<td><code><a href="#bestGuessArgs">bestGuessArgs</a></code></td>
<td>
<details>
<summary>
Introduces new arguments by best guess based on rest field values
(e.g. <code>{_: ['--version']}</code> becomes <code>{version: {type: 'flag', count: 1}}</code>
and <code>{_: ['--not', 'panic']}</code> becomes <code>{not: 'panic'}</code>).
</summary>

<br />

Transforms single rest field values into a flag and two consecutive rest options into a string.
It only assumes rest field values to be strings if the first rest is in short option format
(one minus with a single character, e.g. `-h`, `-v`)
or in long option format (two minuses with any more characters, e.g. `--help`, `--verbose`).
`bestGuessArgs` is very similar to [`bestGuessOpts`](#bestGuessOpts),
but also considers rest fields that originally did not directly follow each other.
E.g. assuming `--help` to be a known argument, `--not --help panic` would produce `{not: 'panic'}`,
although its components were not in tandem.

<br />

Example:

```js
const {bestGuessArgs} = require('shargs/parser')

const obj = {
  args: {
    _: ['--answer', '42', 'foo', '-h'],
    command: {
      _: ['bar', '-v', '--question', 'What is answer?', '-v']
    }
  }
}

bestGuessArgs(obj)
```

Result:

```js
{
  args: {
    _: ['foo'],
    answer: '42',
    h: {type: 'flag', count: 1},
    command: {
      _: ['bar'],
      v: {type: 'flag', count: 2},
      question: 'What is answer?'
    }
  }
}
```

</details>
</td>
</tr>
<tr name="bestGuessCast">
<td><code><a href="#bestGuessCast">bestGuessCast</a></code></td>
<td>
<details>
<summary>
Casts string <code>args</code> into other JavaScript types
using a best guess approach based on their values (e.g. <code>{answer: '42'}</code> becomes <code>{answer: 42}</code>
and <code>{all: 'true'}</code> becomes <code>{all: true}</code>).
</summary>

<br />

It supports numbers and booleans (e.g. `{help: 'true'}` becomes `{help: true}`).

<br />

Example:

```js
const {bestGuessCast} = require('shargs/parser')

const args = {
  _: ['--name', 'Marvin'],
  str1: 'yay',
  num1: '42.3',
  num2: '123e-1',
  num3: '0x11',
  num4: '0b11',
  bool1: 'true',
  arr1: ['-42', 'true', 'yay'],
  obj: {
    num5: '0o11',
    num6: '-Infinity',
    num7: '',
    num8: null,
    bool2: 'false',
    bool3: undefined
  }
}

bestGuessCast({args})
```

Result:

```js
{
  args: {
    _: ['--name', 'Marvin'],
    str1: 'yay',
    num1: 42.3,
    num2: 12.3,
    num3: 17,
    num4: 3,
    bool1: true,
    arr1: [-42, true, 'yay'],
    obj: {
      num5: 9,
      num6: -Infinity,
      num7: '',
      num8: null,
      bool2: false,
      bool3: undefined
    }
  }
}
```

</details>
</td>
</tr>
<tr name="boolAsFlag">
<td><code><a href="#boolAsFlag">boolAsFlag</a>(key)</code></td>
<td>
<details>
<summary>
Transforms bool arguments with <code>key</code> in <code>args</code> to a flag object.
E.g., assuming the <code>all</code> key,
<code>{all: true}</code> is transformed to <code>{all: {type: 'flag', count: 1}}</code> and
<code>{all: false}</code> to <code>{all: {type: 'flag', count: -1}}</code>.
</summary>

<br />

Example:

```js
const args = {
  _: [],
  version: true
}

boolAsFlag('version')({args})
```

Result:

```js
{
  _: [],
  version: {type: 'flag', count: 1}
}
```

</details>
</td>
</tr>
<tr name="boolsAsFlags">
<td><code><a href="#boolsAsFlags">boolsAsFlags</a></code></td>
<td>
<details>
<summary>
Transforms all bool arguments in <code>args</code> to flag objects
using <code><a href="#boolAsFlag">boolAsFlag</a></code>.
</summary>

<br />

Example:

```js
const args = {
  _: [],
  html: false,
  version: true
}

boolsAsFlags({args})
```

Result:

```js
{
  _: [],
  html: {type: 'flag', count: -1},
  version: {type: 'flag', count: 1}
}
```

</details>
</td>
</tr>
<tr name="clearRest">
<td><code><a href="#clearRest">clearRest</a></code></td>
<td>
<details>
<summary>
Sets rest values to an empty array (i.e. <code>{_: []}</code>).
</summary>

<br />

Example:

```js
const {clearRest} = require('shargs/parser')

const args = {_: ['--verbose']}

clearRest({args})
```

Result:

```js
{
  args: {_: []}
}
```

</details>
</td>
</tr>
<tr name="flagAsBool">
<td><code><a href="#flagAsBool">flagAsBool</a>(key)</code></td>
<td>
<details>
<summary>
Transforms flags with <code>key</code> in <code>args</code> to a bool value.
E.g., assuming the <code>all</code> key,
<code>{all: {type: 'flag', count: 1}}</code> is transformed to <code>{all: true}</code> and
<code>{all: {type: 'flag', count: -1}}</code> to <code>{all: false}</code>.
</summary>

<br />

If its `count` is greater than `0` it is considered `true`, otherwise it is considered `false`.

<br />

Example:

```js
const {flagAsBool} = require('shargs/parser')

const args = {
  verbose: {type: 'flag', count: 1}
}

flagAsBool('verbose')({args})
```

Result:

```js
{
  args: {
    verbose: true
  }
}
```

</details>
</td>
</tr>
<tr name="flagAsNumber">
<td><code><a href="#flagAsNumber">flagAsNumber</a>(key)</code></td>
<td>
<details>
<summary>
Transforms flags with <code>key</code> in <code>args</code> to a number using its <code>count</code>.
E.g., assuming the <code>verbose</code> key,
<code>{verbose: {type: 'flag', count: 3}}</code> becomes <code>{verbose: 3}</code>.
</summary>

<br />

Example:

```js
const {flagAsNumber} = require('shargs/parser')

const args = {
  verbose: {type: 'flag', count: 2}
}

flagAsNumber('version')({args})
```

Result:

```js
{
  args: {
    verbose: 2
  }
}
```

</details>
</td>
</tr>
<tr name="flagsAsBools">
<td><code><a href="#flagsAsBools">flagsAsBools</a></code></td>
<td>
<details>
<summary>
Transforms all flag arguments in <code>args</code> to bool values
using <code><a href="#flagAsBool">flagAsBool</a></code>.
</summary>

<br />

Example:

```js
const {flagsAsBools} = require('shargs/parser')

const args = {
  verbose: {type: 'flag', count: 1}
}

flagsAsBools({args})
```

Result:

```js
{
  args: {
    verbose: true
  }
}
```

</details>
</td>
</tr>
<tr name="flagsAsNumbers">
<td><code><a href="#flagsAsNumbers">flagsAsNumbers</a></code></td>
<td>
<details>
<summary>
Transforms all flag arguments in <code>args</code> to numbers using their <code>count</code>
like <code><a href="#flagAsNumber">flagAsNumber</a></code>.
</summary>

<br />

Example:

```js
const {flagsAsNumbers} = require('shargs/parser')

const args = {
  verbose: {type: 'flag', count: 2}
}

flagsAsNumbers({args})
```

Result:

```js
{
  args: {
    verbose: 2
  }
}
```

</details>
</td>
</tr>
<tr name="mergeArgs">
<td><code><a href="#mergeArgs">mergeArgs</a>(merge)</code></td>
<td>
<details>
<summary>
Transforms <code>args</code> by <i>flattening them</i>
by recursively merging nested objects into their parent object
(e.g. <code>{ask: {question: '42?'}, answer: 42}</code> becomes <code>{question: '42?', answer: 42}</code>).
</summary>

<br />

A custom `merge` function may be passed with the following function signature:
`(obj1 = {}, obj2 = {}) => {}`.
The default `merge` function (if `merge` is `undefined`)
prefers keys from the parent object over keys from nested objects,
but concatenates rest values (`_`) from both objects
(e.g. `{_: ['foo'], answer: 42, ask: {_: ['bar'], answer: 23}}` becomes
`{_: ['foo', 'bar'], answer: 42}`).

<br />

Example:

```js
const {mergeArgs} = require('shargs/parser')

const args = {
  _: ['--help'],
  version: {type: 'flag', count: 2},
  name: 'Arthur',
  command: {
    _: ['-v'],
    version: {type: 'flag', count: 1},
    name: 'Trillian',
    help: true
  },
  verbose: true
}

const mergeLeft = (outer, inner) => ({
  ...inner,
  ...outer,
  _: [
    ...(outer._ || []),
    ...(inner._ || [])
  ]
})

mergeArgs(mergeLeft)({args})
```

Result:

```js
{
  args: {
    _: ['--help', '-v'],
    version: {type: 'flag', count: 2},
    name: 'Arthur',
    help: true,
    verbose: true
  }
}
```

</details>
</td>
</tr>
<tr name="numberAsFlag">
<td><code><a href="#numberAsFlag">numberAsFlag</a>(key)</code></td>
<td>
<details>
<summary>
Transforms numbers with <code>key</code> in <code>args</code> to flag objects.
The number becomes the flag's <code>count</code>.
E.g. <code>{answer: 42}</code> becomes <code>{answer: {type: 'flag', count: 42}}</code>.
</summary>

<br />

Example:

```js
const args = {
  _: [],
  answer: 42
}

numberAsFlag('answer')({args})
```

Result:

```js
{
  _: [],
  answer: {type: 'flag', count: 42}
}
```

</details>
</td>
</tr>
<tr name="numbersAsFlags">
<td><code><a href="#numbersAsFlags">numbersAsFlags</a></code></td>
<td>
<details>
<summary>
Transforms all numbers in <code>args</code> to flag objects using <code><a href="#numberAsFlag">numberAsFlag</a></code>.
</summary>

<br />

Example:

```js
const args = {
  _: [],
  answer: 42
}

numbersAsFlags({args})
```

Result:

```js
{
  _: [],
  answer: {type: 'flag', count: 42}
}
```

</details>
</td>
</tr>
<tr name="traverseArgs">
<td><code><a href="#traverseArgs">traverseArgs</a>(fs)</code></td>
<td>
<details>
<summary>
Transforms <code>args</code> by applying functions <code>fs</code> to each key/value pair based on the value's type.
</summary>

<br />

`fs` supports the following types:
`array`, `boolean`, `flag`, `function`, `null`, `number`, `object`, `string`, `undefined`, and `otherwise`.
The default behavior for most types is to not change the value, with three notable exceptions:
`function`s and `otherwise`s key/value pairs are removed from args,
while `object`'s default function applies `fs` to nested objects.
`{flag: ({key, val, errs, args}) => ({errs, args})}`
is the signature for `fs` with fields for each type.
Many other `args` checks and stages are defined in terms of `traverseArgs`
and it is of great help for writing custom `args` stages.

<br />

Example:

```js
const {traverseArgs} = require('shargs/parser')

const args = {
  verbose: {type: 'flag', count: 2},
  answer: 23
}

const fs = {
  flag:   ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: val.count}
  }),
  number: ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: val + 19}
  })
}

traverseArgs(fs)({args})
```

Result:

```js
{
  args: {
    verbose: 2,
    answer: 42
  }
}
```

Allowed <code>fs</code> fields:

```js
const fs = {
  array:     ({key, val, errs, args}) => ({errs, args}),
  boolean:   ({key, val, errs, args}) => ({errs, args}),
  flag:      ({key, val, errs, args}) => ({errs, args}),
  function:  ({key, val, errs, args}) => ({errs, args}),
  null:      ({key, val, errs, args}) => ({errs, args}),
  number:    ({key, val, errs, args}) => ({errs, args}),
  otherwise: ({key, val, errs, args}) => ({errs, args}),
  object:    ({key, val, errs, args}) => ({errs, args}),
  string:    ({key, val, errs, args}) => ({errs, args}),
  undefined: ({key, val, errs, args}) => ({errs, args})
}
```

</details>
</td>
</tr>
</table>

#### Advanced Parser Stages

+   [Custom checks and stages](#custom-checks-and-stages)

### Automatic Usage Documentation Generation

Shargs strictly separates the concerns of parsing command-line arguments and generating usage documentation.
The [`shargs-usage`][shargs-usage] module specializes on
generating terminal-based usage documentation for `--help` flags
from [command-line options](#command-line-options):

```js
const {desc, optsLists, space, synopses, usage} = require('shargs/usage')

const docs = usage([
  synopses,
  space,
  optsLists,
  space,
  desc
])
```

[`shargs-usage`][shargs-usage] lets you define how your usage documentation should look like in a declarative way.
In the example, we tell our `docs` to start with [`synopses`](#synopses), have [`optsLists`](#optsLists) in the body,
and close with a [`desc`](#usage-desc)ription.
We separate these three parts with [`space`](#space)s and enclose everything in a [`usage`](#usage) function.

Note that we did not mention any command-line options, yet:

```js
const {command, flag, number, stringPos} = require('shargs/opts')

const opts = [
  stringPos('question', {desc: 'Ask a question.', required: true}),
  number('answer', ['-a', '--answer'], {desc: 'The answer.', defaultValues: [42]}),
  flag('help', ['-h', '--help'], {desc: 'Print this help message and exit.'})
]

const deepThought = command('deepThought', opts, {
  desc: 'Deep Thought was created to come up with the Answer to ' +
        'The Ultimate Question of Life, the Universe, and Everything.'
})

const optsDocs = docs(deepThought)
```

`optsDocs` now knows what to layout (`deepThought`), and how to layout it (`docs`).
Finally, we `style` the different parts (lines and columns) of the documentation:

```js
const style = {
  line: [{width: 60}],
  cols: [{width: 25}, {width: 35}]
}

const text = optsDocs(style)
```

Now, if we `console.log(text)`, the following `text` is printed to the console:

```bash
deepThought (<question>) [-a|--answer] [-h|--help]          
                                                            
<question>               Ask a question. [required]         
-a, --answer=<number>    The answer. [default: 42]          
-h, --help               Print this help message and exit.  
                                                            
Deep Thought was created to come up with the Answer to The  
Ultimate Question of Life, the Universe, and Everything.    
```

`deepThought`, `docs`, and [`style`](#style)
are the moving parts of [automatic usage documentation generation](#automatic-usage-documentation-generation)
and are defined independently.
We have already talked about [command-line options](#command-line-options) before
and will talk about [`style`](#style) in an upcoming section.

#### Usage Functions

[`shargs-usage`][shargs-usage] provides the following usage functions to declare layouts:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usage&nbsp;Function&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="usage-desc">
<td>
<code name="usage-descWith"><a href="#usage-desc">desc</a></code><br />
<code><a href="#usage-descWith">descWith</a>({id})</code>
</td>
<td>
<details>
<summary>
<code>desc</code> takes a command-line option's <code><a href="#desc">desc</a></code> field
and formats it according to a <code><a href="#style">style</a></code>.
</summary>

<br />

If the description is too long to fit one line, it is split and spread over several lines.
`desc` is defined as `descWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought should answer the Ultimate 
Question                                
```

Code:

```js
const {desc, usage} = require('shargs/usage')

const opt = {
  opts: [],
  desc: 'Deep Thought should answer the Ultimate Question'
}

const style = {
  line: [{width: 40}]
}

usage([
  desc
])(opt)(style)
```

</details>
</td>
</tr>
<tr name="note">
<td>
<code name="noteWith"><a href="#note">note</a>(string)</code><br />
<code><a href="#noteWith">noteWith</a>({id})(string)</code>
</td>
<td>
<details>
<summary>
<code>note</code> takes a <code>string</code> and formats it according to a <code><a href="#style">style</a></code>,
ignoring its second parameter.
</summary>

<br />

If the string is too long to fit one line, it is split and spread over several lines.
`note` is defined as `noteWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
```

Code:

```js
const {note, usage} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

usage([
  note('Deep Thought was created to come up with the Answer')
])()(style)
```

</details>
</td>
</tr>
<tr name="notes">
<td>
<code name="notesWith"><a href="#notes">notes</a>(strings)</code><br />
<code><a href="#notesWith">notesWith</a>({id})(strings)</code>
</td>
<td>
<details>
<summary>
<code>notes</code> takes a list of <code>strings</code> and formats it
according to a <code><a href="#style">style</a></code>,
ignoring its second parameter.
</summary>

<br />

If a string is too long to fit one line, it is split and spread over several lines.
`notes` is defined as `notesWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
to The Ultimate Question.               
```

Code:

```js
const {notes, usage} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

usage([
  notes([
    'Deep Thought was created to come up with the Answer',
    'to The Ultimate Question.'
  ])
])()(style)
```

</details>
</td>
</tr>
<tr name="optsDef">
<td>
<code name="optsDefWith"><a href="#optsDef">optsDef</a></code><br />
<code><a href="#optsDefWith">optsDefWith</a>({id, pad})</code>
</td>
<td>
<details>
<summary>
<code>optsDef</code> layouts its <code>opts</code> as a definition list
and formats it according to its <code><a href="#style">style</a></code>.
</summary>

<br />

The term part comprises of an opt's [`args`](#args), [`descArg`](#descArg),
[`only`](#only), [`types`](#types), and [`key`](#key) fields, followed by the
[`contradicts`](#contradicts), [`defaultValues`](#defaultValues),
[`implies`](#implies), and [`required`](#required) fields.
The [`desc`](#desc) field is given in the definition part.
`optsDef` is defined as `optsDefWith({id: 'line', pad: 4})`.

<br />

Example:

```bash
-a, --answer=<number> [default: 42]     
    The answer.                         
-h, --help                              
    Prints help.                        
--version                               
    The version.                        
```

Code:

```js
const {optsDef, usage} = require('shargs/usage')
const {flag, number} = require('shargs/opts')

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer.', defaultValues: ['42']
    }),
    flag('help', ['-h', '--help'], {desc: 'Prints help.'}),
    flag('version', ['--version'], {desc: 'The version.'})
  ]
}

const style = {
  line: [{width: 40}]
}

usage([
  optsDef
])(opt)(style)
```

</details>
</td>
</tr>
<tr name="optsDefs">
<td>
<code name="optsDefsWith"><a href="#optsDefs">optsDefs</a></code><br />
<code><a href="#optsDefsWith">optsDefsWith</a>({id, pad})</code>
</td>
<td>
<details>
<summary>
<code>optsDefs</code> first layouts its <code>opts</code> and then the <code><a href="#opts">opts</a></code>
of all its <code><a href="#subcommand">subcommand</a></code>s recursively,
using <code><a href="#optsDef">optsDef</a></code>s,
indenting each <code><a href="#optsDef">optsDef</a></code> layer by <code>pad</code> spaces.
</summary>

<br />

`optsDefs` is defined as `optsDefsWith({id: 'line', pad: 4})`.

<br />

Example:

```bash
-a, --answer=<number> [default: 42]     
    The answer.                         
-h, --help                              
    Show the usage docs.                
ask [required]                          
    Ask questions.                      
    -h                                  
        Usage docs.                     
    <questions>... [required]           
        Questions.                      
```

Code:

```js
const {optsDefs, usage} = require('shargs/usage')
const {flag, subcommand} = require('shargs/opts')
const {number, variadicPos} = require('shargs/opts')

const required = true

const askOpts = [
  flag('help', ['-h'], {desc: 'Show the usage docs.'}),
  variadicPos('questions', {required, desc: 'Questions.'})
]

const ask = subcommand(askOpts)

const opt = {
  opts: [
    ask('ask', ['ask'], {desc: 'Ask questions.', required}),
    number('answer', ['-a', '--answer'], {
      desc: 'The answer.', defaultValues: ['42']
    }),
    flag('help', ['-h', '--help'], {desc: 'Usage docs.'})
  ]
}

const style = {
  line: [{width: 40}]
}

usage([
  optsDefs
])(opt)(style)
```

</details>
</td>
</tr>
<tr name="optsList">
<td>
<code name="optsListWith"><a href="#optsList">optsList</a></code><br />
<code><a href="#optsListWith">optsListWith</a>({id})</code>
</td>
<td>
<details>
<summary>
<code>optsList</code> layouts its <code>opts</code> as a <code><a href="#table">table</a></code> with two columns
and formats it according to its <code><a href="#style">style</a></code>.
</summary>

<br />

The first column comprises of an opt's [`args`](#args), [`descArg`](#descArg),
[`only`](#only), [`types`](#types), and [`key`](#key) fields.
The [`desc`](#desc) field is given in the second column, followed by the
[`contradicts`](#contradicts), [`defaultValues`](#defaultValues),
[`implies`](#implies), and [`required`](#required) fields.
`optsList` is defined as `optsListWith({id: 'cols'})`.

<br />

Example:

```bash
-a, --answer=<number>    The answer. [default: 42]
-h, --help               Prints help.             
--version                The version.             
```

Code:

```js
const {optsList, usage} = require('shargs/usage')
const {flag, number} = require('shargs/opts')

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer.', defaultValues: ['42']
    }),
    flag('help', ['-h', '--help'], {desc: 'Prints help.'}),
    flag('version', ['--version'], {desc: 'The version.'})
  ]
}

const style = {
  cols: [{width: 25}, {width: 25}]
}

usage([
  optsList
])(opt)(style)
```

</details>
</td>
</tr>
<tr name="optsLists">
<td>
<code name="optsListsWith"><a href="#optsLists">optsLists</a></code><br />
<code><a href="#optsListsWith">optsListsWith</a>({id, pad})</code>
</td>
<td>
<details>
<summary>
<code>optsLists</code> first layouts its <code>opts</code> and then the <code><a href="#opts">opts</a></code>
of all its <code><a href="#subcommand">subcommand</a></code>s recursively,
using <code><a href="#optsList">optsList</a></code>s,
indenting the first column of each <code><a href="#optsList">optsList</a></code> layer by four spaces.
</summary>

<br />

`optsLists` is defined as `optsListsWith({id: 'cols', pad: 4})`.

<br />

Example:

```bash
-a, --answer=<number>    The answer. [default: 42]
-h, --help               Usage docs.              
ask                      Ask questions. [required]
    -h                   Show the usage docs.     
    <questions>...       Questions. [required]    
```

Code:

```js
const {optsLists, usage} = require('shargs/usage')
const {flag, subcommand} = require('shargs/opts')
const {number, variadicPos} = require('shargs/opts')

const required = true

const askOpts = [
  flag('help', ['-h'], {desc: 'Show the usage docs.'}),
  variadicPos('questions', {required, desc: 'Questions.'})
]

const ask = subcommand(askOpts)

const opt = {
  opts: [
    ask('ask', ['ask'], {desc: 'Ask questions.', required}),
    number('answer', ['-a', '--answer'], {
      desc: 'The answer.', defaultValues: ['42']
    }),
    flag('help', ['-h', '--help'], {desc: 'Usage docs.'})
  ]
}

const style = {
  cols: [{width: 25}, {width: 25}]
}

usage([
  optsLists
])(opt)(style)
```

</details>
</td>
</tr>
<tr name="space">
<td>
<code name="spaceWith"><a href="#space">space</a></code><br />
<code><a href="#spaceWith">spaceWith</a>({id, lines})</code>
</td>
<td>
<details>
<summary>
<code>space</code> ignores its first argument and returns a line consisting entirely of spaces,
with a width according to <code><a href="#style">style</a></code>.
</summary>

<br />

`space` is defined as `spaceWith({id: 'line', lines: 1})`.

<br />

Example:

```bash
Deep Thought was created to come up with
                                        
the Answer to The Ultimate Question.    
```

Code:

```js
const {note, space, usage} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

usage([
  note('Deep Thought was created to come up with'),
  space,
  note('the Answer to The Ultimate Question.')
])()(style)
```

</details>
</td>
</tr>
<tr name="synopses">
<td>
<code name="synopsesWith"><a href="#synopses">synopses</a></code><br />
<code><a href="#synopsesWith">synopsesWith</a>({id})</code>
</td>
<td>
<details>
<summary>
<code>synopses</code> first layouts its <code>opts</code> and then the <code><a href="#opts">opts</a></code>
of all its <code><a href="#subcommand">subcommand</a></code>s,
using a <code><a href="#synopsis">synopsis</a></code> each.
</summary>

<br />

`synopses` is defined as `synopsesWith({id: 'line'})`.

<br />

Example:

```bash
deepThought (-a|--answer) [-h|--help]   
deepThought (ask) [-h] (<questions>...)   
```

Code:

```js
const {synopses, usage} = require('shargs/usage')
const {command, flag, number} = require('shargs/opts')
const {subcommand, variadicPos} = require('shargs/opts')

const required = true

const askOpts = [
  flag('help', ['-h']),
  variadicPos('questions', {required})
]

const ask = subcommand(askOpts)

const opts = [
  ask('ask', ['ask'], {required}),
  number('answer', ['-a', '--answer'], {required}),
  flag('help', ['-h', '--help'])
]

const deepThought = command('deepThought', opts)

const style = {
  line: [{width: 40}]
}

usage([
  synopses
])(deepThought)(style)
```

</details>
</td>
</tr>
<tr name="synopsis">
<td>
<code name="synopsisWith"><a href="#synopsis">synopsis</a></code><br />
<code><a href="#synopsisWith">synopsisWith</a>({id})</code>
</td>
<td>
<details>
<summary>
<code>synopsis</code> layouts the program's <code>name</code> in the first and its <code>opts</code>
in the second column of a <code><a href="#table">table</a></code>
and formats it according to its <code><a href="#style">style</a></code>.
</summary>

<br />

For each opt, the [`args`](#args), [`descArg`](#descArg), [`only`](#only), [`required`](#required), [`types`](#types), 
and [`key`](#key) fields are used for a brief overview.
`synopsis` is defined as `synopsisWith({id: 'line'})`.

<br />

Example:

```bash
deepThought (-a|--answer) [-h|--help]   
            [--version] <questions>...  
```

Code:

```js
const {synopsis, usage} = require('shargs/usage')
const {command, flag} = require('shargs/opts')
const {number, variadicPos} = require('shargs/opts')

const opts = [
  number('answer', ['-a', '--answer'], {
    desc: 'The answer.', required: true
  }),
  flag('help', ['-h', '--help'], {desc: 'Prints help.'}),
  flag('version', ['--version'], {desc: 'The version.'}),
  variadicPos('questions')
]

const deepThought = command('deepThought', opts)

const style = {
  line: [{width: 40}]
}

usage([
  synopsis
])(deepThought)(style)
```

</details>
</td>
</tr>
</table>

#### Usage Combinators

While [usage functions](#usage-functions) taken for themselves are useful,
they really begin to shine if they are combined by usage combinators.
Usage combinators are higher-order usage functions that take other usage functions as parameters,
combine them in various ways, and return a new usage function.

Let's see how usage combinators may be used to implement [`synopses`](#synopses):

```js
const {decorate, noSubcommands, onlySubcommands} = require('shargs/usage')
const {optsMap, synopsis, usage, usageMap} = require('shargs/usage')

const prefixKey = prefix => optsMap(opts => ({...opts, key: prefix + ' ' + opts.key}))

function synopses (opt) {
  return usage([
    noSubcommands(synopsis),
    decorate(prefixKey(opt.key), onlySubcommands)(
      usageMap(synopses)
    )
  ])(opt)
}
```

This example uses [usage decorators](#usage-decorators), that are only introduced in the next section.
The implementation of `synopses` uses two usage combinators:
[`usage`](#usage) and [`usageMap`](#usageMap).

[`usage`](#usage) is used to combine two usage functions:
A [`synopsis`](#synopsis) of all `opts`, but subcommands, and the usage function returned by [`usageMap`](#usageMap). 
[`usageMap`](#usageMap) iterates over all [`subcommand`](#subcommand)s
and recursively calls `synopses` on each [`subcommand`](#subcommand)'s [`opts`](#opts).
The recursion stops, if `opt`'s `opts` has no more [`subcommand`](#subcommand)s,
since usage functions with empty `opts` return an empty string.

Combinators are a powerful feature, as they let you build more complex things from smaller parts.
[`shargs-usage`][shargs-usage] provides the following usage combinators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usage&nbsp;Combinator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="usage">
<td><code><a href="#usage">usage</a>(functions)(opt)(style)</code></td>
<td>
<details>
<summary>
<code>usage</code> takes a list of usage <code>functions</code>
that each take an <code>opt</code>, a <code>style</code> and return a string.
It then applies its own <code>opt</code> and <code>style</code> to each function,
and concatenates the resulting strings.
</summary>

<br />

Example:

```bash
deepThought [-a|--answer] [-h|--help] [--version] 
                                                  
-a, --answer=<number>    The answer.              
-h, --help               Prints help.             
--version                Prints version.          
                                                  
Deep Thought was created to come up with the      
Answer.                                           
```

Code:

```js
const {note, optsList, space} = require('shargs/usage')
const {synopsis, usage} = require('shargs/usage')
const {command, flag, number} = require('shargs/opts')

const opts = [
  number('answer', ['-a', '--answer'], {desc: 'The answer.'}),
  flag('help', ['-h', '--help'], {desc: 'Prints help.'}),
  flag('version', ['--version'], {desc: 'Prints version.'})
]

const deepThought = command('deepThought', opts, {
  desc: 'Deep Thought was created to come up with the Answer.'
})

const style = {
  line: [{width: 50}],
  cols: [{width: 25}, {width: 25}]
}

usage([synopsis, space, optsList, space, desc])(deepThought)(style)
```

</details>
</td>
</tr>
<tr name="usageMap">
<td><code><a href="#usageMap">usageMap</a>(f)({opts})(style)</code></td>
<td>
<details>
<summary>
<code>usageMap</code> takes a function <code>f</code> that takes an <code>opt</code>ion
and returns a <a href="#layout-functions">layout function</a>.
It maps <code>f</code> over the option's <code><a href="#opts">opts</a></code>
and applies its <code>style</code> to each resulting <a href="#layout-functions">layout function</a>.
Finally, it concatenates the resulting strings and returns the result.
</summary>

<br />

Example:

```bash
-a, --answer                            
    The answer.                         
-h, --help                              
    Prints help.                        
--version                               
    Prints version.                     
```

Code:

```js
const {text, textWith, usageMap} = require('shargs/usage')
const {flag, number} = require('shargs/opts')

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {desc: 'The answer.'}),
    flag('help', ['-h', '--help'], {desc: 'Prints help.'}),
    flag('version', ['--version'], {desc: 'Prints version.'})
  ]
}

const style = {
  line: [{width: 40}]
}

usageMap(({args, desc}) => layout([
  text(args.join(', ')),
  textWith({id: 'desc'})(desc)
]))(opt)(style)
```

</details>
</td>
</tr>
</table>

#### Usage Decorators

When defining layouts, we may want to feature some `opts` in one place,
and the remaining in a different place of our documentation.
Maybe the [`subcommand`](#subcommand)s should be presented in a definition list,
while the other options are layed out as a table.

Usage decorators enable these use cases by modifying inputs of [usage functions](#usage-functions):

```js
const {desc, optsDef, optsList, space, synopsis, usage} = require('shargs/usage')
const {decorate, noSubcommands, onlyFirstArg, onlySubcommands} = require('shargs/usage')

const decoratedDocs = usage([
  noSubcommands(onlyFirstArg(synopsis)),
  space,
  onlySubcommands(optsDef),
  space,
  noSubcommands(optsList),
  space,
  desc
])
```

The example uses three different decorators:
[`noSubcommands`](#noSubcommands), [`onlySubcommands`](#onlySubcommands), and [`onlyFirstArg`](#onlyFirstArg).
Each of these decorators modifies the `opts` array in some way,
before passing it on to their wrapped [usage function](#usage-functions).
The first two focus on filtering `opts`:
[`noSubcommands`](#noSubcommands) removes all [`subcommand`](#subcommand)s,
while [`onlySubcommands`](#onlySubcommands) keeps only [`subcommand`](#subcommand)s.
[`onlyFirstArg`](#onlyFirstArg) goes one step further and modifies each option in `opts`,
removing all but the first argument in their [`args`](#args) fields.

[`shargs-usage`](#shargs-usage) has the following usage decorators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usage&nbsp;Decorator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="justArgs">
<td><code><a href="#justArgs">justArgs</a>(args)(usageFunction)</code></td>
<td>
<details>
<summary>
<code>justArgs</code> modifies its <code>opt</code>
by removing all <code><a href="#opts">opts</a></code> that have no <code><a href="#args">args</a></code> field
or whose <code><a href="#args">args</a></code> do not contain any argument
given in the <code>args</code> list.
</summary>

<br />

Example:

```js
const {justArgs, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  justArgs(['-a'])(optsList)
])(opt)(style)
```

Result:

```bash
-a, --answer=<number>    The answer               
```

</details>
</td>
</tr>
<tr name="noSubcommands">
<td><code><a href="#noSubcommands">noSubcommands</a>(usageFunction)</code></td>
<td>
<details>
<summary>
<code>noSubcommands</code> modifies its <code>opt</code>
by removing all <code><a href="#subcommand">subcommand</a></code>s from its <code><a href="#opts">opts</a></code>.
</summary>

<br />

Example:

```js
const {noSubcommands, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  noSubcommands(optsList)
])(opt)(style)
```

Result:

```bash
-a, --answer=<number>    The answer               
--version                Prints version           
```

</details>
</td>
</tr>
<tr name="onlySubcommands">
<td><code><a href="#onlySubcommands">onlySubcommands</a>(usageFunction)</code></td>
<td>
<details>
<summary>
<code>onlySubcommands</code> modifies its <code>opt</code>
by keeping only <code><a href="#subcommand">subcommand</a></code>s in its <code><a href="#opts">opts</a></code>.
</summary>

<br />

Example:

```js
const {onlySubcommands, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  onlySubcommands(optsList)
])(opt)(style)
```

Result:

```bash
ask                      Asks a question          
```

</details>
</td>
</tr>
<tr name="onlyFirstArg">
<td><code><a href="#onlyFirstArg">onlyFirstArg</a>(usageFunction)</code></td>
<td>
<details>
<summary>
<code>onlyFirstArg</code> modifies its <code>opt</code>
by first keeping only <code><a href="#opts">opts</a></code> that have <code><a href="#args">args</a></code>
and by then removing all <code><a href="#args">args</a></code> but the first.
</summary>

<br />

Example:

```js
const {onlyFirstArg, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  onlyFirstArg(optsList)
])(opt)(style)
```

Result:

```bash
-a <number>              The answer               
ask                      Asks a question          
--version                Prints version           
```

</details>
</td>
</tr>
<tr name="optsFilter">
<td><code><a href="#optsFilter">optsFilter</a>(p)(usageFunction)</code></td>
<td>
<details>
<summary>
<code>optsFilter</code> modifies its <code>opt</code> by applying a filter with the predicate <code>p</code>,
whose function signature must be <code>opt => true|false</code> to its <code><a href="#opts">opts</a></code>.
Many other usage decorators are defined in terms of <code>optsFilter</code>
and it is of great help for writing custom ones.
</summary>

<br />

Example:

```js
const {optsFilter, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  optsFilter(({types}) => types !== null)(optsList)
])(opt)(style)
```

Result:

```bash
-a, --answer=<number>    The answer               
ask                      Asks a question          
--version                Prints version           
```

</details>
</td>
</tr>
<tr name="optsMap">
<td><code><a href="#optsMap">optsMap</a>(f)(usageFunction)</code></td>
<td>
<details>
<summary>
<code>optsMap</code> modifies its <code>opt</code> by applying a function <code>f</code>
to each option in <code><a href="#opts">opts</a></code>,
whose function signature must be <code>opt => opt</code>.
Many other usage decorators are defined in terms of <code>optsMap</code>
and it is of great help for writing custom ones.
</summary>

<br />

Example:

```js
const {optsMap, usage} = require('shargs/usage')
const {flag, number, subcommand} = require('shargs/opts')

const style = {
  cols: [{width: 25}, {width: 25}]
}

const opt = {
  opts: [
    number('answer', ['-a', '--answer'], {
      desc: 'The answer'
    }),
    subcommand([])('ask', ['ask'], {desc: 'Asks a question'}),
    flag('version', ['--version'], {desc: 'Prints version'})
  ]
}

usage([
  optsMap(opt => ({...opt, args: opt.args.slice(0, 1)}))(optsList)
])(opt)(style)
```

Result:

```bash
-a <number>              The answer               
ask                      Asks a question          
--version                Prints version           
```

</details>
</td>
</tr>
</table>

#### Usage Decorator Combinators

If many usage decorators are applied to a usage function, things get unwieldy, fast:

```js
const {justArgs, noSubcommands, onlyFirstArg, synopsis} = require('shargs/usage')

const briefSynopsis = noSubcommands(onlyFirstArg(justArgs(['--help'])(synopsis)))
```

In the example, `briefSynopsis` is decorated three times and the code is not very readable.
Usage decorator combinators facilitate a cleaner code layout:

```js
const {decorate, justArgs, noSubcommands, onlyFirstArg, synopsis} = require('shargs/usage')

const decorated = decorate(noSubcommands, onlyFirstArg, justArgs(['--help']))

const briefSynopsis = decorated(synopsis)
```

This version of `briefSynopsis` is much more readable.
Note, that [`decorate`](#decorate-usage) applies its usage decorators from right to left.
As is apparent from the example, usage decorator combinators are usage decorators, themselves.

[`shargs-usage`][shargs-usage] has the following usage decorator combinators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usage&nbsp;Decorator&nbsp;Combinator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="decorate-usage">
<td><code><a href="#decorate-usage">decorate</a>(decorators)(usageFunction)</code></td>
<td>
<code>decorate</code> takes many usage function <code>decorators</code>
and applies them to its <code>usageFunction</code> from right to left.
</td>
</tr>
</table>

#### Style

[Layout functions](#layout-functions) are transformed to strings by applying `style`s:

```js
const style = {
  line: [{width: 80}],
  cols: [{width: 25}, {width: 55}]
}
```

In the example, `style` provides the details for how many columns a usage documentation text should be wide,
and whether it should have padding.
A `style` is an object whose values are arrays of *style objects*, that must have a [`width`](#width) key,
and may have [`padEnd`](#padEnd) and [`padStart`](#padStart) keys:

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr name="padEnd">
<td><code><a href="#padEnd">padEnd</a></code></td>
<td>number</td>
<td>
<code>padEnd</code> defines a padding to the right.
It is filled with spaces.
</td>
</tr>
<tr name="padStart">
<td><code><a href="#padStart">padStart</a></code></td>
<td>number</td>
<td>
<code>padStart</code> defines a padding to the left.
It is filled with spaces.
</td>
</tr>
<tr name="width">
<td><code><a href="#width">width</a></code></td>
<td>number</td>
<td>
<code>width</code> defines the length of text.
The full length of the string is the <code>width</code>
plus <code><a href="#padEnd">padEnd</a></code> and <code><a href="#padStart">padStart</a></code>.
</td>
</tr>
</table>

#### Advanced Usage Documentation

+   [Layout functions](#layout-functions)
+   [Layout combinators](#layout-combinators)
+   [Layout decorators](#layout-decorators)
+   [Layout decorator combinators](#layout-decorator-combinators)
+   [Custom layout functions](#custom-layout-functions)
+   [Custom usage functions](#custom-usage-functions)

### Building Command-line Parsers with Shargs

This section reuses code snippets from earlier sections:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Snippets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
</tr>
<tr>
<td>
<details>
<summary>
<code>askOpts</code> from the <a href="#type-functions">type functions</a> section.
</summary>

<br />

```js
const askOpts = [
  {key: 'format', args: ['--format'], types: ['string'], only: ['json', 'xml'],
   defaultValues: ['json'], desc: 'Respond either with json or xml.'},
  {key: 'html', args: ['--no-html'], types: [], reverse: true, desc: 'Remove HTML tags.'},
  {key: 'help', args: ['-h', '--help'], types: [], desc: 'Print this help message and exit.'},
  {key: 'question', types: ['string'], required: true, desc: 'State your question.'}
]
```

</details>
</td>
</tr>
<tr>
<td>
<details>
<summary>
<code>deepThought</code> from the <a href="#command-line-options">command-line options</a> section.
</summary>

<br />

```js
const {command, flag, number, subcommand} = require('shargs/opts')

const opts = [
  subcommand(askOpts)('ask', ['ask'], {required: true, desc: 'Ask a question.'}),
  number('answer', ['-a', '--answer'], {defaultValues: [42], desc: 'The answer.'}),
  flag('help', ['-h', '--help'], {desc: 'Print this help message and exit.'})
]

const deepThought = command('deepThought', opts, {
  desc: 'Deep Thought was created to come up with the Answer to ' +
        'The Ultimate Question of Life, the Universe, and Everything.'
})
```

</details>
</td>
</tr>
<tr>
<td>
<details>
<summary>
<code>parser</code> from the <a href="#the-parserSync-function"><code>parserSync</code> function</a> section.
</summary>

<br />

```js
const {parserSync} = require('shargs')
const {cast, flagsAsBools, requireOpts, restrictToOnly} = require('shargs/parser')
const {reverseFlags, setDefaultValues, splitShortOpts} = require('shargs/parser')

const stages = {
  argv: [splitShortOpts],
  opts: [setDefaultValues, requireOpts, reverseFlags, cast],
  args: [flagsAsBools]
}

const substages = {
  ask: [...stages.opts, restrictToOnly]
}

const parser = parserSync(stages, substages)
```

</details>
</td>
</tr>
<tr>
<td>
<details>
<summary>
<code>docs</code> from the
<a href="#automatic-usage-documentation-generation">automatic usage documentation generation</a> section.
</summary>

<br />

```js
const {desc, optsLists, space, synopses, usage} = require('shargs/usage')

const docs = usage([
  synopses,
  space,
  optsLists,
  space,
  desc
])
```

</details>
</td>
</tr>
<tr>
<td>
<details>
<summary>
<code>style</code> from the <a href="#style">style</a> section.
</summary>

<br />

```js
const style = {
  line: [{width: 80}],
  cols: [{width: 25}, {width: 55}]
}
```

</details>
</td>
</tr>
</table>

<details>
<summary>
Imagine these snippets were located in their own modules and were imported earlier.
Then, a sample command-line program written with shargs could be:

<p>

```js
const argv = process.argv.slice(2)
const {errs, args} = parser(deepThought)(argv)

if (args.help) {
  const help = docs(deepThought)(style)
  console.log(help)
  process.exit(0)
}

if (errs.length > 0) {
  errs.forEach(({code, msg}) => console.log(`${code}: ${msg}`))
  process.exit(1)
}

console.log(`The answer is: ${args.answer}`)
process.exit(0)
```

</p>

</summary>

First, we skip the first two values of `process.argv`.
They are `node` and the file name and can be ignored.

We then parse the remaining `argv` with our `deepThought` parser and get two results:
A list of `errs`, and an `args` object with parsed argument values.
Based on those two results, we build our program.

If the `args.help` field is set, we print a `help` text generated from `docs` by applying `deepThought` and `style`.
Then, we `exit` with exit code `0`.

</details>

If we run the program with `node ./deepThought --help`, the following text is printed:

```bash
deepThought [-a|--answer] [-h|--help]                                           
deepThought (ask) [--format] [--no-html] [-h|--help] (<question>)                 
                                                                                
-a, --answer=<number>    The answer. [default: 42]                              
-h, --help               Print this help message and exit.                      
ask                      Ask a question. [required]                             
    --format=<json|xml>  Respond either with json or xml. [default: json]       
    --no-html            Remove HTML tags.                                      
    -h, --help           Print this help message and exit.                      
    <question>           State your question. [required]                        
                                                                                
Deep Thought was created to come up with the Answer to The Ultimate Question of 
Life, the Universe, and Everything.                                             
```

If the `errs` array has errors, we print all errors and `exit` with exit code `1`.
E.g. if we execute `node ./deepThought --answer 5`, without specifying the required `ask` subcommand,
the following text appears:

```bash
Required option is missing: An option that is marked as required has not been provided.
```

Otherwise, we print the `args.answer`.
E.g. if we run it with `node ./deepThought ask "What is the meaning of Life, the Universe, and Everything?"`,
it prints:

```bash
The answer is: 42
```

## More In-depth Documentation

Feel free to skip this section if you are new to Shargs.
It introduces more advanced topics:

+   [Installing as Bundle or Modules](#installing-as-bundle-or-modules)
+   [Multiple Subcommands](#multiple-subcommands)
+   [Custom Checks and Stages](#custom-checks-and-stages)
+   [Layout Functions](#layout-functions)
+   [Layout Combinators](#layout-combinators)
+   [Layout Decorators](#layout-decorators)
+   [Layout Decorator Combinators](#layout-decorator-combinators)
+   [Custom Layout Functions](#custom-layout-functions)
+   [Custom Usage Functions](#custom-usage-functions)
+   [Building REPLs with Shargs](#building-repls-with-shargs)
+   [Error Codes](#error-codes)

### Installing as Bundle or Modules

Since version 0.26.0, shargs may be installed in two different ways:
Either as a bundle (recommended), or individually as modules.

<pre>
npm install --save <a href="https://github.com/Yord/shargs">shargs</a>        # bundle installation (<a href="https://github.com/Yord/shargs-core">core</a>, <a href="https://github.com/Yord/shargs-opts">opts</a>, <a href="https://github.com/Yord/shargs-parser">parser</a>, and <a href="https://github.com/Yord/shargs-usage">usage</a>)

npm install --save <a href="https://github.com/Yord/shargs-core">shargs-core</a>   # module (in bundle: shargs/core or shargs)
npm install --save <a href="https://github.com/Yord/shargs-opts">shargs-opts</a>   # module (in bundle: shargs/opts)
npm install --save <a href="https://github.com/Yord/shargs-parser">shargs-parser</a> # module (in bundle: shargs/parser)
npm install --save <a href="https://github.com/Yord/shargs-usage">shargs-usage</a>  # module (in bundle: shargs/usage)
npm install --save <a href="https://github.com/Yord/shargs-repl">shargs-repl</a>   # module (not in bundle)
</pre>

The [`shargs`][shargs] bundle combines several modules in one distribution with its own version number.
The advantage for the user is that the module versions are guaranteed to be compatible and updates are simpler.

Installing individual modules is more flexible,
e.g. if you want to use a specific set of module versions,
if one module of the bundle is not needed
or if one of the modules is replaced with a different implementation.

It is recommended to start with the bundle installation
and import modules like `require('shargs/opts')` or `import 'shargs/core'`.
If you want to switch to a module installation later, you may simply replace your imports with module imports:
E.g. `require('shargs-opts')` and `import 'shargs-core'`.

If you are using modules and need to know which versions are compatible,
you may refer to the module versions used by the [`shargs`][shargs] bundle.

### Multiple Subcommands

Shargs supports specifying multiple [`subcommand`](#subcommand)s.
E.g. you could use both, the `ask` and `design` [`subcommand`](#subcommand)s in the same command
in the following version of `deepThought`:

```js
const {command, flag, number, stringPos, subcommand} = require('shargs/opts')

const ask = subcommand([stringPos('question')])
const design = subcommand([stringPos('name')])

const opts = [
  ask('ask', ['ask'], {desc: 'Ask a question.'}),
  design('design', ['design'], {desc: 'Design a more powerful computer.'}),
  flag('help', ['-h', '--help'], {desc: 'Print this help message and exit.'})
]

const deepThought = command('deepThought', opts, {desc: 'Ask the Ultimate Question.'})
```

If you provide both subcommands in your `argv`, both are parsed:

```js
const argv = ['design', 'Earth', 'ask', 'What is the answer to the Ultimate Question?']

const parse = parserSync()(deepThought)

const {argv, errs} = parse(argv)

console.log(argv)
/*
{
  _: [],
  ask: {
    _: [],
    question: 'What is the answer to the Ultimate Question?'
  },
  design: {
    _: [],
    name: 'Earth'
  }
}
*/
```

Note that the subcommand order is not preserved.
This is due to the default behavior of [`fromArgs`](#fromArgs-field),
that keeps only the first mention of a subcommand and merges all subcommands into an (unordered) object.

The input to [`fromArgs`](#fromArgs-field) is still ordered and has duplicates,
so if your program needs the [subcommand](#subcommand) order or duplicates,
just write a custom [`fromArgs`](#fromArgs-field) stage:

```js
const merge = (obj1, obj2) => ({
  ...obj1,
  subcommands: [
    ...(obj1.subcommands || []),
    obj2
  ]
})

const fromArgs = ({errs, args}) => ({
  errs,
  args: args.slice(1).reduce(merge, args[0])
})
```

This demonstration implementation of [`fromArgs`](#fromArgs-field) is very simple
and lacks some features like e.g. subcommands of subcommands.
Please improve it before using it in your production programs.

### Building REPLs with Shargs

> :construction: **Work in progress:** This feature is currently worked on and its API is not yet stable.

[`Shargs-repl`][shargs-repl] lets you build REPLs with actions defined by shargs [`commands`](#command).

### Custom Checks and Stages

Shargs makes writing and using custom checks and stages very simple.
The only thing you have to do is to follow the correct function signatures for your check or stage,
as given in the [`stages`](#stages) and [`substages`](#substages) sections.
The following code snippets showcase very simple examples with the correct signatures.

Regardless of whether you implement a check or a stage, the most important thing to remember is:
Always pass on errors!

Custom `argv` stage example:

```js
function splitShortOpts ({errs = [], argv = []} = {}) {
  const argv2 = argv.flatMap(arg =>
    arg.length > 2 && arg[0] === '-' && arg[1] !== '-'
      ? arg.slice(1).split('').map(c => '-' + c)
      : arg
  )

  return {errs, argv: argv2}
}
```

If you write a custom `argv` stage, have a look at [`traverseArgv`](#traverseArgv)!

Custom `opts` stage example:

```js
function demandACommand ({errs = [], opts = []} = {}) {
  const errs2 = []

  const aCommand = opts.some(
    ({key, args, types, opts}) => (
      typeof key !== 'undefined' &&
      typeof types === 'undefined' &&
      Array.isArray(args) && Array.isArray(opts)
    )
  )

  if (!aCommand) {
    errs2.push({
      code: 'CommandRequired',
      msg:  'No command found. Please use at least one command!',
      info: {options: opts}
    })
  }

  return {errs: errs.concat(errs2), opts}
}
```

If you write a custom `opts` stage, have a look at [`traverseOpts`](#traverseOpts)!

Custom `args` stage example:

```js
const {traverseArgs} = require('shargs/parser')

function flagsAsBools ({errs = [], args = {}} = {}) {
  const fs = {
    flag: ({key, val, errs, args}) => ({
      errs,
      args: {...args, [key]: val.count > 0}
    })
  }

  const {errs: errs2, args: args2} = traverseArgs(fs)({args})

  return {errs: errs.concat(errs2), args: args2}
}
```

If you write a custom `args` stage, have a look at [`traverseArgs`](#traverseArgs)!

### Layout Functions

[Usage functions](#usage-functions) that are applied to an `opt` yield so called `layout functions`.
If we take a closer look at the signatures of usage and layout functions,
the connection between the two becomes apparent:

<table>
<tr>
<th>Type</th>
<th>Function Signature</th>
<th>Description</th>
</tr>
<tr name="layout-function">
<td><a href="#layout-function">Layout Function</a></td>
<td align="right"><code>style => string</code></td>
<td>Layout functions take a <code>style</code> and return a <code>string</code>.</td>
</tr>
<tr name="usage-function">
<td><a href="#usage-function">Usage Function</a></td>
<td align="right"><code>opt => style => string</code></td>
<td>Usage functions take an <code>opt</code> and return a layout function.</td>
</tr>
</table>

In [`shargs-usage`][shargs-usage], an `opt`'s purpose is to provide the textual contents of layout functions
and the [usage functions](#usage-functions)' only job is to specify how this textual content is extracted from the `opt`.
The layout functions do the actual work of formatting strings.

Let's have a look at an example:

```js
const {br, defs, layout, table, text} = require('shargs/usage')

const askDocs = layout([
  table([
    ['deepThought (ask)', '[--format] [--no-html] [-h|--help] (<question>)']
  ]),
  br,
  defs([
    ['--format=<json|xml> [default: json]', 'Respond either with json or xml.'],
    ['--no-html', 'Remove HTML tags.'],
    ['-h, --help', 'Print this help message and exit.'],
    ['<question> [required]', 'State your question.']
  ]),
  br,
  text(
    'Deep Thought was created to come up with the Answer to ' +
    'The Ultimate Question of Life, the Universe, and Everything.'
  )
])
```

In the example, `askDocs` is a [`layout`](#layout) that comprises four different layout functions:
[`table`](#table), [`br`](#br), [`defs`](#defs), and [`text`](#text).
Depending on how we [`style`](#style) the [`layout`](#layout), we get different strings:

```js
const style = {
  line: [{width: 80}],
  cols: [{width: 16}, {width: 64}]
}

const string = askDocs(style)
```

If we `console.log(string)`, the following text is printed to the console:

```bash
deepThought (ask) [--format] [--no-html] [-h|--help] (<question>)                 
                                                                                
--format=<json|xml> [default: json]                                             
    Respond either with json or xml.                                            
--no-html                                                                       
    Remove HTML tags.                                                           
-h, --help                                                                      
    Print this help message and exit.                                           
<question> [required]                                                           
    State your question.                                                        
                                                                                
Deep Thought was created to come up with the Answer to The Ultimate Question of 
Life, the Universe, and Everything.                                             
```

Experiment with [`style`](#style) to get different layouts!

[`shargs-usage`][shargs-usage] gives you the following layout functions:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Layout&nbsp;Function&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="br">
<td>
<code name="brWith"><a href="#br">br</a></code><br />
<code><a href="#brWith">brWith</a>({id, lines})</code>
</td>
<td>
<details>
<summary>
<code>br</code> returns a <code><a href="#line">line</a></code> filled with spaces,
with a <code><a href="#width">width</a></code> according to <code><a href="#style">style</a></code>.
</summary>

<br />

`br` is defined as `brWith({id: 'line', lines: 1})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
                                        
to The Ultimate Question.               
```

Code:

```js
const {br, layout, text} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  text('Deep Thought was created to come up with the Answer'),
  br,
  text('to The Ultimate Question.')
])(style)
```

</details>
</td>
</tr>
<tr name="cols">
<td>
<code name="colsWith"><a href="#cols">cols</a>(columns)</code><br />
<code><a href="#colsWith">colsWith</a>({id})(columns)</code>
</td>
<td>
<details>
<summary>
<code>cols</code> takes a list of <code>columns</code>,
where each column is a list of strings corresponding to <code><a href="#line">line</a></code>s.
</summary>

<br />

It formats the `columns` according to their [`width`](#width)s
and cuts off strings that are too long.
`cols` is defined as `colsWith({id: 'cols'})`.

<br />

Example:

```bash
-a, --answer=<number>    The answer. [default: 42]
-h, --help               Prints help.             
--version                Prints version.          
```

Code:

```js
const {cols, layout} = require('shargs/usage')

const style = {
  cols: [{width: 25}, {width: 25}]
}

layout([
  cols([
    [
      '-a, --answer=<number>',
      '-h, --help',
      '--version'
    ],
    [
      'The answer. [default: 42]',
      'Prints help.',
      'Prints version.'
    ]
  ])
])(style)
```

</details>
</td>
</tr>
<tr name="defs">
<td>
<code name="defsWith"><a href="#defs">defs</a>(tuples)</code><br />
<code><a href="#defsWith">defsWith</a>({id, pad})(tuples)</code>
</td>
<td>
<details>
<summary>
<code>defs</code> takes a list of <code>tuples</code>,
where each entry is a tuple of strings,
with a term at the first and a definition at the second position.
</summary>

<br />

It formats its `tuples` as a definition list over two [`line`](#line)s,
with the term in the first, and the definition in the second [`line`](#line).
If a term or definition extends its [`line`](#line),
it is continued in another [`line`](#line).
`defs` is defined as `defsWith({id: 'line', pad: 4})`.

<br />

Example:

```bash
-a, --answer=<number> [default: 42]     
    The answer.                         
-h, --help                              
    Prints help.                        
--version                               
    Prints version.                     
```

Code:

```js
const {defs, layout} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  defs([
    ['-a, --answer=<number> [default: 42]', 'The answer.'],
    ['-h, --help', 'Prints help.'],
    ['--version', 'Prints version.']
  ])
])(style)
```

</details>
</td>
</tr>
<tr name="line">
<td>
<code name="lineWith"><a href="#line">line</a>(string)</code><br />
<code><a href="#lineWith">lineWith</a>({id})(string)</code>
</td>
<td>
<details>
<summary>
<code>line</code> takes a <code>string</code>
and formats it according to a <code><a href="#style">style</a></code>'s <code><a href="#width">width</a></code>.
</summary>

<br />

If a `string` exceeds its [`width`](#width), it is cut off, otherwise, the [`width`](#width) is filled up with spaces.
It ends with a line break. `line` is defined as `lineWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
```

Code:

```js
const {layout, line} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  line('Deep Thought was created to come up with'),
  line('the Answer')
])(style)
```

</details>
</td>
</tr>
<tr name="lines">
<td>
<code name="linesWith"><a href="#lines">lines</a>(strings)</code><br />
<code><a href="#linesWith">linesWith</a>({id})(strings)</code>
</td>
<td>
<details>
<summary>
<code>lines</code> takes a list of <code>strings</code>
and layouts each <code>string</code> with <code><a href="#line">line</a></code>.
</summary>

<br />

`lines` is defined as `linesWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
to The Ultimate Question.               
```

Code:

```js
const {layout, lines} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  lines([
    'Deep Thought was created to come up with',
    'the Answer',
    'to The Ultimate Question.'
  ])
])(style)
```

</details>
</td>
</tr>
<tr name="table">
<td>
<code name="tableWith"><a href="#table">table</a>(rows)</code><br />
<code><a href="#tableWith">tableWith</a>({id})(rows)</code>
</td>
<td>
<details>
<summary>
<code>table</code> takes a list of <code>rows</code>, lays it out as a borderless table,
and formats it according to a <code><a href="#style">style</a></code>.
</summary>

<br />

If an entry exceeds the length of a column, it breaks into the next row.
`table` is defined as `tableWith({id: 'cols'})`.

<br />

Example:

```bash
-a, --answer=<number>    The answer. [default: 42]
-h, --help               Prints help.             
--version                Prints version.          
```

Code:

```js
const {layout, table} = require('shargs/usage')

const style = {
  cols: [{width: 25}, {width: 25}]
}

layout([
  table([
    ['-a, --answer=<number>', 'The answer. [default: 42]'],
    ['-h, --help', 'Prints help.'],
    ['--version', 'Prints version.']
  ])
])(style)
```

</details>
</td>
</tr>
<tr name="text">
<td>
<code name="textWith"><a href="#text">text</a>(string)</code><br />
<code><a href="#textWith">textWith</a>({id})(string)</code>
</td>
<td>
<details>
<summary>
<code>text</code> takes a <code>string</code> and formats it according to a <code><a href="#style">style</a></code>.
</summary>

<br />

If the `string` exceeds a line, it continues on the next.
`text` is defined as `textWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
```

Code:

```js
const {layout, text} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  text('Deep Thought was created to come up with the Answer')
])(style)
```

</details>
</td>
</tr>
<tr name="texts">
<td>
<code name="textsWith"><a href="#texts">texts</a>(strings)</code><br />
<code><a href="#textsWith">textsWith</a>({id})(strings)</code>
</td>
<td>
<details>
<summary>
<code>texts</code> takes a list of <code>strings</code>
and layouts each <code>string</code> with <code><a href="#text">text</a></code>.
</summary>

<br />

`texts` is defined as `textsWith({id: 'line'})`.

<br />

Example:

```bash
Deep Thought was created to come up with
the Answer                              
to The Ultimate Question.               
```

Code:

```js
const {layout, texts} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  texts([
    'Deep Thought was created to come up with the Answer',
    'to The Ultimate Question.'
  ])
])(style)
```

</details>
</td>
</tr>
</table>

### Layout Combinators

Layout combinators are functions that take [layout functions](#layout-functions) as parameters
and return new [layout functions](#layout-functions).
They are the primary way of building more complex constructs from simpler components.
The following examples demonstrate the use of layout combinators:

```js
const {layout, layoutMap, textWith} = require('shargs/usage')

const defsWith = ({id}) => layoutMap(
  ([term, definition] = []) => layout([
    textWith({id})(term),
    textWith({id})(definition)
  ])
)
```

[`defsWith`](#defsWith) is implemented in terms of [`layout`](#layout), [`layoutMap`](#layoutMap),
and [`textWith`](#textWith).
It [`maps`](#layoutMap) over a list of `term` and `definition` pairs and `layout`s them as [`text`](#text)s.

[`shargs-usage`][shargs-usage] has the following layout combinators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Layout&nbsp;Combinator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="layout">
<td><code><a href="#layout">layout</a>(functions)(style)</code></td>
<td>
<details>
<summary>
<code>layout</code> takes a list of layout <code>functions</code>
that each take a <code>style</code> and return a string.
It then applies its own <code>style</code> to each function,
and concatenates the resulting strings.
</summary>

<br />

Example:

```js
const {layout, line} = require('shargs/usage')

const style = {
  line: [{width: 40}]
}

layout([
  line('Deep Thought was created to come up with'),
  line('the Answer')
])(style)
```

Result:

```bash
Deep Thought was created to come up with
the Answer                              
```

</details>
</td>
</tr>
<tr name="layoutMap">
<td><code><a href="#layoutMap">layoutMap</a>(f)(list)(style)</code></td>
<td>
<details>
<summary>
<code>layoutMap</code> takes a function <code>f</code> that takes any value
and returns a <a href="#layout-functions">layout function</a>.
It maps <code>f</code> over the <code>list</code>
and applies its <code>style</code> to each resulting <a href="#layout-functions">layout function</a>.
Finally, it concatenates the resulting strings and returns the result.
</summary>

<br />

Example:

```js
const {layout, layoutMap, textWith} = require('shargs/usage')

const defsWith = ({id}) => layoutMap(
  ([term, definition] = []) => layout([
    textWith({id})(term),
    textWith({id})(definition)
  ])
)

const defs = defsWith({id: 'line'})

const style = {
  line: [{width: 40}]
}

defs([
  ['-a, --answer=<number> [default: 42]', 'The answer.'],
  ['-h, --help', 'Prints help.'],
  ['--version', 'Prints version.']
])(style)
```

Result:

```bash
-a, --answer=<number> [default: 42]     
    The answer.                         
-h, --help                              
    Prints help.                        
--version                               
    Prints version.                     
```

</details>
</td>
</tr>
</table>

### Layout Decorators

When working with [layout functions](#layout-functions) that take a [`style`](#style) as input,
you sometimes want to modify this [`style`](#style) just before it is passed to the function,
and only for this function call.
This is what layout decorators are for:

```js
const {layout, layoutMap, pad, text} = require('shargs/usage')

const defs = layoutMap(
  ([term, definition] = []) => layout([
    text(term),
    pad(['line', 0], 4)(text(definition))
  ])
)
```

The example shows a sample implementation of [`defs`](#defs) using the [`pad`](#pad) layout decorator.
Here, the `term`, as well as the `definition` have the same id, [`text`](#text)s default id `'line'`.
However, we want to add a padding of `4` spaces to the `definition`.
So we use [`pad`](#pad) to add `4` spaces to the id at the `['line', 0]` path of [`style`](#style).

[`shargs-usage`][shargs-usage] ships with the following layout decorators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Layout&nbsp;Decorator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="pad">
<td>
<code><a href="#pad">pad</a>(path, spaces)(layoutFunction)</code>
</td>
<td>
<details>
<summary>
<code>pad</code> looks up the style object at the <code>path</code> in its <code>style</code>
and modifies it, by adding a number of <code>spaces</code> to its <code><a href="#padStart">padStart</a></code>
and subtracting the same number from its <code><a href="#width">width</a></code>.
It then passes the modified <code><a href="#style">style</a></code> to its <code>layoutFunction</code>.
</summary>

<br />

Example:

```js
const {layout, pad, table} = require('shargs/usage')

const style = {
  cols: [{width: 20}, {width: 20}]
}

layout([
  pad(['cols', 0], 4)(table([['--answer', '42']]))
])(style)
```

Result:

```js
    --answer        42                  
```

</details>
</td>
</tr>
<tr name="stylePath">
<td>
<code><a href="#stylePath">stylePath</a>(path, f)(layoutFunction)</code>
</td>
<td>
<details>
<summary>
<code>stylePath</code> looks up the style object at the <code>path</code> in its <code><a href="#style">style</a></code>
and modifies it by applying the function <code>f</code> to it.
It then passes the modified <code><a href="#style">style</a></code> to its <code>layoutFunction</code>.
</summary>

<br />

```js
const {layout, stylePath, table} = require('shargs/usage')

const pad4 = obj => ({
  ...obj,
  padStart: (obj.padStart || 0) + 4,
  width: obj.width - 4
})

const style = {
  cols: [{width: 20}, {width: 20}]
}

layout([
  stylePath(['cols', 0], pad4)(table([['--answer', '42']]))
])(style)
```

Result:

```js
    --answer        42                  
```

</details>
</td>
</tr>
</table>

### Layout Decorator Combinators

If many decorators are applied to a [layout function](#layout-functions), the resulting code can get deeply nested:

```js
const {layout, pad, table} = require('shargs/usage')

const style = {
  cols: [{width: 25}, {width: 30}]
}

layout([
  pad(['cols', 0], 4)(
    pad(['cols', 1], 4)(
      table([
        ['-a, --answer=<number>', 'The answer. [default: 42]']
      ])
    )
  )
])(style)
```

Layout decorator combinators avoid nesting deeply, by first collecting layout decorators and applying them all at once:

```js
const {decorate, layout, pad, table} = require('shargs/usage')

const style = {
  cols: [{width: 25}, {width: 30}]
}

const decorated = decorate(pad(['cols', 0], 4), pad(['cols', 1], 4))

layout([
  decorated(
    table([
      ['-a, --answer=<number>', 'The answer. [default: 42]']
    ])
  )
])(style)
```

Note, that [`decorate`](#decorate-layout) applies layout decorators from right to left.

[`shargs-usage`][shargs-usage] contains the following layout decorator combinators:

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Layout&nbsp;Decorator&nbsp;Combinator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Description</th>
</tr>
<tr name="decorate-layout">
<td><code><a href="#decorate-layout">decorate</a>(decorators)(layoutFunction)</code></td>
<td>
<code>decorate</code> takes many layout function <code>decorators</code>
and applies them to its <code>layoutFunction</code> from right to left.
</td>
</tr>
</table>

### Custom Layout Functions

Using your own [layout function](#layout-function) is straightforward:
Your function only has to have the correct signature and it is ready to be used as a [layout function](#layout-function):
It must take a [`style` object](#style) and return a `string`.

The following example showcases the custom `table2` layout function that takes `columns` instead of `rows` as input:

```js
const {table} = require('shargs/usage')

const table2 = (columns = []) => style => {
  const rows = []

  for (let i = 0; i < columns[0].length; i++) {
    const row = []
    for (let j = 0; j < columns.length; j++) {
      row.push(columns[j][i])
    }
    rows.push(row)
  }

  return table(rows)(style)
}
```

You may use `table2` as a [layout function](#layout-function) if you apply it to a `columns` array,
since that returns a function that takes a `style` argument and returns a `string`.

This is of course a very simplified example that makes many assumptions that are often not valid
and should not be made in real projects.
Your own function would most probably need much more validations and handling of edge cases.

### Custom Usage Functions

Writing and using custom [usage functions](#usage-functions) in shargs is very simple:
You only have to write a function with the correct signature and it can be used as a [usage function](#usage-function).
It must take an [`opt`](#command-line-options) object and a [`style` object](#style) and return a `string`.

The following example shows the custom `descs` function that displays the options' descriptions:

```js
const {text} = require('shargs/usage')

const desc = ({desc = ''} = {}) => text(desc)
```

Using [`usageMap`](#usageMap) simplifies the process of defining your own functions:

```js
const {table, usageMap} = require('shargs/usage')

const optsTable = usageMap(
  ({key, args, required, desc}) => table([
    [(required ? '*' : '') + key, args.join(', '), desc]
  ])
)
```

### Error Codes

[`shargs-core`][shargs-core] and [`shargs-parser`][shargs-parser] report errors if a
[command-line option](#command-line-options)'s syntax is invalid, or if `checks` fail.
The following table contains all error codes currently in use and where they are thrown:

<table>
<tr>
<th>Code</th>
<th>Message</th>
<th>Thrown&nbsp;by</th>
</tr>
<tr name="ArgumentIsNotABool">
<td><code><a href="#ArgumentIsNotABool">ArgumentIsNotABool</a></code></td>
<td>The passed command line argument must either be 'true' or 'false'.</td>
<td>
<code><a href="#cast">cast</code>
</td>
</tr>
<tr name="ArgumentIsNotANumber">
<td><code><a href="#ArgumentIsNotANumber">ArgumentIsNotANumber</a></code></td>
<td>The passed command line argument must be a number.</td>
<td>
<code><a href="#cast">cast</code>
</td>
</tr>
<tr name="CommandExpected">
<td><code><a href="#CommandExpected">CommandExpected</a></code></td>
<td>Expected a command with a string "key" field and an "opts" array.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="ContradictionDetected">
<td><code><a href="#ContradictionDetected">ContradictionDetected</a></code></td>
<td>Some given keys contradict each other.</td>
<td>
<code><a href="#contradictOpts">contradictOpts</code>
</td>
</tr>
<tr name="DidYouMean">
<td><code><a href="#DidYouMean">DidYouMean</a></code></td>
<td>An unknown command-line argument was passed. Did you mean any of the following options?</td>
<td>
<code><a href="#suggestOpts">suggestOpts</code>
</td>
</tr>
<tr name="FalseArgsRules">
<td><code><a href="#FalseArgsRules">FalseArgsRules</a></code></td>
<td>Your args rules returned false. Please abide to the rules defined in verifyArgs.</td>
<td>
<code><a href="#verifyArgs">verifyArgs</code>
</td>
</tr>
<tr name="FalseArgvRules">
<td><code><a href="#FalseArgvRules">FalseArgvRules</a></code></td>
<td>Your argv rules returned false. Please abide to the rules defined in verifyArgv.</td>
<td>
<code><a href="#verifyArgv">verifyArgv</code>
</td>
</tr>
<tr name="FalseOptsRules">
<td><code><a href="#FalseOptsRules">FalseOptsRules</a></code></td>
<td>Your opts rules returned false. Please abide to the rules defined in verifyOpts.</td>
<td>
<code><a href="#verifyOpts">verifyOpts</code>
</td>
</tr>
<tr name="ImplicationViolated">
<td><code><a href="#ImplicationViolated">ImplicationViolated</a></code></td>
<td>Some given keys that imply each other are not all defined.</td>
<td>
<code><a href="#implyOpts">implyOpts</code>
</td>
</tr>
<tr name="IncompatibleTypes">
<td><code><a href="#IncompatibleTypes">IncompatibleTypes</a></code></td>
<td>Repeated options must either both be variadic or both not.</td>
<td>
<code><a href="#arrayOnRepeat">arrayOnRepeat</code>
</td>
</tr>
<tr name="InvalidArgs">
<td><code><a href="#InvalidArgs">InvalidArgs</a></code></td>
<td>The "args" field has an invalid value: "args" must be a non-empty array of strings.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="InvalidArity">
<td><code><a href="#InvalidArity">InvalidArity</a></code></td>
<td>An option's types arity does not match its values arity.</td>
<td>
<code><a href="#verifyValuesArity">verifyValuesArity</code>
</td>
</tr>
<tr name="InvalidBoolMapping">
<td><code><a href="#InvalidBoolMapping">InvalidBoolMapping</a></code></td>
<td>The mapping provided to broadenBools must only map from 'true' or 'false' to a list of alternatives.</td>
<td>
<code><a href="#broadenBools">broadenBools</code>
</td>
</tr>
<tr name="InvalidKey">
<td><code><a href="#InvalidKey">InvalidKey</a></code></td>
<td>
The "key" field has an invalid value: "key" must be a string, cannot be "_" or "--", and must not include whitespaces.
</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="InvalidNestedCommand">
<td><code><a href="#InvalidNestedCommand">InvalidNestedCommand</a></code></td>
<td>Commands cannot be nested inside commands. Did you forget an "args" field for your subcommand?</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="InvalidOptionsListInCombine">
<td><code><a href="#InvalidOptionsListInCombine">InvalidOptionsListInCombine</a></code></td>
<td>Options list in combine was undefined, null or empty.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="InvalidOpts">
<td><code><a href="#InvalidOpts">InvalidOpts</a></code></td>
<td>The "opts" field has an invalid value: "opts" must be an array of command-line options and positional arguments.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="InvalidRequiredPositionalArgument">
<td><code><a href="#InvalidRequiredPositionalArgument">InvalidRequiredPositionalArgument</a></code></td>
<td>
If a positional argument is required, all previous positional arguments must be required as well.
The required field must either be undefined, true or false.
</td>
<td>
<code><a href="#validatePosArgs">validatePosArgs</code>
</td>
</tr>
<tr name="InvalidTypes">
<td><code><a href="#InvalidTypes">InvalidTypes</a></code></td>
<td>Each argument must have a types key that must be null or an array.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code><br />
<code><a href="#verifyValuesArity">verifyValuesArity</a></code>
</td>
</tr>
<tr name="InvalidValues">
<td><code><a href="#InvalidValues">InvalidValues</a></code></td>
<td>An option's values field has an invalid type.</td>
<td>
<code><a href="#verifyValuesArity">verifyValuesArity</code>
</td>
</tr>
<tr name="InvalidVariadicPositionalArgument">
<td><code><a href="#InvalidVariadicPositionalArgument">InvalidVariadicPositionalArgument</a></code></td>
<td>Only the last positional argument may be variadic.</td>
<td>
<code><a href="#validatePosArgs">validatePosArgs</code>
</td>
</tr>
<tr name="OptionExpected">
<td><code><a href="#OptionExpected">OptionExpected</a></code></td>
<td>A command-line option was expected, but something else was received.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="PosArgExpected">
<td><code><a href="#PosArgExpected">PosArgExpected</a></code></td>
<td>A positional argument was expected, but something else was received.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="RequiredOptionMissing">
<td><code><a href="#RequiredOptionMissing">RequiredOptionMissing</a></code></td>
<td>An option that is marked as required has not been provided.</td>
<td>
<code><a href="#requireOpts">requireOpts</code>
</td>
</tr>
<tr name="SubcommandExpected">
<td><code><a href="#SubcommandExpected">SubcommandExpected</a></code></td>
<td>A subcommand was expected, but something else was received.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="SubcommandRequired">
<td><code><a href="#SubcommandRequired">SubcommandRequired</a></code></td>
<td>No subcommand found. Please use at least one subcommand!</td>
<td>
<code><a href="#demandASubcommand">demandASubcommand</code>
</td>
</tr>
<tr name="UnexpectedArgument">
<td><code><a href="#UnexpectedArgument">UnexpectedArgument</a></code></td>
<td>An unexpected argument was used that has no option defined.</td>
<td>
<code><a href="#failRest">failRest</code>
</td>
</tr>
<tr name="UnknownCommandLineOptionType">
<td><code><a href="#UnknownCommandLineOptionType">UnknownCommandLineOptionType</a></code></td>
<td>The command-line option or positional argument given is of an unknown type.</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
<tr name="ValueRestrictionsViolated">
<td><code><a href="#ValueRestrictionsViolated">ValueRestrictionsViolated</a></code></td>
<td>A value lies outside the allowed values of an option.</td>
<td>
<code><a href="#restrictToOnly">restrictToOnly</code>
</td>
</tr>
<tr name="WrongArgsRulesType">
<td><code><a href="#WrongArgsRulesType">WrongArgsRulesType</a></code></td>
<td>The args rules are of a wrong type, please provide a predicate with the following signature: (args) => boolean.</td>
<td>
<code><a href="#verifyArgs">verifyArgs</code>
</td>
</tr>
<tr name="WrongArgvRulesType">
<td><code><a href="#WrongArgvRulesType">WrongArgvRulesType</a></code></td>
<td>The argv rules are of a wrong type, please provide a predicate with the following signature: (argv) => boolean.</td>
<td>
<code><a href="#verifyArgv">verifyArgv</code>
</td>
</tr>
<tr name="WrongContradictsType">
<td><code><a href="#WrongContradictsType">WrongContradictsType</a></code></td>
<td>The contradicts field has the wrong type, please provide an array of command-line option keys.</td>
<td>
<code><a href="#contradictOpts">contradictOpts</code>
</td>
</tr>
<tr name="WrongFormatForRequiredOption">
<td><code><a href="#WrongFormatForRequiredOption">WrongFormatForRequiredOption</a></code></td>
<td>
A required option has values or defaultValues in the wrong format.
Default values are different depending on the command-line option type:
Commands take objects, flags take counts, and other options take arrays of the correct length.
</td>
<td>
<code><a href="#requireOpts">requireOpts</code>
</td>
</tr>
<tr name="WrongImpliesType">
<td><code><a href="#WrongImpliesType">WrongImpliesType</a></code></td>
<td>The implies field has the wrong type, please provide an array of command-line option keys.</td>
<td>
<code><a href="#implyOpts">implyOpts</code>
</td>
</tr>
<tr name="WrongOptsRulesType">
<td><code><a href="#WrongOptsRulesType">WrongOptsRulesType</a></code></td>
<td>
The opts rules are of a wrong type, please provide a predicate with the following signature: (options) => boolean.
</td>
<td>
<code><a href="#verify-commands">verifyCommand</a></code>
</td>
</tr>
</table>

## FAQ

<table>
<tr>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Answer</th>
</tr>
<tr name="how-can-i-use-config-objects-with-shargs">
<td><b>How can I use config objects with shargs?</b></td>
<td>
<details>
<summary>
A <i>config object</i> in this question denotes an object that is used to read in default values from a file or a URI.
Shargs does not include reading and merging config objects because there are other specialized libraries for this task
that are easy to use alongside shargs.
There are several simple ways to combine shargs' <code>args</code> objects with config objects:
</summary>

<br />

If you just want to have default values, you may want to check out the [`defaultValues`](#defaultValues) options field.
If this does not suffice or you have a different problem, read on.

Say we have read in a `config` object from somewhere:

```js
const config = {
  question: 'How can I use config objects with shargs?',
  answer: 'Read the FAQ section!'
}
```

And we have run a shargs parser and have obtained the following `args` object:

```js
const args = {
  _: [],
  question: 'What is the meaning of life, the universe, and everything?'
}
```

Then *using* the config object would just mean merging the two objects:

```js
const preferArgs = {
  ...config,
  ...args
}

const preferConfig = {
  ...args,
  ...config
}
```

Of course these example merges are simple cases, because the objects are *flat*.

In case of [`subcommand`](#subcommand)s, the `args` object would have (deeply) nested objects.
Such cases are common and there are specialized libraries for merging deeply nested objects,
like [ramda][ramda] or [lodash][lodash]:

```js
const {mergeDeepLeft, mergeDeepRight} = require('ramda')

const preferArgs = mergeDeepLeft(args, config)

const preferConfig = mergeDeepRight(args, config)
```

</details>
</td>
</tr>
<tr name="why-key-field">
<td><b>Why do command-line options have a <code>key</code> field?</b></td>
<td>
<details>
<summary>
The <code><a href="#key">key</a></code> field is an apparent difference between shargs and other command-line parsers.
So one might ask, why shargs uses it, while other parsers do not need it.
But as is mostly the case, shargs has good reasons:
</summary>

<br />

Command-line parsers read arguments and assign them to variables that are passed as inputs to programs.
So we are dealing with two different sets of names, here: Names of arguments and names of variables.
Those two sets are connected by a unidirectional mapping, where arguments map to variable names.

If a single argument would only ever map to a single variable, the two could just as well have the same name.
But for more complex mappings, things start to get complex, too:

Say we have two arguments, `-v` and `--version`, that can be used interchangeably.
If they would map to two variables, `-v` and `--version`,
the program would have to have knowledge about the arguments being interchangeable,
in order to correctly interpret its inputs.
As leaking this knowledge to the program would be undesirable,
parsers usually work around this by assigning the value of one argument to both variables.
But now we are in a situation where we have two dependant variables that always have the same value.
A less verbose solution is just letting both arguments map to the same variable (the [`key`](#key) field):

```js
const {string} = require('shargs/opts')

const opts = [
  string('version', ['-v', '--version'])
]
```

A special situation of two arguments mapping to the same variable is, when the arguments belong to separate options.
This frequently occurs for [`flag`](#flag) and [`bool`](#bool) options that have a [`complement`](#complement):

```js
const {flag} = require('shargs/opts')

const opts = [
  flag('fun', ['--fun']),
  flag('fun', ['--no-fun'], {reverse: true})
]
```

In the example, `--fun` adds `1` to the flag count, while `--no-fun` adds `-1` due to [`reverse`](#reverse)
(assuming the parser has the [`reverseFlags`](#reverseFlags) stage).

But we have other possible mappings yet to explore:
Situations, where one argument maps to two different variable names.
Say we have a `--birthday` argument and the `birthday` and `age` variables.
`birthday` is a string in date format, while `age` is a number holding the current age,
transformed by the custom `ageAsNumber` stage.
This kind of mapping is only possible if the parser's arguments are independent of the program's variables.

So, command-line options have a `key` field, because:

1.  Separating internal variable names from external argument names is a good practice.
2.  Separating argument and variable names enables functionality that would otherwise not be possible.
3.  Separating arguments and variables makes interpreting variables less verbose for programs.

If you really do not need `key` fields and wish to use just argument names instead,
it is straight forward to adjust the type function syntax accordingly:

```js
const array2 = types => (args = [], fields = {}) => ({
  key: args.length > 0 ? args[0] : undefined,
  args,
  types,
  ...fields
})

const number2 = array2(['number'])

// ...
```

</details>
</td>
</tr>
<tr name="custom-command-line-options-date">
<td><b>Can I use custom command-line option <code><a href="#types">types</a></code> like <code>date</code>?</b></td>
<td>
<details>
<summary>
Yes, you can add and use your own option types.
Both, the command-line options DSL and the parser functions have been designed with this in mind:
</summary>

<br />

Say you want to add your own custom `date` type.
First, you need to add a [command-line option](#command-line-options) of that type:

```js
const {array} = require('shargs/opts')

const date = array(['date'])
```

A `date` is an option that takes exactly one argument, whose type is described as `'date'`.

Now we have an option, we may want to write parser stages that work with `dates`.
How about a stage that transforms dates to their millisecond representation:

```js
const {traverseOpts} = require('shargs/parser')

function dateToMillis ({errs = [], opts = []} = {}) {
  const isDate = ({types}) => (
    Array.isArray(types) &&
    types.length === 1 &&
    types[0] === 'date'
  )

  const toMillis = string => new Date(string).getTime()

  const dateToMillis = opt => ({
    opts: [{
      ...opt,
      ...(Array.isArray(opt.values)
          ? {values: opt.values.map(toMillis)}
          : {}
      )
    }]
  })

  return traverseOpts(isDate)(dateToMillis)({errs, opts})
}
```

This parser stage works alongside the other parser stages.
Note, that a real implementation would test much more edge cases, like dates that occur in arrays.

</details>
</td>
</tr>
<tr name="comma-separated-values">
<td><b>Can I use comma-separated values to define <code><a href="#array">arrays</a></code>?</b></td>
<td>
<details>
<summary>
<code><a href="https://github.com/Yord/shargs-parser">shargs-parser</a></code> does not include a parser stage
to split comma-separated values into arrays.
But it is easy enough to write a stage yourself:
</summary>

<br />

We are inventing a new option type for this FAQ: `commas`:

```js
const {array} = require('shargs/opts')

const commas = array(['commas'])
```

The `commas` type function is used to mark options we want to split.

We then write a custom [`opts` stage](#opts-stages) to perform the splitting:

```js
const {traverseOpts} = require('shargs/parser')

const isCommas = ({key, types, values}) => (
  typeof key !== 'undefined' &&
  Array.isArray(types) && types.indexOf('commas') > -1 &&
  Array.isArray(values) && values.length === types.length
)

const transformCommaArray = opt => {
  let values = []
  let types  = []

  for (let i = 0; i < opt.values.length; i++) {
    const value = opt.values[i]
    const type = opt.types[i]

    if (type === 'commas') {
      const elements = value.split(',')
      values = [...values, ...elements]
      types = [...types, ...Array.from({length: elements.length}, () => 'string')]
    } else {
      values.push(value)
      types.push(type)
    }
  }

  return {opts: [{...opt, types, values}]}
}

const splitCommas = traverseOpts(isCommas)(transformCommaArray)
```

`splitCommas` may now be used with options of type `commas`!

So why doesn't `shargs-parser` support comma-separated values by default?
The reason is that using comma-separated values is just not that common.
And if you nonetheless need comma-separated values, it is simple enough to implement yourself.

</details>
</td>
</tr>
<tr name="why-no-no">
<td><b>Why are <code>--no-*</code> arguments not reversed by the <code>bestGuess*</code> stages?</b></td>
<td>
The reason is because there is no simple way to opt-out of this functionality, once it is employed.
You could add an <code>optOutReverse</code> parameter to each <code>bestGuess*</code> stage, I guess,
but that would clutter the stages' signatures.
So shargs decided to leave interpreting these arguments to the individual programs.
</td>
</tr>
<tr name="option-cardinalities-0-1">
<td><b>Can I have command-line options with 0..1 values?</b></td>
<td>
<details>
<summary>
An example for such an option would be ternary logics types,
like <code>true</code>, <code>false</code>, <code>unknown</code>,
that could be represented as a mixture of <code><a href="#flag">flags</a></code>
and <code><a href="#bool">bools</a></code>.
Shargs does not support such options out of the box, but you can implement them with some gotchas:
</summary>

<br />

We generally recommend against using options with 0..1 cardinalities in programs.
This is also why shargs does not support it.

A better approach is using an enumeration, implemented with the [`only`](#only) options field
and the [`restrictToOnly`](#restrictToOnly) parser stage.

If you want to use it anyway, here is how you could do it in shargs:

Flags give you only two cases, the presence of the flag (`true` if [`flagsAsBools`](#flagsAsBools) is used),
and its absence (`unknown`):

```js
const {flag} = require('shargs/opts')

const fun = flag('fun', ['--fun'])
```

You could add a third case by using only `flags` by defining a complement:

```js
const {complement} = require('shargs/opts')

const noFun = complement('--no-')(fun)
```

Which is the same as writing:

```js
const noFun = flag('fun', ['--no-fun'], {reverse: true})
```

If you provide `--fun`, the `fun` variable is set to `true`, on `--no-fun` it is set to `false`,
and providing neither `--fun`, nor `--no-fun` would mean `unknown`.

You could implement the same behavior with an option that takes none or one argument,
by using a combination of variable length arrays,
aka [`subcommands`](#subcommand) and a custom command-line options field.
The general idea is to mark a `subcommand` as `threeValued` with a field,
and then transform it to a custom type in the opts stage.

First, let us define an option:

```js
const {stringPos, subcommand} = require('shargs/opts')

const funOpts = [
  stringPos('threeValues')
]

const fun = subcommand(funOpts)('fun', ['--fun'], {threeValued: true})
```

Now, let us define an [`opts`](#opts-stages) stage that transforms the `subcommand`:

```js
const {traverseOpts} = require('shargs/parser')

const isThreeValued = ({threeValued}) => threeValued === true

  const toThreeValued = opt => {
  const types = ['threeValued']

  let values = ['unknown']

  if (Array.isArray(opt.values)) {
    const threeValues = opt.values.find(opt => opt.key === 'threeValues')
    values = threeValues.values || ['true']
  }

  return {
    opts: [
      {...opt, types, values: values.slice(0, 1), opts: undefined}
    ]
  }
}

const subcommandsToThreeValued = traverseOpts(isThreeValued)(toThreeValued)
```

`subcommandsToThreeValued` only transforms `subcommands` that have the `threeValued` field.
For each `subcommand`, it checks, whether the `subcommand` is not present (`unknown`),
it is present but has no values (`true`), or if it is present and has at least one value,
(`true` if the value is `true`, `false` if it is `false`, otherwise `unknown`).

Note that this sample implementation is very brittle and should not be used as presented in a program.

</details>
</td>
</tr>
<tr name="can-i-use-enums">
<td><b>Can I use enums?</b></td>
<td>
<details>
<summary>
Yes, you can use enums with a combination of <code><a href="#string">string</a></code> command-line options,
the <code><a href="#only">only</a></code> options field,
and the <code><a href="#restrictToOnly">restrictToOnly</a></code> parser stage:
</summary>

<br />

```js
const {string} = require('shargs/opts')

const answers = string('answers', ['-a'], {only: ['yes', 'no', 'maybe']})
```

</details>
</td>
</tr>
<tr name="nest-keys">
<td><b>Can I use keys like <code>'a.b'</code>, indicating object fields?</b></td>
<td>
<details>
<summary>
Some command-line parsers allow arguments of the form <code>--a.b 42</code>,
whose values are stored in nested objects <code>{a: {b: 42}}</code>.
Shargs does not provide this functionality.
However, it is very easy to write your own parser stage for it:
</summary>

<br />

First, let us write a helper function for traversing `args` objects:

```js
function traverseKeys (p) {
  return f => ({errs, args}) => Object.keys(args).reduce(
    ({errs, args: obj}, key) => {
      const val = args[key]
      if (!Array.isArray(val) && typeof val === 'object') {
        obj[key] = traverseKeys(p)(f)(val)
      }
      if (p(key)) {
        const {[key]: _, ...rest} = obj
        obj = {...rest, ...f(key, val)}
      }
      return {errs, args: obj}
    },
    {errs, args}
  )
}
```

Using `traverseKeys`, we can implement a `nestKeys` [`args` stage](#args-stages):

```js
const _ = require('lodash')

const hasDots = key => key.indexOf('.') > -1

const nestValue = (key, val) => {
  const obj = {}
  _.set(obj, key, val)
  return obj
}

const nestKeys = traverseKeys(hasDots)(nestValue)
```

The `nestKeys` args stage should now nest the values into an object.

The reason why shargs does not include such a stage by default is,
that this is a niche case that can be either implemented after parsing,
or is easy enough to implement yourself.

</details>
</td>
</tr>
<tr name="shargs-tacit">
<td><b>Why do shargs' functions have several parameter lists?</b></td>
<td>
<details>
<summary>
Many functions have an unusual signature, like <code><a href="#text">text</a>(string)(style)</code>
and the question arises, why it is not <code><a href="#text">text</a>(string, style)</code>, instead.
The reason has to do with function composition
and <a href="https://en.wikipedia.org/wiki/Tacit_programming">tacit programming</a>:
</summary>

<br />

[`shargs`][shargs] builds command-line parsers and usage documentation by composing parser
and usage functions with functions it calls *combinators*.
An exemplary combinator function is <code><a href="#layout">layout</a>(functions)(style)</code>.

`layout` takes a list of `functions` that have a common signature:
They take a [`style`](#style), and return a string.
Next, it takes its own `style` parameter and feeds it to each function, getting a list of strings.
Then it concatenates all strings together, which results in a string:

```js
const {layout, text} = require('shargs/usage')

const style = {line: [{width: 10}]}

const string = layout([
  text('First.'),
  text('Second.')
])(style)

// string === 'First.    \nSecond.   \n'
```

What [`layout`](#layout) basically gives us is a way to provide only one `style` parameter to a list of functions,
instead of one parameter per function.
But why does [`layout`](#layout) have to have such a weird signature?

Let us assume we had the following `layout2` and `text2` functions, instead:

```js
const {layout, text} = require('shargs/usage')

const layout2 = (functions, style) => layout(functions)(style)

const text2 = (string, style) => text(string)(style)
```

How could we concatenate strings only using `text2`?

```js
const style = {line: [{width: 10}]}

const string = text2('First.', style) + text2('Second.', style)

// string === 'First.    \nSecond.   \n'
```

Do you see how the `style` parameter is repeated for every function?
It gets worse if you have more functions.

Now let us use `layout2`:

```js
const style = {line: [{width: 10}]}

const string = layout2([
  style => text2('First.', style),
  style => text2('Second.', style)
], style)

// string === 'First.    \nSecond.   \n'
```

See how `style` is still repeated and we do not have the advantage of only providing it once?
Actually, using `layout2` looks worse than using just `text2`!

But we can do better and rewrite the same example with `text` and two parameter lists:

```js
const {text} = require('shargs/usage')

const style = {line: [{width: 10}]}

const string = layout2([
  style => text('First.')(style),
  style => text('Second.')(style)
], style)

// string === 'First.    \nSecond.   \n'
```

And then we can apply an optimization:
See how we define a function that takes a `style` and feed it to a function `text('First.')` that takes a `style`?
This is redundant, and we can just leave out `style` altogether:

```js
const {text} = require('shargs/usage')

const style = {line: [{width: 10}]}

const string = layout2([
  text('First.'),
  text('Second.')
], style)

// string === 'First.    \nSecond.   \n'
```

Now we do not repeat `style` for every function!
The code is much shorter and is easier to read.

And we can do even better by using a signature like `layout`.
Because then `layout` is also a function that takes a `style` and returns a string,
like `text`, and can be used inside other `layout` functions!

```js
const {layout, text} = require('shargs/usage')

const style = {line: [{width: 10}]}

const firstSecond = layout([
  text('First.'),
  text('Second.')
])

const andThird = layout([
  firstSecond,
  text('Third.')
])

const string = andThird(style)

// string === 'First.    \nSecond.   \nThird.    \n'
```

And although we have five functions that each take a `style` parameter, we only have to apply it once.

Shargs employs tacit programming techniques to reduce boilerplate in its DSLs.
A side-effect is that function signatures are weird (the technical term is *curried*).

Some JavaScript libraries like [Ramda][ramda] and [lodash/fp][lodash-fp] use a technique called *auto-currying*.
If `layout` would be auto-curried, it would have the signatures of `layout`
and `layout2` at the same time and you could choose which one to use.
Shargs decided against auto-currying its functions,
since it is simple enough to [`curry`](https://ramdajs.com/docs/#curry) your functions yourself if you wanted:

```js
const {curry} = require('ramda')
const {layout} = require('shargs/usage')

const curriedLayout = curry((fs, style) => layout(fs)(style))
```

`curriedLayout` can now be used like `layout` and like `layout2`.

</details>
</td>
</tr>
</table>

## Comparison to Related Libraries

<table>
<tr>
<th>&nbsp;</th>
<th><code><a href="https://www.npmjs.com/package/shargs">shargs</a></code></th>
<th><code><a href="https://www.npmjs.com/package/yargs">yargs</a></code></th>
<th><code><a href="https://www.npmjs.com/package/commander">commander.js</a></code></th>
<th><code><a href="https://www.npmjs.com/package/minimist">minimist</a></code></th>
</tr>
<tr>
<td><b>Self-description</b></td>
<td>
Shargs turns command-line arguments parsing inside out
and gives you fine-grained control over parser stages and usage docs.
</td>
<td>
Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.
</td>
<td>
The complete solution for node.js command-line interfaces, inspired by Ruby's commander.
</td>
<td>
Minimist is the guts of optimist's argument parser without all the fanciful decoration.
</td>
</tr>
<tr>
<td><b>Focus</b></td>
<td>
A command-line parser library with a focus on enabling developers to easily
and quickly build their own parsers of just the right size.
</td>
<td>
A large parser with lots of features with a focus on providing the options out of the box.
</td>
<td>
A medium parser with a strong focus on a textual DSL that makes it easy to define options.
</td>
<td>
A tiny parser, mostly without an options schema, with a strong focus on optimistic parsing.
</td>
</tr>
<td><b>License</b></td>
<td><a href="https://github.com/Yord/shargs/blob/master/LICENSE">MIT</a></td>
<td><a href="https://github.com/yargs/yargs/blob/master/LICENSE">MIT</a></td>
<td><a href="https://github.com/tj/commander.js/blob/master/LICENSE">MIT</a></td>
<td><a href="https://github.com/substack/minimist/blob/master/LICENSE">MIT</a></td>
</tr>
<tr>
<td><b>First Commit</b></td>
<td>January 14th 2020</td>
<td>September 10th 2010</td>
<td>August 14th 2011</td>
<td>June 25th 2013</td>
</tr>
<tr>
<td><b>Customize Parsing</b></td>
<td>
Pick and choose your <a href="#command-line-parsers">parser checks and stages</a>,
write and use <a href="#custom-checks-and-stages">custom checks and stages</a>,
and optionally define <a href="#substages">command-specific parsers</a>.
</td>
<td>
You can
<a href="https://github.com/yargs/yargs/blob/master/docs/advanced.md#customizing-yargs-parser">turn on and off</a>
some of yargs' parsing features,
and use a kind of <a href="https://github.com/yargs/yargs/blob/master/docs/advanced.md#middleware">middleware</a>
similar to shargs' <code>args</code> stages.
</td>
<td>
You may specify a function to do
<a href="https://github.com/tj/commander.js#custom-option-processing">custom processing of option values</a>.
</td>
<td>
None that I am aware of.
</td>
</tr>
<tr>
<td><b>Customize Usage Docs</b></td>
<td>
Use a DSL with many options to build
<a href="#automatic-usage-documentation-generation">custom usage documentation layouts</a>
with fine-grained control over <a href="#style">styles</a>.
</td>
<td>
Allows specifying the <a href="https://github.com/yargs/yargs/blob/master/docs/api.md#scriptname0">scriptName</a>,
a <a href="https://github.com/yargs/yargs/blob/master/docs/api.md#usagemessagecommand-desc-builder-handler">usage</a> 
string,
an <a href="https://github.com/yargs/yargs/blob/master/docs/api.md#epiloguestr">epilogue</a>,
<a href="https://github.com/yargs/yargs/blob/master/docs/api.md#examplecmd-desc">examples</a> as strings,
and the number of columns after which to
<a href="https://github.com/yargs/yargs/blob/master/docs/api.md#wrapcolumns">wrap</a>.
</td>
<td>
Display extra information by
<a href="https://github.com/tj/commander.js#custom-help">listening to the <code>--help</code> event</a>,
customize <a href="https://github.com/tj/commander.js#usage-and-name">program name and usage description</a>,
and <a href="https://github.com/tj/commander.js#addhelpcommand">add custom description text</a>.
</td>
<td>
None that I am aware of.
</td>
</tr>
</table>

## Reporting Issues

Please report issues [in the tracker][issues]!

## Contributing

We are open to, and grateful for, any contributions made by the community.
By contributing to shargs, you agree to abide by the [code of conduct][code].
Please read the [contributing guide][contribute].

## License

Shargs is [MIT licensed][license].

Logo created by brgfx (<a href="https://www.freepik.com/free-photos-vectors/education">www.freepik.com</a>).

[actions]: https://github.com/Yord/shargs/actions
[code]: https://github.com/Yord/shargs/blob/master/CODE_OF_CONDUCT.md
[contribute]: https://github.com/Yord/shargs/blob/master/CONTRIBUTING.md
[issues]: https://github.com/Yord/shargs/issues
[license]: https://github.com/Yord/shargs/blob/master/LICENSE
[lodash]: https://github.com/lodash/lodash
[lodash-fp]: https://github.com/lodash/lodash/wiki/FP-Guide
[node]: https://nodejs.org/
[npm-package]: https://www.npmjs.com/package/shargs
[ramda]: https://ramdajs.com/docs/#mergeDeepLeft
[shargs]: https://github.com/Yord/shargs
[shargs-core]: https://github.com/Yord/shargs-core
[shargs-example-async-deepthought]: https://github.com/Yord/shargs-example-async-deepthought
[shargs-example-repl]: https://github.com/Yord/shargs-example-repl
[shargs-example-sync-deepthought]: https://github.com/Yord/shargs-example-sync-deepthought
[shargs-example-sync-deepthought-config-env-argv]: https://github.com/Yord/shargs-example-sync-deepthought-config-env-argv
[shargs-example-sync-sql]: https://github.com/Yord/shargs-example-sync-sql
[shargs-opts]: https://github.com/Yord/shargs-opts
[shargs-parser]: https://github.com/Yord/shargs-parser
[shargs-repl]: https://github.com/Yord/shargs-repl
[shargs-tutorial-git]: https://github.com/Yord/shargs-tutorial-git
[shargs-usage]: https://github.com/Yord/shargs-usage
[shield-license]: https://img.shields.io/npm/l/shargs?color=yellow&labelColor=313A42
[shield-node]: https://img.shields.io/node/v/shargs?color=red&labelColor=313A42
[shield-npm]: https://img.shields.io/npm/v/shargs.svg?color=orange&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[shield-unit-tests-linux]: https://github.com/Yord/shargs/workflows/linux/badge.svg?branch=master
[shield-unit-tests-macos]: https://github.com/Yord/shargs/workflows/macos/badge.svg?branch=master
[shield-unit-tests-windows]: https://github.com/Yord/shargs/workflows/windows/badge.svg?branch=master
[then]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
