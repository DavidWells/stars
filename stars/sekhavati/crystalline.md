---
repo: sekhavati/crystalline
url: 'https://github.com/sekhavati/crystalline'
homepage: ''
starredAt: '2021-01-02T05:41:23Z'
createdAt: '2020-09-26T11:18:15Z'
updatedAt: '2023-09-07T10:38:22Z'
language: TypeScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:10.789Z'
description: ':gem: A modern utility library with a strong emphasis on readability.'
tags:
  - crystalline
  - javascript
  - typescript
  - utilities
---

# Crystalline
> A modern utility library with a strong emphasis on readability. Make your code crystal clear.

Inspired by [Jest Matchers](https://jestjs.io/docs/en/using-matchers).

# Table of Contents

- [Introduction](#introduction)
- [Guiding Principles](#guiding-principles)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Arrays](#arrays)
  - [Objects](#objects)
  - [Numbers](#numbers)
  - [Misc](#misc)
- [Contributing](#contributing)

# Introduction

## The problem
Manipulating data is part and parcel of developing software, but the resulting code can quickly become difficult to read.
You want to minimise the complexity of your codebase to ensure it's doing what you intended and have the confidence 
to make changes in the future.
 
## The solution
[Jest Matchers](https://jestjs.io/docs/en/using-matchers) help make your tests easier to reason about. Crystalline takes 
this approach and applies it to your application code. It is a library of highly comprehensible functions that perform 
operations commonly found in code. 

# Guiding Principles

1) _**Readable code is maintainable code.**_ 
2) Write code as if you were writing a sentence. 
3) Don't reinvent the wheel when a readable native solution already exists.
4) Favour brevity but not at the expense of readability.

# Installation
NPM:
```shell script
npm install crystalline
```

Yarn:
```shell script
yarn add crystalline
```

# Usage
Import specific modules to reduce the size of your bundle:

```javascript
// ECMAScript modules
import { sort } from 'crystalline/arrays/sort';

// CommonJS
const { sort } = require('crystalline/arrays/sort');  

sort(...);
```

Alternatively you can import the whole library:

```javascript
// ECMAScript modules
import crystalline from 'crystalline';

// CommonJS
const crystalline = require('crystalline').default;

crystalline.arrays.sort(...);
```

# API Reference
The library organises its functions into *categories* based on the type of variable they primarily operate on. 
All functions within a category expect that type of variable as their first parameter. 
Functions are always [pure](https://en.wikipedia.org/wiki/Pure_function). 
Vocabulary is reused across categories to reduce the learning curve.

- [Arrays](#arrays)
- [Objects](#objects)
- [Numbers](#numbers)
- [Misc](#misc)

## `arrays`

- <strong>`alter`</strong>
    <details>
    <summary><code>byApplying</code></summary>
    <p>

     - <details>
       <summary><code>atIndex</code></summary>
       <p>
       <br/>          
       Create a new array by applying the function supplied at the given index.
   
       ```javascript
       const input = ["a", "b", "c", "d"];
   
       const result = alter(input)
         .byApplying((n) => n.toUpperCase())
         .atIndex(1);
   
       expect(result).toEqual(["a", "B", "c", "d"]);
       ```

       </p>
       </details>
  
    </p>
    </details>
    
    <details>
    <summary><code>byInsertingBetweenEachItem</code></summary>
    <p>
    <br/>          
    Create a new array with the value supplied inserted between each item.

    ```javascript
    const input = ["b", "n", "n", "s"];

    const result = alter(input).byInsertingBetweenEachItem("a");

    expect(result).toEqual(["b", "a", "n", "a", "n", "a", "s"]);
    ```

    </p>
    </details>
    
    <details>
    <summary><code>byMovingItemAtIndex</code></summary>
    <p>

     - <details>
       <summary><code>toIndex</code></summary>
       <p>
       <br/>          
       Create a new array with the item at the index specified moved to the chosen index.
   
       ```javascript
       const input = ["a", "b", "c", "d", "e", "f"];
   
       const result = alter(input).byMovingItemAtIndex(0).toIndex(2);
   
       expect(result).toEqual(["b", "c", "a", "d", "e", "f"]);
       ```
       
       </p>
       </details>
       
     - <details>
       <summary><code>toTheStart</code></summary>
       <p>
       <br/>          
       Create a new array with the item at the index specified moved to the start of the array.
   
       ```javascript
       const input = ["a", "b", "c", "d", "e", "f"];
       
       const result = alter(input).byMovingItemAtIndex(2).toTheStart();

       expect(result).toEqual(["c", "a", "b", "d", "e", "f"]);
       ```
       
       </p>
       </details>
       
     - <details>
       <summary><code>toTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array with the item at the index specified moved to the end of the array.
   
       ```javascript
        const input = ["a", "b", "c", "d", "e", "f"];

        const result = alter(input).byMovingItemAtIndex(2).toTheEnd();

        expect(result).toEqual(["a", "b", "d", "e", "f", "c"]);
       ```
       
       </p>
       </details>

    </p>
    </details>
    
    <details>
    <summary><code>byRemovingDuplicates</code></summary>
    <p>
    <br/>          
    Create a new array with any duplicates from the original removed.

    ```javascript
    const input1 = [1, 1, 2, 1];
    const input2 = [1, "1"];
    const input3 = [[42], [42]];
      
    const result1 = alter(input1).byRemovingDuplicates();
    const result2 = alter(input2).byRemovingDuplicates();
    const result3 = alter(input3).byRemovingDuplicates();
      
    expect(result1).toEqual([1, 2]);
    expect(result2).toEqual([1, "1"]); 
    expect(result3).toEqual([[42]]);
    ```

    </p>
    </details>
    
    <details>
    <summary><code>byRemovingItemsBetweenIndex</code></summary>
    <p>
    
     - <details>
       <summary><code>andIndex</code></summary>
       <p>
       <br/>          
       Create a new array with all items between the two indexes removed.
   
       ```javascript
       const input = [1, 2, 3, 4, 5, 6, 7, 8];
       
       const result = alter(input).byRemovingItemsBetweenIndex(2).andIndex(3);
       
       expect(result).toEqual([1, 2, 6, 7, 8]);
       ```
       
       </p>
       </details>  
       
     - <details>
       <summary><code>andTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array with all items between the index specified and the end removed.
   
       ```javascript
       const input = [1, 2, 3, 4, 5, 6, 7, 8];

       const result = alter(input).byRemovingItemsBetweenIndex(3).andTheEnd();

       expect(result).toEqual([1, 2, 3]);
       ```
       
       </p>
       </details>    

    </p>
    </details>

    <details>
    <summary><code>byRemovingItemsEqualTo</code></summary>
    <p>
    <br/>          
    Create a new array with any items matching those supplied removed.

    ```javascript
    const input = [1, 2, 1, 3, 4];
    
    const result = alter(input).byRemovingItemsEqualTo(1, 2);
  
    expect(result).toEqual([3, 4]);
    ```

    </p>
    </details>

    <details>
    <summary><code>byRemovingFalsyItems</code></summary>
    <p>
    <br/>          
    Create a new array with all falsy items removed.

    ```javascript
    const input = [
      "a",
      false,
      "b",
      null,
      "c",
      undefined,
      "d",
      0,
      "e",
      -0,
      "f",
      NaN,
      "g",
      "",
    ];

    const result = alter(input).byRemovingFalsyItems();

    expect(result).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
    ```

    </p>
    </details>

- <strong>`findItemsIn`</strong>
    <details>
    <summary><code>containedIn</code></summary>
    <p>
    <br/>          
    Create a new array containing only items that are present in both the first and second array.

    ```javascript
    const input1 = [1, 2, 3, 4];
    const input2 = [7, 6, 5, 4, 3];
    
    const result = findItemsIn(input1).containedIn(input2);
    
    expect(result).toEqual([3, 4]);
    ```

    </p>
    </details>

    <details>
    <summary><code>notContainedIn</code></summary>
    <p>
    <br/>          
    Create a new array containing only items from the first array that are not present in second array.

    ```javascript
    const input1 = [1, 2, 3, 4];
    const input2 = [7, 6, 5, 4, 3];
    
    const result = findItemsIn(input1).notContainedIn(input2);
    
    expect(result).toEqual([1, 2]);
    ```

    </p>
    </details>

    <details>
    <summary><code>thatAreUnique</code></summary>
    <p>
    <br/>          
    Create a new array containing items that are only present in one of the two input arrays.

    ```javascript
    const input1a = [1, 2, 3, 4];
    const input1b = [7, 6, 5, 4, 3];
  
    const result = findItemsIn(input1a).and(input1b).thatAreUnique();
  
    expect(result).toEqual([1, 2, 7, 6, 5]);
    ```

    </p>
    </details>

- <strong>`from`</strong>
    <details>
    <summary><code>pickQuantity</code></summary>
    <p>
            
     - <details>
       <summary><code>fromTheStart</code></summary>
       <p>
       <br/>          
       Create a new array containing the first N number of items from the input array.
           
       ```javascript
       const input = ["foo", "bar", "baz"];

       const result = from(input).pickQuantity(2).fromTheStart();
       
       expect(result).toEqual(["foo", "bar"]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>fromTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array containing the last N number of items from the input array.
           
       ```javascript
       const input = ["foo", "bar", "baz"];
       
       const result = from(input).pickQuantity(2).fromTheEnd();
       
       expect(result).toEqual(["bar", "baz"]);
       ```

       </p>
       </details>

     </p>
    </details>
    
    <details>
    <summary><code>pickWhile</code></summary>
    <p>
            
     - <details>
       <summary><code>fromTheStart</code></summary>
       <p>
       <br/>          
       Create a new array by selecting items from the start of the input array until the predicate returns false.
           
       ```javascript
        const input = [1, 2, 3, 4, 3, 2, 1];

        const result = from(input)
          .pickWhile((n) => n !== 4)
          .fromTheStart();

        expect(result).toEqual([1, 2, 3]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>fromTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array by selecting items from the end of the input array until the predicate returns false.
           
       ```javascript
        const input = [1, 2, 3, 4, 3, 2, 1];

        const result = from(input)
          .pickWhile((n) => n !== 4)
          .fromTheEnd();

        expect(result).toEqual([3, 2, 1]);
       ```

       </p>
       </details>

     </p>
    </details>

    <details>
    <summary><code>pickFirst</code></summary>
    <p>           
    <br/>          
    Return the first item from the input array.
                
    ```javascript
    const result = from(["fi", "fo", "fum"]).pickFirst();
    
    expect(result).toBe("fi");
    ```
     
    </p>
    </details>
    
    <details>
    <summary><code>pickLast</code></summary>
    <p>           
    <br/>          
    Return the last item from the input array.
                
    ```javascript
    const result = from(["fi", "fo", "fum"]).pickLast();
    
    expect(result).toBe("fum");
    ```
     
    </p>
    </details>
    
    <details>
    <summary><code>dropQuantity</code></summary>
    <p>
            
     - <details>
       <summary><code>fromTheStart</code></summary>
       <p>
       <br/>          
       Create a new array containing all items from the input array with the first N items removed.
           
       ```javascript
        const input = ["foo", "bar", "baz"];

        const result = from(input).dropQuantity(2).fromTheStart();

        expect(result).toEqual(["baz"]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>fromTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array containing all items from the input array with the last N items removed.
           
       ```javascript
       const input = ["foo", "bar", "baz"];
       
       const result = from(input).dropQuantity(2).fromTheEnd();

       expect(result).toEqual(["foo"]);
       ```

       </p>
       </details>

     </p>
    </details>

    <details>
    <summary><code>dropWhile</code></summary>
    <p>
            
     - <details>
       <summary><code>fromTheStart</code></summary>
       <p>
       <br/>          
       Create a new array by removing items from the start of the input array until the predicate returns false.
           
       ```javascript
       const input = [1, 2, 3, 4, 3, 2, 1];
        
       const result = from(input)
         .dropWhile((n) => n <= 2)
         .fromTheStart();

       expect(result).toEqual([3, 4, 3, 2, 1]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>fromTheEnd</code></summary>
       <p>
       <br/>          
       Create a new array by removing items from the end of the input array until the predicate returns false.
           
       ```javascript
       const input = [1, 2, 3, 4, 3, 2, 1];

       const result = from(input)
         .dropWhile((n) => n <= 3)
         .fromTheEnd();

       expect(result).toEqual([1, 2, 3, 4]);
       ```

       </p>
       </details>

     </p>
    </details>

    <details>
    <summary><code>dropFirst</code></summary>
    <p>           
    <br/>          
    Create a new array containing every item from the input array except the first.
                
    ```javascript
    const result = from(["fi", "fo", "fum"]).dropFirst();
    
    expect(result).toEqual(["fo", "fum"]);
    ```
     
    </p>
    </details>
    
    <details>
    <summary><code>dropLast</code></summary>
    <p>           
    <br/>          
    Create a new array containing every item from the input array except the last.
                
    ```javascript
    const result = from(["fi", "fo", "fum"]).dropLast();
          
    expect(result).toEqual(["fi", "fo"]);
    ```
     
    </p>
    </details>

    <details>
    <summary><code>dropConsecutiveRepeats</code></summary>
    <p>           
    <br/>          
    Create a new array containing every item from the input array with any consecutively repeated elements removed.
                
    ```javascript
    const input = [1, 1, 1, 2, 3, 4, 4, 2, 2];

    const result = from(input).dropConsecutiveRepeats();

    expect(result).toEqual([1, 2, 3, 4, 2]);
    ```
     
    </p>
    </details>
    
    <details>
    <summary><code>dropConsecutiveRepeatsSatisfying</code></summary>
    <p>           
    <br/>          
    Create a new array containing every item from the input array with any consecutive elements satisfying the predicate removed.
                
    ```javascript
    const input = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];

    const result = from(input).dropConsecutiveRepeatsSatisfying(
      (x, y) => Math.abs(x) === Math.abs(y)
    );

    expect(result).toEqual([1, 3, 4, -5, 3]);
    ```
     
    </p>
    </details>

- <strong>`sort`</strong>
    <details>
    <summary><code>ascendingByProperty</code></summary>
    <p>           
    <br/>          
    Create a new array with items from the input array sorted in ascending order by the given property.
                
    ```javascript
    const input = [
      { name: "Emma", age: 70 },
      { name: "Peter", age: 78 },
      { name: "Mikhail", age: 62 },
    ];

    const result = sort(input).ascendingByProperty("age");

    expect(result).toEqual([
      { name: "Mikhail", age: 62 },
      { name: "Emma", age: 70 },
      { name: "Peter", age: 78 },
    ]);
    ```
     
    </p>
    </details>

    <details>
    <summary><code>descendingByProperty</code></summary>
    <p>           
    <br/>          
    Create a new array with items from the input array sorted in descending order by a given property.
                
    ```javascript
    const input = [
      { name: "Emma", age: 70 },
      { name: "Peter", age: 78 },
      { name: "Mikhail", age: 62 },
    ];

    const result = sort(input).descendingByProperty("age");

    expect(result).toEqual([
      { name: "Peter", age: 78 },
      { name: "Emma", age: 70 },
      { name: "Mikhail", age: 62 },
    ]);
    ```
     
    </p>
    </details>

    <details>
    <summary><code>firstAscendingByProperty</code></summary>
    <p>
            
     - <details>
       <summary><code>thenAscendingByProperty</code></summary>
       <p>
       <br/>          
       Create a new array with items from the input array sorted in ascending order by the first property, then ascending by the second property.
           
       ```javascript
       const alice = {
         name: "alice",
         age: 40,
       };
       const bob = {
        name: "bob",
        age: 30,
       };
       const clara = {
         name: "clara",
         age: 40,
       };
        
       const input = [alice, bob, clara];
        
       const result = sort(input)
         .firstAscendingByProperty("age")
         .thenAscendingByProperty("name");
        
       expect(result).toEqual([bob, alice, clara]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>thenDescendingByProperty</code></summary>
       <p>
       <br/>          
       Create a new array with items from the input array sorted in ascending order by the first property, then descending by the second property.
           
       ```javascript
       const alice = {
         name: "alice",
         age: 40,
       };
       const bob = {
         name: "bob",
         age: 30,
       ;
       const clara = {
         name: "clara",
         age: 40,
       };
       
       const input = [clara, bob, alice];
       
       const result = sort(input)
         .firstAscendingByProperty("age")
         .thenDescendingByProperty("name");
       
       expect(result).toEqual([bob, clara, alice]);
       ```

       </p>
       </details>

     </p>
    </details>

    <details>
    <summary><code>firstDescendingByProperty</code></summary>
    <p>
            
     - <details>
       <summary><code>thenAscendingByProperty</code></summary>
       <p>
       <br/>          
       Create a new array with items from the input array sorted in descending order by the first property, then ascending by the second property.
           
       ```javascript
       const alice = {
         name: "alice",
         age: 40,
       };
       const bob = {
         name: "bob",
         age: 30,
       };
       const clara = {
         name: "clara",
         age: 40,
       };
       
       const input = [clara, bob, alice];

       const result = sort(input)
         .firstDescendingByProperty("age")
         .thenAscendingByProperty("name");

       expect(result).toEqual([alice, clara, bob]);
       ```

       </p>
       </details>
     
     - <details>
       <summary><code>thenDescendingByProperty</code></summary>
       <p>
       <br/>          
       Create a new array with items from the input array sorted in descending order by the first property, then descending by the second property.
           
       ```javascript
       const alice = {
         name: "alice",
         age: 40,
       };
       const bob = {
         name: "bob",
         age: 30,
       };
       const clara = {
         name: "clara",
         age: 40,
       };
       
       const input = [clara, bob, alice];

       const result = sort(input)
         .firstDescendingByProperty("age")
         .thenDescendingByProperty("name");

       expect(result).toEqual([clara, alice, bob]);
       ```

       </p>
       </details>

     </p>
    </details>

- <strong>`split`</strong>
    <details>
    <summary><code>atFirstEncounterOf</code></summary>
    <p>           
    <br/>          
    Create a new array that contains two arrays after splitting the original at the first point where the predicate holds true.
                
    ```javascript
    const input = [1, 2, 3, 1, 2, 3];

    const result = split(input).atFirstEncounterOf((n) => n === 2);

    expect(result).toEqual([[1], [2, 3, 1, 2, 3]]);
    ```
     
    </p>
    </details>

    <details>
    <summary><code>atIndex</code></summary>
    <p>           
    <br/>          
    Create a new array that contains two arrays after splitting the original at the index specified.
                
    ```javascript
    const input = [1, 2, 3];
    
    const result = split(input).atIndex(1);
    
    expect(result).toEqual([[1], [2, 3]]);
    ```
     
    </p>
    </details>    
    
    <details>
    <summary><code>byItemsSatisfying</code></summary>
    <p>           
    <br/>          
    Create a new array that contains two arrays after separating the contents of the original into items that satisfy the predicate and those that don't.
                
    ```javascript
    const input = ["sss", "ttt", "foo", "bars"];
    
    const result = split(input).byItemsSatisfying((n) => n.includes("s"));
    
    expect(result).toEqual([
      ["sss", "bars"],
      ["ttt", "foo"],
    ]);
    ```
     
    </p>
    </details>    
    
    <details>
    <summary><code>everyNthIndex</code></summary>
    <p>           
    <br/>          
    Create a new array that contains multiple other arrays that are the result of splitting the original every N items.
                
    ```javascript
    const input = [1, 2, 3, 4, 5, 6, 7];
    
    const result = split(input).everyNthIndex(3);
    
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    ```
     
    </p>
    </details>

- <strong>`tally`</strong>
    <details>
    <summary><code>byApplying</code></summary>
    <p>           
    <br/>          
    Create an object that contains a count of elements in an array according to how many match a key generated by the supplied function.
                
    ```javascript
    const input = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];

    const result = tally(input).byApplying(Math.floor);

    expect(result).toEqual({ 1: 3, 2: 2, 3: 1 });
    ```
     
    </p>
    </details>    

## `objects`

- <strong>`alter`</strong>
    <details>
    <summary><code>byApplying</code></summary>
    <p>
            
     - <details>
       <summary><code>toKey</code></summary>
       <p>
       <br/>          
       Create a new object that is a copy of the original but with the transformation applied to the key specified.
           
       ```javascript
       const input = {
         firstName: "  Tomato ",
         data: { elapsed: 100, remaining: 1400 },
         id: 123,
       };

       const result = alter(input)
         .byApplying((n) => n.trim())
         .toKey("firstName");

       expect(result).toEqual({
         firstName: "Tomato",
         data: { elapsed: 100, remaining: 1400 },
         id: 123,
       });
       ```

       </p>
       </details>
    
     </p>
     </details> 

- <strong>`copy`</strong>
    <details>
    <summary><code>deeply</code></summary>
    <p>           
    <br/>          
    Create a deep copy of the object including any nested objects. 
                
    ```javascript
    const input = {
      a: [1, 2, 3],
      b: "foo",
      c: {
        c1: 123,
      },
    };

    const result = copy(input).deeply();

    expect(input).toEqual(result);

    // Referential checks
    expect(input !== result).toBe(true);
    expect(input.a !== result.a).toBe(true);
    expect(input.c !== result.c).toBe(true);
    ```
     
    </p>
    </details>   
    
    <details>
    <summary><code>discardKeys</code></summary>
    <p>           
    <br/>          
    Create a partial copy of the object omitting the keys specified. 
                
    ```javascript
    const input = { a: 1, b: 2, c: 3, d: 4 };
    
    const result = copy(input).discardKeys("a", "d");
    
    expect(result).toEqual({ b: 2, c: 3 });
    ```
     
    </p>
    </details>   
    
    <details>
    <summary><code>keepKeys</code></summary>
    <p>           
    <br/>          
    Create a partial copy of an object containing only the keys specified. 
                
    ```javascript
    const input = { a: 1, b: 2, c: 3, d: 4 };

    const result = copy(input).keepKeys("a", "c");

    expect(result).toEqual({ a: 1, c: 3 });
    ```
     
    </p>
    </details>   

- <strong>`merge`</strong>
    <details>
    <summary><code>deeplyWith</code></summary>
    <p>
            
     - <details>
       <summary><code>resolvingConflictsViaFirstObject</code></summary>
       <p>
       <br/>          
       Create a new object with all properties from the input objects, using values from the first object when the same keys exist in both.
           
       ```javascript
       const obj1 = {
         name: "fred",
         age: 10,
         contact: { email: "moo@example.com" },
       };
       const obj2 = {
         age: 40,
         hair: "blonde",
         contact: { email: "baa@example.com" },
       };

       const result = merge(obj1)
         .deeplyWith(obj2)
         .resolvingConflictsViaFirstObject();

       expect(result).toEqual({
         name: "fred",
         age: 10,
         hair: "blonde",
         contact: { email: "moo@example.com" },
       });
       ```

       </p>
       </details>
       
     - <details>
       <summary><code>resolvingConflictsViaSecondObject</code></summary>
       <p>
       <br/>          
       Create a new object with all properties from the input objects, using values from the second object when the same keys exist in both.
           
       ```javascript
       const obj1 = {
         name: "fred",
         age: 10,
         contact: { email: "moo@example.com" },
       };
       const obj2 = {
         age: 40,
         hair: "blonde",
         contact: { email: "baa@example.com" },
       };

       const result = merge(obj1)
         .deeplyWith(obj2)
         .resolvingConflictsViaSecondObject();

       expect(result).toEqual({
         name: "fred",
         age: 40,
         hair: "blonde",
         contact: { email: "baa@example.com" },
       });
       ```

       </p>
       </details>

     - <details>
       <summary><code>resolvingConflictsByApplying</code></summary>
       <p>
       <br/>          
       Create a new object with all properties from the input objects, using the resolver function to derive a value for keys that exist in both.
           
       ```javascript
       const obj1 = { a: true, c: { values: [10, 20] } };
       const obj2 = { b: true, c: { values: [15, 35] } };
  
       const result = merge(obj1)
         .deeplyWith(obj2)
         .resolvingConflictsByApplying((x, y) => [...x, ...y]);
  
       expect(result).toEqual({
         a: true,
         b: true,
         c: { values: [10, 20, 15, 35] },
       });
       ```

       </p>
       </details>
    
     </p>
     </details> 

## `numbers`

- <strong>`clamp`</strong>
    <details>
    <summary><code>between</code></summary>
    <p>           
    <br/>          
    Restrict a number to be within the range specified. 
                
    ```javascript
    expect(clamp(-5).between(1, 10)).toBe(1);
    expect(clamp(15).between(1, 10)).toBe(10);
    expect(clamp(4).between(1, 10)).toBe(4);
    ```
     
    </p>
    </details>

## `misc`

- <strong>`sequenceFrom`</strong>
    <details>
    <summary><code>startingWith</code></summary>
    <p>
            
     - <details>
       <summary><code>untilCondition</code></summary>
       <p>
       <br/>          
       Create an array of items using the rule and seed value up until the terminator condition is met.
       
       :warning: Ensure your rule function is [pure](https://en.wikipedia.org/wiki/Pure_function) and terminator 
       condition will always be met, otherwise you risk creating an infinite loop. 
           
       ```javascript
       const rule = (n: number) => Math.pow(n, 2);
       const terminator = (n: number) => n > 1e10;
       const seed = 10;

       const result = sequenceFrom(rule)
         .startingWith(seed)
         .untilCondition(terminator);

       expect(result).toEqual([10, 100, 10000, 100000000]);
       ```

       </p>
       </details>
    
    </p>
    </details>

# Contributing
Thank you for thinking about contributing to Crystalline, we welcome all feedback and collaboration from the community. 
We don't want the process to be laborious, so we've kept our contributing guide reeeeally short. Please take a moment 
to read through it as doing so will help ensure the library remains consistent as it grows.

[Contributing Guide](./CONTRIBUTING.md)

