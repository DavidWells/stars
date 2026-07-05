---
repo: adamchainz/pretty-cron
url: 'https://github.com/adamchainz/pretty-cron'
homepage: ''
starredAt: '2016-07-18T17:57:51Z'
createdAt: '2015-07-27T15:02:36Z'
updatedAt: '2023-01-28T20:01:34Z'
language: Python
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: true
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:52:20.938Z'
description: Converts crontab expressions to human-readable descriptions
tags: []
---

===========
pretty-cron
===========

**Retired** in favour of `cron_descriptor <https://pypi.org/project/cron_descriptor/>`_.

**This project is no longer maintained.**

Converts crontab expressions to human-readable descriptions.

Installation
============

Use pip:

.. code-block:: bash

    pip install pretty-cron

Tested on Python 2.7 and 3.6.

API
===

``prettify_cron(cron_expression)``
----------------------------------

Converts the given string cron expression into a pretty, human-readable,
English description of what it means. If the string is not a valid cron
expression, or it includes features not currently supported, it is returned
as-is.

For example:

.. code-block:: python

    >>> import pretty_cron
    >>> pretty_cron.prettify_cron("0 * * * *")
    "At 0 minutes past every hour of every day"
    >>> pretty_cron.prettify_cron("0 0 1 1 *")
    "At 00:00 on the 1st of January"
    >>> pretty_cron.prettify_cron("12 15 * 1 *")
    "At 15:12 every day in January"
    >>> pretty_cron.prettify_cron("lalala")  # Not a cron expression
    "lalala"
