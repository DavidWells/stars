---
repo: robsheldon/bad-passwords-index
url: 'https://github.com/robsheldon/bad-passwords-index'
homepage: null
starredAt: '2015-10-19T02:26:49Z'
createdAt: '2015-09-16T17:22:15Z'
updatedAt: '2024-12-21T20:40:21Z'
language: PHP
license: Unlicense
branch: master
stars: 155
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:36.264Z'
description: Indexed file of common passwords from public database dumps
tags: []
---

## What this is

This is a compiled index of common passwords. It's intended for service providers that want to improve their users' passwords without relying on frustrating password requirements like, "6 to 16 characters, capital letter, lowercase letter, number, and symbol..."

The index contains roughly 163,000 unique passwords accounting for about 36% of combined database dumps of over 31 million passwords. For more background information, including a description of the approach used to generate the index, see [the writeup on my personal site](http://www.robsheldon.com/index-of-bad-passwords/). The index file is only 1MB and the most common passwords are sorted near the top of the file, so searching against it should be fast in most cases and not require much system memory.

The index file is generated by a program that packs many different common passwords into a small amount of disk space using substring matching and concatenation.


## How to use the bad password index

Convert your user's password to lowercase and do a simple string search against the index. No regular expressions are necessary. If there's a match, the user's password is too common. If there isn't a match, your user's password might still be common, but at least it won't be among the most common 161,000 passwords, so if you're storing your users' passwords with a strong hashing scheme (like you should be) then they should be a little better protected against attempts to brute force their password.

There are no fancypants libraries, frameworks, or nonsense required. Use your favorite language with the index, I don't care what it is. ...unless you like XML. If you like XML, I'm judging you.


## Sources

For the first version of this file, the only source was [a security researcher's dump of 10 million usernames and passwords](http://techcrunch.com/2015/02/10/a-security-researcher-just-dumped-10-million-real-passwords/).

I've added in passwords for public database leaks from Facebook, Runescape, Rockyou, Spotify, Yahoo, and a pile of other miscellaneous sources.


## Updates

I will infrequently update this index with passwords from new sources and as I improve the packing algorithm. I think I'm pretty close to having an optimal packing algorithm though; I can probably only get another percentage point or two of unique passwords stuffed into a 1MB file.

The last ten bytes of the index file are "//" followed by the date the file was generated in YYYYMMDD format. You can use 'tail -c 8 bad_passwords.txt' to get the date the file was generated.


## License

I am [Unlicensing](http://unlicense.org/) this file. You may use it or modify it for any purpose. I disclaim all copyrights for it. I do not require attribution or credit. Have fun, write code. See the UNLICENSE file for the nitty-gritty legalese.

I will eventually add the password packing program to this repository under the same license. I just need to clean up the code a little bit first, it's slightly yucky.


## Goals

This was the genesis of two things: Mark Burnett's 10 million password release, and my seething hatred of dumb password requirements on so many different sites.

When Mark released his dataset, it was uncertain whether or how it could be put to good use. A handful of people did some data visualization with it, but I wanted to find a way to use it to improve users' security. That was the first goal: put Mark Burnett's data to good use.

There are already plenty of wordlists and brute-forcing algorithms in the wild for cracking password hashes, so I'm not too worried about accidentally compromising more user accounts, but as a second goal, I wanted to create a tool that would only be useful to the service provider and completely useless for breaking password hashes.

Finally, as an extension of the first goal, I wanted this to be useful to as many different services as reasonably possible. That's why I didn't just generate a massive Bloom filter or come up with some other language-specific or architecture-specific approach. It's a big world, running on lots of different software architectures, developed by programmers of wildly varying skillsets. Most programmable architectures support some kind of basic string manipulation functions, and that's one of the first skills any software developer learns. This file can be used in brain-damaged DBMSs by rookie developers and it'll still be fast and reliable.

And if all this means that, one day, I don't need to add some particular character to the password randomly generated by my password manager ... well, that would be pretty great.


## The Indexer

As promised, indexer.php, the program used to generate the file, has been added to the repo.

It's a fairly straightforward, mostly well-commented, top-down pile of kludges in PHP. Pushing 31 million array elements down its gullet and then doing work on them has been an interesting case study in PHP performance work.

Warning: the program is chatty and will almost certainly completely fill your terminal's scrollback buffer.

### PHP?! Why in the name of Knuth...

I'm perpetually overbooked and I have to work on side projects [in tiny increments](http://www.robsheldon.com/30-minute-programming). I spend most of my day working with PHP, and doing a mental context-switch to another language to bang out a few minutes' work on a side project doesn't make much sense. There has to be a compelling reason to use a different language, and... there just isn't. PHP is perfectly serviceable and pretty darn fast besides. I don't *love* it, and there are a few comments in the code where I lost hours to some stupid PHP wart, but everything is warty and if it isn't then it's slow.

### There are no functions...

Yup. For small projects like this, I avoid over-building. Functions need a reason to exist, objects and class hierarchies and lambdas too. At the moment there's nothing to be gained from adding overhead to the indexer.

### Known issues

I'll add known issues to the issue tracker. There are a few. There's still some more performance to be squeezed out of it, and there's a sneaky bug somewhere in the substring matcher. It's okay for a first release though.
