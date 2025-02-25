---
repo: mbrock/whats-on-lambda
url: 'https://github.com/mbrock/whats-on-lambda'
homepage: ''
starredAt: '2016-09-21T06:00:17Z'
createdAt: '2016-09-15T09:03:30Z'
updatedAt: '2024-10-15T11:53:24Z'
language: null
license: NA
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.128Z'
description: A list of some command-line tools available in the AWS Lambda environment
tags: []
---

# What's on Lambda?

AWS Lambda runs Amazon Linux, a version of Red Hat. There's lots of
command-line tools installed in the environment. Here's a list. I've
excluded some boring programs.

These programs are already in `$PATH`; they don't count towards your
task's code size limit. So instead of including a dependency in your
archive, consider shelling out to one of them.

See also:

* [docker-lambda](https://github.com/lambci/docker-lambda): container
  replica of the Lambda environment

## Cryptography and hashing

* `certutil`, `cmsutil`, `crlutil`, `pk12util`, `signtool` (Mozilla NSS tools)
* `gpg2` (GNU Privacy Guard; OpenPGP encryption/signing)
* `md5sum` (file checksum tool)
* `openssl` (cryptographic tool)
* `sha1sum`, `sha224sum`, `sha256sum`, `sha384sum`, `sha512sum` (hash digest tools)

## Language runtimes

* `bash` (GNU bash 4.2.46)
* `java8`, `javac8`, `javadoc8`, `keytool8`, etc (Java JDK)
* `lua`, `luac` (Lua 5.1.4 programming language)
* `node` (Node 0.10.42, JavaScript execution environment)
* `perl` (Perl 5.16.3)
* `python2.7`, `pydoc2.7` (Python 2.7)
* `python3.4`, `pydoc3.4`, `pyvenv3.4` (Python 3.4)
* `xsltproc` (XSLT processor)

## Compression and archiving

* `bunzip2`, `bzip2`, `bzcat`, `bzcmp`, `bzdiff`, `bzgrep` (bzip2 tools)
* `gzip`, `gunzip`, `zcmp`, `zdiff` (GNU; gzip tools)
* `tar` (GNU; archive tool)
* `zip`, `unzip`, `zipgrep` (zip archive tools)

## Documents and images

* `convert`, `mogrify` (ImageMagick)
* `dvipdf` (GhostScript)
* `ghostscript`, `gs` (PostScript/PDF interpreter and printing tool)
* `ps2ascii`, `ps2pdf`, `ps2ps` (PostScript conversion tools from GhostScript)

## Networking

* `curl` (URL transfer tool)
* `ipcalc` (perform simple manipulation of IP addresses)
* `urlgrabber` (URL downloading tool)

## Databases

* `sqlite3` (single-file relational SQL database)

## Other tools

* `dd` (file byte range copying tool)
* `hexdump` (binary file formatter)
* `pgrep`, `pkill` (find or kill processes)
* `rpmdb`, `rpmbuild`, `rpmkeys`, etc (RPM package tools)
* `uuidgen` (generate time-based or random UUIDs)

## GNU tools

* `as` (assembler)
* `awk`, `gawk` (text processing language)
* `base64` (Base64 decoder/encoder)
* `diff` (find differences, create patches)
* `du` (count file byte sizes)
* `elfedit` (ELF binary header updating tool)
* `eqn` (equation formatting for troff and MathML)
* `factor` (factorize number into primes)
* `file` (MIME type classifier)
* `find` (file system search tool)
* `fmt` (monospace line formatter)
* `fold` (monospace line wrapper)
* `gdb` (debugger, possibly not runnable)
* `getopt` (command line option parser for shell)
* `gprof` (C profiling tool)
* `grep` (file searching tool)
* `groff`, `troff` (document formatting tool)
* `idn` (Internationalized Domain Names and Punycode tool)
* `ld` (linker)
* `make`, `gmake` (build tool)
* `patch` (apply patches)
* `sed` (stream/file editing tool)
* `sort` (line sorting tool)
* `tbl` (table formatting for troff)
* `tr` (character substitution tool)
* `uniq` (uniquify lines of sorted file)

