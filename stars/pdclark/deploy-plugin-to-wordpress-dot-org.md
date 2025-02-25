---
repo: pdclark/deploy-plugin-to-wordpress-dot-org
url: 'https://github.com/pdclark/deploy-plugin-to-wordpress-dot-org'
homepage: null
starredAt: '2013-12-31T00:40:10Z'
createdAt: '2013-01-18T05:22:26Z'
updatedAt: '2024-11-01T07:36:58Z'
language: Shell
license: NA
branch: master
stars: 84
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:06.490Z'
description: Deploy a plugin managed in Git to the wordpress.org plugin repository.
tags: []
---

# Configuration

Edit these lines:

    # User config
    PLUGINSLUG="example-plugin"   # Slug on wordpress.org (from the plugin URL)
    MAINFILE="example-plugin.php" # Name of main php file in the WordPress plugin
    SVNUSER="username"            # SVN username on wordpress.org

# Usage

* Place deploy.sh at the top of your plugin's Git directory.
* Make it executable with `chmod 755 deploy.sh`.
* Run `./deploy.sh` to deploy master to wordpress.org.

# Ignoring Files

If you have files in your Git repository that you would not like to commit to the WordPress repo, find and edit these lines:

    # Add any large source files or other things to ignore here
    echo "Ignoring github specific files and deployment script"
    svn propset svn:ignore "deploy.sh
    README.md
    .git
    .gitignore" "$SVNPATH/trunk/"

# History

Original version: [Dean Clatworthy's deploy script](https://github.com/deanc/wordpress-plugin-git-svn).

[Forked by thenbrent](http://thereforei.am/2011/04/21/git-to-svn-automated-wordpress-plugin-deployment/), which removed the requirement for a local SVN repo.

[Forked by pdclark](https://github.com/pdclark/deploy-plugin-to-wordpress-dot-org) to allow trunk as stable tag, move config to one place, and share with others.
