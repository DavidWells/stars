---
repo: sdawood/dynamo-update-expression
url: 'https://github.com/sdawood/dynamo-update-expression'
homepage: 'https://www.npmjs.com/package/dynamo-update-expression'
starredAt: '2024-12-29T00:31:53Z'
createdAt: '2017-07-14T08:55:23Z'
updatedAt: '2024-12-29T00:31:53Z'
language: JavaScript
license: MIT
branch: develop
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.062Z'
description: Generate DynamoDB Update Expression by diff-ing original and updated documents
tags:
  - diff
  - dynamodb
  - expression
  - lock
  - optimisitc
  - update
  - version
---

master|develop
---|---
[![Build Status](https://travis-ci.org/sdawood/dynamo-update-expression.svg?branch=master)](https://travis-ci.org/sdawood/dynamo-update-expression)|[![Build Status](https://travis-ci.org/sdawood/dynamo-update-expression.svg?branch=develop)](https://travis-ci.org/sdawood/dynamo-update-expression)

# dynamo-update-expression


Generate DynamoDB Update Expression by diff-ing original and updated/modified documents.

Allows for generating update expression with no-orphans (create new intermediate nodes as you go) or deep paths (ideal for *predefined* document structure), more on that in the examples below.

Optionally include a condition expression with your update to utilize [Optimistic Locking With Version Number](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.OptimisticLocking.html)

**Try it out `online`** [here](https://npm.runkit.com/dynamo-update-expression)

```js
const due = require('dynamo-update-expression');

due.getUpdateExpression({original, modified, ...options});

due.getVersionedUpdateExpression({original, modified, versionPath: '$.path.to.version', condition: '='});

due.getVersionLockExpression({newVersion: expiryTimeStamp, condition: '<'});

// Bonus! general purpose diff and patch projections

const {ADD, DELETE, SET} = due.diff(original, modified /* orphans = false*/);
// returns list(s) of {path, value} pairs

const {ADD, DELETE, SET} = due.patches(original, modified, orphans = false);
// returns a materialized object for each change-set, useful for logging/auditing
```

See the options available below:

## Installation

  ```sh
  npm install dynamo-update-expression --save
  ```

## Usage

  ```js
  const due = require('dynamo-update-expression');

  const original = {...};
  const modified = {...};

  const updateExpression = due.getUpdateExpression({original, modified});

  // Use Case 1: Straight forward diff between original and modified (added, modified, removed) attributes are discovered

  // Use Case 2: To conditionally update only if the current version in DynamoDB has not changed since original was loaded

  const versionedUpdateExpression = due.getVersionedUpdateExpression({original, modified, condition: '='});

  // Conditional updates (Optimistic Version Locking)

  // To conditionally update if the new value is greater than the value in DynamoDB
  const versionedUpdateExpression = due.getVersionedUpdateExpression({original, modified, useCurrent: false, condition: '<'});

  // Use Case 3: TRY-LOCK behaviour

  // To validate that the range you are about to process hasn't been processed by a different worker
  const rangeStart = 1000;
  const updateExpression = due.getVersionLockExpression({
      versionPath: '$.path.to.rangeAttribute',
      newVersion: rangeStart,
      condition: '<'
  });

  // To `TRY-LOCK` the next 5 min, where other clients can't obtain the lock (using a similar expression), without loading `current` record
  const expiry = +new Date() + (5 * 1000 * 60)
  const lockUpdateExpression = due.getVersionLockExpression({newVersion: expiry, condition: '<'});

  ```

Where original and modified are JSON compatible objects.

##### For example:

  Original JSON:

  ```js
  const original = {
       id: 123,
       title: 'Bicycle 123',
       description: '123 description',
       bicycleType: 'Hybrid',
       brand: 'Brand-Company C',
       price: 500,
       color: ['Red', 'Black'],
       productCategory: 'Bicycle',
       inStok: true,
       quantityOnHand: null,
       relatedItems: [341, 472, 649],
       pictures: {
           frontView: 'http://example.com/products/123_front.jpg',
           rearView: 'http://example.com/products/123_rear.jpg',
           sideView: 'http://example.com/products/123_left_side.jpg'
       },
       productReview: {
           fiveStar: [
               "Excellent! Can't recommend it highly enough! Buy it!",
               'Do yourself a favor and buy this.'
           ],
           oneStar: [
               'Terrible product! Do no buy this.'
           ]
       },
       comment: 'This product sells out quickly during the summer',
       'Safety.Warning': 'Always wear a helmet' // attribute name with `.`
   };
  ```

  Modified JSON:

  ```js
  const modified = {
       id: 123,
       // title: 'Bicycle 123', // DELETED
       description: '123 description',
       bicycleType: 'Hybrid',
       brand: 'Brand-Company C',
       price: 600, // UPDATED
       color: ['Red', undefined, 'Blue'], // ADDED color[2] = 'Blue', REMOVED color[1] by setting to undefined, never pop, see why this is bestter below
       productCategory: 'Bicycle',
       inStok: false, // UPDATED boolean true => false
       quantityOnHand: null, // No change, was null in original, still null. DynamoDB recognizes null.
       relatedItems: [100, null, 649], // UPDATE relatedItems[0], REMOVE relatedItems[1], always nullify or set to undefined, never pop
       pictures: {
           frontView: 'http://example.com/products/123_front.jpg',
           rearView: 'http://example.com/products/123_rear.jpg',
           sideView: 'http://example.com/products/123_right_side.jpg' // UPDATED Map item
       },
       productReview: {
           fiveStar: [
               "", // DynamoDB doesn't allow empty string, would be REMOVED
               'Do yourself a favor and buy this.',
               'This is new' // ADDED *deep* list item
           ],
           oneStar: [
               'Actually I take it back, it is alright' // UPDATED *deep* List item
           ]
       },
       comment: 'This product sells out quickly during the summer',
       'Safety.Warning': 'Always wear a helmet, ride at your own risk!' // UPDATED attribute name with `.`
   };
  ```



The returned "UpdateExpression" object would be:

```
{
    "UpdateExpression":
    "SET #color[2] = :color2, #productReview.#fiveStar[2] = :productReviewFiveStar2,
    #inStok = :inStok, #pictures.#sideView = :picturesSideView, #price = :price,
    #productReview.#oneStar[0] = :productReviewOneStar0, #relatedItems[0] = :relatedItems0,
    #safetyWarning = :safetyWarning
    REMOVE #color[1], #productReview.#fiveStar[0], #relatedItems[1], #title", // NOTE: line wrapped here for readability. Genertated UpdateExpression does not include new lines

    "ExpressionAttributeNames": {
        "#color": "color",
        "#fiveStar": "fiveStar",
        "#inStok": "inStok",
        "#oneStar": "oneStar",
        "#pictures": "pictures",
        "#price": "price",
        "#productReview": "productReview",
        "#relatedItems": "relatedItems",
        "#safetyWarning": "Safety.Warning",
        "#sideView": "sideView",
        "#title": "title"
    },
    "ExpressionAttributeValues": {
        ":color2": "Blue",
        ":inStok": false,
        ":picturesSideView": "http://example.com/products/123_right_side.jpg",
        ":price": 600,
        ":productReviewFiveStar2": "This is new",
        ":productReviewOneStar0": "Actually I take it back, it is alright",
        ":relatedItems0": 100,
        ":safetyWarning": "Always wear a helmet, ride at your own risk!"
    }
}
```

## How to REMOVE item at \[index\] from a list
For best results, never pop or splice a list to remove an item; doing so would collapse the list and shift the indexes down by the number of removed items, effectively changing the item identifier.
If the list indexes can't be trusted to generate the SET/ADD/REMOVE expressions, the only possible solution would be to include a version of the original list
minus the removed values, - usually by comparing values, since the indexes would be meaningless - then SET the #list to the new :list.
Something that would not be ideal in the case of lists with a large number of items.

`dynamo-update-expression` assumes that you know better not to splice your lists, it detects nullified items (set to null or undefined) and strings set to empty string ""

**Note: DynamoDB doesn't allow a value to be an empty string and would remove an attribute if you set the value to ""**

The benefit of nullifying/emptying List items is double fold. Firstly, we are able to generate a precise update expression that only REMOVE the targeted items.
Thus avoiding the sub-optimal solution of including a merged list of (all - removed) or worse risk overwriting the whole list in case of an unstable merge/diff of the lists.
In addition, it is almost always a good idea to preserve the structure of the document, by keeping empty collections (List/Map) in this case contrary to deleting the empty collection, as some other solutions would do if the list is empty.
Deleting the collection would force your code to do null-checking in future reads instead of the functional-style iteration over collections with the safety of no-op in case they turn out to be empty.

I'd even go further and suggest that you nullify values - not delete keys - for Map child nodes/leaves, if you would like to preserve the document structure and avoid null-checking in subsequent reads as discussed.

As a rule of thumb, for Lists, always nullify (set to `null` or `undefined`) or empty the strings (set to ""), the update expression would detect and precisely (generate expression to) remove those elements by index.
DynamoDB eventually collapses your list on the server side after removing the selected indexes.
For Maps (object keys), you are free to delete the key or to nullify/empty the values. The real decision is, would you prefer to delete a composite node (a parent Map node) e.g. `productReviews`, or you'd rather preserve even if it would end up an empty `Map {}` (or empty `Lists []` in the case above).
Choose the earlier for free style document store and the latter for schema-like document structure where the processor expects some structure or prefers to follow a functional iterator/enumeration style vs null/undefined checking in if/else blocks.


## API
### getUpdateExpression({original, modified, orphans = false})
Generates a comprehensive update expression for added, modified, and removed attributes at any arbitrary deep paths

Parameters:
- `original`: original document, either fully loaded from dynamodb or a partial projection.
- `modified`: document that includes additions, modifications and deletes
- `orphans`: Use orphans = false (default) when you are using DynamoDB to store free style document structure.
DynamoDB doesn't allow SET operations on a deep path if some levels are missing. By using orphans = false, *dynamo-update-expression* would make sure to produce
SET expressions for the first ancestor node that is not in your original document. This can go as deep as required.

##### Example: getUpdateExpression({original, modified/\*, orphans = false\*/})
```js
const partial = {
    id: 123,
    title: 'Bicycle 123',
    inStock: false,
    description: '123 description'
};
const modified = {
    id: 123,
    title: 'Bicycle 123',
    inStock: true,
    stock: 10,
    description: 'modified 123 description',
    pictures: {
        topView: 'http://example.com/products/123_top.jpg'
    }
};

const updateExpression = due.getUpdateExpression({original: partial, modified});
/** generates:
{
    "ExpressionAttributeNames": {
        "#description": "description",
        "#inStock": "inStock",
        "#pictures": "pictures",
        "#stock": "stock"
    },
    "ExpressionAttributeValues": {
        ":description": "modified 123 description",
        ":inStock": true,
        ":pictures": {
            "topView": "http://example.com/products/123_top.jpg"
        },
        ":stock": 10
    },
    "UpdateExpression": "SET #pictures = :pictures, #stock = :stock, #description = :description, #inStock = :inStock"
}
**/
```

Notice how `SET #pictures = :pictures` was generated, where `:pictures` value includes the whole new node as a new value. While this would successfully preserve your changes, you would be overwriting any existing Map at the path $.pictures.
Of course if your *original* document was freshly loaded from DynamoDB, then you have nothing to worry about, only the new nodes would be added.

In case you know that you are starting with a *partial* document, you would need to make a choice, to allow orphans and preserve any possible Map/List at the path,
or to overwrite the whole node with your update.
By default, the module would generates an update expression that won't be considered *invalid* by DynamoDB for including path with levels not existing in your table,
i.e. if `SET #pictures.#topView` is used, and your DynamoDB Document didn't have `pictures` map, you would get an error: "The document path provided in the update expression is invalid for update" when you call `documentClient.update(...updateExpression)` .

In the use cases where your document has a predefined structure, and you won't want to allow free-style additions and you need to make sure that partial updates for valid deep paths are not overwriting parent nodes, set `orphans = true`.

Here is the same example with *orphans = true*

##### Example: getUpdateExpression({original, modified, orphans = true})
```js
const partial = {
    id: 123,
    title: 'Bicycle 123',
    inStock: false,
    description: '123 description'
};
const modified = {
    id: 123,
    title: 'Bicycle 123',
    inStock: true,
    stock: 10,
    description: 'modified 123 description',
    pictures: {
        topView: 'http://example.com/products/123_top.jpg'
    }
};

const updateExpression = due.getUpdateExpression({original: partial, modified, orphans: true});
/** generates:
{
    "ExpressionAttributeNames": {
        "#description": "description",
        "#inStock": "inStock",
        "#pictures": "pictures",
        "#stock": "stock",
        "#topView": "topView"
    },
    "ExpressionAttributeValues": {
        ":description": "modified 123 description",
        ":inStock": true,
        ":picturesTopView": "http://example.com/products/123_top.jpg",
        ":stock": 10
    },
    "UpdateExpression": "SET #pictures.#topView = :picturesTopView, #stock = :stock, #description = :description, #inStock = :inStock"
}
**/
```

Notice how `SET #pictures.#topView = :picturesTopView` was used. This would successfully set this attribute into an existing Map, or error if the parent path does not exist in your document.

Again, this behavior can go as deep as required, for example:

##### Example: Deep addition (into a possibly partial document) default behaviour
```js
const partial = {
    id: 123,
    title: 'Bicycle 123',
    inStock: false,
    description: '123 description'
};
const modified = {
    id: 123,
    title: 'Bicycle 123',
    inStock: true,
    stock: 10,
    description: 'modified 123 description',
    productReview: {
        fiveStar: {
            comment: 'Such a fantastic item!'
        }
    }
};

const updateExpression = due.getUpdateExpression({original: partial, modified});
/** generates:
{
    "ExpressionAttributeNames": {
        "#description": "description",
        "#inStock": "inStock",
        "#productReview": "productReview",
        "#stock": "stock"
    },
    "ExpressionAttributeValues": {
        ":description": "modified 123 description",
        ":inStock": true,
        ":productReview": {
            "fiveStar": {
                "comment": "Such a fantastic item!"
            }
        },
        ":stock": 10
    },
    "UpdateExpression": "SET #productReview = :productReview, #stock = :stock, #description = :description, #inStock = :inStock"
}
**/
```

Notice: `SET #productReview = :productReview` where `":productReview": { "fiveStar": { "comment": "Such a fantastic item!" } }`

##### Example: Deep addition (into a possibly partial document) orphans = true behavior

```js
const partial = {
    id: 123,
    title: 'Bicycle 123',
    inStock: false,
    description: '123 description'
};
const modified = {
    id: 123,
    title: 'Bicycle 123',
    inStock: true,
    stock: 10,
    description: 'modified 123 description',
    productReview: {
        fiveStar: {
            comment: 'Such a fantastic item!'
        }
    }
};

const updateExpression = due.getUpdateExpression({original: partial, modified, orphans: true});
/** generates:
{
    "ExpressionAttributeNames": {
        "#comment": "comment",
        "#description": "description",
        "#fiveStar": "fiveStar",
        "#inStock": "inStock",
        "#productReview": "productReview",
        "#stock": "stock"
    },
    "ExpressionAttributeValues": {
        ":description": "modified 123 description",
        ":inStock": true,
        ":productReviewFiveStarComment": "Such a fantastic item!",
        ":stock": 10
    },
    "UpdateExpression": "SET #productReview.#fiveStar.#comment = :productReviewFiveStarComment, #stock = :stock, #description = :description, #inStock = :inStock"
}
**/
```

Notice: `SET #productReview.#fiveStar.#comment = :productReviewFiveStarComment` where `":productReviewFiveStarComment": "Such a fantastic item!",`

The choice is yours depending on how you want the structure of your document to be, allowing free-style updates or only allowing strict-schema-like updates

### getVersionedUpdateExpression({original = {}, modified = {}, versionPath = '$.version', useCurrent = true, condition = '=', orphans = false, currentVerion})
Generates a conditional update expression that utilizes DynamoDB's guarantee for [Optimistic Locking With Version Number](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.OptimisticLocking.html) to make sure that updates are not lost or applied out of order and that stale data is not being used for modifications.
Always remember that you can choose any attribute to be your version attribute, no matter how deeply embedded in the document.

Parameters:
- `original`: original document, either fully loaded from DynamoDB or a partial projection.
- `modified`: document that includes additions, modifications and deletes
- `versionPath`: JSONPATH path to your version attribute of choice, default: '$.version'
- `useCurrent`: if true, the value @ versionPath is read from original document is used in the condition expression, otherwise, the modified version is used.
- `condition`: currently supporting simple binary operators kind of string, condition expression would be for example: #version = :version, meaning the version attribute in DynamoDB < the selected version value (current or new)
- `orphans`: see above.
- `currentVersion`: Optional. If passed, allows your code to override reading currentVersion from original document, see example below.

##### Example: Only update if version in DynamoDB is (*still*) equal to original document
```js
const original = {parent: {child: 'original value'}, version: 1};
const modified = {parent: {child: 'new value'}, version: 2};
const updateExpression = due.getVersionedUpdateExpression({
    original, modified,
    condition: '='
});

/** generates:
{
    "ConditionExpression": "#expectedVersion = :expectedVersion",
    "ExpressionAttributeNames": {
        "#child": "child",
        "#expectedVersion": "version",
        "#parent": "parent",
        "#version": "version"
    },
    "ExpressionAttributeValues": {
        ":expectedVersion": 1,
        ":parentChild": "new value",
        ":version": 2
    },
    "UpdateExpression": "SET #parent.#child = :parentChild, #version = :version"
}
**/
```

If the condition is not met, the update fails with `ConditionalCheckFailedException` Error. The client can choose to refresh his copy to the latest version (by re-loading from DynamoDB) before trying again.

##### Example: Only update if version in DynamoDB does not exist (no need to pre-load original document)
```js
const modified = {coupon: {code: 'HG74XSD'}, price: 10};
const updateExpression = due.getVersionedUpdateExpression({
    modified,
    versionPath: '$.coupon.code'
});

/** generates:
{
  "ConditionExpression": "attribute_not_exists (#expectedCoupon.#expectedCode)",
  "ExpressionAttributeNames": {
    "#coupon": "coupon",
    "#expectedCode": "code",
    "#expectedCoupon": "coupon",
    "#price": "price"
  },
  "ExpressionAttributeValues": {
    ":coupon": {
      "code": "HG74XSD"
    },
    ":price": 10
  },
  "UpdateExpression": "SET #coupon = :coupon, #price = :price"
}
**/
```

##### Example: Try-Lock next 5 minutes if current expiry < now
```js
const partial = { expiry: 1499758452832 }; // now
const modified = { expiry: 1499762052832}; // now + 5 min
const updateExpression = due.getVersionedUpdateExpression({
    original: partial,
    modified,
    versionPath: '$.expiry',
    condition: '<'
});
/** generates:
{
    "ConditionExpression": "#expectedExpiry < :expectedExpiry",
    "ExpressionAttributeNames": {
        "#expectedExpiry": "expiry",
        "#expiry": "expiry"
    },
    "ExpressionAttributeValues": {
        ":expectedExpiry": 1499758452832,
        ":expiry": 1499762052832
    },
    "UpdateExpression": "SET #expiry = :expiry"
}
**/
```

Client would ideally `wait` and try again to lock the range if update failed.
Behavior is inspired by [this post](http://vilkeliskis.com/articles/distributed-locks-with-dynamodb) and yields same behavior.

##### Advanced Examples

##### Example: override condition default prefix `expected`
Notice how condition attributes are auto-prefixed with `expected` and camelCased. In general this approach is safer to avoid name/value alias collision, especially in the use cases where you SET version attribute to some new value, while your condition uses current.
In case you want to override the prefix, you can, as follows:
```js
const modified = {coupon: {code: 'HG74XSD'}, price: 10};
const updateExpression = due.getVersionedUpdateExpression({
    modified,
    versionPath: '$.coupon.code',
    orphans: true,
    aliasContext: {prefix: ''}
});

/** generates:
{
    "ConditionExpression": "attribute_not_exists (#coupon.#code)",
    "ExpressionAttributeNames": {
        "#code": "code",
        "#coupon": "coupon",
        "#price": "price"
    },
    "ExpressionAttributeValues": {
        ":couponCode": "HG74XSD",
        ":price": 10
    },
    "UpdateExpression": "SET #coupon.#code = :couponCode, #price = :price"
}
**/
```

##### Example: Override current version not_exists detection by overriding currentVerion using `currentVersion` paramter
```js
const modified = {coupon: {code: 'HG74XSD'}, price: 10};
const updateExpression = due.getVersionedUpdateExpression({
    modified,
    versionPath: '$.coupon.code',
    orphans: true,
    useCurrent: false,
    currentVersion: 'N/A', // any truthy value would do. We don't have to pre-load original document, but we want to check for inequality not `not_exists`
    condition: '<>'
});

/** generates:
{
    "ConditionExpression": "#expectedCoupon.#expectedCode <> :expectedCouponCode",
    "ExpressionAttributeNames": {
        "#code": "code",
        "#coupon": "coupon",
        "#expectedCode": "code",
        "#expectedCoupon": "coupon",
        "#price": "price"
    },
    "ExpressionAttributeValues": {
        ":couponCode": "HG74XSD",
        ":expectedCouponCode": "HG74XSD",
        ":price": 10
    },
    "UpdateExpression": "SET #coupon.#code = :couponCode, #price = :price"
}
**/
```

## Sugar
For use cases where the version attribute is always incrementing e.g. processing start index.
Also useful for auto-incrementing version, with backward compatibility with documents that were not initially versioned.

### getVersionLockExpression({original, versionPath = '$.version', newVersion = undefined, condition = '=', orphans = false} = {})
Generates a version check/lock expression.
Useful to implement Try-Lock behaviour by locking an expiry range, or a processing range in first-winner takes it all style.
Can be used auto-version records, taking backward compatibility into consideration. See examples.

Parameters:
- `original`: original document. Optional in many of the use cases
- `versionPath`: JSONPATH path to your version attribute of choice, default: '$.version'
- `newVersion`: new value for the version attribute. Optional in auto-versioning use cases.
- `condition`: simple binary operato, condition expression would be for example: #version = :version, meaning the version attribute in DynamoDB < the selected version value (current or new)
- `orphans`: see above.

##### Example: version-lock with auto versioning and backward compatibility
```js
const updateExpression = due.getVersionLockExpression({});
/** geneates:
{
    "ConditionExpression": "attribute_not_exists (#expectedVersion)",
    "ExpressionAttributeNames": {
        "#expectedVersion": "version",
        "#version": "version"
    },
    "ExpressionAttributeValues": {
        ":version": 1
    },
    "UpdateExpression": "SET #version = :version"
}
**/
```

##### Example: conditional update expression for version-lock with new version auto-incremented value
```js
const original = {version: 1}; // can be arbitrary complex document, simplifeid for the sake of clarity
const updateExpression = due.getVersionLockExpression({
   original,
   condition: '='
});

/** generates:
{
   ConditionExpression: '#expectedVersion = :expectedVersion',
   ExpressionAttributeNames: {'#expectedVersion': 'version', '#version': 'version'},
   ExpressionAttributeValues: {':expectedVersion': 1, ':version': 2},
   UpdateExpression: 'SET #version = :version'
}
**/
```
Notice above a use case where condition attribute value had to be aliased (prefixed) since there are two values for the same attribute in the UpdateExpression


##### Example: Try-Lock-Range (always incrementing) use case
```js
const newStart = 1000;
const updateExpression = due.getVersionLockExpression({
    versionPath: '$.start',
    newVersion: newStart,
    condition: '<'
});
/** generates:
{
    "ConditionExpression": "#expectedStart < :expectedStart",
    "ExpressionAttributeNames": {
        "#expectedStart": "start",
        "#start": "start"
    },
    "ExpressionAttributeValues": {
        ":expectedStart": 1000,
        ":start": 1000
    },
    "UpdateExpression": "SET #start = :start"
}
**/
```

## Bonus:
At the heart of it are a couple of cool utility functions that you can use everywhere.

### diff(original, modified, orphans = false)
Calculates canonical diff sets, namely {ADD, SET, DELETE}
Each item is a pair of {path, value}, where path is a jsonpath

*Both `original` and `modified` objects can be of arbitrary complexity, as long as objects are JSON compatible.*

*Future versions will add support for ES2015+ Map/Set collection types*

```js
const diffs = due.diff({x: {y: {z: 2, w: 3}}}, {x: {y: {w: 4}}, v: 'new'});
/** returns {ADD, SET, DELETE} canonical diff sets
{
  "ADD": [
    {
      "path": "$.v",
      "value": "new"
    }
  ],
  "DELETE": [
    {
      "path": "$.x.y.z",
      "value": 2
    }
  ],
  "SET": [
    {
      "path": "$.x.y.w",
      "value": 4
    }
  ]
}

**/
```

### patches(original, modified, orphans = false)
In case you need diffing, but are not keen on inspecting detailed paths and rather log/audit using materialized javascript objects, use `patches`
It creates a partial for each diff group, which is a fully inflated object with all intermediate nodes (Map/List) created for you. Comes in handy for auditing changes since partial documents can be more readable than paths/value pairs.

*Both `original` and `modified` objects can be of arbitrary complexity, as long as objects are JSON compatible.*

*Future versions will add support for ES2015+ Map/Set collection types*

```js
due.patches({x: {y: {z: 2, w: 3}}}, {x: {y: {w: 4}}, v: 'new'})
/**
  {
    "ADD": {
      "v": "new"
    },
    "SET": {
      "x": {
        "y": {
          "w": 4
        }
      }
    },
    "DELETE": {
      "x": {
        "y": {
          "z": 2
        }
      }
    }
  }

**/
```

## Mix and Match
This module is non invasive, it doesn't make decisions for you or pre-bake an update expression that you can't extend.
Remember that the result is an object that is compatible with the DynamoDB Item-Client and Document-Client of the `aws-sdk` library.
You can always post-process this object before sending off to `aws-sdk` DynamoDB.*Client. The result structure is straight forward.

- UpdateExpression: string, currently only using `SET` (for add/update) and `REMOVE` (for deletes)
- ExpressionAttributeNames: object of pairs `'#aliasedAttributeName': attributeName`
- ExpressionAttributeValues: object of pairs `':aliasedAttributeName': attributeValue'`

And optionally:
- ConditionExpression `'#aliasedAttributeName ${operator} :aliasedAttributeName`

You can post process the generated object to apply more elaborate conditions for example:
```js
updateExpression.ConditionExpression = `${updateExpression.ConditionExpression} AND ${SOME_OTHER_CONDITION}`
documentClient.update({...otherParams, ...updateExpression});
````

## Possible use cases

- **General Purpose**: Generator for CRUD expressions starting from a fully-loaded-current document (use `orphans = false`, which is the default value), or from a partial that doesn't violate the structure of the DynamoDB document, e.g. doesn't add deep attributes into parent Map/List that doesn't exist. In the partial case, use `orphans = true`

- **Serverless Event De-Duplication**: Generator for Version Validation and/or Try-Lock expressions that are employed to deduplicate AWS Lambda multiple (duplicated) invocations.
This is a problem with Lambda functions that AWS admits to, but dismisses as a side effect of high-scalability and multi-availability-zone distributed infrastructure.
AWS would recommend that you make your Lambda function idempotent; which is only possible in a pure functional world where your Lambda never creates a side effect or communicate with an external System/API/DB, etc.
 A Practical solution is version validation of the version value included in the Lambda-request-payload against a DynamoDB table.
 Notice that you would create the conditional update expression using the value from the request-payload, `NOT` by loading the current value from DynamoDB (that would invalidate the rationale behind the conditional update). Lambda would set the version (@ versionPath) in DynamoDB to `currentVersion + 1` only if DynamoDB's `currentVersion` is equal to the `currentVersion` value included with the payload, otherwise, mark this invocation as `duplicate`.
 It is recommended that the Lambda function doesn't `callback(error)` in that case, since you wouldn't want AWS to `retry` with the exact same payload up to 3 times; a behaviour that is currently not-configurable.
- **Serverless Stream Processing**: Another useful use with Lambda functions is the Try-Lock behaviour to orchasterate multiple workers/processors either by locking a token-time-range or by making sure the stream-range they are about to process hasn't been processed by another (possibly duplicate) Lambda.
  

For a comprehensive list of possible usages and parameter combinations see [tests](/src/dynamo-update-expression.spec.js)

## Run the tests

  ```
  npm test
  ```

## What about DynamoDB *Set* type?
Currently DynamoDB Set type, is not a regular JS object, nor it is an ES2015 Set. It is an immutable class-intance that you can only create by invoking a factory method in the document client `createSet(someIterable)`.
It uses the type of the first element in your iterable as the Set Type {Numeric | String | [Buffer | ArrayBuffer ]}.
Once that instance is created, you can't query it for values, and you can't manipulate it, its only purpose is to `serialize` itself properly into DynamoDB's Supported JSON format.

In short, DynamoDB Set manipulation expressions are currently not supported, and future versions of this module would support Set type by rather detecting ES2015 Sets and continuing from there.

## Why *ADD* and *DELETE* are not used?
ADD can be used to increment numbers or ADD an item to a Set. 
Since the module has no way to detect the intention to increment a numeric by `n`, it achieves the same result by using SET #numeric = :incrementedValue.
That said, [using SET is recommended in general wherever possible over the less preferable operator ADD](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html#Expressions.UpdateExpressions.ADD).
The same applies to using REMOVE over DELETE; which can only be used with Set Types and is replaceable by REMOVE.

Quoting the article above:
```* Note: In general, we recommend using SET rather than ADD.```

For the use cases of using ADD in conjunction with Sets, see above.

## What if the document has long attribute names or too many nested path levels?
In some extreme cases the aliased attribute name, or the aliased deep value name might reach or exceed DynamoDB allowed limit of 255 characters (inclusive of the # character in aliases)
In those cases dynamo-update-expression truncates the name and postfix it with a counter to avoid common-prefix collision.

You'd rarely run into this, still for your peace of mind, here is an example how it would look like:

Note: Long names are shown here with (...) for the sake of readability while illustrating the behavior
##### Example: long attribute name or long deep value alias
```js

const original = {
     id: 123,
     title: 'Bicycle 123',
     description: '123 description',
     bicycleType: 'Hybrid',
     brand: 'Brand-Company C',
     price: 500,
     color: ['Red', 'Black'], // String Set if you use docClient.createSet() before put/update
     productCategory: 'Bicycle',
     inStok: true,
     quantityOnHand: null,
     relatedItems: [341, 472, 649], // Numeric Set if you use docClient.createSet() before put/update
     pictures: {
         frontView: 'http://example.com/products/123_front.jpg',
         rearView: 'http://example.com/products/123_rear.jpg',
         sideView: 'http://example.com/products/123_left_side.jpg'
     },
     productReview: {
         fiveStar: [
             "Excellent! Can't recommend it highly enough! Buy it!",
             'Do yourself a favor and buy this.'
         ],
         oneStar: [
             'Terrible product! Do no buy this.'
         ]
     },
     comment: 'This product sells out quickly during the summer',
     'Safety.Warning': 'Always wear a helmet' // attribute name with `.`
    };

const modified = {
     "id": 123,
     "description": "123 description",
     "bicycleType": "Hybrid",
     "brand": "Brand-Company C",
     "price": 500,
     "color": [
         null,
         "Black",
         "Blue"
     ],
     "productCategory": "Bicycle",
     "inStok": true,
     "quantityOnHand": null,
     "relatedItems": [
         341,
         null,
         649,
         1000
     ],
     "pictures": {
         "frontView": "http://example.com/products/123_front.jpg",
         "sideView": "http://example.com/products/123_left_side.jpg",
         "otherSideView": "pictures.otherSideView"
     },
     "productReview": {
         "fiveStar": [
             null,
             null
         ],
         "oneStar": [
             null,
             "Never again!"
         ],
         "thisIsAVeryLongAttributeNameAndHadToKeepTypingRandomWordsToTryToGetUpTo255CharactersYouWouldThinkThatThisIsEnoughOrThatItWillHappenOftenWhenYouHaveAnAttributeThatLongYouMightAlsoOpenAnIssueAboutItPleaseDoNotSinceTheLibraryDoesTrimYourNamesAndLimitAliasLen": "Value for attribute name with 255 characters excluding the parent path"
     },
     "comment": "This product sells out quickly during the summer",
     "Safety.Warning": "Value for attribute with DOT",
     "root0": "root0",
     "newParent": {
         "newChild1": {
             "newGrandChild1": "c1gc1",
             "newGrandChild2": "c1gc"
         },
         "newChild2": {
             "newGrandChild1": "c2gc1",
             "newGrandChild2": "c2gc2"
         },
         "newChild3": {}
     },
     "prefix-suffix": "Value for attribute name with -",
     "name with space": "name with spaces is also okay",
     "1atBeginning": "name starting with number is also okay",
     "thisIsAVeryLongAttributeNameAndHadToKeepTypingRandomWordsToTryToGetUpTo255CharactersYouWouldThinkThatThisIsEnoughOrThatItWillHappenOftenWhenYouHaveAnAttributeThatLongYouMightAlsoOpenAnIssueAboutItPleaseDoNotSinceTheLibraryDoesTrimYourNamesAndLimitAliasLen": [
         "Value for attribute name with 255 characters with subscript excluding the parent path"
     ]
 };

/** generates:
{
    "ExpressionAttributeNames": {
        "#1AtBeginning": "1atBeginning",
        "#color": "color",
        "#fiveStar": "fiveStar",
        "#nameWithSpace": "name with space",
        "#newParent": "newParent",
        "#oneStar": "oneStar",
        "#otherSideView": "otherSideView",
        "#pictures": "pictures",
        "#prefixSuffix": "prefix-suffix",
        "#productReview": "productReview",
        "#rearView": "rearView",
        "#relatedItems": "relatedItems",
        "#root0": "root0",
        "#safetyWarning": "Safety.Warning",
        "#thisIsAVeryLongAttributeName...LimitAliasL1": "thisIsAVeryLongAttributeName...DoesTrimYourNamesAndLimitAliasLen",
        "#thisIsAVeryLongAttributeName...LimitAliasL3": "thisIsAVeryLongAttributeName...DoesTrimYourNamesAndLimitAliasLen",
        "#title": "title"
    },
    "ExpressionAttributeValues": {
        ":1AtBeginning": "name starting with number is also okay",
        ":color2": "Blue",
        ":nameWithSpace": "name with spaces is also okay",
        ":newParent": {
            "newChild1": {
                "newGrandChild1": "c1gc1",
                "newGrandChild2": "c1gc"
            },
            "newChild2": {
                "newGrandChild1": "c2gc1",
                "newGrandChild2": "c2gc2"
            },
            "newChild3": {}
        },
        ":picturesOtherSideView": "pictures.otherSideView",
        ":prefixSuffix": "Value for attribute name with -",
        ":productReviewOneStar1": "Never again!",
        ":productReviewThisIsAVeryLongAttributeName...TrimYourNamesA2": "Value for attribute name with 255 characters excluding the parent path",
        ":relatedItems3": 1000,
        ":root0": "root0",
        ":safetyWarning": "Value for attribute with DOT",
        ":thisIsAVeryLongAttributeName...LimitAliasL4": [
            "Value for attribute name with 255 characters with subscript excluding the parent path"
        ]
    },
    "UpdateExpression": "SET #color[2] = :color2, #newParent = :newParent,
    #pictures.#otherSideView = :picturesOtherSideView, #productReview.#oneStar[1] = :productReviewOneStar1,
    #productReview.#thisIsAVeryLongAttributeName...LimitAliasL1 = :productReviewThisIsAVeryLongAttributeName...TrimYourNamesA2,
    #relatedItems[3] = :relatedItems3, #root0 = :root0,
    #thisIsAVeryLongAttributeName...LimitAliasL3 = :thisIsAVeryLongAttributeName...LimitAliasL4,
    #1AtBeginning = :1AtBeginning, #nameWithSpace = :nameWithSpace, #prefixSuffix = :prefixSuffix,
    #safetyWarning = :safetyWarning
    REMOVE #color[0], #pictures.#rearView, #productReview.#fiveStar[0], #productReview.#fiveStar[1],
    #productReview.#oneStar[0], #relatedItems[1], #title"
}
**/
```

## Build Targets
Currently the following target build environments are configured for babel-preset-env plugin
```
 "targets": {
   "node": 4.3,
   "browsers": ["last 10 versions", "ie >= 7"]
 }
```
In case this turns out to be not generous enough, more backward compatible babel transpilation targets would be added.

## Roadmap

- Support diff-ing documents containing native ES2015+ Map and Set types
- Generate DynamoDB \<Typed\> \<Set\> for String/Number/Buffer|ArrayBuffer (base64 encoded)
- Support DynamoDB \<Typed\> \<Set\> ADD and DELETE expressions

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
