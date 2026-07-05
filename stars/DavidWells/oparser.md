---
repo: DavidWells/oparser
url: 'https://github.com/DavidWells/oparser'
homepage: ''
starredAt: '2023-12-02T22:12:02Z'
createdAt: '2023-01-03T18:27:45Z'
updatedAt: '2025-01-19T08:36:31Z'
language: JavaScript
license: NA
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:42.576Z'
description: A very forgiving key-value option parser
tags: []
---

# oparser

A very forgiving key-value option parser. 

Converts plain text key-value pairs to useable javascript objects.

See [`oparser.test.js`](https://github.com/DavidWells/oparser/blob/master/src/oparser.test.js) for more usage examples.

## Install

```
npm install oparser
```

## Example

Handles single & multiline complex strings of key-value pairs

```js
/* String */
const str = parse(`name=bob`)
const str = parse(`name='bob'`)
const str = parse(`name="bob"`)
const str = parse(`name={bob}`)
/* > output js object
{ name: 'bob' }
*/

const multipleValues = optionsParse(`a='foo' b="bar" c=zaz`)
/* > output js object
{ a: 'foo', b: 'bar', c: 'zaz' }
*/

/* Boolean */
const bool = parse(`isCool`)
const bool = parse(`isCool = true`)
const bool = parse(`isCool =true`)
const bool = parse(`isCool=true`)
const bool = parse(`isCool={true}`)
const bool = parse(`isCool={{true}}`)
/* > output js object
{ isCool: true }
*/

/* Arrays */
const arrayWithNumbers = parse(`key=[ 1, 2, 3 ]`)
/* > output js object
{ key: [ 1, 2, 3 ] }
*/

const arrayWithStrings = parse(`key=[ "1", "2", "3" ]`)
/* > output js object
{ key: [ "1", "2", "3" ] }
*/

const arrayWithNonQuotedStrings = parse(`key=[ one, two, three ]`)
/* > output js object
{ key: [ "one", "two", "three" ] }
*/

const arrayWithMixedValues = parse(`
great={["scoot", "sco ot", 'scooo ttt', one, two, 3, 4, true]} 
`)
/* > output js object
{ great: [ 'scoot', 'sco ot', 'scooo ttt', 'one', 'two', 3, 4, true ] }
*/

/* Objects */
const obj = parse(`key={{ "a": "b" }}`)
const obj = parse(`key={{ "a": b }}`)
const obj = parse(`key={{ a: "b" }}`)
const obj = parse(`key={{ a: b }}`)
const obj = parse(`key={ a : b }`)
/* > output js object
{ key: { a: 'b' }}
*/

/* Multiline Objects */
const reactStyleObjects = `
  foo={{
    baz: {
      bar: {
        fuzz: "hello"
      }
    }
  }}
`
console.log(parse(reactStyleObjects))
/* > output js object
{
  foo: {
    baz: {
      bar: {
        fuzz: "hello"
      }
    }
  }
}
*/

/* Here's an example of a giant unruley string with comments */
const giantMultiLineExample = `
  width={999} 
  height={{111}}
  numberAsString="12345"   
  great={["scoot", "sco ot", 'scooo ttt']} 
  nice={{ value: nice, cool: "true" }}
  soclose=[jdjdjd, hdhfhfhffh]
  rad="boss"
  cool=true notCool=false
  nooooo={[one, two, 3, 4]}
  numberArray=[3, 7]
  stringArray=["3", "7"]
  numberZero=0,
  xyz=999,
  nope=false,
  // js style comment
  yes={true}
  isWhat,
  /* js block style comment */
  foo={{ rad: ["whatever", "man", "with spaces"], cool: { beans: 'here' } }}
  # yaml style comment
  what='xnxnx'
  isLoading  
  whatever={{ chill: "https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-faunadb-example&stack=fauna", pill: ['yo']}}
  href="https://fooo.com/start/deploy?repository=https://github.com/netlify/netlify-faunadb-example&stack=fauna"
  src="https://user-images.github{user}content.com/532272/123136878-46f1a300-d408-11eb-82f2-ad452498457b.jpg"
  deep={{ rad: 'blue', what: { nice: 'cool', wow: { deep: true } } }}
`
console.log(parse(giantMultiLineExample))
/* > output js object */
const output = {
  width: 999,
  height: 111,
  numberAsString: "12345",
  great: ['scoot', 'sco ot', 'scooo ttt'],
  nice: {
    value: 'nice',
    cool: 'true'
  },
  soclose: ['jdjdjd', 'hdhfhfhffh'],
  rad: 'boss',
  cool: true,
  notCool: false,
  nooooo: ['one', 'two', 3, 4],
  numberArray: [3, 7],
  stringArray: ["3", "7"],
  numberZero: 0,
  xyz: 999,
  nope: false,
  yes: true,
  isWhat: true,
  foo: {
    rad: ['whatever', 'man', "with spaces"],
    cool: {
      beans: 'here'
    }
  },
  what: 'xnxnx',
  isLoading: true,
  whatever: {
    chill: "https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-faunadb-example&stack=fauna",
    pill: ['yo']
  },
  href: "https://fooo.com/start/deploy?repository=https://github.com/netlify/netlify-faunadb-example&stack=fauna",
  src: 'https://user-images.github{user}content.com/532272/123136878-46f1a300-d408-11eb-82f2-ad452498457b.jpg',
  deep: {
    rad: 'blue',
    what: {
      nice: 'cool',
      wow: {
        deep: true
      }
    }
  }
}
```

See [`/src/oparser.test.js`](https://github.com/DavidWells/oparser/blob/master/src/oparser.test.js) for more usage examples.

## Note

This package uses regular expressions. Beware of [ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) if using this package on the server.
