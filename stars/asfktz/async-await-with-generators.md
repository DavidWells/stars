---
repo: asfktz/async-await-with-generators
url: 'https://github.com/asfktz/async-await-with-generators'
homepage: ''
starredAt: '2018-03-13T18:02:42Z'
createdAt: '2017-09-16T12:03:51Z'
updatedAt: '2023-02-25T16:43:50Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:25.481Z'
description: Implementation of async/await using generators
tags: []
---

# async-await-with-generators
Simple implementation of async/await using generators


### Usage:
Call `run` with a generator to start an `async` flow immediately, use `yield` instead of `await`
```js
run(function* () {
  try {
    const res  = yield fetch(`https://api.github.com/repos/facebook/react`);
    const data = yield res.json();
    return data.stargazers_count;
  } catch (err) {
    return `Couldn't get the stars number`;
  }
})
.then((stars) => { ... })
```

Or, use `run.wrap` to return a function instead
```js
const getStars = run.wrap(function* (username, repo) {
  try {
    const res  = yield fetch(`https://api.github.com/repos/${username}/${repo}`);
    const data = yield res.json();
    return data.stargazers_count;
  } catch (err) {
    return `Couldn't get the stars number`;
  }
});

getStars('facebook', 'react').then((stars) => { ... })
```


### Implementation:

```js
const next = (it, res, err) => {
  const { value, done } = err ? it.throw(err) : it.next(res);

  if (done) {
    return Promise.resolve(value);
  }

  return Promise.resolve(value)
    .then(res  => next(it, res))
    .catch(err => next(it, null, err));
};

const run = (gen) => next(gen());

run.wrap  = (gen) => (...args) => next(gen(...args));

module.exports = run;
```
