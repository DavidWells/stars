---
repo: johnthecat/babel-plugin-jsdoc-runtime-typecheck
url: 'https://github.com/johnthecat/babel-plugin-jsdoc-runtime-typecheck'
homepage: null
starredAt: '2021-11-13T06:02:32Z'
createdAt: '2016-11-19T22:02:11Z'
updatedAt: '2022-11-23T11:13:06Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.997Z'
description: 'Babel plugin, that adds typecheck, based on jsDoc.'
tags:
  - babel
  - javascript
  - jsdoc
  - runtime
  - typecheck
---

# Babel jsDoc runtime typecheck

[![npm](https://img.shields.io/npm/v/babel-plugin-jsdoc-runtime-typecheck.svg)](https://www.npmjs.com/package/babel-plugin-jsdoc-runtime-typecheck)
[![license](https://img.shields.io/github/license/johnthecat/babel-plugin-jsdoc-runtime-typecheck.svg)](https://github.com/johnthecat/babel-plugin-jsdoc-runtime-typecheck/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/babel-plugin-jsdoc-runtime-typecheck.svg)](https://www.npmjs.com/package/babel-plugin-jsdoc-runtime-typecheck)
[![Travis](https://img.shields.io/travis/johnthecat/babel-plugin-jsdoc-runtime-typecheck.svg)](https://travis-ci.org/johnthecat/babel-plugin-jsdoc-runtime-typecheck)

## Overview
This plugin will add runtime typecheck, based on [jsDoc](http://usejsdoc.org/) annotation.
It transform code like this:
```javascript
// from

/**
 * @param {Number} a
 * @returns {Number}
 * @typecheck
 */
function test(a) {
    return a;
}

// to

function test(a) {
    __executeTypeCheck__('test', 'a', a, 'Number');
    
    return __executeTypeCheck__('test', 'return', a, 'Number');
}
```

Result:
<img alt="Console error example" src="https://cloud.githubusercontent.com/assets/5618341/21081744/f41d1440-bfdd-11e6-983a-29b4d5f6dff1.png"/>


**CAUTION: Use this plugin only in development, it will slow down your code (a lot of additional function calls and large helper function).**

## Motivation
Flow is good solution, but it adds custom syntax to javascript code and adding it to existing project is quite hard.
IDE's like Webstorm has good support of jsDoc and can add cool code completion tips, based on users comments.
So, with this plugin, you can easy start to use benefits of strong typing in javascript code without any pain. 
Using this plugin in development also will speed up development, because it will reduce number of weird errors and behaviors.


## How to

### Install
`npm install babel-plugin-jsdoc-runtime-typecheck --save-dev`

### Use
_.babelrc_
```json
{
    "plugins": ["jsdoc-runtime-typecheck"]
}
```
_js code - global directive_
```javascript
// @typecheck

/**
 * @param {String} str
 * @returns {String}
 */
function makeMeLaugh(str) {
    return str + ' - ha-ha-ha!';
}
```
_js code - local directive_
```javascript
/**
 * @param {String} str
 * @returns {String}
 * @typecheck
 */
function makeMeLaugh(str) {
    return str + ' - ha-ha-ha!';
}
```

### Configure

#### useDirective
By default, plugin will only parse docs with special directive `@typecheck`, you can change it like this:
```
{
    "plugins": [
        ["jsdoc-runtime-typecheck",
            {
                //useDirective: 'typecheck' - this is default
                //useDirective: false - if you want to check all functions with jsDoc (useful for new projects)
                useDirective: 'makeMeHappy' - your custom directive
            }
        ]
    ]
}
```
Then, use it:
```javascript
// @makeMeHappy 

// or

/**
 * @makeMeHappy 
 * @param {Number} a
 * @returns {Number}
 */
```

#### useStrict
You can enable strict mode - in this mode plugin throw compilation exception when it can find error by static analyze.

Setup:
```
{
    "plugins": [
        ["jsdoc-runtime-typecheck",
            {
                //useStrict: false - default
                useStrict: true
            }
        ]
    ]
}
```
Use:

Code:
```javascript
/**
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 * @typecheck
 */
function test(a, b, c) {
    return a + b + c;
}
```
Result in console:
```bash
SyntaxError: input.js: [TYPECHECK STRICT MODE]: Function argument type annotation missing.
   5 |  * @typecheck
   6 |  */
>  7 | function test(a, b, c) {
     |                     ^
   8 |     return a + b + c;
   9 | }
  10 | 
```

## Supports:

### jsDoc tags
* `@params` can be optional, supported declarations:
    * `@param {*} name` - no check
    * `@param {Number=} name` - optional
    * `@param {Number} [name]` - optional
    * `@param {?Number} name`
    * `@param {!Number} name`
    * `@param {Number|String} id`
    * `@param {Array<Number>} collection` - check every item in array
    * Check defined keys in Object:
        ```
        @param {Object} data 
        @param {Number} data.id
        @param {String} data.name
        
        //or
        
        @param {{id: Number, name: String}} data
        ```
        
    * `@param {function(Array<Number>)} name` - check type of function 
* `@returns` or `@return` - type annotation are same as in params.

### Language constructions

#### Function declaration

```javascript
/**
 * @param {Number} a
 * @returns {Number}
 */
function myDeclaredFunction(a) {
    return a;
}

/**
 * @param {Number} a
 * @returns {Number}
 */
let myExpressionFunction = function(a) {
    return a;
};

/**
 * @param {Number} a
 * @returns {Number}
 */
let myArrowFunction = (a) => {
    return a;
};

/**
 * @param {Number} a
 * @returns {Number}
 * In this case it will transform body to "{ return a; }" block
 */
let myArrowExpressionFunction = (a) => a;
```

#### Object method

```javascript
let myObject = {
    /**
     * @param {Number} a
     * @returns {Number}
     */
    myMethod(a) {
        return a;
    },
    
    /**
     * @param {Number} a
     * @returns {Number}
     * Will use object field name as function name ("myField" here)
     */
    myField: function(a) {
        return a;
    }
}
```

#### Class constructor and method

```javascript
class MyClass {
    /**
     * @param {Number} a
     */
    constructor(a) {
        this._a = a;
    }
    
    /**
     * @param {Number} a
     * @returns {Number}
     */
    myMethod(a) {
       return a;
    }
    
    /**
     * @param {Number} a
     * @returns {Number}
     */
    static myStaticMethod(a) {
       return a;
    }
    
    /**
     * @param {Number} a
     */
    set a(a) {
        this._a = a;
    }
    
    /**
     * @returns {Number} a
     */
    get a() {
       return this._a;
    }
}
```
