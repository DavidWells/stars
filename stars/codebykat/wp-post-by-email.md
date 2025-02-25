---
repo: codebykat/wp-post-by-email
url: 'https://github.com/codebykat/wp-post-by-email'
homepage: null
starredAt: '2013-11-04T03:26:25Z'
createdAt: '2013-07-06T05:44:59Z'
updatedAt: '2024-06-27T20:29:46Z'
language: PHP
license: GPL-2.0
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:08.855Z'
description: Post By Email plugin for WordPress
tags: []
---

# Post By Email #
**Contributors:** codebykat, flyingtrolleycars, barryceelen, UaMV, nikolovtmw  
**Tags:** post-by-email, email  
**Requires at least:** 3.6  
**Tested up to:** 4.2  
**Stable tag:** 1.1  
**License:** GPLv2 or later  
**License URI:** http://www.gnu.org/licenses/gpl-2.0.html  

Create new posts on your WordPress blog by sending email to a specific email address.

## Description ##

Any new messages sent to the configured email address will be posted to the blog.  This plugin replaces the functionality that used to live in WordPress core.

Once an email has been successfully posted to the blog, it can either be marked as read (IMAP servers only) or deleted from the mailbox.


### Features ###

* Supports IMAP or POP3 servers, with or without SSL
* Optional PIN-based authentication guards against email spoofing
* Uses WordPress's built-in roles to manage which users can post
* Set categories, tags, custom taxonomies and post format by including shortcodes in your email
* Email attachments will automatically be added to the post's gallery
* Emails from unauthorized users can be either set as pending or discarded
* Enable an auto-responder to report success or failure of post

### Post Authors and Security ###

The "From" address is matched to WordPress users in the database to determine the post's author.  If the author doesn't have an account or isn't allowed to publish posts, the post status will be set to "pending".

By default, any users in the Author, Editor or Administrator roles are able to publish posts.  Use the Users menu item in the admin dashboard to view and manage which users have this capability.  For more information on the WordPress permissions system, see <a href="http://codex.wordpress.org/Roles_and_Capabilities">Codex: Roles and Capabilities</a>.

### Shortcodes ###

By default, emailed posts will be placed in the default category configured in the settings.

You can also set the categories, tags, custom taxonomy terms and post format on your posts by including shortcodes in your email.  These should be space-separated.  Use slugs for tags (and non-hierarchical taxonomies) and either slugs or IDs for categories (/ hierarchical taxonomies).  Terms that do not yet exist will be created.  Examples:

**Categories:** Use either slugs or IDs.
`[category posted-by-email another-category]`
`[category 14]`

**Tags:** Use slugs.
`[tag cool-stuff]`

**Custom Taxonomies:** Use slugs for non-hierarchical taxonomies, and IDs for hierarchical.
`[custom-taxonomy-name thing1 thing2]`
`[another-custom-taxonomy 2 3 5]`

**Post Format:** Supported formats: aside, audio, chat, gallery, image, link, quote, status, video.
`[post-format format]`


### Attachments ###

Any files attached to an email will be uploaded to the Media Library and added to the post as a gallery.  You can specify gallery options, or its location within the post, by including a <a href="http://codex.wordpress.org/Gallery_Shortcode">gallery shortcode</a> in your email.  If no gallery shortcode exists, it will be added to the end of the post.


## Installation ##

1. See [Installing Plugins](http://codex.wordpress.org/Managing_Plugins#Installing_Plugins).
1. Set up an email address that will be used specifically to receive messages for your blog.
1. Make sure your email service is configured to allow external connections via POP3 or IMAP.
1. Activate the plugin through the 'Plugins' menu.
1. Configure mailbox information under Tools->Post By Email.

### Instructions for specific email services ###

- Gmail: <a href="https://support.google.com/mail/troubleshooter/1668960?hl=en">This page</a> will walk you through enabling IMAP or POP3 access.  When prompted to select an email client for configuration instructions, select "Other" to view the settings.

- Yahoo! Mail: Use these <a href="http://help.yahoo.com/kb/index?page=content&id=SLN4075">IMAP settings</a>; IMAP access should be enabled by default.  Mail Plus subscribers can also use these <a href="http://help.yahoo.com/kb/index?locale=en_US&y=PROD_MAIL_ML&page=content&id=SLN4724">POP3 settings</a>.

- Outlook.com (Hotmail) settings and instructions can be found on <a href="http://windows.microsoft.com/en-ca/windows/outlook/send-receive-from-app">this page</a>.


## Frequently Asked Questions ##

### What timestamp will be used for posts? ###
Posts will be backdated to use the date and time they were received by the mailserver, NOT the time they were imported by the plugin.

### Will messages show up on my blog as soon as I send them? ###
No, emails are not "forwarded" to your blog.  Just like any third-party mail client, Post By Email has to check for new messages, and will only do this once per hour (or when you click the "Check Now" button in the settings).  In addition, because of how WordPress' task scheduling (wp_cron) works, this check will only be triggered when a page on your blog has been loaded.  There is also sometimes a delay between when messages are sent and when they show up in the mailbox, especially with POP3 access.

### I found a bug! ###
Please report it so I can track it down and squish it! For the information to include with a bug report, see the Reporting Bugs section in <a href="http://wordpress.org/plugins/post-by-email/other_notes/">Other Notes</a>.

### What does the error "Bad tagged response" mean? ###
This probably means you're trying to connect to a POP3 server over the IMAP port, or vice versa.  Double-check your server URL, protocol and port number and try again.


## Screenshots ##

###1. Main settings page###
![Main settings page](https://ps.w.org/post-by-email/assets/screenshot-1.png)

###2. The activity log###
![The activity log](https://ps.w.org/post-by-email/assets/screenshot-2.png)



## Testing ##

### Automated Tests ###

Like WordPress Core, this plugin includes automated unit tests written in PHPUnit.

[![Build Status](https://travis-ci.org/codebykat/wp-post-by-email.svg?branch=master)](https://travis-ci.org/codebykat/wp-post-by-email)

To run the unit tests:

1. Set up the WordPress testing library: `bash install-wp-tests.sh wordpress_test root '' localhost latest`
1. Install [composer](https://getcomposer.org/): `curl -sS https://getcomposer.org/installer | php`
1. Install testing library: `php composer.phar install`
1. From the plugin directory, run `WP_TESTS_DIR=/path/to/WordPress/test/install phpunit`

### Manual Testing ###

1. Set up a test email address (services such as Gmail work great for this) and enable IMAP or POP3 access.  (Refer to <a href="http://wordpress.org/plugins/post-by-email/installation/">Installation</a> for detailed instructions.)
1. Verify that you are using the correct mailbox settings by using a third-party email client, such as Outlook or OSX Mail.app, to connect to your test mailbox.
1. Enter those settings into the Post By Email settings and save them.
1. Navigate to the "Activity Log" tab and press the "Check Now" button.  When the page reloads, you should see a new entry in the log file describing the results of the mail check.

**Caveat:** There is sometimes a delay between sending an email and having it show up in the mailbox, especially with POP3.  If you're using IMAP, you can connect using a third-party mail client to verify that messages have been received, then mark them as unread so Post By Email will pick them up.


## Reporting Bugs ##

Before reporting a bug, make sure you've updated the plugin to the latest version.

Then, provide as much of the following information as possible:

1. WordPress version (e.g. 4.1.x).
1. Plugin version (e.g. 1.0.4).
1. PHP version (e.g. 5.3.x).
1. Your mailbox settings (URL, protocol, port and whether SSL is enabled; not your login and password).
1. Any error messages displayed (it might help to <a href="http://codex.wordpress.org/WP_DEBUG">enable WP_DEBUG</a> in your wp-config.php).
1. If the issue is related to a specific email, the full email, including headers.  Feel free to replace any personal information with dummy text (such as "sender@example.com").  <a href="https://support.google.com/groups/answer/75960?hl=en">This link</a> has instructions for viewing full message headers in Gmail, Outlook and Yahoo.


## Contributing ##

Help with development, support and testing is always welcome!  See the <a href="https://github.com/codebykat/wp-post-by-email/blob/master/CONTRIBUTING.md">Contributing guidelines</a> for more info.


## Changelog ##

### 1.1 (in development) ###
* Abstracted mailserver functionality into a subclass, and added a Horde instance of the mailserver class.
* Fixed a bug where the last checked time was not getting properly set.
* Set a featured image when an image is included in the email. Props <a href="https://github.com/nikolov-tmw">Nikola Nikolov</a>
* Import inline images and use wp_handle_sideload() for image importing. Props <a href="https://github.com/nikolov-tmw">Nikola Nikolov</a>
* Spanish and Serbian translations! Props Ogi Djuraskovic of firstsiteguide.com.

### 1.0.5 ###
* Added auto-responder setting that will reply to the originating email address with a success or failure message. Props <a href="https://github.com/UaMV">Joshua Vandercar</a>
* Added support for defining the post format via a shortcode. Props <a href="https://github.com/barryceelen">Barry Ceelen</a>
* Added Settings action link to the plugins page. Props <a href="https://github.com/barryceelen">Barry Ceelen</a>
* Added option to choose drafts when receiving from a registered email. Props <a href="https://github.com/infamouse">Andrew Jacobs</a>
* Make attachment filenames unique. Props <a href="https://github.com/richbrat">Richard Brattlund</a>
* Properly set attachment filetypes to "inherit". Props <a href="https://github.com/richbrat">Richard Brattlund</a>

### 1.0.4b ###
* Fixed bug where unicode characters weren't getting encoded correctly, and were truncating the post.
* Fixed bug where changing some settings on the admin screen didn't enable the "Save Changes" button.

### 1.0.4 ###
* Added screenshots, expanded Readme and contextual help.
* Added support for user-included gallery shortcode (allows use of WP's gallery options).
* Added warning when checking email before changed settings have been saved.
* Added more unit tests.
* Code style fixes as per http://gsoc.trac.wordpress.org/ticket/377
* Fixed https://github.com/codebykat/wp-post-by-email/issues/3

### 1.0.3 ###
* Added option to choose what to do when message senders don't match WP users (discard or set to pending).
* Added shortcode support for custom taxonomy terms.
* Added support for attachments.
* Fixed some bugs in PHP 5.2.
* Fixed bugs with the admin notices and default options.
* Switched manual check to a trigger for do_action and disabled wp-mail.php entirely.

### 1.0.2 ###
* Support shortcodes to specify categories and tags.
* Added PIN-based authentication.

### 1.0.1 ###
* Added tabs and additional options to options panel.
* Admin banners for notices & errors.
* Plugin is now disabled until user has configured the settings.

### 1.0.0 ###
* Added SSL and IMAP support.
* Added option to mark emails "read" instead of deleting them after processing.
* Added support for HTML formatted emails.
* Refactored check_email function.
* Fixed a bug that caused the log file to behave inconsistently.

### 0.9.9 ###
* Better logging, no more wp_die().
* When email is checked manually, reschedule the next wp_cron check to an hour later.

### 0.9.8 ###
* Use wp_cron to schedule hourly mail checks.

### 0.9.7 ###
* Refactored Horde includes to autoload class files as needed.

### 0.9.6 ###
* Added workarounds to support PHP 5.2.
* Moved admin functions into a separate class.

### 0.9.5 ###
* Using Horde IMAP library instead of old SquirrelMail class (still assumes POP3 server).  This fixes a bug where post content was blank, and also lays some groundwork for later SSL/IMAP support.

### 0.9 ###
* Initial version (straight port from core)
