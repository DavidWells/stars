---
repo: azu/github-sponsor-report
url: 'https://github.com/azu/github-sponsor-report'
homepage: null
starredAt: '2021-11-21T21:07:27Z'
createdAt: '2021-09-05T08:33:10Z'
updatedAt: '2024-12-30T12:08:22Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.971Z'
description: GitHub Sponsors report generator
tags: []
---

# github-sponsor-report

Make your GitHub Sponsors report page.

## Screenshot

An example view of [GitHub Sponsor Report](https://github.com/azu/github-sponsor-report-template).

<img width="624" alt="Example of GitHub Sponsor Report" src="https://user-images.githubusercontent.com/19714/154877959-41f114d3-15c1-4e53-b80e-775395ceb417.png">

## Usage

1. [Create a report repository using this Template](https://github.com/azu/github-sponsor-report-template/generate)
    - Recommend: create a repository as `private`
    - :warning: Some data includes private data
2. Set `PERSONAL_GITHUB_TOKEN` to your repo's secrets
    - [New personal access token](https://github.com/settings/tokens/new) → select `read:org` and `user` permission
    - <https://github.com/{yourname}/{repo}/settings/secrets/actions>
3. Update data manually
    1. Go to <https://github.com/{yourname}/{repo}/actions/workflows/update-data.yml>
    2. Run workflow

After the setup, update data every hour by GitHub Actions.

## Options

- `GITHUB_TOKEN`: GitHub Token which has `user` and `read:org` permission
- `GENERATE_ONLY_IMAGE`: only generate image without snapshots data
  - If you want to make your report repository public, recommend to `GENERATE_ONLY_IMAGE=true`
- `PROJECT_ROOT_DIR`: project root directory
- `OWNER_NAME`: You GitHub account id.

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/sponspor-report/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
