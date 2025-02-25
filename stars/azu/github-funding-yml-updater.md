---
repo: azu/github-funding-yml-updater
url: 'https://github.com/azu/github-funding-yml-updater'
homepage: ''
starredAt: '2021-11-21T22:20:52Z'
createdAt: '2019-10-26T15:08:18Z'
updatedAt: '2025-01-31T19:55:59Z'
language: TypeScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.745Z'
description: Update multiple repositories's `.github/FUNDING.yml` via GitHub API
tags:
  - api
  - cli
  - funding
  - github
  - update
---

# github-funding-yml-updater [![Build Status](https://travis-ci.org/azu/github-funding-yml-updater.svg?branch=master)](https://travis-ci.org/azu/github-funding-yml-updater)

Update multiple repositories's `.github/FUNDING.yml` at once via GitHub API.

It will help you to setup GitHub Sponsors for your repository.

## Features

- Setup `.github/FUNDING.yml` for GitHub Sponsors
- No need to clone git repository in local
    - This tools using GitHub API

## Install

Install with [npm](https://www.npmjs.com/):

    npm install github-funding-yml-updater -g
    # or
    npx -p github-funding-yml-updater github-funding-yml-updater [opions]

## Usage

	Usage
	  $ github-funding-yml-updater [options]

	Options
	  --mode "add", "delete", or "overwrite"
	    --mode "add" and --mode "delete" require --user argument
	    --mode "overwrite" require --funding-file argument
	  --user GitHub account name
	  --list-file input list file path. list file includes line-separated repository list for updating
	  --funding-file input FUNDING.yml file path. It is for --mode overwrite
	  --write update GitHub repository if set it. Default: dry-run(no update)
	  --token GitHub Token(or env GITHUB_TOKEN=xxx)

	Examples
	  # Dry-run by default
	  $ github-funding-yml-updater --mode add --user azu --list-file list.txt --token XXXX
	  # Add user to Repository
	  $ github-funding-yml-updater --mode add --user azu --list-file list.txt --token XXXX --write
      # Delete user from Repository
	  $ github-funding-yml-updater --mode delete --user azu --list-file list.txt --token XXXX --write
	  # Overwrite using existing FUNDING.yml
      $ github-funding-yml-updater --mode overwrite --funding-file ./FUNDING.yml --list-file list.txt --token XXXX --write

You should get GitHub Token(has `repo` permission) from next url.

- <https://github.com/settings/tokens/new?description=github-funding-yml-updater&scopes=repo>

### `--write`

`github-funding-yml-updater` dry-run by default.

If you want to update actual repository, you should run it `--write` options. 

### `--mode`

- `add`: add `--user` to repositories
- `delete`: delete `--user` from repositories
- `overwrite`: overwrite by `--funding-file`

### `--list-file`

`--list-file` specify text file that is following format:

```
owner/repo
owner/repo@branch
https://github.com/owner/repo
```

Example of `list.txt`:

```
azu/example1@develop
azu/example2
example/example
```

:memo: Tips

`curl` + [jq](https://stedolan.github.io/jq/) can generate your repositories.

```
export GH_USER="azu"
curl -s "https://api.github.com/search/repositories?q=user:${GH_USER}&&per_page=100" | jq ".items[].full_name" > list.txt
```

## Examples

Add `gh-user` to each repositories:

```shell-session
github-funding-yml-updater --mode add --user gh-user --list-file list.txt --token $GITHUB_TOKEN --write
```

Remove `gh-user` from each repositories:

```shell-session
github-funding-yml-updater --mode delete --user gh-user --list-file list.txt --token $GITHUB_TOKEN --write
```

Overwrite `.github/FUNDING.yml` with a `file.yml`:

```shell-session
github-funding-yml-updater --mode overwrite --funding-file file.yml --list-file list.txt --token $GITHUB_TOKEN --write
```

## Notice :warning:

Currently, only put `.github/FUNDING.yml` and does not show sponsor button.

You should turn on **Sponsorships** on your GitHub repository's settings:

![Sponsorship check](https://user-images.githubusercontent.com/19714/67622206-159b8b00-f853-11e9-8589-081132fb6e14.png)

- [Displaying a sponsor button in your repository - GitHub Help](https://help.github.com/en/github/building-a-strong-community/displaying-a-sponsor-button-in-your-repository#displaying-a-sponsor-button-in-your-repository)

This tools includes helper tool that show settings url from list file.

```shell
npm install github-funding-yml-updater -g
github-funding-yml-settings --list-file list.txt
```

Or

```
npx -p github-funding-yml-updater github-funding-yml-settings --list-file list.txt
```

This tools output setting links from `list.txt`.

```
https://github.com/azu/example1/settings#repository-funding-links-feature
https://github.com/azu/example2/settings#repository-funding-links-feature
```

## References

- [Displaying a sponsor button in your repository - GitHub Help](https://help.github.com/en/github/building-a-strong-community/displaying-a-sponsor-button-in-your-repository)

## Changelog

See [Releases page](https://github.com/azu/github-funding-yml-updater/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/github-funding-yml-updater/issues).

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
