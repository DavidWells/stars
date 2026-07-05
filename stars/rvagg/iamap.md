---
repo: rvagg/iamap
url: 'https://github.com/rvagg/iamap'
homepage: null
starredAt: '2020-03-17T16:35:42Z'
createdAt: '2019-04-03T10:00:50Z'
updatedAt: '2024-09-17T13:40:55Z'
language: JavaScript
license: NA
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:02.894Z'
description: An Immutable Asynchronous Map
tags: []
---

# IAMap

An **I**mmutable **A**synchronous **Map**.

## Warning

This is both **experimental** and a **work in progress**. The current form is not likely to be the final form. No guarantees are provided that serialised versions of today's version will be loadable in the future. This project may even be archived if significantly improved forms are discovered or derived.

However, rich documentation is provided as an invitation for collaboration to work on that final form; or as inspiration for alternative approaches to this problem space.

_Caveat emptor for versions less than 1.0.0._

## Contents

- [About](#about)
- [Immutability](#immutability)
- [Consistency](#consistency)
- [Algorithm](#algorithm)
- [Pending questions](#pending-questions)
- [Examples](#examples)
- [API](#api)
- [License and Copyright](#license-and-copyright)

## About

IAMap provides a `Map`-like interface that can organise data in a storage system that does not lend itself to organisation, such as a content addressed storage system like [IPFS](https://ipfs.io/) where you have to know the address of an element before you can fetch it.

As a single entity, an IAMap instance is a collection of elements which are either entries (or buckets / arrays of entries) or are references to child nodes which themselves are IAMap instances. Large collections will form a deep graph of IAMap nodes referenced by a single IAMap root instance. The entries are key/value pairs, where the values could either be plain JavaScript objects (as long as they are serialisable themselves) or be references to objects within the datastore (or perhaps elsewhere!). Each node in an IAMap graph of nodes is serialised into the datastore. Therefore, a single ID / address / reference to the root node is all that is required to find elements within the collection and collections may be _very_ large.

An IAMap is, therefore, a layer that provides a helpful key/value store on top of a storage system that does not inherently provide indexing facilities that allows easy fetch-by-key. In a content addressed store, such as IPFS, every item can only be fetched by its address, which is a hash of its content. Since those addresses may be derived from links within other pieces of content, we can build a data structure that becomes content and contains those links. Rather than `Store->Get(addressOfValue)` we can `Store->Get(iaMapRoot)->Get(key)` since there are many cases where `addressOfValue` is not known, or derivable ahead of time, but we can keep a single root address and use it to find any `key` within the generated IAMap structure.

The interface bears resemblance to a `Map` but with some crucial differences: asynchronous calls and immutability:

```js
import * as iamap from 'iamap'

// instantiate with a backing store and a hash function
let map = await iamap.create(store, { hashAlg: 'murmur3-32' })
// mutations create new copies
map = await map.set('foo', 'bar')
assert(await map.get('foo') === 'bar')
map = await map.delete('foo', 'bar')
assert(await map.get('foo') === null)
```

### IPLD

[IPLD](http://ipld.io/) is the data layer of IPFS. One aim of this project is to work toward useful primitives that will allow more complex applications to be built that do not necessarily relate to the current IPFS file-focused use-case.

While IAMap is intended to operate on top of IPLD, it is intentionally built independent from it such that it could be used across any other datastore that presents similar challenges to storing and retrieving structured data.

## Immutability

IAMap instances cannot be mutated, once instantiated, you cannot (or should not) modify its properties. Therefore, mutation requires the creation of new instances. Every `map.set()` and `map.delete()` operation will result in a new IAMap root node, which will have a new, unique identifier. New instances created by mutations essentially perform a copy-on-write (CoW), so only the modified node and its parents are impacted, all reference to unmodified nodes remain intact as links.

Mutation on a large data set may involve the creation of many new internal nodes, as references between nodes form part of the "content" and therefore require new identifiers. This is handled transparently but users should be aware that many intermediate nodes are created in a backing store during mutation operations.

## Consistency

IAMap instances are (or should be!) consistent for any given set of key/value pairs. This holds regardless of the order of `set()` operations or the use of `delete()` operations to derive the final form. When serialized in content addressable storage, an IAMap root node referencing the same set of key/value pairs should share the same identifier since their content is the same.

## Algorithm

IAMap implements a [Hash Array Mapped Trie (HAMT)](https://en.wikipedia.org/wiki/Hash_array_mapped_trie), it uses the mutation semantics the [CHAMP](https://michael.steindorfer.name/publications/oopsla15.pdf) (Com-pressed Hash-Array Mapped Prefix-tree) variant but adds buckets to entries and does not use separate `datamap` and `nodemap` properties, but rather a single `map` as per a traditional HAMT algorithm.

This implementation is related to the [Peergos](https://peergos.org/) [CHAMP Java implementaion](https://github.com/Peergos/Peergos/blob/master/src/peergos/shared/hamt/Champ.java) and the [implementation](https://github.com/msteindorfer/oopsla15-artifact/) provided with the original CHAMP OOPSLA'15 paper.

It is also similar to the current [go-hamt-ipld](https://github.com/ipfs/go-hamt-ipld/) and the intention is that this, and the Go IPLD implementation will converge via a shared specification such that they will be able to read each other's data stored in IPLD.

### Algorithm Summary

Keys are hashed when inserted, fetched, modified or deleted in a HAMT. Each node of a HAMT sits at a particular level, or "depth". Each depth takes a different section of the hash to determine an index for the key. e.g. if each level takes 8-bits of the hash, then depth=0 takes the first 8 bits to form an index, which will be from 0 to 255. At depth=1, we take the _next_ 8 bits to determine a new index, and so on, until a place for the entry is found. An entry is inserted at the top-most node that has room for it. Each node can hold as many _elements_ as the hash portion (or "prefix") allows. So if 8-bits are used for each level, then each node can hold 256 elements. In the case of IAMap, each of those elements can also be "buckets", or an array of elements. When a new element is inserted, the insertion first attempts at the root node, which is depth=0. The root node will be considered "full" if there is no space at the index determined by the hash at depth=0. A classic HAMT will be "full" if that index already contains an entry. In this implementation, "full" means that the bucket at that index has reached the maximum size allowed. Once full, the element at that index is replaced with a new child-node, whose depth is incremented. All entries previously in the bucket at that index are then inserted into this new child node—however because the depth is incremented, a new portion of the hash of each element is used to determine its index. In this way, each node in the graph will contain a collection of either buckets (or entries) and references to child nodes. A good hash algorithm will distribute roughly evenly, making a densely packed data structure, where the density and height can be controlled by the number of bits of the hash used at each level and the maximum size of the buckets.

CHAMP adds some optimisations that increase performance on in-memory HAMTs (it's not clear that these extend to HAMTs that are backed by a non-memory datastore) and also delete semantics such that there is a canonical graph for any given set of key/value pairs. The CHAMP optimisation of separating `datamap` and `nodemap` is not applied here as the impact on traversal performance is only realisable for fully in-memory data structures.

Clear as mud? The code is heavily documented and you should be able to follow the algorithm in code form if you are so inclined.

## Examples

### [examples/memory-backed.js](./examples/memory-backed.js)

Use a JavaScript `Map` as an example backing store. IDs are created by `JSON.stringify()`ing the `toSerializable()` form of an IAMap node and taking a hash of that string.

Running this application will scan all directories within this repository and look for `package.json` files. If valid, it will store them keyed by `name@version`. Once the scan has completed, it will iterate over all entries of the IAMap and print out the `name@version` along with the `description` of each package.

This is not a realistic example because you can just use a `Map` directly, but it's useful for demonstrating the basics of how it works and can form the basis of something more sophisticated, such as a database-backed store.

### [examples/level-backed.js](./examples/level-backed.js)

A more sophisticated example that uses LevelDB to simulate a content addressable store. Objects are naively encoded as [CBOR](https://cbor.io/) and given [CIDs](https://github.com/multiformats/cid) via [ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor).

This example uses IAMap to crate an index of all module names `require()`'d by .js files in a given directory (and any of its subdirectories). You can then use that index to find a list of files that use a particular module.

The primary data structure uses IAMap to index lists of files by module name, so a `get(moduleName)` will fetch a list of files. To allow for large lists, the values in the primary IAMap are CIDs of secondary IAMaps, each of which is used like a Set to store arbitrarily large lists of files. So this example demonstrates IAMap as a standard Map and as a Set and there are as many Sets as there are modules found.

_(Note: directories with many 10's of thousands of .js files will be slow to index, be patient or try first on a smaller set of files.)_

## API

### Contents

* [Warning](#warning)
* [Contents](#contents)
* [About](#about)
  * [IPLD](#ipld)
* [Immutability](#immutability)
* [Consistency](#consistency)
* [Algorithm](#algorithm)
  * [Algorithm Summary](#algorithm-summary)
* [Examples](#examples)
  * [examples/memory-backed.js](#examplesmemory-backedjs)
  * [examples/level-backed.js](#exampleslevel-backedjs)
* [API](#api)
  * [Contents](#contents-1)
  * [`async iamap.create(store, options[, map][, depth][, data])`](#async-iamapcreatestore-options-map-depth-data)
  * [`async iamap.load(store, id[, depth][, options])`](#async-iamaploadstore-id-depth-options)
  * [`iamap.registerHasher(hashAlg, hashBytes, hasher)`](#iamapregisterhasherhashalg-hashbytes-hasher)
  * [`async IAMap#set(key, value[, _cachedHash])`](#async-iamapsetkey-value-_cachedhash)
  * [`async IAMap#get(key[, _cachedHash])`](#async-iamapgetkey-_cachedhash)
  * [`async IAMap#has(key)`](#async-iamaphaskey)
  * [`async IAMap#delete(key[, _cachedHash])`](#async-iamapdeletekey-_cachedhash)
  * [`async IAMap#size()`](#async-iamapsize)
  * [`async * IAMap#keys()`](#async--iamapkeys)
  * [`async * IAMap#values()`](#async--iamapvalues)
  * [`async * IAMap#entries()`](#async--iamapentries)
  * [`async * IAMap#ids()`](#async--iamapids)
  * [`IAMap#toSerializable()`](#iamaptoserializable)
  * [`IAMap#directEntryCount()`](#iamapdirectentrycount)
  * [`IAMap#directNodeCount()`](#iamapdirectnodecount)
  * [`async IAMap#isInvariant()`](#async-iamapisinvariant)
  * [`IAMap#fromChildSerializable(id, serializable[, depth])`](#iamapfromchildserializableid-serializable-depth)
  * [`iamap.isRootSerializable(serializable)`](#iamapisrootserializableserializable)
  * [`iamap.isSerializable(serializable)`](#iamapisserializableserializable)
  * [`iamap.fromSerializable(store, id, serializable[, options][, depth])`](#iamapfromserializablestore-id-serializable-options-depth)
  * [`IAMap.isIAMap(node)`](#iamapisiamapnode)
* [License and Copyright](#license-and-copyright)

<a name="iamap__create"></a>
### `async iamap.create(store, options[, map][, depth][, data])`

* `store` `(Store<T>)`: A backing store for this Map. The store should be able to save and load a serialised
  form of a single node of a IAMap which is provided as a plain object representation. `store.save(node)` takes
  a serialisable node and should return a content address / ID for the node. `store.load(id)` serves the inverse
  purpose, taking a content address / ID as provided by a `save()` operation and returning the serialised form
  of a node which can be instantiated by IAMap. In addition, two identifier handling methods are needed:
  `store.isEqual(id1, id2)` is required to check the equality of the two content addresses / IDs
  (which may be custom for that data type). `store.isLink(obj)` is used to determine if an object is a link type
  that can be used for `load()` operations on the store. It is important that link types be different to standard
  JavaScript arrays and don't share properties used by the serialized form of an IAMap (e.g. such that a
  `typeof obj === 'object' && Array.isArray(obj.data)`) .This is because a node data element may either be a link to
  a child node, or an inlined child node, so `isLink()` should be able to determine if an object is a link, and if not,
  `Array.isArray(obj)` will determine if that data element is a bucket of elements, or the above object check be able
  to determine that an inline child node exists at the data element.
  The `store` object should take the following form:
  `{ async save(node):id, async load(id):node, isEqual(id,id):boolean, isLink(obj):boolean }`
  A `store` should throw an appropriately informative error when a node that is requested does not exist in the backing
  store.
  
  Options:
    - hashAlg (number) - A [multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv)
      hash function identifier, e.g. `0x23` for `murmur3-32`. Hash functions must be registered with [`iamap.registerHasher`](#iamap__registerHasher).
    - bitWidth (number, default 8) - The number of bits to extract from the hash to form a data element index at
      each level of the Map, e.g. a bitWidth of 5 will extract 5 bits to be used as the data element index, since 2^5=32,
      each node will store up to 32 data elements (child nodes and/or entry buckets). The maximum depth of the Map is
      determined by `floor((hashBytes * 8) / bitWidth)` where `hashBytes` is the number of bytes the hash function
      produces, e.g. `hashBytes=32` and `bitWidth=5` yields a maximum depth of 51 nodes. The maximum `bitWidth`
      currently allowed is `8` which will store 256 data elements in each node.
    - bucketSize (number, default  5) - The maximum number of collisions acceptable at each level of the Map. A
      collision in the `bitWidth` index at a given depth will result in entries stored in a bucket (array). Once the
      bucket exceeds `bucketSize`, a new child node is created for that index and all entries in the bucket are
      pushed
* `options` `(Options)`: Options for this IAMap
* `map` `(Uint8Array, optional)`: for internal use
* `depth` `(number, optional)`: for internal use
* `data` `(Element[], optional)`: for internal use

```js
let map = await iamap.create(store, options)
```

Create a new IAMap instance with a backing store. This operation is asynchronous and returns a `Promise` that
resolves to a `IAMap` instance.

<a name="iamap__load"></a>
### `async iamap.load(store, id[, depth][, options])`

* `store` `(Store<T>)`: A backing store for this Map. See [`iamap.create`](#iamap__create).
* `id` `(any)`: An content address / ID understood by the backing `store`.
* `depth` `(number, optional, default=`0`)`
* `options` `(Options, optional)`

```js
let map = await iamap.load(store, id)
```

Create a IAMap instance loaded from a serialised form in a backing store. See [`iamap.create`](#iamap__create).

<a name="iamap__registerHasher"></a>
### `iamap.registerHasher(hashAlg, hashBytes, hasher)`

* `hashAlg` `(number)`: A [multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv) hash
  function identifier **number**, e.g. `0x23` for `murmur3-32`.
* `hashBytes` `(number)`: The number of bytes to use from the result of the `hasher()` function (e.g. `32`)
* `hasher` `(Hasher)`: A hash function that takes a `Uint8Array` derived from the `key` values used for this
  Map and returns a `Uint8Array` (or a `Uint8Array`-like, such that each data element of the array contains a single byte value). The function
  may or may not be asynchronous but will be called with an `await`.

```js
iamap.registerHasher(hashAlg, hashBytes, hasher)
```

Register a new hash function. IAMap has no hash functions by default, at least one is required to create a new
IAMap.

<a name="IAMap_set"></a>
### `async IAMap#set(key, value[, _cachedHash])`

* `key` `(string|Uint8Array)`: A key for the `value` being set whereby that same `value` may
  be retrieved with a `get()` operation with the same `key`. The type of the `key` object should either be a
  `Uint8Array` or be convertable to a `Uint8Array` via `TextEncoder.
* `value` `(any)`: Any value that can be stored in the backing store. A value could be a serialisable object
  or an address or content address or other kind of link to the actual value.
* `_cachedHash` `(Uint8Array, optional)`: for internal use

* Returns:  `Promise<IAMap<T>>`: A `Promise` containing a new `IAMap` that contains the new key/value pair.

Asynchronously create a new `IAMap` instance identical to this one but with `key` set to `value`.

<a name="IAMap_get"></a>
### `async IAMap#get(key[, _cachedHash])`

* `key` `(string|Uint8Array)`: A key for the value being sought. See [`IAMap#set`](#IAMap_set) for
  details about acceptable `key` types.
* `_cachedHash` `(Uint8Array, optional)`: for internal use

* Returns:  `Promise<any>`: A `Promise` that resolves to the value being sought if that value exists within this `IAMap`. If the
  key is not found in this `IAMap`, the `Promise` will resolve to `undefined`.

Asynchronously find and return a value for the given `key` if it exists within this `IAMap`.

<a name="IAMap_has"></a>
### `async IAMap#has(key)`

* `key` `(string|Uint8Array)`: A key to check for existence within this `IAMap`. See
  [`IAMap#set`](#IAMap_set) for details about acceptable `key` types.

* Returns:  `Promise<boolean>`: A `Promise` that resolves to either `true` or `false` depending on whether the `key` exists
  within this `IAMap`.

Asynchronously find and return a boolean indicating whether the given `key` exists within this `IAMap`

<a name="IAMap_delete"></a>
### `async IAMap#delete(key[, _cachedHash])`

* `key` `(string|Uint8Array)`: A key to remove. See [`IAMap#set`](#IAMap_set) for details about
  acceptable `key` types.
* `_cachedHash` `(Uint8Array, optional)`: for internal use

* Returns:  `Promise<IAMap<T>>`: A `Promise` that resolves to a new `IAMap` instance without the given `key` or the same `IAMap`
  instance if `key` does not exist within it.

Asynchronously create a new `IAMap` instance identical to this one but with `key` and its associated
value removed. If the `key` does not exist within this `IAMap`, this instance of `IAMap` is returned.

<a name="IAMap_size"></a>
### `async IAMap#size()`

* Returns:  `Promise<number>`: A `Promise` with a `number` indicating the number of key/value pairs within this `IAMap` instance.

Asynchronously count the number of key/value pairs contained within this `IAMap`, including its children.

<a name="IAMap_keys"></a>
### `async * IAMap#keys()`

* Returns:  `AsyncGenerator<Uint8Array>`: An async iterator that yields keys. All keys will be in `Uint8Array` format regardless of which
  format they were inserted via `set()`.

Asynchronously emit all keys that exist within this `IAMap`, including its children. This will cause a full
traversal of all nodes.

<a name="IAMap_values"></a>
### `async * IAMap#values()`

* Returns:  `AsyncGenerator<any>`: An async iterator that yields values.

Asynchronously emit all values that exist within this `IAMap`, including its children. This will cause a full
traversal of all nodes.

<a name="IAMap_entries"></a>
### `async * IAMap#entries()`

* Returns:  `AsyncGenerator<{key: Uint8Array, value: any}>`: An async iterator that yields objects with the properties `key` and `value`.

Asynchronously emit all { key, value } pairs that exist within this `IAMap`, including its children. This will
cause a full traversal of all nodes.

<a name="IAMap_ids"></a>
### `async * IAMap#ids()`

* Returns:  `AsyncGenerator<any>`: An async iterator that yields the ID of this `IAMap` and all of its children. The type of ID is
  determined by the backing store which is responsible for generating IDs upon `save()` operations.

Asynchronously emit the IDs of this `IAMap` and all of its children.

<a name="IAMap_toSerializable"></a>
### `IAMap#toSerializable()`

* Returns:  `SerializedNode|SerializedRoot`: An object representing the internal state of this local `IAMap` node, including its links to child nodes
  if any.

Returns a serialisable form of this `IAMap` node. The internal representation of this local node is copied into a plain
JavaScript `Object` including a representation of its data array that the key/value pairs it contains as well as
the identifiers of child nodes.
Root nodes (depth==0) contain the full map configuration information, while intermediate and leaf nodes contain only
data that cannot be inferred by traversal from a root node that already has this data (hashAlg and bucketSize -- bitWidth
is inferred by the length of the `map` byte array).
The backing store can use this representation to create a suitable serialised form. When loading from the backing store,
`IAMap` expects to receive an object with the same layout from which it can instantiate a full `IAMap` object. Where
root nodes contain the full set of data and intermediate and leaf nodes contain just the required data.
For content addressable backing stores, it is expected that the same data in this serialisable form will always produce
the same identifier.
Note that the `map` property is a `Uint8Array` so will need special handling for some serialization forms (e.g. JSON).

Root node form:
```
{
  hashAlg: number
  bucketSize: number
  hamt: [Uint8Array, Array]
}
```

Intermediate and leaf node form:
```
[Uint8Array, Array]
```

The `Uint8Array` in both forms is the 'map' used to identify the presence of an element in this node.

The second element in the tuple in both forms, `Array`, is an elements array a mix of either buckets or links:

* A bucket is an array of two elements, the first being a `key` of type `Uint8Array` and the second a `value`
  or whatever type has been provided in `set()` operations for this `IAMap`.
* A link is an object of the type that the backing store provides upon `save()` operations and can be identified
  with `isLink()` calls.

Buckets and links are differentiated by their "kind": a bucket is an array while a link is a "link" kind as dictated
by the backing store. We use `Array.isArray()` and `store.isLink()` to perform this differentiation.

<a name="IAMap_directEntryCount"></a>
### `IAMap#directEntryCount()`

* Returns:  `number`: A number representing the number of local entries.

Calculate the number of entries locally stored by this node. Performs a scan of local buckets and adds up
their size.

<a name="IAMap_directNodeCount"></a>
### `IAMap#directNodeCount()`

* Returns:  `number`: A number representing the number of direct child nodes

Calculate the number of child nodes linked by this node. Performs a scan of the local entries and tallies up the
ones containing links to child nodes.

<a name="IAMap_isInvariant"></a>
### `async IAMap#isInvariant()`

* Returns:  `Promise<boolean>`: A Promise with a boolean value indicating whether this IAMap is correctly formatted.

Asynchronously perform a check on this node and its children that it is in canonical format for the current data.
As this uses `size()` to calculate the total number of entries in this node and its children, it performs a full
scan of nodes and therefore incurs a load and deserialisation cost for each child node.
A `false` result from this method suggests a flaw in the implemetation.

<a name="IAMap_fromChildSerializable"></a>
### `IAMap#fromChildSerializable(id, serializable[, depth])`

* `id` `(any)`: An optional ID for the instantiated IAMap node. See [`iamap.fromSerializable`](#iamap__fromSerializable).
* `serializable` `(any)`: The serializable form of an IAMap node to be instantiated.
* `depth` `(number, optional, default=`0`)`: The depth of the IAMap node. See [`iamap.fromSerializable`](#iamap__fromSerializable).

A convenience shortcut to [`iamap.fromSerializable`](#iamap__fromSerializable) that uses this IAMap node instance's backing `store` and
configuration `options`. Intended to be used to instantiate child IAMap nodes from a root IAMap node.

<a name="iamap__isRootSerializable"></a>
### `iamap.isRootSerializable(serializable)`

* `serializable` `(any)`: An object that may be a serialisable form of an IAMap root node

* Returns:  `boolean`: An indication that the serialisable form is or is not an IAMap root node

Determine if a serializable object is an IAMap root type, can be used to assert whether a data block is
an IAMap before trying to instantiate it.

<a name="iamap__isSerializable"></a>
### `iamap.isSerializable(serializable)`

* `serializable` `(any)`: An object that may be a serialisable form of an IAMap node

* Returns:  `boolean`: An indication that the serialisable form is or is not an IAMap node

Determine if a serializable object is an IAMap node type, can be used to assert whether a data block is
an IAMap node before trying to instantiate it.
This should pass for both root nodes as well as child nodes

<a name="iamap__fromSerializable"></a>
### `iamap.fromSerializable(store, id, serializable[, options][, depth])`

* `store` `(Store<T>)`: A backing store for this Map. See [`iamap.create`](#iamap__create).
* `id` `(any)`: An optional ID for the instantiated IAMap node. Unlike [`iamap.create`](#iamap__create),
  `fromSerializable()` does not `save()` a newly created IAMap node so an ID is not generated for it. If one is
  required for downstream purposes it should be provided, if the value is `null` or `undefined`, `node.id` will
  be `null` but will remain writable.
* `serializable` `(any)`: The serializable form of an IAMap node to be instantiated
* `options` `(Options, optional, default=`null`)`: An options object for IAMap child node instantiation. Will be ignored for root
  node instantiation (where `depth` = `0`) See [`iamap.create`](#iamap__create).
* `depth` `(number, optional, default=`0`)`: The depth of the IAMap node. Where `0` is the root node and any `>0` number is a child
  node.

* Returns:  `IAMap<T>`

Instantiate an IAMap from a valid serialisable form of an IAMap node. The serializable should be the same as
produced by [`IAMap#toSerializable`](#IAMap_toSerializable).
Serialised forms of root nodes must satisfy both [`iamap.isRootSerializable`](#iamap__isRootSerializable) and [`iamap.isSerializable`](#iamap__isSerializable). For
root nodes, the `options` parameter will be ignored and the `depth` parameter must be the default value of `0`.
Serialised forms of non-root nodes must satisfy [`iamap.isSerializable`](#iamap__isSerializable) and have a valid `options` parameter and
a non-`0` `depth` parameter.

<a name="IAMap__isIAMap"></a>
### `IAMap.isIAMap(node)`

* `node` `(IAMap<T>|any)`

* Returns:  `boolean`

## License and Copyright

Copyright 2019 Rod Vagg

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
