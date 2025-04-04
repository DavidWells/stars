---
repo: azu/missue
url: 'https://github.com/azu/missue'
homepage: ''
starredAt: '2021-11-21T19:37:18Z'
createdAt: '2020-12-14T15:09:35Z'
updatedAt: '2024-11-01T01:19:19Z'
language: JavaScript
license: MIT
branch: master
stars: 39
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.200Z'
description: A Toolkit helps you to management your TODO based on GitHub Issues.
tags:
  - github
  - issues
  - todo
---

# missue

![missue](docs/missue.png)

<!-- https://www.figma.com/file/ZfplT5xMVK1UeXJyYx0jG2/missue?node-id=0%3A1 -->

A Toolkit help you to management your TODO based on GitHub Issues.

## Purposes

- Use GitHub issues for your personal TODO management
- Create "public" or "private" repository for your TODO
- Sync cross-reference(CR) issues for avoiding duplicated issue management

![Overview](docs/missue-architecture.png)

## Installation

> This repository is template.

You can create new TODO repository based on this repository, and you can start to manage your TODO.

1. Visit <https://github.com/azu/missue/generate>
2. Input Repository name. Example) my-todo
3. Select "Public" or "Private"
4. Click "Create repository from template"

![Template](./docs/template.png)

## Setup

### Setup TODO labels workflow

You can create TODO-like labels for your repository with 1 click.

1. Visit `https://github.com/<your-name>/<your-repo>/actions/workflows/setup.yml`
2. Click "Run workflow"
3. Setup labels for your repository

You can see example labels on <https://github.com/azu/missue/labels>

![labels](./docs/labels.png)

If you want to add labels, you can edit [labels.yml](.github/labels.yml)

### Sync "CR" issue's state

"CR" is Cross Reference Issues.

You can create Cross Reference Issues with [userscript](userscript/)

Cross Reference Issues has a link that you want to track and has "CR" label.

- Example: https://github.com/azu/missue/issues/4

Sync "CR" workflow can sync state between original issue and your CR issue.

1. Visit `https://github.com/<your-name>/<your-repo>/actions/workflows/sync-cr.yml`
2. Click "Run workflow"
3. Sync CR issue's state

### Create "CR" issue from existing issue

[userscript](userscript/) help you to create "CR" issue

1. Install Greasemonkey-like extension
    - I've tested with [Violentmonkey](https://violentmonkey.github.io/)
2. Install [add-item-to-missue.user.js](https://github.com/azu/missue/raw/master/userscript/greasemonkey/add-item-to-missue.user.js)
3. Add setting to the installed user script
    - Please see [userscript](userscript/) README

![config](docs/config.png)

## Client

You can get simple electron client.

missue client has following features:

- Sync "CR" issues on focus
- Has simple Webview starts with your TODO repository

Build Steps:

```
git clone https://github.com/azu/missue
cd missue/
cd client/
yarn intall
GITHUB_TOKEN=yourtoken INPUT_URL="https://github.com/your/private-todo/issues" npm run build
```

For more details, see [client/](client/).

## Tips

### Want to pull this template repository changes

You can merge a template's changes into your todo repository.

```
npm run sync-template
```

### Add newer issue to your project board automatically

Following probot or GitHub Actions helps you.

- [philschatz/project-bot](https://github.com/philschatz/project-bot)
- [konradpabjan/actions-add-new-issue-to-column](https://github.com/konradpabjan/actions-add-new-issue-to-column)
- [takanabe/github-actions-automate-projects️](https://github.com/takanabe/github-actions-automate-projects)
- [technote-space/auto-card-labeler](https://github.com/technote-space/auto-card-labeler)

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/missue/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu

## Aknowledge

- [jonabc/sync-task-issues: Sync task issue closure to hierarchical parent tracking issues](https://github.com/jonabc/sync-task-issues)
