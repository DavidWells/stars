---
repo: ralyodio/humanparser
url: 'https://github.com/ralyodio/humanparser'
homepage: 'https://www.npmjs.org/package/humanparser'
starredAt: '2014-08-29T00:36:58Z'
createdAt: '2014-05-26T05:50:57Z'
updatedAt: '2025-01-30T23:16:48Z'
language: JavaScript
license: MIT
branch: master
stars: 99
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:02.648Z'
description: >-
  Parse a human name string into salutation, first name, middle name, last name,
  suffix.
tags:
  - data
  - es6
  - javascript
  - parsing
  - scraping
---

humanparser
=========

[![NPM](https://nodei.co/npm/humanparser.png)](https://nodei.co/npm/humanparser/)

Parse a human name string into salutation, first name, middle name, last name, suffix.

## Install

    npm install humanparser

## Usage

    const human = require('humanparser');
    
### parse human name    

    const fullName = 'Mr. William R. Hearst, III';
	const attrs = human.parseName(fullName);

    console.log(attrs);

    //produces the following output
    
    { 
        salutation: 'Mr.',
        firstName: 'William',
        suffix: 'III',
        lastName: 'Hearst',
        middleName: 'R.',
        fullName: 'Mr. William R. Hearst, III'
    }
      
### get fullest name in string

    const name = 'John & Peggy Sue';
    const fullName = human.getFullestName(name);

    //produces the following output
    {
        fullName: 'Peggy Sue'
    }
      
### parse address

    const address = '123 Happy Street, Honolulu, HI  65780';
    const parsed = human.parseAddress(address);
    
    //produces the following output    
    {
        address: '123 Happy Street',
        city: 'Honolulu',
        state: 'HI',
        zip: '65780',
        fullAddress: '123 Happy Street, Honolulu, HI  65780'
    }

