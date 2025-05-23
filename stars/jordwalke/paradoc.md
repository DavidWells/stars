---
repo: jordwalke/paradoc
url: 'https://github.com/jordwalke/paradoc'
homepage: null
starredAt: '2021-11-24T05:32:04Z'
createdAt: '2021-01-28T04:38:56Z'
updatedAt: '2024-12-16T21:20:48Z'
language: JavaScript
license: MIT
branch: master
stars: 178
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:34.614Z'
description: One Click Docs
tags: []
---

[ vim: set filetype=Markdown: ]: # (<style type="text/css">body {visibility: hidden} </style>)
[ vim: set filetype=Markdown: ]: # (<meta charset="utf-8">)
[ vim: set filetype=Markdown: ]: # (<script src="site/Paradoc.js"> </script>)
[//]: # (---)
[//]: # (title: Paradoc)
[//]: # (subtitle: Instantly write, deploy, and enjoy docs)
[//]: # (description: Paradoc - Easy Markdown Pages)
[//]: # (nextPage: configuring-pages)
[//]: # (siteTemplate: siteTemplate.html)
[//]: # (---)


- **No servers, No build**

- **Deployable Sites Right [From Chrome](#easy-optimizing-with-chrome)**

- **Markdown [features](#markdown-features) for developers. [Offline Search](#search-features).**

### Workflow

- Write regular markdown in `.html` files with a single script tag at the top.
- Everything after the script tag is regular markdown.


```markdown
<script src="site/Paradoc.js"></script>
Everything _after_ the first line is
plain **markdown**.
```

<continueRight/>

- Double click the `.html` file to turn your markdown into a beautiful webpage.

- To make changes, just edit the contents of the file and reload the browser.


### Try It Out

[The Paradoc landing page](https://jordwalke.github.io/paradoc/README.html) was
created from the Paradoc repo's main `README.html` markdown file. Clone this
repo and double click `README.html` to turn it into this webpage.

1. `git clone git@github.com:jordwalke/paradoc.git`
2. Double click `README.html`



> Note: The script include in _this_ `README.html` looks complicated because it
> uses [Advanced Features](#integration-github-readme) that allows a single
> `README.html` to act as a website, _and_ a Github README, always kept in
> sync.  Your files will probably use the [very simple script
> include](#workflow?txt=41316212813224330877011010h0) already discussed.


### Looks


#### Split View

Paradoc comes with a UI theme that supports a left/right responsive split
layout.  As you increase the window size, code samples and block quotes are
split into a right hand column.

> Note: The style for this split view comes from Paradoc's use of
> [flatdoc](https://ricostacruz.com/flatdoc/), but has been heavily modified.
> The split view can be disabled in your
> [`siteTemplate`](configuring-pages.html#the-site-template).

Some of the additional [markdown extension features](#markdown-extensions)
control the behavior of this split view.


### Markdown Extensions

Paradoc supports extended markdown features specified in [Github Flavored
markdown](https://github.github.com/gfm/), and also supports some additional
Paradoc specific features.


#### Code highlighting

With [GitHub Flavored Markdown][fences] you can use Markdown code fences to
make syntax-highlighted text. In Paradoc, codeblocks will be rendered in the right column
of the [split view](#looks-split-view) if the window is sufficiently wide.

~~~markdown
```javascript
console.log("This", "is a log");
```
~~~


#### Blockquotes

Blockquotes also show up in the right hand column when the window is
sufficiently large. This is useful for providing extra information or non-code
examples that move out of the way of the main document.

> Blockquotes are blocks that begin with `>`.

#### Smart quotes

Single quotes, double quotes, and double-hyphens are replaced to their
"typographically-accurate" equivalent. This does not apply to `<code>` and
`<pre>` blocks.

> "Check out this quote here. Look how how correct the quotes are"
> --me


#### `<continueRight/>`

Paradoc adds an additional feature that allows a right column element to continue
flowing.

> This blockquote comes immediately after the text
> _"Paradoc adds an additional feature that allows a right column element to
> continue flowing"_
> but notice how this blockquote also continues to "flow" into the list that
> comes after it? This is important for creating a better balance of left and
> right content. Doing so requires the author to opt into having particular
> blockquote/code blocks flow into subsequent left content when it makes sense.

<continueRight/>

- After a blockquote or code fence region, include a `<continueRight/>` tag.
- It will cause that blockquote/fence region to continue flowing into whatever
  comes after it in the left column.
- Until another blockquote or code fence region begins.

#### Images In Right Column

Images may also be placed into the right column of the document by placing
them in blockquotes.

```markdown
> ![Another Beach](site/images/beach2.jpg)
```

Like all other elements, you may place a `<continueRight/>` after blockquote
containing the image to get subsequent content to flow alongside the image on
its left side:

> ![Another Beach](site/images/beach2.jpg)

<continueRight/>


> - Such as this list here
> - **And this bold line here**

#### Code Tabs

You can create [Docusaurus](https://docusaurus.io/docs/en/doc-markdown) style
code toggle switches for viewing multiple different code samples. In this
example, clicking on the headers (reason, javascript, ocaml) will toggle
between different syntaxes for a particular print command.

<!--CODE_TABS-->
```reason
Console.log(["This", "Logs", "Reason", "Lists"]);
Library.callSomeFunction(10, 200);
```

```javascript
Console.log(["This", "Logs", "Reason", "Arrays"]);
library.callSomeFunction(10, 200);
```

```ocaml
Console.log ["This", "Logs", "Ocaml", "Lists"]
Library.callSomeFunction 10 200;
```
<!--END_CODE_TABS-->



To create code tabs, place multiple code blocks between special `CODE_TABS`
HTML comments as follows.

````md
 <!--CODE_TABS-->
 ... multiple code blocks go here...
 <!--END_CODE_TABS-->

````

#### Custom Tab Titles

By default, code tab titles are inferred from the code block syntaxes, but you
may give custom names to the tabs by including an HTML comment before each code
example.


````md
 <!--CODE_TABS-->
 <!--My JS Code Block-->
 ...js code block...
 <!--My Python Code Block-->
 ...python code block...
 <!--END_CODE_TABS-->
````

Note: Specifying the title from this code block syntax is a Paradoc feature,
not supported in Docusaurus.


The previous example produces the following result:

<!--CODE_TABS-->

<!--My JS Code Block-->
```js
console.log('Hello, world!');
```
<!--My Python Code Block-->
```py
print('Hello, world!')
```
<!--END_CODE_TABS-->


### UI Enhancements

#### Medium-Zoom Images

Images are specified using standard markdown syntax, but they are enhanced with
a plugin called [Medium Zoom](https://medium-zoom.francoischalifour.com/).

```markdown
![Beach](site/logo.svg)
```

![Beach](site/images/beach.jpg)

> Click on the image to view a full view. Click, or scroll a small amount to
> cause the image to animate back into place.

<continueRight/>



#### Buttons

Include a `>` at the end of your link text (for instance: `Continue >`), to
turn them into buttons. This is a feature from flatdoc.

> [Go To Github >][github]


### YAML Headers

Paradoc parses valid key/value items from "YAML headers". These headers are
where you specify information that applies to that entire document.  YAML
headers consist of an unlimited number of `key:value` lines sandwiched between
two `---` at the start of the document, immediately after the initial Paradoc
`<script>`.

You can specify any key/value pairs you like - but Paradoc will look for
certain keys to configure your website and rendering. See [Configuring
Pages](configuring-pages.html).


```html
<script src="site/Paradoc.js"></script>
---
title: me
description: "Hi there here is an escaped quote \" inside of quotes"
anythingYouWant: hey
---
```


### Multi-Doc Pages

To add another doc page, have an existing page specify the new page as its
`nextPage:` in the [Page Header](#page-headers) . Then make sure that new page
actually exists, and has the Paradoc script include as usual.

> Note: All pages should also supply a `rootPage:` header property that
> specifies the "first page" in the list.

The following header specifies that the next markdown page should be
`my-next-page.html`, and that the starting "root page" should be `README.html`.


```html
<script src="site/Paradoc.js"></script>
---
title: me
nextPage: my-next-page
rootPage: readme
---
```

<continueRight/>

See how to [Add More Pages](configuring-pages.html#adding-pages)


## Search Features

Paradoc supports _offline_ search across all of the documents that are
[added](configuring-pages.html#adding-pages). No build steps or servers are
required to search, and no subscriptions to search services are required.
Content is searched interactively while authoring docs locally, when users
consume your deployed site, and when users save local copies of your deployed
site to disk.


#### Offline Search
- Press the <kbd>/</kbd> key and start typing.
- Searches across multiple pages.
- No server, no build steps.


#### Keyboard Interactions

| Keyboard                                                             | Action                                       |
|--------------------------------------------------------------------- |----------------------------------------------|
| <kbd>/</kbd>                                                         | Focus the Search input                       |
| <kbd>Esc</kbd>                                                       | Close search results and blur search input   |
| <kbd>Ctrl+c</kbd> or <kbd>Ctrl+\[</kbd>                              | Toggle search results open when focused      |
| <kbd>Down</kbd> or <kbd>Ctrl+n</kbd>                                 | When results open, move up / down in results |
| <kbd>Up</kbd> or <kbd>Ctrl+p</kbd>                                   | When results open, move up / down in results |
| <kbd>Enter</kbd> or Click                                            | Go to currently selected result              |


## Change Resistant Deep Linking

All content in Paradoc pages can be "deep linked" to. This means that you can
create a url link to a specific paragraph, code sample, or table row (not just
the headers).

These links are "change resistant", meaning that the content can be moved to another location
in the document, and all the links that have proliferated on the internet will still work correctly.

It also means that the contents that are linked can be changed (fixing typos,
refactoring sentence structure), and all proliferated links to that specific
content will still usually work (up to a certain amount of changes).

This works by creating a text fingerprint of the content and when loading the
page, finding the content that most closely matches that fingerprint in the
url. Even if the text has changed changes Paradoc will find the best match
possible.

###### Try It Out

Hit <kbd>/</kbd> to search for anything, and hit enter on a search result. Then
copy/paste the url into a new browser window. The search results encode the
change resistant deep link in the url, and you can share that specific search
result with anyone or link to it from a blog while feeling confident your links
won't break.


## Deploying

### Easy Optimizing With Chrome

Just "Save As" in Chrome, select "Complete Webpage" to generated an optimized,
pre-rendered version of the site with all docs served as a single page application
with working online/offline search.

### Packing Into A Single `.html` file.
"Save As" in Chrome generates an optimized rendered build of your website as a
single page application, but it will generate a folder with assets/styles and
images for your docs to be distributed/deployed along with your main html page.
You can take it even further also optimize your docs page into a single,
minified `.html` file which bundles all of its resources *including* fonts and
images! There are many benefits to the way Paradoc compresses your docs site
into a single, shareable `.html` file.

```
cd site
npm install
node ./Paradoc.js ../readme.html
```

Now you can deploy `../readme.bookmark-inlined.html` as a single file to any
web host, and it will operate as a single page application.

With this mode:
- Paradoc prerenders at build time instead of page load time (faster loading).
- The document is served as a single web request.
- Easily send the docs as an attachment in Discord/Messenger chat thread.
- Save your online docs using the browser's '"Save As"
- Paradoc makes sure your page looks exactly the same on anyone's computer,
  including the fonts.


## More

#### Issues:
You must only load markdown html files that you authored and trust. Currently,
the way that the `marked` library is being used does not sanitize the output
before injecting it into the DOM.


### Acknowledgements
See [ORIGINS.md](./ORIGINS.md) for links and licenses of various
components that are embedded in this project.



[github]: https://github.com
[fences]:https://help.github.com/articles/github-flavored-markdown#syntax-highlighting
[hljs]: https://highlightjs.org/
[stylus]: https://stylus-lang.com
