---
repo: TylerBarnes/wordsby-admin
url: 'https://github.com/TylerBarnes/wordsby-admin'
homepage: ''
starredAt: '2018-12-16T07:22:44Z'
createdAt: '2018-10-09T23:58:15Z'
updatedAt: '2024-03-05T09:05:23Z'
language: PHP
license: NA
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:53.254Z'
description: A WordPress Admin theme for Gatsby sites.
tags: []
---

__NOTE: I've joined the Gatsby open source team to work on Gatsby and WordPress. For that reason this package will no longer be maintained. Watch out for good things coming to the Gatsby/WordPress world!__

# Wordsby Admin (WIP)

A WordPress theme to make Gatsby development and content creation in WordPress easier.
Features include a template hierarchy, usage of the WP permalink structure in gatsby, instant page previews and much more.
Instead of using `gatsby-source-wordpress`, this theme commits images and data directly to your git repo (Github and Gitlab are supported). This means your 5,000 page site can run on $2 shared hosting and get the performance of a finely tuned VPS.
It also means running  `gatsby develop` on large WP sites doesn't require repeatedly downloading your entire media library.

This theme is intended to be used with Gatsby plugin [Wordsby](https://github.com/TylerBarnes/wordsby).

Check out the [Wordsby readme](https://github.com/TylerBarnes/wordsby) for more info.

## Installation

1. Download this repo as a zip
2. Upload it to your WP install and activate it as a theme
3. [Connect your install to Github or Gitlab](#githubgitlab-connection)
4. [Follow the setup instructions for Wordsby](https://github.com/TylerBarnes/wordsby#set-up)

## Github/Gitlab connection

In `wp-config.php`, add any of the following applicable lines.
```php
// for Gitlab
// https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#doc-nav
define('WORDLIFY_GITLAB_API_TOKEN', 'your-api-token'); 
define('WORDLIFY_GITLAB_PROJECT_ID', 'your-project-id');

// for Github
// https://github.com/settings/tokens
define('WORDLIFY_GITHUB_API_TOKEN', 'your-api-token'); 
define('WORDLIFY_GITHUB_OWNER', 'your-github-username');
define('WORDLIFY_GITHUB_REPO', 'your-repo-name');

// for both
define('WORDLIFY_GIT_HOST', 'github'); // or "gitlab"
define('WORDLIFY_BRANCH', 'master'); // pick the main branch.
```

When you upload media files, they'll be commited to a temporary branch. Once you save a post or page, the branch will be automatically merged into your main branch. This prevents your CI pipeline from building your gatsby site every time you upload a media file.

## Screenshots
![Wordsby Admin dashboard screenshot](/screenshots/home.png?raw=true)
![Wordsby Admin page edit screenshot](/screenshots/page.png?raw=true)
