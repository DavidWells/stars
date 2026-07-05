---
repo: suchipi/sputter
url: 'https://github.com/suchipi/sputter'
homepage: ''
starredAt: '2022-02-24T05:08:11Z'
createdAt: '2018-06-03T22:49:14Z'
updatedAt: '2022-02-24T07:22:56Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:22:11.335Z'
description: CSS-like AST query library.
tags: []
---

# Sputter

Sputter is a CSS-like selector library that lets you query an arbitrary AST.

Sputter is a fork of [ESQuery](https://github.com/estools/esquery).

The following selectors are supported:

- AST node type: `ForStatement`
- [wildcard](http://dev.w3.org/csswg/selectors4/#universal-selector): `*`
- [attribute existence](http://dev.w3.org/csswg/selectors4/#attribute-selectors): `[attr]`
- [attribute value](http://dev.w3.org/csswg/selectors4/#attribute-selectors): `[attr="foo"]` or `[attr=123]`
- attribute regex: `[attr=/foo.*/]`
- attribute conditons: `[attr!="foo"]`, `[attr>2]`, `[attr<3]`, `[attr>=2]`, or `[attr<=3]`
- nested attribute: `[attr.level2="foo"]`
- field: `FunctionDeclaration > Identifier.id`
- [First](http://dev.w3.org/csswg/selectors4/#the-first-child-pseudo) or [last](http://dev.w3.org/csswg/selectors4/#the-last-child-pseudo) child: `:first-child` or `:last-child`
- [nth-child](http://dev.w3.org/csswg/selectors4/#the-nth-child-pseudo) (no ax+b support): `:nth-child(2)`
- [nth-last-child](http://dev.w3.org/csswg/selectors4/#the-nth-last-child-pseudo) (no ax+b support): `:nth-last-child(1)`
- [descendant](http://dev.w3.org/csswg/selectors4/#descendant-combinators): `ancestor descendant`
- [child](http://dev.w3.org/csswg/selectors4/#child-combinators): `parent > child`
- [following sibling](http://dev.w3.org/csswg/selectors4/#general-sibling-combinators): `node ~ sibling`
- [adjacent sibling](http://dev.w3.org/csswg/selectors4/#adjacent-sibling-combinators): `node + adjacent`
- [negation](http://dev.w3.org/csswg/selectors4/#negation-pseudo): `:not(ForStatement)`
- [matches-any](http://dev.w3.org/csswg/selectors4/#matches): `:matches([attr] > :first-child, :last-child)`
- [subject indicator](http://dev.w3.org/csswg/selectors4/#subject): `!IfStatement > [name="foo"]`
- `eval` for complex queries: `:eval('node.type === "Foo"')`

## Usage

```js
const ast = {
  type: "Foo",
  children: [
    {
      type: "Bar",
      value: 5,
    },
  ],
};

const sputter = require("sputter");

sputter.query(ast, "Foo > Bar[value=5]"); // [ { type: "Bar", value: 5 } ]
```

If your ast uses a key other than `type` to identify the type of a node, use `.configure`:

```js
const ast = {
  kind: "Foo",
  children: [
    {
      kind: "Bar",
      value: 5,
    },
  ],
};

const sputter = require("sputter").configure({
  identifierKey: "kind",
});

sputter.query(ast, "Foo > Bar[value=5]"); // [ { kind: "Bar", value: 5 } ]
```
