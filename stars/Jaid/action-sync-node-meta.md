---
repo: Jaid/action-sync-node-meta
url: 'https://github.com/Jaid/action-sync-node-meta'
homepage: 'https://github.com/Jaid/action-sync-node-meta'
starredAt: '2020-04-23T23:02:57Z'
createdAt: '2020-04-07T07:02:55Z'
updatedAt: '2024-09-30T17:21:37Z'
language: JavaScript
license: MIT
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:56.476Z'
description: GitHub Action that syncs package.json with the repository metadata.
tags:
  - action
  - action-sync-node-meta
  - actions
  - bot
  - github-action
  - github-actions
  - github-api
  - metadata
  - node
  - node-js
  - nodejs
  - repository
  - sync-node-meta
  - util
  - utility
  - workflow
---

# action-sync-node-meta


<a href="https://raw.githubusercontent.com/jaid/action-sync-node-meta/master/license.txt"><img src="https://img.shields.io/github/license/jaid/action-sync-node-meta?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor action-sync-node-meta"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/action-sync-node-meta/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Faction-sync-node-meta%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/action-sync-node-meta/commits"><img src="https://img.shields.io/github/commits-since/jaid/action-sync-node-meta/v2.0.0?style=flat-square&logo=github" alt="Commits since v2.0.0"/></a> <a href="https://github.com/jaid/action-sync-node-meta/commits"><img src="https://img.shields.io/github/last-commit/jaid/action-sync-node-meta?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/action-sync-node-meta/issues"><img src="https://img.shields.io/github/issues/jaid/action-sync-node-meta?style=flat-square&logo=github" alt="Issues"/></a>  

**GitHub Action that syncs package.json with the repository metadata.**


There are values that are meant to be the same. Why not automatically keep them synchronized?

![Banner](readme/banner.jpg)

### Example output

![Example output](readme/output.png)





## Example

### overwrite-file

Example workflow that runs whenever commits are pushed on branch `master`.  
This will overwrite the `package.json` file if it differs from the GitHub repository info.

This is the recommended syncing direction, because of the more simple setup (no need to manually add a secret to the repository settings) and the advantages of git commits (better monitoring, revertability).

`.github/workflows/example.yml`
```yaml
name: Sync package.json with repository info
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: actions/checkout
        uses: actions/checkout@v2.3.4
      - name: Jaid/action-sync-node-meta
        uses: jaid/action-sync-node-meta@v2.0.0
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
```

### overwrite-github

Example workflow that runs whenever commits are pushed on branch `master`.  
This will change the GitHub repository info whenever it differs from the content of `package.json`.

The secret `customGithubToken` is forwarded to the input `githubToken`. It has to be a [personal access token](https://github.com/settings/tokens) with scope "repo" added in [your repository's secrets settings](https://github.com/YOUR_NAME/YOUR_REPOSITORY/settings/secrets).

`.github/workflows/example2.yml`
```yaml
name: Sync repository info with package.json
on:
  push:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: actions/checkout
        uses: actions/checkout@v2.3.4
      - name: Jaid/action-sync-node-meta
        uses: jaid/action-sync-node-meta@v2.0.0
        with:
          direction: overwrite-github
          githubToken: ${{ secrets.customGithubToken }}
```

<details>
<summary>Detailed setup</summary>
Go to your account settings and then to “Developer settings”.

![Token setup: Step 1](readme/tokenSteps/01.png)

Go to “Personal access tokens”.

![Token setup: Step 2](readme/tokenSteps/02.png)

Click “Generate new token”.

![Token setup: Step 3](readme/tokenSteps/03.png)

Give it a good title, so you still know what your token does in one year. Add „repo“ permissions.

![Token setup: Step 4](readme/tokenSteps/04.png)

Copy the generated token.

![Token setup: Step 5](readme/tokenSteps/05.png)

Go to the repository that uses action-sync-node-meta. Go to “Settings”, “Secrets”.

![Token setup: Step 6](readme/tokenSteps/06.png)

Click “New repository secret”.

![Token setup: Step 7](readme/tokenSteps/07.png)

Add the secret token from your clipboard. Name the token “repoGithubToken” or anything you like.

![Token setup: Step 8](readme/tokenSteps/08.png)

Now pass the token to action-sync-node-meta in your workflow file.

```yaml
- name: Jaid/action-sync-node-meta
  uses: jaid/action-sync-node-meta@v2.0.0
  with:
    direction: overwrite-github
    githubToken: ${{ secrets.repoGithubToken }}
```

</details>








## Options



<table>
<tr>
<th></th>
<th></th>
<th>Default</th>
<th>Info</th>
</tr>
<tr>
<td>githubToken</td>
<td>*</td>
<td></td>
<td>Repository token for allowing the action to make commits or change the repository info. If direction is "overwrite-file", this input be set from forwarding secrets.GITHUB_TOKEN in the workflow file. If direction is "overwrite-github", a custom personal access token with "repo" scope has to be created.</td>
</tr>
<tr>
<td>approve</td>
<td></td>
<td>true</td>
<td>If true and direction is "overwrite-file", pull requests created by this action are automatically approved and merged.</td>
</tr>
<tr>
<td>branch</td>
<td></td>
<td>action-sync-node-meta</td>
<td>The name of the branch to make changes on (only for direction "overwrite-file"). Substring “{random}” will be replaced with randomized characters.</td>
</tr>
<tr>
<td>commitMessage</td>
<td></td>
<td>autofix: Updated package.json[{changes}]</td>
<td>Commit message for package.json changes (only for direction "overwrite-file"). Substring “{changes}” will be replaced with a list of changed package.json fields.</td>
</tr>
<tr>
<td>direction</td>
<td></td>
<td>overwrite-file</td>
<td>The syncing direction, can be "overwrite-file" or "overwrite-github". If "overwrite-file", the file package.json will be edited in a pull request according to the GitHub repository info. If "overwrite-github", the GitHub repository info will be changed according to the content of the package.json file.</td>
</tr>
<tr>
<td>jsonFinalNewline</td>
<td></td>
<td>true</td>
<td>If true and direction is "overwrite-file", the updated package.json will have a final newline.</td>
</tr>
<tr>
<td>removeBranch</td>
<td></td>
<td>true</td>
<td>If true and direction is "overwrite-file" and approve is also true, automatically merged pull requests will delete their branch afterwards.</td>
</tr>
<tr>
<td>syncDescription</td>
<td></td>
<td>true</td>
<td>If true, package.json[description] will be synced with GitHub repository description.</td>
</tr>
<tr>
<td>syncHomepage</td>
<td></td>
<td>true</td>
<td>If true, package.json[homepage] will be synced with GitHub repository homepage.</td>
</tr>
<tr>
<td>syncKeywords</td>
<td></td>
<td>true</td>
<td>If true, package.json[keywords] will be synced with GitHub repository topics.</td>
</tr>
</table>













## Development



Setting up:
```bash
git clone git@github.com:jaid/action-sync-node-meta.git
cd action-sync-node-meta
npm install
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/action-sync-node-meta/master/license.txt)  
Copyright © 2021, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)

<!---
Readme generated with tldw v7.0.0
https://github.com/Jaid/tldw
-->
