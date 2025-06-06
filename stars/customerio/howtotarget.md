---
repo: customerio/howtotarget
url: 'https://github.com/customerio/howtotarget'
homepage: 'https://howtotarget.email'
starredAt: '2022-06-20T21:50:43Z'
createdAt: '2019-03-26T20:23:40Z'
updatedAt: '2025-02-01T21:16:12Z'
language: SCSS
license: NA
branch: main
stars: 50
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.211Z'
description: Email development techniques for singling out email clients and platforms.
tags:
  - css
  - email-development
  - email-geeks
  - email-marketing
---

# 🎯 How to Target Email Clients

A collection of crowdsourced email development techniques for singling out email clients and platforms based on research by [Mark Robbins](https://github.com/m-j-robbins).

## Using the site

### A note on `foo`

Some code snippets include `foo` or `.foo`. This is [placeholder code](https://en.wikipedia.org/wiki/Foobar) meant to be replaced with your own class names and styles.

For example, the site lists the following method for targetting Gmail:

```css
u + .body .foo

```

To target Gmail in your own code, you might write something like this:

```css
u + .body .your-class {
  background-color: red;
}
```

## Contributing email hacks

If you know of a targetting methods not yet listed, or have found a listed technique to no longer work, please [open an issue](https://github.com/customerio/howtotarget/issues) or a pull request.

### Opening a pull request

PRs are welcome and should follow the existing file name and format conventions.

- All hacks/methods are added one per file in [hacks/\_posts](https://github.com/customerio/howtotarget/tree/master/hacks/_posts)
- Files are named `YYYY-MM-DD-client-platform-version.md`
- [Front matter](https://jekyllrb.com/docs/front-matter/) should include client, platform, version, status, and contributor
  - `client` is the name of the email client (ex: Gmail, Apple Mail)
  - `platform` is the operating system or OS category (usually one of iOS, Android, desktop, mobile, or webmail)
  - `version` is usually a number corresponding to the client (ex: `12.4` for Apple Mail 12.4)
  - `status` must be one of Working (tested and confirmed), Unknown (not confirmed), or Deprecated (confirmed no longer working)
  - `contributor` is your name in Title Case
  - **Note:** All fields should be present; if not applicable, leave blank
- Code blocks should always be wrapped in [fences](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks) ( ` ``` `) with the language name appended to the opening fence (ex: ` ```html` or ` ```css`)
- Explanations of how and why the code works are encouraged and should be added below the code snippets; this can include markup like inline code and links
- If this is your first contribution, you should also add yourself to [contributors.yml](https://github.com/customerio/howtotarget/blob/master/_data/contributors.yml) in alphabetical order.

## Contributing to development

See [Jekyll’s quick start guide](https://jekyllrb.com/docs/) for running the site in local development.

---

Curated by [Parcel](https://parcel.io)
