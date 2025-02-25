---
repo: Automattic/cheeztest
url: 'https://github.com/Automattic/cheeztest'
homepage: ''
starredAt: '2013-11-04T01:27:25Z'
createdAt: '2012-02-09T15:31:02Z'
updatedAt: '2024-02-28T14:52:04Z'
language: PHP
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:09.164Z'
description: >-
  Adding some LOLs to your server-side WordPress A/B testing. Plays nice with
  Batcache.
tags:
  - wordpress
  - wordpress-plugin
  - wpvip-plugin
---

  ______   __                 ________           __     
 /      \ /  |               /        |         /  |    
/$$$$$$  |$$ |____   ________$$$$$$$$/_______  _$$ |_   
$$ |  $$/ $$      \ /        |  $$ | /       |/ $$   |  
$$ |      $$$$$$$  |$$$$$$$$/   $$ |/$$$$$$$/ $$$$$$/   
$$ |   __ $$ |  $$ |  /  $$/    $$ |$$      \   $$ | __ 
$$ \__/  |$$ |  $$ | /$$$$/__   $$ | $$$$$$  |  $$ |/  |
$$    $$/ $$ |  $$ |/$$      |  $$ |/     $$/   $$  $$/ 
 $$$$$$/  $$/   $$/ $$$$$$$$/   $$/ $$$$$$$/     $$$$/  

CheezTest lets you create and run Batcache-compatible server-side A/B tests in your theme.

A joint LOL by the fine folks I Can Has Cheezburger (http://www.cheezburger.com) and Automattic (http://automattic.com)

Main class from which all A/B tests are inherited. Enables fast setup
of A/B tests - upon initialization, the basic order of execution is:
set test name > check if user is qualified to participate > check
if user has been assigned a segment, and assign if not > assign user
to group > execute 'action' callback if present.

User's qualification, segment, and group tests are done in batcache
so as to ensure correct cache variants are served.

User's segment is assigned server-side via magic. Mutliple test
segments are assigned at once - so if a user is qualified to participate
in more than one test, all segments are assigned at the same time. When
segments need to be set, a small javascript is injected into the <head>
via a call to CheezTest::write_segment_cookie(). This javascript
sets a cookie to retain the segment assigned earlier.

Test case data (name, is_qualified, & group) are stored in the $active_tests
static hash and made accessible via the 'is_qualified_for', 'get_group_for', and
'is_in_group' static methods. This enables theme branching via:

if ( CheezTest::is_qualified_for( 'my-example-test' ) {
    //test-specific stuff goes here
}

- or -

if ( CheezTest::is_in_group( 'my-example-test', 'my-example-group' ) ) {
   //group-specific stuff goes here
}

The plugin makes use of Batcache’s support for vary_cache_on_function, which saves page variants in a page’s cache and then evaluates which one to serve when the page loads.

IMPORTANT: Since the tests run before Batcache, which in turn runs very early (before theme code is included), only built-in PHP functions and jetpack_is_mobile() can be used when defining tests. Any theme-specific functions will not be available.
