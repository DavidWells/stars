---
repo: felipernb/algorithms.js
url: 'https://github.com/felipernb/algorithms.js'
homepage: 'http://felipernb.github.io/algorithms.js'
starredAt: '2016-12-16T17:35:54Z'
createdAt: '2014-02-10T00:04:28Z'
updatedAt: '2025-02-18T14:10:27Z'
language: JavaScript
license: MIT
branch: master
stars: 3728
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:51.186Z'
description: >-
  Atwood's Law applied to CS101 - Classic algorithms and data structures
  implemented in JavaScript
tags:
  - algorithms
  - binary-trees
  - data-structures
  - graph
  - javascript
  - sorting-algorithms
---

# algorithms.js

[![Build Status](https://travis-ci.org/felipernb/algorithms.js.svg?branch=master)](https://travis-ci.org/felipernb/algorithms.js)
[![Coverage Status](https://coveralls.io/repos/github/felipernb/algorithms.js/badge.svg?branch=master)](https://coveralls.io/github/felipernb/algorithms.js?branch=master)
[![Dependency Status](https://david-dm.org/felipernb/algorithms.js.svg)](https://david-dm.org/felipernb/algorithms.js)
[![devDependency Status](https://david-dm.org/felipernb/algorithms.js/dev-status.svg)](https://david-dm.org/felipernb/algorithms.js#info=devDependencies)
[![Inline docs](http://inch-ci.org/github/felipernb/algorithms.js.svg?branch=master)](http://inch-ci.org/github/felipernb/algorithms.js)
[![npm](https://img.shields.io/npm/dt/algorithms.svg?maxAge=2592000)](https://www.npmjs.com/package/algorithms)

![](http://www.quickmeme.com/img/8d/8d30a19413145512ad5a05c46ec0da545df5ed79e113fcf076dc03c7514eb631.jpg)


## Atwood's Law applied to CS101.

Classic algorithms and data structures implemented in JavaScript, you know... FOR SCIENCE.

### Installing
```
npm install --save algorithms
```

### Contents

#### Data Structures

```javascript
require('algorithms/data_structures');
// or
require('algorithms').DataStructures;
```
* AVLTree
* BST
* DisjointSetForest
* FenwickTree
* Graph
* HashTable
* Heap
  - MaxHeap
  - MinHeap
* LinkedList
* PriorityQueue
* Queue
* Set (HashSet)
* Stack
* Treap

#### Geometry algorithms

```javascript
require('algorithms/geometry');
// or
require('algorithms').Geometry;
```

* BezierCurve

#### Graph algorithms

```javascript
require('algorithms/graph');
// or
require('algorithms').Graph;
```

* breadthFirstSearch
* depthFirstSearch
* eulerPath
* topologicalSort

##### Shortest path
* bellmanFord
* bfsShortestPath
* dijkstra
* floydWarshall
* SPFA (Shortest Path Faster Algorithm)

##### Minimum spanning tree
* prim
* kruskal

#### Math algorithms

```javascript
require('algorithms/math');
// or
require('algorithms').Math;
```
* collatzConjecture
* extendedEuclidean
* fastPower
* fibonacci
* findDivisors
* fisherYates
* gcd (Greatest common divisor)
* greatestDifference
* lcm (Least common multiple)
* newtonSqrt
* nextPermutation
* powerSet
* reservoirSampling
* shannonEntropy

#### Search algorithms

```javascript
require('algorithms/search');
// or
require('algorithms').Search;
```

* bfs (breadth-first search for binary trees)
* binarySearch
* dfs (depth-first search for binary trees)
 * inOrder (default)
 * postOrder
 * preOrder

#### Sorting algorithms

```javascript
require('algorithms/sorting');
// or
require('algorithms').Sorting;
```

* bubbleSort
* countingSort
* heapSort
* insertionSort
* quicksort
* radixSort
* selectionSort
* shellSort
* shortBubbleSort

#### String algorithms

```javascript
require('algorithms/string');
// or
require('algorithms').String;
```

* hamming
* huffman
 * decode
 * encode
* knuthMorrisPratt
* levenshtein
* longestCommonSubsequence
* longestCommonSubstring
* rabinKarp

### Contributing

This project uses [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml) which can be a bit strict, but is really helpful in order to have more readable and less error-prone code
