---
repo: bueltge/wordpress-admin-style
url: 'https://github.com/bueltge/wordpress-admin-style'
homepage: >-
  http://wpengineer.com/2226/new-plugin-to-style-your-plugin-on-wordpress-admin-with-default-styles/
starredAt: '2013-11-04T00:34:11Z'
createdAt: '2011-05-27T12:59:55Z'
updatedAt: '2025-01-23T12:41:48Z'
language: PHP
license: GPL-2.0
branch: master
stars: 965
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:09.979Z'
description: >-
  This plugin reference elements from wp-admin in an overview with the necessary
  markup and CSS classes to help you to develop WordPress compliant.
tags:
  - dashicons
  - design-patterns
  - genericons
  - layout
  - styleguide
  - wordpress
  - wordpress-mp6
---

# WordPress Admin Style
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbueltge%2Fwordpress-admin-style.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbueltge%2Fwordpress-admin-style?ref=badge_shield)
[![Latest Stable Version](https://poser.pugx.org/bueltge/wordpress-admin-style/v/stable)](https://packagist.org/packages/bueltge/wordpress-admin-style)

Shows the WordPress admin styles on one page to help you to develop WordPress compliant

 * List markup and examples for '2 Column Page Layout', Headers, Header Icons, Buttons, Tables, Admin Notices, 
Alternative Colours, Pagination, Form Elements, Form Helper Functions, Tabs, Default Admin Color Schemes
 * [WP Color Picker](https://make.wordpress.org/core/2012/11/30/new-color-picker-in-wp-3-5/)
 * Helper Classes
 * jQuery UI Examples
 * [Dashicons](https://developer.wordpress.org/resource/dashicons/)
 * [Genericons](http://genericons.com/)

## Description
WordPress is developing fast - this also applies to the design of the backend. 
So it is important not to use your own styles in the admin area and use tags and classes of WordPress. 
This is the best way you can simplify your work as a developer, and you don't have to test the design with every update. 
Unfortunately, there are quite extensive opportunities in the backend to implement the requirements. 
Several different classes and HTML structures are used. To be able to look up something this simple, 
I have developed this small plugin, which tinkers in the development environment and quickly represents the necessary elements. 

Also see the [post](https://wpengineer.com/2226/new-plugin-to-style-your-plugin-on-wordpress-admin-with-default-styles/) 
about the idea and also the comments for a discussion.

### Screenshots & history

![Part of the Admin Style information in WordPress version 5.7](./assets/screenshot-8.png)

The plugin is still active in usage and development since an early WordPress version, so you should see it on the screenshots from the different versions below.

 1. [Admin Style in WordPress 3.1](/assets/screenshot-1.png)
 2. [Admin Style in WordPress 3.4](/assets/screenshot-2.png)
 3. [Admin Style in WordPress 3.6-alpha](/assets/screenshot-3.png)
 4. [Admin Style in WordPress MP6 Design](/assets/screenshot-4.png)
 5. [Dashicons in WordPress MP6 Design](/assets/screenshot-5.png)
 6. [Genericons in WordPress 3.9-alpha](/assets/screenshot-6.png)
 7. [Admin Style in WordPress 5.3](/assets/screenshot-7.png)

## Installing
### Manual
 1. Download the plugin as a [ZIP file](https://github.com/bueltge/WordPress-Admin-Style/archive/master.zip) from GitHub.
 2. In your WordPress admin click *Plugin -> Add New -> Upload Plugin*.
 3. Upload the ZIP file.
 4. Activate the plugin.

### Via Composer
The plugin is available as [Composer package](https://packagist.org/packages/bueltge/wordpress-admin-style) and can be installed via Composer from the root of your WordPress installation.

`composer require bueltge/wordpress-admin-style`

If you have changed the default directory structure or just want the plugin to a specific location, you can create a project from the Composer package.

`composer create-project bueltge/wordpress-admin-style <optional-name>`

### Via Git
 1. Go to your Must Use folder `cd path`
 2. `git init .`
 3. `git remote add origin https://github.com/bueltge/wordpress-admin-style.git`
 4. `git fetch origin`
 5. `git checkout master`
 6. Check in the network plugin page, if it works

### Automatic Udates
The plugin supports the [GitHub Updater plugin](https://github.com/afragen/github-updater) for WordPress. The plugin 
enables automatic updates from this GitHub Repository. You will find all information about the how and why at the [plugin wiki page](https://github.com/afragen/github-updater/wiki).

## Other Notes
### Bugs, technical hints or contribute
Please give me feedback, contribute and file technical bugs on this 
[GitHub Repo](https://github.com/bueltge/WordPress-Admin-Style), use Issues.

### License
Good news, this plugin is free for everyone! Since it's released under the [GPLv2+](./LICENSE), 
You can use it free of charge on your personal or commercial blog. But if you enjoy this plugin, 
you can thank me and leave a 
[small donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6069955 "Paypal Donate link") 
for the time I've spent writing and supporting this plugin. 
And I really don't want to know how many hours of my life this plugin has already eaten ;)

### Contact & Feedback
The plugin is designed and developed by me ([Frank Bültge](https://bueltge.de))

Please let me know if you like the plugin, or you hate it or whatever ... 
Please fork it, add an issue for ideas and bugs.

### Disclaimer
I'm German, and my English might be gruesome here and there. 
So please be patient with me and let me know of typos or grammatical farts. Thanks
