---
repo: andreasgal/PhoneNumber.js
url: 'https://github.com/andreasgal/PhoneNumber.js'
homepage: null
starredAt: '2015-03-13T16:43:48Z'
createdAt: '2012-10-26T01:34:11Z'
updatedAt: '2023-09-12T11:26:32Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 141
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.404Z'
description: phonenumber.js is a JavaScript library to verify and format phone numbers
tags: []
---

# PhoneNumber.js


PhoneNumber.js is a JavaScript library to verify and format phone numbers.
It is similar in purpose to Google's libphonenumber library, with the main difference
that Google's code is some incredibly ugly spaghetti code that was cross-compiled
from Java and uses around 10MB of memory.

The memory use of PhoneNumber.js starts around 60k and increases as region meta data
is unpacked. Depending on the memory layout of the specific JavaScript engine, peak
memory use should be below 200k. If you mostly format numbers from one or a few
regions, memory use should be pretty close to 60k.

PhoneNumber.js uses libphonenumber's PhoneNumberMetadata.xml database of known
phone number formats. Use "make" to download the xml file and translate it
into PhoneNumber.js's internal format.

# Copyright and license

PhoneNumber.js was written by Andreas Gal <gal@mozilla.com> as part of Mozilla's
Firefox OS (Boot to Gecko) project and is licensed under the Apache License, Version 2.0.


