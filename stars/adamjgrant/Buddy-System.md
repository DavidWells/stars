---
repo: adamjgrant/Buddy-System
url: 'https://github.com/adamjgrant/Buddy-System'
homepage: null
starredAt: '2025-05-05T17:35:27Z'
createdAt: '2014-01-09T21:18:26Z'
updatedAt: '2025-05-05T17:35:28Z'
language: HTML
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-10T22:30:18.515Z'
description: Avoids single words breaking onto the last line of text.
tags: []
---

# BuddySystem

#### [Demo](http://codepen.io/ajkochanowicz/pen/mKbtB)
#### [Demo (jQuery)](http://codepen.io/ajkochanowicz/pen/ezEmp)

Avoids single words breaking onto the last line of text.

# Usage

## Without jQuery

Use buddysystem.js and simply pass in an array of objects into ``buddySystem()``

    objs = document.getElementsByClassName('corrected')
    buddySystem(objs)
    
## With jQuery

Use buddysystem.jquery.js after jQuery and $.buddySystem() on any element or elements.

    $('.corrected').buddySystem()
    
# How it works

Because you don't need yet another library in your app to do something so simple, this code snippet has been golfed to be as small as possible.

BuddySystem looks for the last space in a phrase like this one

    The rain in Spain falls mainly on the plains
    
And replaces it with ``&nbsp;``, causing the last two words to be parsed as one...holding hands together, the buddy system.

    The rain in Spain falls mainly on the&nbsp;plains
    
Of course, because ``&nbsp;`` is unicode markup for a non-breaking space, the text will appear as:

"The rain in Spain falls mainly on<br> 
the plains"

If the line breaks after the last "the".
