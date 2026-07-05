---
repo: antirez/smaz
url: 'https://github.com/antirez/smaz'
homepage: ''
starredAt: '2022-11-29T19:20:36Z'
createdAt: '2009-03-31T11:58:47Z'
updatedAt: '2025-02-23T12:18:48Z'
language: C
license: BSD-3-Clause
branch: master
stars: 1178
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:06.315Z'
description: Small strings compression library
tags: []
---

SMAZ - compression for very small strings
-----------------------------------------

Smaz is a simple compression library suitable for compressing very short
strings. General purpose compression libraries will build the state needed
for compressing data dynamically, in order to be able to compress every kind
of data. This is a very good idea, but not for a specific problem: compressing
small strings will not work.

Smaz instead is not good for compressing general purpose data, but can compress
text by 40-50% in the average case (works better with English), and is able to
perform a bit of compression for HTML and urls as well. The important point is
that Smaz is able to compress even strings of two or three bytes!

For example the string "the" is compressed into a single byte.

To compare this with other libraries, think that like zlib will usually not be able to compress text shorter than 100 bytes.

COMPRESSION EXAMPLES
--------------------

'This is a small string' compressed by 50%
'foobar' compressed by 34%
'the end' compressed by 58%
'not-a-g00d-Exampl333' enlarged by 15%
'Smaz is a simple compression library' compressed by 39%
'Nothing is more difficult, and therefore more precious, than to be able to decide' compressed by 49%
'this is an example of what works very well with smaz' compressed by 49%
'1000 numbers 2000 will 10 20 30 compress very little' compressed by 10%

In general, lowercase English will work very well. It will suck with a lot
of numbers inside the strings. Other languages are compressed pretty well too,
the following is Italian, not very similar to English but still compressible
by smaz:

'Nel mezzo del cammin di nostra vita, mi ritrovai in una selva oscura' compressed by 33%
'Mi illumino di immenso' compressed by 37%
'L'autore di questa libreria vive in Sicilia' compressed by 28%

It can compress URLS pretty well:

'http://google.com' compressed by 59%
'http://programming.reddit.com' compressed by 52%
'http://github.com/antirez/smaz/tree/master' compressed by 46%

USAGE
-----

The lib consists of just two functions:

    int smaz_compress(char *in, int inlen, char *out, int outlen);

Compress the buffer 'in' of length 'inlen' and put the compressed data into
'out' of max length 'outlen' bytes. If the output buffer is too short to hold
the whole compressed string, outlen+1 is returned. Otherwise the length of the
compressed string (less then or equal to outlen) is returned.

    int smaz_decompress(char *in, int inlen, char *out, int outlen);

Decompress the buffer 'in' of length 'inlen' and put the decompressed data into
'out' of max length 'outlen' bytes. If the output buffer is too short to hold
the whole decompressed string, outlen+1 is returned. Otherwise the length of the
compressed string (less then or equal to outlen) is returned. This function will
not automatically put a nul-term at the end of the string if the original
compressed string didn't included a nulterm.


CREDITS
-------

Small was writte by Salvatore Sanfilippo and is released under the BSD license. Check the COPYING file for more information.
