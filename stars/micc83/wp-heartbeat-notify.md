---
repo: micc83/wp-heartbeat-notify
url: 'https://github.com/micc83/wp-heartbeat-notify'
homepage: null
starredAt: '2013-11-04T01:27:49Z'
createdAt: '2013-06-20T07:18:50Z'
updatedAt: '2024-04-12T03:15:31Z'
language: PHP
license: NA
branch: master
stars: 51
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:09.077Z'
description: >-
  Based on WordPress 3.6 heartbeat API, Wp Hearbeat Notify, display a realtime
  custom message to your visitor each time a new post is published with a link
  redirecting to it. Still in beta version, this plugin has been full tested
  only on WordPress 3.6-beta3.
tags: []
---

# wp-heartbeat-notify

#### WordPress realtime new post notifications based on heartbeat API

Based on **WordPress 3.6 heartbeat API**, Wp Heartbeat Notify, display a realtime custom message to your visitor each time a new post is published with a link redirecting to it. Still in beta version, this plugin has been **full tested only on WordPress 3.6-beta3**.

![wp-heartbeat-notify screenshot](https://github.com/micc83/wp-heartbeat-notify/raw/master/wp-heartbeat-notify/screenshot-1.jpg)

## Install

Just upload `wp-heartbeat-notify` to your WordPress `wp-content/plugin/` folder. Go to *Plugins->Installed plugins* WordPress menu and activate it. That's it... You just have to write a new article to see it in action (Clearly, the notification will not be displayed to the user who created the event. So, for the purposes of testing, I suggest you open another browser where you're not logged in).

## Purpose

This is probably the first, or at least one of the first WordPress plugin that makes use of the Heartbeat API. Its purpose is almost purely didactic and I hope that the solution that I have implemented it can be useful for developing new ideas.

The plugin, however, is fully functional and can increase the functionality with a few lines of code, as described below.

## Under the hood

The functioning of the plugin is quite simple.

* All scripts and styles necessary for the functioning of heartbeat are queued
* To generate a notification you hook onto an action or a filter of WordPress and you create a transient that match the length of the heartbeat rate
* wp-heartbeat-notify, every few seconds, check the presence of transient and output the content as a notification

Easy... Isn't it?

## Add new notice

To add a new notice, as stated before, you just have to hook into an action or filter and run `Wp_Heartbeat_Notify::notify( $args )` as in the following example:

### Add a notice on registered users comments 

```php

// Let's hook into Comment publication
add_filter ( 'comment_post', 'notify_new_comment' );
function notify_new_comment( $comment_id ) {
  
  // Retrieve the comment
  $comment = get_comment( $comment_id );

  // Check if the user is registered
  if ( ! $comment->user_id > 0 )
		return;
  
  // Get the comment link
  $comment_link = get_comment_link( $comment_id ); 

  // Here's the magic
	Wp_Heartbeat_Notify::notify( array(
		'title'		=>		'New Comment by ' . $comment->comment_author,
		'content'	=>	 	'There\'s a new comment, why don\'t you <a href="' . $comment_link . '">give it</a> a look?',
		'type'		=>		'info'
	) );
	
}
```

## Support and contacts

If you need support you can find me on [twitter](https://twitter.com/Micc1983) or comment on the dedicated page on my [website](http://codeb.it/).
