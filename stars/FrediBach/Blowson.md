---
repo: FrediBach/Blowson
url: 'https://github.com/FrediBach/Blowson'
homepage: 'http://www.blowson.com'
starredAt: '2019-10-06T06:31:04Z'
createdAt: '2018-09-14T07:31:33Z'
updatedAt: '2023-10-15T17:29:44Z'
language: JavaScript
license: MIT
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:20.494Z'
description: Blow up JSON like sample data in an awesomely realistic way!
tags:
  - data
  - database
  - extender
  - graphql
  - json
---

# Blowson

<img src="https://unpkg.com/blowson@0.9.0/src/blowson-logo-icon.svg" align="right" title="Blowson" width="200" height="200">

Blow up JSON like sample data in an awesomely realistic way!

> Blowson is awesome!

Demo: [FakeQL](https://fakeql.com)

## About

Blowson was created to make mocking of API's with realistic sample data easier and more powerful. It's an integral part of a Frontend First Development workflow described here: [www.frontendfirstdevelopment.com](http://www.frontendfirstdevelopment.com/)

Blowson analyses your sample data to detect the rules it than uses to extend it. There is no configuration, only a few simple rules on how to construct the input data. The goal is to create realistic output sample data with as little input data as possible. Generated data should be as close as possible to real userdata, so that you can develop and test your UIs and applications before inviting real users that than create real data. This makes it possible to iterate much faster on a new project than if you need to migrate real data after data structure changes. All detections can be bypassed with a single entry that doesn't follow the pattern.

Key features: Blowson has field type detection by key and content, detection of repeating values, detection of the range of values, the direction of values, the rules between keys, of optional values, of value steps, floating point precision and the relationships between types. Additionally template variables and filters make it possible to construct content exactly as you want based on other related content.

Full documentation can be found here: [www.blowson.com](https://www.blowson.com/docs/)

This library was originally called JSON Data Extender and renamed to Blowson: [JSON Data Extender](https://github.com/FrediBach/json-data-extender)

Other related projects and libraries are:

- [json2graphql](https://github.com/hasura/json2graphql) (for Hasura)
- [JSON Server](https://github.com/typicode/json-server)
- [JSON GraphQL Server](https://github.com/marmelab/json-graphql-server)

## Usage

Installation:

`npm i blowson --save`

Your sample data file:

```
const userCount = 50;
const commentCount = 250;

module.exports = {
    "users": [
        "id": 1, "firstname": "Mike", "age": 12,
        "id": userCount, "firstname": "Lucy", "age": 31
    ],
    "comments": [
        "id": 1, "user_id": 1, "text": "Some text",
        "id": commentCount, "user_id": userCount, "text": "Some more text"
    ]
};
```

And than in your script:

```
const blowson = require('blowson');
const data = require('./data.js');

const extendedData = blowson(data);

console.log(extendedData);
```

The `blowson` function accepts either a JSON string or a JSON like JavaScript object. In case of a JSON string, a nicelly formatted string is being returned. This however involves some extra parsing on the side of Blowson, so we recommend using a JSON like JS object.

Have a look at the index.js for a complete example and check out data.js for an example data file.

You can use Blowson as a CLI script. All you need to do is install the package globally:

```
npm install -g blowson
```

And than run it like this:

```
blowson data.js data-extended.js
```

Or:

```
blowson data.json data-extended.json
```

## Extend ID range

For Blowson to work, your types need an `id` field and the entries need to have a gap. So for example if you have ids 1, 2, 3 and 10, it will add fake entries with ids 4,5,6,7,8 and 9. For types without a gap in its ids, nothing will be added. Only one gap is being detected.

Here's an example data file to better illustrate how this works:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "age": 12,
        "id": 2, "firstname": "Alex", "age": 18,
        "id": 5, "firstname": "Lucy", "age": 31
    ]
}
```

Because there's a gap between 2 and 5, new entries with ids 3 und 4 will be generated. Something like this:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "age": 12,
        "id": 2, "firstname": "Alex", "age": 18,
        "id": 3, "firstname": "Tom", "age": 14,
        "id": 4, "firstname": "Kevin", "age": 27,
        "id": 5, "firstname": "Lucy", "age": 31
    ]
}
```

The gap can theoretically be as big as you like, but I'm sure at some point node will run out of memory and terminate the script.

## Detect specific keys

As you could see in the example above, Blowson correctly guessed that `firstname` is a field for ... well, firstnames. Here are all the currently detected field keys:

- id
- age
- firstname
- lastname
- company
- country
- email
- color
- ip
- profession
- url
- city
- street
- zip
- weekday
- year
- password
- guid
- product
- material
- iban
- bic
- avatar
- username
- homepage
- job
- mimetype

## Other auto detections

If a field type can't be detected by its key, Blowson will try to guess the type by it's content. The following detections currently exists:

- Word
- Sentence
- Headline
- Paragraph
- Article
- String
- String Pattern
- Char
- Integer
- Float
- Boolean
- Date (in the format: 1976-05-23)
- Datetime (in the format: 1976-05-23T15:48:45+01:00)
- Time (in the format: 23:56)
- Array of numbers (for multiple relationship fields)

Sentence, paragraph and article will be generated in English and the script will try to guess a correct range of amounts. So for example if your sample looks like this:

```
{
    "headlines": [
        "id": 1, "title": "What a beautiful day this is!",
        "id": 3, "title": "Just another day."
    ]
}
```

The script will guess that you want title sentences with at least three words and a maximum of 6 words. Something like:

```
{
    "headlines": [
        "id": 1, "title": "What a beautiful day this is!",
        "id": 2, "title": "Worst day of my life.",
        "id": 3, "title": "Just another day."
    ]
}
```

Well, it will just generate a random sentence, so probably contextually completely unrelated, but that's all we need for sample data.

Additionally, long words will appear once in a while to make it possible to test UI problems.

## Repeated values

If you repeat a value, it is handled like enumerations, so only available values will be used. Here's an example:

```
{
    "scores": [
        "id": 1, "user_id": 1, "game_id": 12, "score": 250,
        "id": 2, "user_id": 5, "game_id": 3, "score": 500,
        "id": 5, "user_id": 72, "game_id": 11, "score": 500
    ]
}
```

Because the score `500` is repeated twice, all generated values will use either score `250` or score `500`. The fields `user_id` and `game_id` have no repeated values, so everything generated will be random. Here's a possible result:

```
{
    "scores": [
        "id": 1, "user_id": 1, "game_id": 12, "score": 250,
        "id": 2, "user_id": 5, "game_id": 3, "score": 500,
        "id": 3, "user_id": 45, "game_id": 5, "score": 500,
        "id": 4, "user_id": 39, "game_id": 4, "score": 250,
        "id": 5, "user_id": 72, "game_id": 11, "score": 500
    ]
}
```

## Range detection

The range of your sample values is being respected. For example in the example above, `user_id` has samples between 1 and 72, so only values between 1 and 72 will be generated. Not only integers and floats can have ranges, date and datetime can have ranges, as well. So for example if you have a birthday field like in this sample data:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "birthday": "1975-09-03",
        "id": 2, "firstname": "Alex", "birthday": "1922-03-01",
        "id": 5, "firstname": "Lucy", "birthday": "1988-11-21"
    ]
}
```

The range detected will be 1922-03-01 to 1988-11-21 and the generated data could look like this:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "birthday": "1975-09-03",
        "id": 2, "firstname": "Alex", "birthday": "1922-03-01",
        "id": 3, "firstname": "Kevin", "birthday": "1966-12-18",
        "id": 4, "firstname": "Tom", "birthday": "1933-02-08",
        "id": 5, "firstname": "Lucy", "birthday": "1988-11-21"
    ]
}
```

Ranges can be used in creative ways. For example if you want to restrict coordinates to all be in a specific rectangle, all you have to do is put two coordinates in your sample to the edges of that rectangle, something like this:

```
{
    "waypoints": [
        "id": 1, "lat": 46.204, "lng": 6.1432,
        "id": 10, "lat": 47.678, "lng": 9.173
    ]
}
```

This would roughly limit the randomly generated waypoints to be inside of Switzerland.

## Direction detection

The direction of numbers is being detected. So for example is this sample:

```
{
    "waypoints": [
        "id": 1, "score": 100,
        "id": 2, "score": 150,
        "id": 5, "score": 1000
    ]
}
```

The result would be something like:

```
{
    "waypoints": [
        "id": 1, "score": 100,
        "id": 2, "score": 150,
        "id": 3, "score": 450,
        "id": 4, "score": 700,
        "id": 5, "score": 1000
    ]
}
```

To prevent this behaviour, simply add one value that breaks the direction:

```
{
    "waypoints": [
        "id": 1, "score": 150,
        "id": 2, "score": 100,
        "id": 5, "score": 1000
    ]
}
```

Direction detection works for `int`, `float`, `date` and `datetime`.

## Inter field rule detection

Blowson tries to detect the rules between each non id field in a row. For example if you have a field `from` and a field `to` and to is always bigger than from, than all the generated numbers will follow that rule. Currently `int`, `float`, `date` and `datetime` values have detectedions for `>`, `<` and `=`. An example:

```
{
    "ranges": [
        "id": 1, "from": 1, "to": 2,
        "id": 2, "from": 6.9, "to": 34.87,
        "id": 5, "from": 99, "to": 100
    ]
}
```

As `from` is always smaller than `to`, the result will look like this:

```
{
    "ranges": [
        "id": 1, "from": 1, "to": 2,
        "id": 2, "from": 6.9, "to": 34.87,
        "id": 3, "from": 65.3, "to": 77.32,
        "id": 4, "from": 42.1, "to": 43.65,
        "id": 5, "from": 99, "to": 100
    ]
}
```

If you don't want such rules to be followed, all you have to do is define sample data without such rules:

```
{
    "ranges": [
        "id": 1, "from": 1, "to": 1,
        "id": 2, "from": 34, "to": 67,
        "id": 5, "from": 100, "to": 100
    ]
}
```

Row with `id` 1 and 5 have equal numbers and the row with `id` 2 has `to` bigger than `from`. So no rule will be detected.

## Weighted randomness

Another feature of the above used sample data is that the score `500` is twice in the sample data and `250` only once. This will be detected and the score 500 will have a higher chance of occuring in the generated data (twice as likely to be exact).

## Optional values

Key value pairs that don't show up in every single entry are handled as optional and randomly added to new entries. For example with this sample data:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "admin": true,
        "id": 2, "firstname": "Alex",
        "id": 5, "firstname": "Lucy"
    ]
}
```

Only one entry has the field `admin`, so that field will be an optional one. Here's a generated dataset:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "admin": true,
        "id": 2, "firstname": "Alex",
        "id": 3, "firstname": "Tom",
        "id": 4, "firstname": "Kevin", "admin": true,
        "id": 5, "firstname": "Lucy"
    ]
}
```

## Step detection

Let's say you have the numbers 25, 50 and 100 in your sample data. In this case we assume, that only 25, 50, 75 and 100 is a possible random number. Blowson respects the steps between values by detecting the minimal gap between numbers. If you don't want a minimum gap, just add a minimal gap of one to your sample data like this:

```
{
    "scores": [
        "id": 1, "user_id": 1, "game_id": 12, "score": 1,
        "id": 2, "user_id": 5, "game_id": 3, "score": 2,
        "id": 5, "user_id": 72, "game_id": 11, "score": 1000
    ]
}
```

In the above case, the score would be a random number between 1 and 1000. If you want a step of 50, you could define the sample data like this:

```
{
    "scores": [
        "id": 1, "user_id": 1, "game_id": 12, "score": 50,
        "id": 2, "user_id": 5, "game_id": 3, "score": 100,
        "id": 5, "user_id": 72, "game_id": 11, "score": 1000
    ]
}
```

## Floating point precision

If you have floating point numbers in your data, the script will respect the precision of them. Let's say you have the numbers 1.56, 1.4 and 12.64, than the script will never add a number like 4.192234 as that would exceed the precision of two.

## Relationship fields

In a context where you use sample data to fill a database, you often will have to define relationship fields like `user_id`. Now to have realistic values in those fields, you need to follow one simple rule, always define your field value range to the size of the table you're connecting to. Here's an example:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "age": 12,
        "id": 50, "firstname": "Lucy", "age": 31
    ],
    "comments": [
        "id": 1, "user_id": 1, "text": "Some text",
        "id": 250, "user_id": 50, "text": "Some more text"
    ]
}
```

First 50 users are generated with ids from 1 to 50, so the `user_id` relationship field in the comments table should be synced to that range, so we add 1 and 50. As 250 comments will be generated, every user will have an average of five comments.

The random numbers for relationship ids are normally distributed (bell curve). This way you get more numbers in the middle of the range, creating ids that have more relationships than others. This is quite useful to test the different behavior of different amounts of related items in a project. For example in the case above, users with ids around 25 will have more comments than users closer to 1 and 50.

If you use a JS export as in the examples you can find in the package, it's a good idea to first define constants for all this sizes, so that you only have one place where you need to change them.

## Template variables

You can include other fields from the same entry into a string with template variables. Here's an example:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "slogan": "Hi, I'm {{field.firstname}}. How can I help you?",
        "id": 5, "firstname": "Lucy", "slogan": "Visit my homepage: www.{{field.firstname|lower}}.com"
    ]
}
```

As soon as Blowson detects template variables in a string, it will repeat those template string in all entries. You will not have random text anymore.

The result will be something like this:

```
{
    "users": [
        "id": 1, "firstname": "Mike", "slogan": "Hi, I'm Mike. How can I help you?",
        "id": 2, "firstname": "Tom", "slogan": "Hi, I'm Tom. How can I help you?",
        "id": 3, "firstname": "Jeff", "slogan": "Visit my homepage: www.jeff.com",
        "id": 4, "firstname": "Kim", "slogan": "Hi, I'm Kim. How can I help you?",
        "id": 5, "firstname": "Lucy", "slogan": "Visit my homepage: www.lucy.com"
    ]
}
```

The available filters are:

- slug
- lower
- upper
- capitalize
- plural
- singular
- md5
- trim
- md (Markdown to HTML)
- round (for numbers)
- floor (for numbers)
- plus:X (for numbers, plus:100 adds 100 to original number)
- minus:X (for numbers, minus:100 subtracts 100 from original number)
- times:X (for numbers, times:100 multiplies original number by 100)
- max:X (for numbers, max:10 limits numbers to a maximum of 10)
- min:X (for numbers, min:10 limits numbers to a minimum of 10)
- date:dateFormat
- num:numberFormat
- optional
- count (for arrays)
- max (for arrays)
- min (for arrays)
- sum (for arrays)
- avg (for arrays)
- rand (for arrays)

The date filter uses the `date-fns` library to format your dates. For example if you want to only show the year of a date field `created`, do it like this: `{{field.created|date:YYYY}}`

Similar to the date filter, the number filter uses the `Numeral.js` library. An example: {{field.id|num:0o}} would result in something like `1st` (with id = 1).

You can combine multiple filters, so for example you can do something like `{{word.noun|capitalize}} {{word.noun|capitalize|optional}} {{number|optional}}` to generate a product names that is either one word, one word with a number, two words or two words with a number, all words capitalized.

Additionally you can use the `?` option to define a default value, in case the field you're referencing is optional. This could look like this:

```
{
    "files": [
        { id: 1, width: 250, height: 100, url: 'https://imgplaceholder.com/{{field.width?250}}x{{field.height?100}}' },
        { id: 2, width: 500, height: 250, url: 'https://imgplaceholder.com/{{field.width?500}}x{{field.height?250}}' },
        { id: 5, url: 'https://imgplaceholder.com/{{field.width?400}}x{{field.height?200}}' }
    ]
}
```

Sometimes you need to be able to choose a random variable. You can do this with the or operator: `||`. Here's an example from the kitchensink: `{{field.var3||field.var4|upper||field.var10|avg}}`. This will randomly choose either field `var3`, field `var4` in all uppercase or the average of all field `var10`s.

What makes field variables really powerful is that fields can be referenced from a relationship. So for example if you have a type user and a type message (anonymous message to the user), than you can use a field from the user in the message to create messages that fit the context. Something like:

```
{
    "users": [
        { "id": 1, "firstname": "Mike" },
        { "id": 2, "firstname": "Alex" },
        { "id": 5, "firstname": "Lucy" }
    ],
    "messages": [
        { "id": 1, "user_id": 1, "text": "Hi {{field.user.firstname}}, well done. Congrats!" },
        { "id": 2, "user_id": 2, "text": "Hi {{field.user.firstname}}, well done. Congrats!" },
        { "id": 25, "user_id": 5, "text": "Hello {{field.user.firstname}}, don't stop what you're doing!" }
    ]
}
```

Another way to use relationships to your advantage, is to use the `connected` variable type. So for example if you have a comments type and a posts type and comments point to posts, you can get the count of comments on each post like this:

```
{
    "posts": [
        { "id": 1, "text": "Bla ...", "commentCount": "{{connected.comments|count}}" },
        { "id": 2, "text": "Bla ...", "commentCount": "{{connected.comments|count}}" },
        { "id": 50, "text": "Bla ...", "commentCount": "{{connected.comments|count}}" }
    ],
    "comments": [
        { "id": 1, "post_id": 1, "text": "Some text ..." },
        { "id": 2, "post_id": 2, "text": "Some text ..." },
        { "id": 200, "post_id": 50, "text": "Some text ..." }
    ]
}
```

By using `connected`, you always get an array back. If you don't use a filter, the array entries will be joined like this: `val1, val2 and val3`. You can use all the array filters to collapse the array to a single value, for example: `{{connected.flights.score|max}}`

Additionally, you have access to all Faker.js (three parts) and Chance.js (two parts) methods with the `fake` key. Just a few examples: `{{fake.lorem.sentence}}`, `{{fake.system.fileName}}`, `{{fake.finance.transactionType}}`, `{{fake.dollar}}`, `{{fake.month}}`

A currently experimental feature is the support for Regex based patterns to generate content. Blowson uses the amazing RandExp library to generate content based on Regex patterns. Here's an example: `{{/(sun|mon|tue|wednes|thurs|fri|satur)day/}}`. As closing curly braces can't be used inside the template curly braces, we are using a special bold unicode closing curly brace inside the Regexes, an example: `{{/Lo{2,10❵l/||/Fe{2,10❵t/}}`. This may change in a future release however, as it's quite a hack!

And finally, to enable you to create semi random sentences, you can use `{{word.noun}}`, `{{word.a_noun}}`, `{{word.nouns}}`, `{{word.adjective}}`, `{{word.an_adjective}}` and `{{number}}` to creatively construct them. (You can insert whole sentences and paragraphs if you want: {{sentence}} {{paragraph}})

## Custom field names

Sometimes you want Blowson to detect a field key, but you want a different custom name for that field. Let's say you want your field to be named `surname` but Blowson only detecs `lastname`, so it would only fill in a random string and not a latname. This can be solved with custom filed names like this: `surname__lastname`. This field will be detected as `lastname`, and in the extended data outputed as `surname`. An example:

```
{
    "users": [
        { "id": 1, "firstname": "Mike", "surname__lastname": "Smith" },
        { "id": 5, "firstname": "Lucy", "surname__lastname": "Johnson" }
    ],
}
```

The result will be something like:

```
{
    "users": [
        { "id": 1, "firstname": "Mike", "surname": "Smith" },
        { "id": 2, "firstname": "Mike", "surname": "Williams" },
        { "id": 3, "firstname": "Mike", "surname": "Jones" },
        { "id": 4, "firstname": "Mike", "surname": "Brown" },
        { "id": 5, "firstname": "Lucy", "surname": "Johnson" }
    ],
}
```

Be careful if you rename the field. Your field variables will see the detected field and not the final name, so in the example above, the fields internal name will be `lastname`, so your template variable should be `{{field.lastname}}` and not `{{field.surname}}` or even `{{field.surname__lastname}}`.

## Temporary fields

Sometimes you want a field that will not show up in the final result. You can accomplish this by prefixing the fieldname with `__`, for example `__prename`. You can use this for something like this:

```
{
    "users": [
        { "id": 1, "name": "{{field.firstname}} {{field.lastname}}", "__firstname": "Tim", "__lastname": "Jones" },
        { "id": 5, "name": "{{field.firstname}} {{field.lastname}}", "__firstname": "Mike", "__lastname": "Williams" }
    ],
}
```

Result would be something like:

```
{
    "users": [
        { "id": 1, "name": "Tim Jones" },
        { "id": 2, "name": "Tom Smith" },
        { "id": 3, "name": "Susanna Brown" },
        { "id": 4, "name": "Luke Johnson" },
        { "id": 5, "name": "Mike Williams" }
    ],
}
```

Another use for temporary fields is removing the id field. As you know, the id field is needed to detect a gap, but if you only want to generate data for non database usecases, you probably don't need an id field, so just declare it as temporary with `__id` and it will be removed in the output. Of course you can't use relationships in this usecase.

## Object Keys

Sometimes you don't want an array of objects, you want an object of objects where a selected field, normally the id, acts as the key for the object. This is for example needed if you want to use Firebase and than convert to Hasura. You define the key with three underscores like this: `___id`. An example:

```
{
    names: [
        { "___id": 1, "firstname": "Mike", "lastname": "Smith" },
        { "___id": 5, "firstname": "Lucy", "lastname": "Johnson" }
    ]
}
```

Will end up as something like:

```
{
    names: {
        "1": {"firstname": "Mike", "lastname": "Smith"},
        "2": {"firstname": "Alvin", "lastname": "Garcia"},
        "3": {"firstname": "Cordelia", "lastname": "Schouten"},
        "4": {"firstname": "Lucille", "lastname": "Booth"},
        "5": {"firstname": "Lucy", "lastname": "Johnson"}
    }
}
```
