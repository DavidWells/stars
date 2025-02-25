---
repo: AndrewRedican/mitsuketa
url: 'https://github.com/AndrewRedican/mitsuketa'
homepage: 'https://www.npmjs.com/package/mitsuketa'
starredAt: '2022-03-22T22:59:34Z'
createdAt: '2017-11-27T14:45:36Z'
updatedAt: '2023-01-28T23:57:38Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.217Z'
description: A Javascript library that enables you to handle deeply nested objects easily.
tags:
  - javascript-library
  - objects
  - vanilla-javascript
---

**Warning:** [mitsuketa](https://www.npmjs.com/package/mitsuketa) project is no longer maintained in favor of [@enio.ai/data-ferret](https://www.npmjs.com/package/@enio.ai/data-ferret).

Thanks for using this project. If you have concerns or need help with migration, you can leave a comment or question on [enio's discussion board](https://github.com/enio-ireland/enio/discussions).

<br>

# Mitsuketa ![Build Status](https://travis-ci.com/AndrewRedican/mitsuketa.svg?branch=master)

<p align="center"><img src=http://i.imgur.com/qF1mmY5.png><br /><br />A Javascript library that enables you to handle deeply nested objects easily.</p>

## Installation

Using npm:

```
$ npm i -g npm
$ npm i --save mitsuketa
```

## Why mitsuketa?

Mitsuketa makes JavaScript easier by taking the hassle out of working with deeply nested data structures. Allows you to strict compare object, locate deeply nested entities, etc.

## Lastest Release Notes

1. Two new features have been released. [**deepRemove_Key**](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepremove_key-identity--keyname--optionalmaxdepth-), [**deepRemoveAll_Key**](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepremoveall_key-identity--keyname--optionalmaxdepth-) to remove the properties or keys of any simple or deeply nested object on the fly!
2. Great News! As part of the effort to further improve documentation, next Monday, we are releasing a playground website. What you can do there is visualize data and interact with mitsuketa. To learn more of how we are achieving this, you can check out mitsuketa's sister project [**React JSON Editor**](https://www.npmjs.com/package/react-json-editor-ajrm).
3. Up until recently, most of the features have focused on obtaining data from complex object trees. Now we are taking an exciting new focus on actual **deeply nested object manipulation**. Check out our [**project board**](https://github.com/AndrewRedican/mitsuketa/projects/1) for a sneak peek to the new features. Feel free suggest any feature that you'd like to see by answering the survey down below.
4. If you haven't checked it out already, you can learn more about how we [set up and execute tests](https://github.com/AndrewRedican/mitsuketa/wiki/How-to-Create-and-Run-Tests).

## Overview

| Method   | Brief Description | Parameters/Input  | Output  |
| ------------- |-----------------------------| ------| :-----:|
| [getType](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#gettype-identity-) | Gets `typeof` `identity` also makes distinction between `object`, `null`, and `array`               | identity | string |
| [sameType](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#sametype-identitya-identityb-) | Compares two `identities` using `getType` method | identityA, identityB | `identity` or `false` |
| [sameStructure](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#samestructure-identitya-identityb-) | Compares two `identities` using `sameType` then validates both have the same `keys`  | identityA, identityB | `identity` or `false` |
| [identical](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#identical-identitya-identityb-) | Compares two `identities` using `sameStructure` then validates children or nested structures for `iterble identities` or actual `values`  | identityA, identityB | `identity` or `false` |
| [isIterable](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#isiterable-identity-) | Checks if `identity` contains one or more keys or properties       | identity | boolean |
| [containsKeys](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#containskeys-identity-keylist-)  | Checks if `identity` contains the specified properties | identity, keyList | boolean |
| [trim](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#trim-identity-keylist-) | Removes properties from `identity` and only keeps the specified properties | identity, keyList | `identity` |
| [locate](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#locate-collection-identity-optionaldepth--) | Performs a deep search by iterating through the `collection`'s entire object tree an returns the path to the first `identical` match that is found as a string of dot . separated property names | collection, identity | string |
| [deepGet](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#deepget-collection-identity-optionaldepth--) | Uses `locate` and returns the `indentity`'s container if found in `collection` |    collection, identity | identity |
| [locateAll](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#locateall-collection-identity-optionaldepth--) | Uses `locate` and returns all the paths to all matches | collection, identity | array of string |
| [deepFilter](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0#deepfilter-collection-identity-optionaldepth-) | Uses `locateAll` and returns an array of all an identites matched inside `collection`  | collection, identity | array of identities |
| [length](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#length-identity-) | Returns the number of keys or properties contained in `identity` | identity | number |
| [exists](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#exists-collection-identity-optionaldepth--) | Performs deep search on `collection` for an `identical` match to `identity` | collection, identity | boolean |
| [onlyExisting](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#onlyexisting-collection-identities-optionaldepth--) | For each identity in `identities`, performs a deep search on `collection` using `exists`, to shorten the list `identities` to those that were found | collection, identities | identities |
| [onlyMissing](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#onlymissing-collection-identities-optionaldepth--) | For each identity in `identities`, performs a deep search on `collection` using `exists`, to shorten the list `identities` to those that were **not** found | collection, identities | identities |
| [isFalsy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#isfalsy-identity-) | Checks if identity has or false or false-like values. These include: null, undefined, '', false, and 0 | identity | `identity` or `false` |
| [isTruthy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#istruthy-identity-) | Checks if identity is non-falsy | identity | `identity` or `false` |
| [foundTruthy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#foundtruthy-collection-identity-optionaldepth--) | Performs deep search on `collection`, and evaluate if `isTruthy` on the first identical match to `identity` | collection, identity | boolean |
| [foundFalsy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#foundfalsy-collection-identity-optionaldepth--) | Performs deep search on `collection`, and evaluate if `isFalsy` on the first identical match to `identity` | collection, identity | boolean |
| [onlyTruthy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#onlytruthy-collection-identities-property-optionaldepth--) | For each identity in `identities`, performs a deep search on `collection` using `exists`, and evaluates if `isTruthy` on the first identical match of `property` to shorten the list `identities` to those that were found and also truthy | collection, identities, property | identities |
| [onlyFalsy](https://github.com/AndrewRedican/mitsuketa/wiki/v1.2.0#onlyfalsy-collection-identities-property-optionaldepth--)  | For each identity in `identities`, performs a deep search on `collection` using `exists`, and evaluates if `isFalsy` on the first identical match of `property` to shorten the list `identities` to those that were found and also truthy | collection, identities, property | identities |
| [countMatches](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#countmatches-collection-identity-optionalnthdepth-optionalmaxdepth--)  | Performs deep search for `identity` on `collection` using `locateAll` and returns the number of confirmed matches in a given depth | collection, identity, number | number |
| [maxDepth](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#maxdepth-identity--optionalmaxlayer-)  | Returns the nth value of the deepest layer of the entire object tree | identity | number |
| [matchDepth](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#matchdepth-collection--identity--optionalmaxdepth-)  | Performs deep search for `identity` on `collection` to return the location's depth of the first match. If no match found, returns false. | collection, identity | number |
| [locate_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#locate_key-collection--keyname--optionalmaxdepth-) | Performs a deep search by iterating through the `collection`'s entire object tree an returns the path to the first `identical` match that is found as a string of dot . separated property names | collection, key | string |
| [deepGet_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#deepget_key-collection--keyname--optionalmaxdepth-) | Uses `locate_Key` and returns the `indentity`'s container if found in `collection` | collection, key | identity |
| [locateAll_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#locateall_key-collection--keyname--optionalmaxdepth-) | Uses `locate_Key` and returns all the paths to all matches | collection, key | array of string |
| [deepFilter_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.3.x#deepfilter_key-collection--keyname--optionalmaxdepth-) | Uses `locateAll` and returns an array of all an identites matched inside `collection`  | collection, key | array of identities |
| [deepClone](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepclone-identity--optionalmaxdepth--optionalstartdepth---) | Creates a non-reference clone that is an exact copy to the identity provided. Can be used to create `shallow clones` of specific depths. Can also be used to create `branch clones`. Read more in [**documentation**](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepclone-identity--optionalmaxdepth--optionalstartdepth---) | collection, key | any |
| [renameKey](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#renamekey-identity--keyname--newkeyname--optionalmaxdepth-) | Performs deep search on the `identity`'s object tree to rename the first matching key.  | identity, key, key | identity |
| [renameKeys](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#renamekeys-identity--keyname--newkeyname--optionalmaxdepth-) | Performs deep search on the `identity`'s object tree to rename all matching keys.  | identity, key, key | identity |
| [deepRemove_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepremove_key-identity--keyname--optionalmaxdepth-) | Performs deep search on the `identity`'s object tree to remove the first property with matching key.  | identity, key | identity |
| [deepRemoveAll_Key](https://github.com/AndrewRedican/mitsuketa/wiki/v1.4.x#deepremoveall_key-identity--keyname--optionalmaxdepth-) | Performs deep search on the `identity`'s object tree to remove all properties with matching key.  | identity, key | identity |

## Built With

* Vanilla [**Javascript**](https://betterexplained.com/articles/the-single-page-javascript-overview/), ES5, [**ES6**](http://es6-features.org/#Constants)

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* Got my inspiration from lodash.js

## Help me improve!

If you have a minute to spare, can you answer these two questions?
https://www.surveymonkey.com/r/XJ37XSP
