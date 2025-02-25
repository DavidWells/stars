---
repo: deanc/wordpress-plugin-git-svn
url: 'https://github.com/deanc/wordpress-plugin-git-svn'
homepage: ''
starredAt: '2013-11-04T01:09:11Z'
createdAt: '2011-01-21T15:18:47Z'
updatedAt: '2024-10-17T20:04:31Z'
language: Shell
license: LGPL-2.1
branch: master
stars: 60
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:09.300Z'
description: Deploy a wordress plugin from within GIT to Wordpress.org's SVN repository
tags: []
---

1) Initialise your git repository using 'git init' in your wordpress plugin directory (e.g. /path/to/wordpress/wp-content/plugins/<plugin-name>/
2) Preferably create a project on github and push your project there.
3) Edit deploy.sh and fill in the necessary config values at the top of the file.
4) Run deploy.sh and follow the instructions to make a new release.

WARNING: this deployment script does everything. Once it's run your plugin will be updated on wordpress and pushed out to all your users. So make sure your code is ready and tested and that you have increase the version numbers in your files :)
