---
repo: elierotenberg/react-armor
url: 'https://github.com/elierotenberg/react-armor'
homepage: null
starredAt: '2016-02-24T20:52:08Z'
createdAt: '2016-02-01T08:33:23Z'
updatedAt: '2024-09-23T10:35:53Z'
language: JavaScript
license: NA
branch: master
stars: 636
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:31.292Z'
description: Protect your DOM from third-party tampering.
tags: []
---

react-armor
===========

React Armor is a collection of utilies to protect your React-powered DOM from third-party tampering.

### Motivation

In a React app, it is often crucial to make sure that the actual DOM doesn't get changed behind your back, so that the
virtual DOM and the actual DOM stay in sync, under your control, enforcing your invariants.

However, third-party scripts often mess with your DOM, violating your invariants. Such third-party scripts include
browser extensions (adblockers...), userscripts, invasive ads, and many more. Most of these scripts hook into your DOM
using its tree structure and more specifically, using CSS selectors to target your DOM (using either injected
stylesheets, plain `document.querySelector`, not to mention `$()`).

React Armor provides several tools to make hard, if not impossible, for any script not encapsulated in your React app,
to hook into your DOM.

The tools are designed to be efficient, easy-to-use, and play very well with the rest of the React/JS ecosystem.


### Tool 1: Class names obfuscation

Most selectors are simply based on class names. This tool makes class names determinist but cryptographically
unpredictable, making it practically impossible to target DOM elements using class names selectors, using
`react-traverse`.

The following JS:
```js
import { obfuscateClassNames } from 'react-armor';

function Bar() {
  return <div className='Bar'>{'bar'}</div>;
}

@obfuscateClassNames({ seed: 'foobar' })
class Foo extends React.Component {
  render() {
    return <div className='Foo'><Bar /></div>;
  }
}

React.render(<Foo />);
```
... renders to the following HTML:
```html
<div class="11f5b410"><div class="34ac2cc1">bar</div></div>
```

We also provide a tool to apply the exact same transformation to your stylesheets, so that you can keep
writing CSS (or CSS-in-JSS) as normal, and keep everything working.

The following JS:
```js
import { obfuscateClassNames } from 'react-armor';

postcss([obfuscateClassNames.createPostCSSPlugin({ seed: 'foobar '})]).process(`
  .Foo .Bar[attr='val'].Bar--module:hover {
    background-color: 'red';
  }
  ul li .Bar--module.Bar:visited {
    background-color: 'green';
  }
`);
```
... generates the following CSS:
```css
  .11f5b410 .34ac2cc1[attr='val'].6faed2d1:hover {
    background-color: 'red';
  }
  ul li .6faed2d1.34ac2cc1:visited {
    background-color: 'green';
  }
```

In order for this tool to be efficient at preventing CSS selectors to work, you should change the seed often, eg.
generate a new random seed automatically once a day, or generate a new random seed at each request. (but this is costly since you must
then regenerate your stylesheet once per request too, preventing browser-caching).

### Tool 2: Tree structure obfuscation

While most third-party selectors rely on classes, they can also target an element relying only on the tree structure of the
DOM, especially if class-based selectors have been crippled by using our first tool. To also disable tree-structure based
selectors, we rely on the fact that CSS selectors are poor at targeting subtrees of variable depth.

We created a React Component, `Obfuscator`, which does precisely this: it wraps nodes in variable-length subtrees, making it
prohibitively costly and error-prone to write the selectors which would always (or even, often) target these subtrees.

The following JS:
```js
React.render(<div className='bar'>
  <Obfuscator
    seed={'fizzbuzz'}
  >
    <div className='foo'>{'foo'}</div>
  </Obfuscator>
</div>);
```
... renders to the following HTML:
```html
<div class="bar">
  <span>
    <div>
      <div>
        <span>
          <span>
            <span>
              <div>
                <div>
                  <div>
                    <span>
                      <div class="foo">foo</div>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </span>
        </span>
      </div>
    </div>
  </span>
</div>
```

`Obfuscator` works by inserting a random amount (in a configurable interval) of nodes, every which of them is a random
element (either `span` or `div` by default, also configurable). You must also provide a seed, which will be used by the
internal PRNG to generate tree permutations: the permutations are stateless, which means they are not random, but only very
hard (virtually impossible) to predict, and therefore don't change upon re-rendering if the same seed is reused,
to avoid DOM thrashing.

In order for this tool to be efficient at preventing CSS selectors to work, you should change the seed often, eg.
generate a new random seed automatically once a day, or generate a new random seed at each request.

#### Strength

The strength `s(r, a, b)` of the obfuscator is the number of distinct selectors which must be generated to cover all the
structures possibly generated by the algorithm if the seed is considered unpredictable, with `r = allowedElements.length,
a = minDepth, b = maxDepth`.

It resolves to `s(r, a, b) = Sum(r^k, k = m..n) = (r^(b+1) - r^a)/(r - 1)` (for `r > 1`, otherwise `s(1, a, b) = b - a`).

For example, with the default values (`r = 2, a = b = 10`), then `s(r, a, b) = 1024`, which means that a third-party selector
would have to try and match up to 1024 selectors - unless of course you pollute the generated elements with easily matchable
attributes, such as predictible class names. With `a = b = 32`, then `s(r, a, b) = 4294967296`, as expected. Which is a lot
of selectors to generate.

#### Configurable props for `<Obfuscator>`

- `allowedElements = ['div', 'span']`: an array of elements (either string or component) to pick from

  This is useful if you want to restrict, extend or customize the elements injected by the obfuscator. The length of this
  array impacts the strength of the obfuscator a lot.

  One simple way to increase the strength of the obfuscator without nesting too many levels would be to use custom tag names
  (not to be confused with full-fledged  HTML5 Custom Elements), eg. `allowedElements = ['x-obfuscator-1', 'x-obfuscator-2',
  ... 'x-obfuscator-256']`. However, it is possible that using custom tag names can be detected by third-party script (as
  not being whitelisted as a standard tag name) and it is therefore not used by default. You should therefore use the tag
  names obfuscator instead.

- `injectedProps = {}`: either a props object or a function that takes `(k, depth, type)` and returns the props object to
  inject into the generated element at depth `k` (`k = 0` is outermost element, `k = depth - 1` is innermost component)

  This is useful mostly for styling, for example if you want to inject inline styles or class names (which pairs nicely with
    the class name obfuscator above). Be careful though to not lose entropy by injecting predictible or matchable attributes,
    such as class names. It is safe however to introduce obfuscated class names using `obfuscateClassNames` to style the
    generated elements (eg. forcing `display: block` or `display: inline-block`).

- `minDepth = 0`, `maxDepth = 10`: the range of possible depths used by `Obfuscator`.

  This is useful if you want to trade obfuscator strength for DOM weight. Note that the number of nodes generated is linear
  of `maxDepth`, while the strength is exponential of `maxDepth`, so unless you really think a few dozens of hundred extra
  DOM nodes will impact performance more than these sneaky third-party scripts, then you should probably not decrease it.

- all other props (besides `seed`) will be directly passed to the outermost element generated by `Obfuscator`, eg.
`className`, `style`, etc.

### Tool 3: Tag names obfuscation

Other than class names, selectors are often based on tag names. This tool makes tag names determinist but cryptographically
unpredictable, making it practically impossible to target DOM elements using tag names selectors, using
`react-traverse`.

The following JS:
```js
import { obfuscateTagNames } from 'react-armor';

function Bar() {
  return <div className='Bar'>{'bar'}</div>;
}

@obfuscateTagNames({ seed: 'foobar' })
class Foo extends React.Component {
  render() {
    return <div className='Foo'><Bar /></div>;
  }
}

React.render(<Foo />);
```
... renders to the following HTML:
```html
<ecb-ec1b6 class="Foo"><ecb-ec1b6 class="Bar">bar</ecb-ec1b6></ecb-ec1b6>
```

We also provide a tool to apply the exact same transformation to your stylesheets, so that you can keep
writing CSS (or CSS-in-JSS) as normal, and keep everything working.

The following JS:
```js
import { obfuscateTagNames } from 'react-armor';

postcss([obfuscateTagNames.createPostCSSPlugin({ seed: 'foobar '})]).process(`
  div.Foo span.Bar[attr='val'].Bar--module:hover iframe {
    background-color: 'red';
  }
  ul li .Bar--module.Bar:visited p {
    background-color: 'green';
  }
`);
```
... generates the following CSS:
```css
  ecb-ec1b6.Foo aca-169a2.Bar[attr='val'].Bar--module:hover iframe {
    background-color: 'red';
  }
  ul li .Bar--module.Bar:visited ebb-37e7b {
    background-color: 'green';
  }
```

Note that by default, certain elements (such as `iframe`, `h1`, etc, see [the source](lib/obfuscateTagNames)) are never
obfuscated, so that special-behaviour and SEO/accessibility-relevant tags are left untouched. Also, the default style for
the obfuscated elements are those of `HTMLUnknownElement`, which are usually very minimal. You should therefore use either
inline styles or better, obfuscated class names to reset the style of each element.

In order for this tool to be efficient at preventing CSS selectors to work, you should change the seed often, eg.
generate a new random seed automatically once a day, or generate a new random seed at each request. (but this is costly
since you must then regenerate your stylesheet once per request too, preventing browser-caching).

### More tools...

Other tools will probably come helping.

If you have ideas, please feel free to contact me, post an issue or submit a PR :)

### Putting it all together

While each tool is independent, there are best used together, and pair nicely with each other.

The recommended way to apply tools is:

1. Use Obfuscator inside your components wherever it makes sense

2. Obfuscate class names at the top level

3. Obfuscate tag names at the top level

For example, the following JS:
```js
const seed = 'foobar'; // change this automatically every once in a while (eg. once per day)

function Bar() {
  return <div className='Bar'>
    <Obfuscator seed={seed}>
      <ul className='Bar-ul'>
        <li className='Bar-ul-li' key='a'>{'bar A'}</li>
        <li className='Bar-ul-li' key='b'>{'bar B'}</li>
      </ul>
    </Obfuscator>
  </div>;
}

class Foo extends React.Component {
  render() {
    return <div className='Foo'>
      <h1>{'Here be Bar'}</h1>
      <Bar />
    </div>;
  }
}

React.render(
  obfuscateTagNames({ seed })(
    obfuscateClassNames({ seed })(
      <Foo />
    ),
  ),
);
```
... renders to the following HTML:
```html
<ecb-ec1b6 class="11f5b410">
  <h1>Here be Bar</h1>
  <ecb-ec1b6 class="34ac2cc1">
    <aca-169a2>
      <ecb-ec1b6>
        <aca-169a2>
          <aca-169a2>
            <aca-169a2>
              <aca-169a2>
                <ecb-ec1b6>
                  <ecb-ec1b6>
                    <aca-169a2>
                      <aca-169a2>
                        <ul class="cf5ef38d">
                          <li class="caf82c92">bar A</li>
                          <li class="caf82c92">bar B</li>
                        </ul>
                      </aca-169a2>
                    </aca-169a2>
                  </ecb-ec1b6>
                </ecb-ec1b6>
              </aca-169a2>
            </aca-169a2>
          </aca-169a2>
        </aca-169a2>
      </ecb-ec1b6>
    </aca-169a2>
  </ecb-ec1b6>
</ecb-ec1b6>
```

### License

MIT Elie Rotenberg
