---
repo: andrefarzat/js-i18n
url: 'https://github.com/andrefarzat/js-i18n'
homepage: null
starredAt: '2017-10-15T00:45:40Z'
createdAt: '2012-09-14T01:41:21Z'
updatedAt: '2018-09-25T02:30:07Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:38.901Z'
description: javascript i18n library
tags: []
---

i18n javascript library
=======================

Developed to use the gettext's pattern function _ to make ease the po file generation by [xgettext](http://www.linuxcommand.org/man_pages/xgettext1.html).


Usage
-----

Use the i18n function to register all translated texts in the main dictionary: 
  
    i18n({
        'key' : 'value',
        'text_key' : 'text in one language',
        ...
    });


To get the translated text, use _ function:

    document.getElementById('edit-link').innerHTML = _('Edit something');

Pluralize
---------

A helper to get the right text in quantities issues. Ex:

	var qty = document.querySelectorAll('#client-list li').length;

    var txt = pluralize({
    	'0' : _('The client list is empty'),
    	'1' : _('We only have one client'),
    	'2' : _('We have two clients'),
    	'7' : _('Seven! We have seven clients!'),
    	'other' : _('WoW! We have %d clients!')
    }, qty);


The first parameter is an object which can contain:

* An specific number (e.g.: '0', '1', '2', etc)
* The string 'one'. Alias for '1'.
* The string 'other'. The default choice.

obs: The first parameter must have the '0' and the 'other' properties.

The wildcard '%d' is defined in i18n.wildcard property.
