---
repo: TheDeng/redux-any
url: 'https://github.com/TheDeng/redux-any'
homepage: ''
starredAt: '2021-01-13T01:47:11Z'
createdAt: '2021-01-07T07:28:51Z'
updatedAt: '2025-01-16T01:31:09Z'
language: JavaScript
license: MIT
branch: main
stars: 120
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:07.494Z'
description: >-
  a middleware for processing many kinds of action,including:plain
  object,promise,function,array and nested array
tags: []
---

# redux-any
## 一个redux中间件
#### A middleware for processing action like plain object,function,promise,and array or nested array
#### 用来处理各种类型的action，包括普通对象,函数类型，promise类型，数组类型或者嵌套数组类型。
```javascript
1.plain object
2.function 
3.Promise
4.action.payload=promise
5.action array
6.nested array of action
```
#### Our middleware is based on redux-promise and redux-thunk .Our middlewrae enhances and combines these two middlewares so that it can processes many kinds of actions like function,promise,and array,in addition,we finish the nested array iteration
```javascript
我们的中间件是在redux-promise 和 redux-thunk这两个中间件的基础上进行开发
本中间件是对以上两个中间件的合并和增强.
具体来说，只需要引入本中间件，就可以dispatch各种形式的action.
包括:
函数形式
promise对象
对象中的payload是promise对象
以及由上面三种action组成的数组
以及嵌套数组 
本中间件可以方便我们处理以各种形式呈现的action对象,只需要引入本中间件就可以满足多种action类型需求。

```
# Usage:
```javascript
 npm i redux-any redux react-redux --save 
```

``` javascript
 import anyMiddleWare from 'redux-any'
 import {  createStore, applyMiddleware,compose} from 'redux';
 import reducer from './store';

 const store = createStore(reducer, compose(
    applyMiddleware(anyMiddleware),
 ))

```
# The actionCreators that we support:
``` javascript
// Function  支持异步函数
export const getFunctionAction = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch({ type: ADD })
        }, 1000);
    }
}
```
```javascript
//Promise Object 支持Promise对象
export const addBook = async ({ name }) => {
    //_addBook({name}) 是一个axios接口
    const res = await _addBook({ name })
    return { type: 'ADD'，payload:res.data.data }
}
```
```javascript 
//aciton.payload=Promise Object  支持对象的payload属性为Promise对象
export const payloadAction = async () => {
    return {
        type: 'ADD',
        payload: await addBook()
    }
}
```
```javascript 
//action array 支持数组形式的action，
export const actionArray = () => {
    return [addBook(),payloadAction(),{type:'ADD,payload:1},getFunctionAction()]
}
```
```javascript 
//action nested array 支持嵌套数组形式的action，
export const actionNestedArray = () => {
    return [addBook(),payloadAction(),[{type:'ADD,payload:1},getFunctionAction()]]
}
```
