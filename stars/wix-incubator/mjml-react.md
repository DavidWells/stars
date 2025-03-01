---
repo: wix-incubator/mjml-react
url: 'https://github.com/wix-incubator/mjml-react'
homepage: ''
starredAt: '2021-10-03T18:43:10Z'
createdAt: '2018-06-06T12:39:37Z'
updatedAt: '2025-02-24T22:42:51Z'
language: JavaScript
license: MIT
branch: master
stars: 993
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:43.945Z'
description: React component library to generate the HTML emails on the fly
tags:
  - email
  - email-marketing
  - email-templates
  - html
  - mjml
  - node
  - react
---

# mjml-react &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wix-incubator/mjml-react/blob/master/LICENSE) <a href="https://www.npmjs.com/package/mjml-react"><img src="https://img.shields.io/npm/v/mjml-react.svg" alt="npm version"></a> [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wix-incubator/mjml-react/pulls)

---

## NOTICE: This project is no longer maintained. :warning:

This project is no longer maintained. There will be no more new features, fixes and releases. Feel free to fork this repository, use different build system and release this project under different name.

Known forks:

* [Faire mjml-react fork](https://github.com/Faire/mjml-react)

---

<img src="https://cdn.worldvectorlogo.com/logos/mjml-by-mailjet.svg" height="64"/> &middot; <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="64" height="64"/>

There is an awesome library [mjml](https://mjml.io/) with github repo here [https://github.com/mjmlio/mjml](https://github.com/mjmlio/mjml).

`MJML` is a markup language created by [Mailjet](https://www.mailjet.com/).
So in order to create emails on the fly we created a library with `React` components.

## How it works

Install the required dependencies first:

```bash
npm install react react-dom mjml mjml-react
```

And afterwards write a code like a pro:

```js
import {
  render,
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
} from "mjml-react";

const { html, errors } = render(
  <Mjml>
    <MjmlHead>
      <MjmlTitle>Last Minute Offer</MjmlTitle>
      <MjmlPreview>Last Minute Offer...</MjmlPreview>
    </MjmlHead>
    <MjmlBody width={500}>
      <MjmlSection fullWidth backgroundColor="#efefef">
        <MjmlColumn>
          <MjmlImage src="https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg" />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection>
        <MjmlColumn>
          <MjmlButton
            padding="20px"
            backgroundColor="#346DB7"
            href="https://www.wix.com/"
          >
            I like it!
          </MjmlButton>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>,
  { validationLevel: "soft" }
);
```

And as the result you will get a nice looking email HTML (works in mobile too!)

![preview](https://user-images.githubusercontent.com/10008149/41058394-59b8ce9e-69d2-11e8-9eb9-c294f35bae9f.png)

## Options

mjml-react sets the following MJML options when rendering to HTML:

```js
{
  keepComments: false,
  beautify: false,
  minify: true,
  validationLevel: 'strict'
}
```

If you want to override these, you can pass an object to `render` as a second argument. See the [MJML docs](https://documentation.mjml.io/#inside-node-js) for the full list of options you can set.

## Extensions

```js
import {
  MjmlHtml,
  MjmlComment,
  MjmlConditionalComment
} from 'mjml-react/extensions';

<MjmlComment>Built with ... at ...</MjmlComment>
// <!--Built with ... at ...-->

<MjmlConditionalComment>MSO conditionals</MjmlConditionalComment>
// <!--[if gte mso 9]>MSO conditionals<![endif]-->

<MjmlConditionalComment condition="if IE">MSO conditionals</MjmlConditionalComment>
// <!--[if IE]>MSO conditionals<![endif]-->

<MjmlHtml tag="div" html="<span>Hello World!</span>" />
// <div><span>Hello World!</span></div>
```

## Utils

We do have also some utils for post processing the output HTML.
Because not all mail clients do support named HTML entities, like `&apos;`.
So we need to replace them to hex.

```js
import { namedEntityToHexCode, fixConditionalComment } from "mjml-react/utils";

const html = "<div>&apos;</div>";
namedEntityToHexCode(html);
// <div>&#39;</div>

fixConditionalComment(
  "<!--[if mso]><div>Hello World</div><![endif]-->",
  "Hello",
  "if IE"
);
// <!--[if IE]><div>Hello World</div><![endif]-->
```

## Limitations

Currently `mjml` and `mjml-react` libraries are meant to be run inside a node.

## Example project

You can find an example project here
[https://github.com/wix-incubator/mjml-react-example](https://github.com/wix-incubator/mjml-react-example)
