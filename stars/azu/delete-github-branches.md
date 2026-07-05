---
repo: azu/delete-github-branches
url: 'https://github.com/azu/delete-github-branches'
homepage: ''
starredAt: '2021-11-21T22:26:02Z'
createdAt: '2020-03-02T09:47:11Z'
updatedAt: '2024-08-28T09:23:20Z'
language: TypeScript
license: MIT
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.680Z'
description: 'CLI: Delete GitHub Branches by pattern matching.'
tags:
  - api
  - branch
  - branches
  - delerte
  - github
---

# delete-github-branches

Delete GitHub Branches that match patterns.

## Features

- Can define `includesBranchPatterns`
- Can define `excludesBranchPatterns`
- If the branch has associated Pull Requests, Does not delete the branch
- Have `dryRun` mode

## Install

Install with [npm](https://www.npmjs.com/):

    npm install delete-github-branches

## Usage: CLI


    Usage
      $ delete-github-branches
 
    Options
      --owner Owner name for repository: **owner**/repo
      --repo  Repo name for repository: owner/**repo**
      --token GitHub Token. you can use als GITHUB_TOKEN env
      --includesBranchPatterns includes branch patterns split by comma. Default: "/^.*$/" (all)
      --excludesBranchPatterns excludes branch patterns split by comma. Default: "master,develop,dev,gh-pages"
      --stalledDays Deletable days after the branch is stalled. Default: 30
      --format Output formatter. Available: "markdown", "json". Default: "markdown"
      --baseUrl GitHub API base Url.
      --dryRun if this flag is on, run dry-run mode
      --config path to config file
 
    Examples
      $ delete-github-branches --owner azu --repo delete-github-branches-test --token <TOKEN>
      $ delete-github-branches --owner azu --repo delete-github-branches-test --token <TOKEN> --includesBranchPatterns "/feature\/.*/" --dryRun

Also this package includes helper cli tool.
`delete-github-branches-check-branch-name` just detect if the branch name is matched patterns.

    Usage
      $ delete-github-branches-check-branch-name [branchName]
 
    Options
      --includesBranchPatterns includes branch patterns split by comma. Default: "/^.*$/" (all)
      --excludesBranchPatterns excludes branch patterns split by comma. Default: "master,develop,dev,gh-pages"
      --config path to config file
 
    Examples
      $ delete-github-branches-check-branch-name "feature/009"
      $ echo $? # 0
      # It will be alive and exit code: 0
      $ delete-github-branches-check-branch-name "patch-101"
      $ echo $? # 1
      # It will be deleted and exit code: 1
    

### Config File

Config file is following JSON format.

All property is optional and its can be combined with command line flags.

```ts
{
    /**
     * Repository owner name
     */
    owner?: string;
    /**
     * Repository name
     */
    repo?: string;
    /**
     * allow list that match branch names
     * Match all branches without excludesBranchPatterns's default by default
     * It means that matches branches without ["master", "develop", "dev", "gh-pages"]
     *
     * You can use RegExp-like string for this list
     * https://github.com/textlint/regexp-string-matcher#regexp-like-string
     * Default: ["/^.*$/"]
     */
    includesBranchPatterns?: string[];
    /**
     * Deny list that match branch names
     * You can use RegExp-like string for this list
     * https://github.com/textlint/regexp-string-matcher#regexp-like-string
     * Default: ["master", "develop", "dev", "gh-pages"]
     */
    excludesBranchPatterns?: string[];
    /**
     * You can set deletable stalled days after the branch is last pushed
     * Delete branches that are stalled 30 days by default
     * if today >= lastPushedDate + 30, its deletable
     * Default: 30
     */
    stalledDays?: number;
    /**
     * Default: 'https://api.github.com'
     */
    baseUrl?: string;
    /**
     * GitHub Token
     */
    token?: string;
    /**
     * If `dryRun` is `true`, does not delete actually
     * Dry-run mode fetch and dump
     * Default: false
     */
    dryRun?: boolean;
}
```

For example, `delete-github-branches.json` is following config.

`delete-github-branches.json`:

```json
{
    "includesBranchPatterns":  ["/^.*$/"],
    "excludesBranchPatterns": ["master", "develop", "dev", "gh-pages", "/^feature\/.*$/"]
}
```

And you can pass other options as command line flags 

```shell script
$ GITHUB_TOKEN=$GH_TOKEN delete-github-branches --owner azu --repo delete-github-branches-test --config ./delete-github-branches.json
```

## Usage: Library

```ts
(async () => {
    const results = await deleteGitHubBranches({
        owner: "azu",
        repo: "delete-github-branches-test",
        excludesBranchPatterns: ["master", "develop", "/feature/.*/"],
        token: process.env.token!,
        dryRun: true // <= dry run mode
    });
    assert.deepStrictEqual(results, [
        { branchName: "develop", deleted: false, reason: "It is ignored by includes/excludes patterns" },
        { branchName: "feature/a", deleted: false, reason: "It is ignored by includes/excludes patterns" },
        { branchName: "feature/b", deleted: false, reason: "It is ignored by includes/excludes patterns" },
        { branchName: "master", deleted: false, reason: "It is ignored by includes/excludes patterns" },
        { branchName: "will-be-deleted", deleted: true }
    ]);
})()
```

## GitHub Actions

You can delete mismatch branch automatically using GitHub Actions.

- [azu/delete-github-branches-actions-demo: Demo: GitHub Actions + delete-github-branches](https://github.com/azu/delete-github-branches-actions-demo)
    - It is demo project

**Demo Features**

- Cron delete mismatch branches at 00:00 everyday
- If a PR is opend with mismatch branch, reply comment via bot

Create a config file for `delete-github-branches` and put it to `.github/delete-github-branches.json`.

```json
{
  "owner": "XXXXXXX",
  "repo": "XXXXXXXX",
  "excludesBranchPatterns": [
    "master",
    "develop",
    "gh-pages",
    "/^feature\/.*$/",
    "/^renovate\/.*$/"
  ],
  "stalledDays": 30
}
```

And create following GitHub Action yml and put it to `.github/workflows/delete-github-branches.yml`.
    
```yaml
name: delete-github-branches

on:
  pull_request:
    types: [opened]
  # At 00:00 everyday
  schedule:
    - cron: '0 0 * * *'

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  delete-branch:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: Setup Node ${{ matrix.node_version }}
        uses: actions/setup-node@v2
        with:
          node_version: 12.x
      - name: Run delete-github-branches
        run: |
          npm install -g delete-github-branches@1
          delete-github-branches --config ./.github/delete-github-branches.json
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  check-pull-request-branch:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: Setup Node ${{ matrix.node_version }}
        uses: actions/setup-node@v2
        with:
          node_version: 12.x
      - name: Check branch name
        id: check_branch_name
        shell: bash -x {0}
        run: |
          echo "GITHUB_BRANCH: ${BRANCH_NAME}"
          npm install -g delete-github-branches@1
          RESULT_DELETE_GITHUB_BRANCH=$(delete-github-branches-check-branch-name --config ./.github/delete-github-branches.json "${BRANCH_NAME}")
          RET=$?
          if [ "$RET" = "1" ]; then
              # multi-line issue https://github.community/t5/GitHub-Actions/set-output-Truncates-Multiline-Strings/td-p/37870
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//'%'/'%25'}"
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//$'\n'/'%0A'}"
              RESULT_DELETE_GITHUB_BRANCH="${RESULT_DELETE_GITHUB_BRANCH//$'\r'/'%0D'}"
              echo "::set-output name=message::${RESULT_DELETE_GITHUB_BRANCH}"
              echo "::set-output name=invalid_branch_name::true"
              echo "this branch name is invalid"
              exit 0
          fi
          echo "Good branch name"
          echo "${RESULT_DELETE_GITHUB_BRANCH}"
        env:
          BRANCH_NAME: ${{ github.event.pull_request.head.ref }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/github-script@0.8.0
        if: steps.check_branch_name.outputs.invalid_branch_name == 'true'
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            github.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `@${{ github.actor }} This branch name is mismatch branch naming rule.<br/><pre>${{steps.check_branch_name.outputs.message}}</pre>`
            })
```

## Changelog

See [Releases page](https://github.com/azu/delete-github-branches/releases).

## Running tests

Add `.env` with `token`

```
GITHUB_TOKEN=XXXX
```

Run tests

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/delete-github-branches/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
