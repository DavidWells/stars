---
repo: security-alert/security-alert
url: 'https://github.com/security-alert/security-alert'
homepage: ''
starredAt: '2021-11-21T22:56:07Z'
createdAt: '2019-06-25T09:02:19Z'
updatedAt: '2025-02-11T09:36:20Z'
language: TypeScript
license: MIT
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.481Z'
description: '[GitHub] A Command Line ToolKit for GitHub Security Alert.'
tags:
  - alert
  - cli
  - github
  - issue
  - security
---

# @security-alert monorepo [![Actions Status: test](https://github.com/security-alert/security-alert/workflows/test/badge.svg)](https://github.com/security-alert/security-alert/actions?query=workflow%3A"test")

A Command Line ToolKit for GitHub Security Alert.

## Tools

- [@security-alert/create-issue](packages/create-issue)
    - Create an issue form GitHub Security Alert URL
- [@security-alert/list-alerts](packages/list-alerts)
    - Show list of GitHub Security Alerts.

### SARIF to GitHub Issue/Comment

These tools aim to integration [CodeQL](https://securitylab.github.com/tools/codeql) and GitHub.
[CodeQL](https://securitylab.github.com/tools/codeql) output the scanned results as [SARIF format](https://help.semmle.com/codeql/codeql-cli/reference/sarif-overview.html).

- [@security-alert/sarif-to-issue](packages/sarif-to-issue)
    - Create an issue form SARIF file
- [@security-alert/sarif-to-comment](packages/sarif-to-comment)
    - Comment to issue from SARIF file
- [@security-alert/sarif-to-markdown](packages/sarif-to-markdown)
    - Convert SARIF to Markdown format
    - Good work with GitHub's CodeQL results

## Changelog

See [Releases page](https://github.com/security-alert/create-security-alert-issue/releases).

## Development

    yarn install
    yarn run build
    yarn test
    
## Release Workflow

1. Create Release PR via dispatching [.github/workflows/create-release-pr.yml](https://github.com/security-alert/security-alert/actions/workflows/create-release-pr.yml)
  - You can select new version with semver(patch,minor,major)
2. [CI] Create Release PR
  - Update `lerna.json`'s `version` and `packages/*/package.json`'s `version`
  - Fill the Pull Request body with [Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
  - e.g. https://github.com/azu/monorepo-github-releases/pull/18
3. Review Release PR
  - You can modify PR body
4. Merge Release PR
5. [CI] Publish new version to npm and GitHub Release
  - The release note content is same to PR body
  - CI copy to release note from PR body when merge the PR
  - e.g. https://github.com/azu/monorepo-github-releases/releases/tag/v1.6.3

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/security-alert/create-security-alert-issue/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

When fail the release, please run workflow on [release.yml](https://github.com/security-alert/security-alert/actions/workflows/release.yml) again.

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
