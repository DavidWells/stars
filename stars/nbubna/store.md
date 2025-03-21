---
repo: nbubna/store
url: 'https://github.com/nbubna/store'
homepage: ''
starredAt: '2013-11-15T03:30:55Z'
createdAt: '2013-03-29T22:43:50Z'
updatedAt: '2025-02-17T15:16:45Z'
language: JavaScript
license: MIT
branch: master
stars: 1925
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:08.305Z'
description: A better way to use localStorage and sessionStorage
tags:
  - browsers
  - javascript
  - localstorage
  - namespace
  - sessionstorage
  - storage
---

A feature-filled and friendly way to take advantage of localStorage and sessionStorage
(JSON, namespacing, extensions, etc).

Download: [store2.min.js][prod]  or  [store2.js][dev]  
[NPM][npm]: `npm install store2`  
[NuGet][]: `Install-Package store2`  

[NuGet]: http://nuget.org/packages/store2/
[prod]: https://raw.github.com/nbubna/store/master/dist/store2.min.js
[dev]: https://raw.github.com/nbubna/store/master/dist/store2.js
[npm]: https://npmjs.org/package/store2

[![Build Status](https://travis-ci.org/nbubna/store.svg?branch=master)](https://travis-ci.org/nbubna/store)
[![npm version](https://badge.fury.io/js/store2.svg)](https://badge.fury.io/js/store2)
[![npm](https://img.shields.io/npm/dm/store2.svg?maxAge=2592000)](https://www.npmjs.com/package/store2)  

## Documentation
The main store function can handle ```set```, ```get```, ```transact```, ```setAll```, ```getAll```, ```each```, and ```clear```
actions directly. Respectively, these are called like so:

```javascript
store(key, data);                 // sets stringified data under key
store(key);                       // gets and parses data stored under key
store(key, fn[, alt]);            // run transaction function on/with data stored under key
store({key: data, key2: data2});  // sets all key/data pairs in the object
store();                          // gets all stored key/data pairs as an object
store((key, data)=>{ });          // calls function for each key/data in storage, return false to exit
store(false);                     // clears all items from storage
```

Parameters in [brackets] are optional. There are also more explicit and versatile functions available:

```javascript
store.set(key, data[, overwrite]); // === store(key, data);
store.setAll(data[, overwrite]);   // === store({key: data, key2: data});
store.get(key[, alt]);             // === store(key);
store.getAll([fillObj]);           // === store();
store.transact(key, fn[, alt]);    // === store(key, fn[, alt]);
store.clear();                     // === store(false);
store.has(key);                    // returns true or false
store.remove(key[, alt]);          // removes key and its data, then returns the data or alt, if none
store.each(fn[, fill]);            // === store(fn); optional call arg will be 3rd fn arg (e.g. for gathering values)
store.add(key, data[, replacer]);  // concats, merges, or adds new value into existing one
store.keys([fillList]);            // returns array of keys
store.size();                      // number of keys, not length of data
store.clearAll();                  // clears *ALL* areas (but still namespace sensitive)
```

Passing in ```false``` for the optional overwrite parameters will cause ```set``` actions to be skipped 
if the storage already has a value for that key. All ```set``` action methods return the previous value 
for that key, by default. If overwrite is ```false``` and there is a previous value, the unused new 
value will be returned.

Functions passed to ```transact``` will receive the current value for that key as an argument or
a passed alternate if there is none. When the passed function is completed, transact will save the returned value
under the specified key. If the function returns ```undefined```, the original value will be saved.
This makes it easy for transact functions to change internal properties in a persistent way:

```javascript
store.transact(key, function(obj) {
    obj.changed = 'newValue';// this change will be persisted
});
```

Functions passed to ```each``` will receive the key as first argument and current value as the second; if a `fill` parameter is specified, it's value will be the third argument for every call (few should ever
need a `fill` parameter). If the function returns ```false``` at any point during the iteration, the
loop will exit early and not continue on to the next key/value pair.

```javascript
store.each(function(key, value) {
    console.log(key, '->', value);
    if (key === 'stopLoop') {
        return false;// this will cause each to stop calling this function
    }
});
```

All retrieval functions which take an optional ```alt``` parameter can also use that parameter to specify a "reviver" function. These receive each key and value (yes, nested ones too) as arguments and allow you to provide an alternate means of parsing that string. This is particularly useful for rich objects like ```Date``` types. See [MDN's JSON.parse docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) for more information and examples. Alternately, you can set a global reviver to the ```store._.revive``` property to handle all ```get```, ```getAll```, ```remove```, and ```transact``` calls.

Likewise, setter functions which take an optional ```overwrite``` parameter can also use that parameter to accept a "replacer" function that receives each key and value (yes, nested ones too) as arguments and allow you to provide an alternate means of stringifying the values. This is particularly useful for rich objects like ```Map``` or ```Set```. See [MDN's JSON.stringify docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) for more information and examples. Alternately, you can set a global replacer to the ```store._.replace``` property to handle all ```set```, ```setAll```, ```add```, and ```transact``` calls.

For ```getAll``` and ```keys```, there is the option to pass in the object or list, respectively,
that you want the results to be added to. This is instead of an empty list.
There are only a few special cases where you are likely to need or want this,
in general, most users should ignore these optional parameters.
These both use the  second, optional argument ```each``` function,
which is also a niche feature. The ```value``` argument is passed as
the second arg to the callback function (in place of the data associated with the current key)
and is returned at the end. Again, most users should not need this feature.
All of these use the browser's localStorage (aka "local"). Using sessionStorage merely requires 
calling the same functions on ```store.session```:

```javascript
store.session("addMeTo", "sessionStorage");
store.local({lots: 'of', data: 'altogether'});// store.local === store :)
```
There is also a store API automatically available for keeping non-persistent information,
meant only to last until page reload.
```javascript
store.page("until","reload");
```

All the specific ```get```, ```set```, etc. functions are available on ```store.session```, ```store.local```, and ```store.page```, as well as any other storage facility registered via ```store.area(name, customStorageObject)``` by an extension, where customStorageObject must implement the [Storage interface][storage]. This is how [store.old.js][old] extends store.js to support older versions of IE and Firefox.

[storage]: http://dev.w3.org/html5/webstorage/#the-storage-interface

If you want to put stored data from different pages or areas f your site into separate namespaces, 
the ```store.namespace(ns)``` function is your friend:

```javascript
var cart = store.namespace('cart');
cart('total', 23.25);// stores in localStorage as 'cart.total'
console.log(store('cart.total') == cart('total'));// logs true
console.log(store.cart.getAll());// logs {total: 23.25}
cart.session('group', 'toys');// stores in sessionStorage as 'cart.group'
```

The namespace provides the same exact API as ```store``` but silently adds/removes the namespace prefix as needed.
It also makes the namespaced API accessible directly via ```store[namespace]``` (e.g. ```store.cart```) as long as it
does not conflict with an existing part of the store API.

The 'namespace' function is one of three "extra" functions that are also part of the "store API":

```javascript
store.namespace(prefix);// returns a new store API that prefixes all key-based functions
store.isFake([force]);// test or set whether localStorage/sessionStorage or an in-memory, 'fake' storage is used
```

```store.namespace``` can also take extra params to only create the namespace in the called-on storage area, and
to pass in an alternate namespace delimiter for advanced use-cases (e.g. ```store.page.namespace("subpage", true, ":")```).

If localStorage or sessionStorage are unavailable, they will be faked to prevent errors,
but data stored will NOT persist beyond the life of the current document/page. Use the 
[store.old.js][old] extension to add persistent backing for the store API in ancient browsers.

```isFake(true|false)``` is particularly useful to force use of a temporary, fake storage in testing situations,
to prevent cluttering actual storage.

## Extensions
These mostly could use further documentation and abuse...er...testing.
Contributions are welcome!
In particular, any ES6 user interested in making these [importable in ES6][es6importissue] would be appreciated.

[es6importissue]: https://github.com/nbubna/store/issues/31

#### Beta - Stable and definitely useful
* [store.old.js][old] - Add working localStorage and sessionStorage polyfills for ancient browsers
* [store.overflow.js][overflow] - Fall back to fake storage on quota errors
* [store.cache.js][cache] - To make data expire, pass a number of seconds as the overwrite (third) param on ```set()``` calls
* [store.on.js][on] - Superior storage event handling (per key, per namespace, etc in IE9+)
* [store.array.js][array] - Easy, powerful array functions for any and all data (e.g. ```store.push(key, v1, v2)```).
* [store.dom.js][dom] - Declarative, persistent DOM element content via store.
* [store.cookie.js][cookie] - Support for a cookie as a storage area: ```store.cookie('num',1)``` to make sharing with backend easier.

#### Alpha - Either incomplete or unstable or both
* [store.quota.js][quota] - Register callbacks to handle (and even cancel) quota errors
* [store.measure.js][measure] - Experimental extension for measuring space used and available (needs work)
* [store.onlyreal.js][onlyreal] - When only fake storage is available, silently fail instead of faking it.
* [store.dot.js][dot] - Creates accessors for keys (e.g. ```store.foo == store.get('foo')```)
* [store.deep.js][deep] - Allow retrieval of properties from within stored objects (e.g. ```store.get('key.property')```)
* [store.async.js][async] - Adds ```store.async``` duplicate to each store and namespace that performs functions asynchronously and returns a Promise that resolves when complete.
* [store.cookies.js][cookies] - Support managing all cookies as a storage area with the store API (e.g. ```store.cookies.get('user')```)

[old]: https://raw.github.com/nbubna/store/master/src/store.old.js
[overflow]: https://raw.github.com/nbubna/store/master/src/store.overflow.js
[cache]: https://raw.github.com/nbubna/store/master/src/store.cache.js
[on]: https://raw.github.com/nbubna/store/master/src/store.on.js
[quota]: https://raw.github.com/nbubna/store/master/src/store.quota.js
[measure]: https://raw.github.com/nbubna/store/master/src/store.measure.js
[onlyreal]: https://raw.github.com/nbubna/store/master/src/store.onlyreal.js
[array]: https://raw.github.com/nbubna/store/master/src/store.array.js
[dot]: https://raw.github.com/nbubna/store/master/src/store.dot.js
[deep]: https://raw.github.com/nbubna/store/master/src/store.deep.js
[dom]: https://raw.github.com/nbubna/store/master/src/store.dom.js
[async]: https://raw.github.com/nbubna/store/master/src/store.async.js
[cookie]: https://raw.github.com/nbubna/store/master/src/store.cookie.js
[cookies]: https://raw.github.com/nbubna/store/master/src/store.cookies.js

#### Write Your Own Extension
To write your own extension, you can use or carefully override internal functions exposed as ```store._```.
In particular, the ```store._.fn(fnName, fn)``` method is available to automatically add your new function
to every instance of the ```store``` interface (e.g. ```store```, ```store.session```
and all existing and future namespaces). Take care using this, as it will override existing methods.
Here is a simple example:

```javascript
(function(_) {
    _.fn('falsy', function(key) {
        return !this.get(key);
    });
    _.fn('truthy', function(key) {
        return !this.falsy(key);
    });
})(store._);
```
This extension would be used like so:
```javascript
store('foo', 1);
store.falsy('foo'); // returns false

store.session('bar', 'one');
store.session.truthy('bar'); // return true;

const widgetStore = store.namespace('widget');
widgetStore.falsy('state'); // returns true
```

## Release History
* 2010-02-10 v0.1 (extraction from esha.js)
* 2010-05-25 v1.0 (internal release)
* 2013-04-09 [v2.0.3][] (public) - First GitHub release
* 2013-04-20 [v2.1.0][] (public) - Drops flawed/confusing/unused key(i) method, fixes extension problems.
* 2013-04-30 [v2.1.1][] (public) - Browserify (and friends) support (module.exports = store)
* 2013-05-30 [v2.1.2][] (public) - Component support (old component.json is now bower.json)
* 2014-03-10 [v2.1.6][] (public) - AMD support and Component improvements
* 2015-02-02 [v2.2.0][] (public) - Change store.cache.js to use seconds, not minutes.
* 2015-05-05 [v2.2.1][] (public) - node.js compatibility
* 2015-05-08 [v2.2.2][] (public) - Always expose global to allow extensions to always work.
* 2015-05-22 [v2.3.0][] (public) - Use fake storage for Safari private mode (instead of letting quota exceptions go)
* 2015-10-27 [v2.3.2][] (public) - Add source map
* 2017-01-04 [v2.4.0][] (public) - Add store.transact(key, fn[, alt])
* 2017-01-09 [v2.5.0][] (public) - Update for issue #34; new extensions (array, dot, and deep); only expose global in non-AMD/CommonJS environments (PR #35)
* 2017-08-09 [v2.5.2][] (public) - Fix `clear()` in fake storage (thx to Martin Kluska)
* 2018-01-18 [v2.5.11][] (public) - Add ```index.d.ts``` in root to provide TypeScript support
* 2018-01-23 [v2.6.0][] (public) - Support ```each(fn,value)```, ```getAll(fillObj)```, and ```keys(fillList)``` to support some advanced/corner cases
* 2018-11-15 [v2.7.1][] (public) - Add ```add(key, data)``` for common case of saving a combination of existing and new data. Fix issue #60.
* 2019-07-23 [v2.8.0][] (public) - Add ```store(fn)``` shortcut for ```store.each```, copy properties when inheriting, and make ```store.each(fn, fill)``` always send fill as 3rd arg instead of replacing values.
* 2019-08-21 [v2.9.0][] (public) - Add store.remove(key, alt) to match behavior of store.get(key, alt) (Issue #68)
* 2019-09-27 [v2.10.0][] (public) - Add ```store.page``` to provide page scope storage to complement local and session scope storage. (Issue #69)
* 2020-03-23 [v2.11.0][] (public) - Add ```store.get(key, reviveFn)``` and ```store._.revive`` to support parsing for rich types (e.g. Date)
* 2020-04-14 [v2.11.1][] (public) - Fix falsey alt value support in ```store.get(key, alt)```
* 2020-05-11 [v2.11.2][] (public) - Fix missing TS declaration of new page scope storage.
* 2020-08-12 [v2.12.0][] (public) - PRs for better Storage typing, better testKey, and dev dependency updates.
* 2021-12-16 [v2.13.1][] (public) - Add ```store.set(key, value, replacerFn)```, ```store._replace```, and ```isFake([force])``` to support stringifying rich types and easier testing. And cookie-based extensions for using store backed by a single 'store' cookie or store API for all cookies.
* 2022-03-14 [v2.13.2][] (public) - Restore missing TS declaration of store.area(id[, area])
* 2022-05-11 [v2.14.0][] (public) - Allow namespace delimiter to be changed via store._.nsdelim
* 2022-07-14 [v2.14.1][] (public) - Fix change to ```set``` that broke store.cache.js, and allow namespace delimiter to be passed to ```namespace(name, thisAreaOnly, delim)``` for a single namespace, to avoid conflicts.
* 2022-07-18 [v2.14.2][] (public) - Fix typo in ```index.d.ts``` typings.
* 2024-02-14 [v2.14.3][] (public) - Cut license options to just MIT, also removed Bower and Component support since those are long dead.
* 2024-12-26 [v2.14.4][] (public) - Remove use of eval from store.deep.js

[v2.0.3]: https://github.com/nbubna/store/tree/2.0.3
[v2.1.0]: https://github.com/nbubna/store/tree/2.1.0
[v2.1.1]: https://github.com/nbubna/store/tree/2.1.1
[v2.1.2]: https://github.com/nbubna/store/tree/2.1.2
[v2.1.6]: https://github.com/nbubna/store/tree/2.1.6
[v2.2.0]: https://github.com/nbubna/store/tree/2.2.0
[v2.2.1]: https://github.com/nbubna/store/tree/2.2.1
[v2.2.2]: https://github.com/nbubna/store/tree/2.2.2
[v2.3.0]: https://github.com/nbubna/store/tree/2.3.0
[v2.3.2]: https://github.com/nbubna/store/tree/2.3.2
[v2.4.0]: https://github.com/nbubna/store/tree/2.4.0
[v2.5.0]: https://github.com/nbubna/store/tree/2.5.0
[v2.5.2]: https://github.com/nbubna/store/tree/2.5.2
[v2.5.11]: https://github.com/nbubna/store/tree/2.5.11
[v2.6.0]: https://github.com/nbubna/store/tree/2.6.0
[v2.7.1]: https://github.com/nbubna/store/tree/2.7.1
[v2.8.0]: https://github.com/nbubna/store/tree/2.8.0
[v2.9.0]: https://github.com/nbubna/store/tree/2.9.0
[v2.10.0]: https://github.com/nbubna/store/tree/2.10.0
[v2.11.1]: https://github.com/nbubna/store/tree/2.11.1
[v2.11.2]: https://github.com/nbubna/store/tree/2.11.2
[v2.12.0]: https://github.com/nbubna/store/tree/2.12.0
[v2.13.1]: https://github.com/nbubna/store/tree/2.13.1
[v2.13.2]: https://github.com/nbubna/store/tree/2.13.2
[v2.14.0]: https://github.com/nbubna/store/tree/2.14.0
[v2.14.1]: https://github.com/nbubna/store/tree/2.14.1
[v2.14.2]: https://github.com/nbubna/store/tree/2.14.2
[v2.14.3]: https://github.com/nbubna/store/tree/2.14.3
[v2.14.4]: https://github.com/nbubna/store/tree/2.14.4
