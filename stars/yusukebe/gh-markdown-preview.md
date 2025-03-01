---
repo: yusukebe/gh-markdown-preview
url: 'https://github.com/yusukebe/gh-markdown-preview'
homepage: ''
starredAt: '2025-01-30T23:35:43Z'
createdAt: '2021-10-22T02:55:13Z'
updatedAt: '2025-02-25T04:01:33Z'
language: Go
license: MIT
branch: master
stars: 542
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.053Z'
description: GitHub CLI extension to preview Markdown looks like GitHub.
tags:
  - cli
  - gh-extension
  - golang
  - markdown
---

# gh markdown-preview

GitHub CLI extension to preview Markdown looks like GitHub :octocat:

**gh markdown-preview** is a [GitHub CLI](https://cli.github.com) extension to preview your markdown such as **README.md**. The `gh markdown-preview` command start a local web server to serve the markdown document. **gh markdown-preview** renders the HTML got from GitHub official markdown API and uses the CSS extracted from GitHub web site. The styles are almost the same!

You can see rendered README before uploading to GitHub!

## Features

- **No-dependencies** - You need `gh` command only.
- **Zero-configuration** - You don't have to set the GitHub access token.
- **Looks exactly the same** - You can see same as GitHub.
- **Live reloading** - You don't need reload the browser.
- **Auto open browser** - Your browser will be opened automatically.
- **Auto find port** - You don't need find an available port if default is used.

## Screenshots

Open your browser:

![Screenshot of gh markdown-preview](https://user-images.githubusercontent.com/10682/138411417-dd12a831-bacc-4b05-a33d-47d3f6b45483.png)

Live reloading:

![Screenshot of gh markdown-preview](https://user-images.githubusercontent.com/10682/138750423-ae7940cb-205e-4832-8e6a-af6f43c0f666.gif)

## Installation

```
gh extension install yusukebe/gh-markdown-preview
```

Upgrade:

```
gh extension upgrade markdown-preview
```

## Usage

The usage:

```
gh markdown-preview README.md
```

Or this command will detect README file in the directory automatically.

```
gh markdown-preview
```

Then access the local web server such as `http://localhost:3333` with Chrome, Firefox, or Safari.

Available options:

```text
    --dark-mode           Force dark mode
    --markdown-mode       Force "markdown" mode (rather than default "gfm")
    --disable-auto-open   Disable auto opening your browser
    --disable-reload      Disable live reloading
-h, --help                help for gh-markdown-preview
    --host string         Hostname this server will bind (default "localhost")
    --light-mode          Force light mode
-p, --port int            TCP port number of this server (default 3333)
    --verbose             Show verbose output
    --version             Show the version
```

## Related projects

- GitHub CLI <https://cli.github.com>
- Grip <https://github.com/joeyespo/grip>
- github-markdown-css <https://github.com/sindresorhus/github-markdown-css>

## Author

Yusuke Wada <http://github.com/yusukebe>

## License

Distributed under the MIT License.
