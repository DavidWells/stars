---
repo: budarin/redux-business-logic-middleare
url: 'https://github.com/budarin/redux-business-logic-middleare'
homepage: 'https://www.npmjs.com/package/@budarin/redux-business-logic-middleare'
starredAt: '2021-11-05T23:04:57Z'
createdAt: '2021-06-13T12:13:51Z'
updatedAt: '2024-09-01T18:36:18Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.559Z'
description: Middleware for processing business login in redux application
tags: []
---

# redux-business-logic-middleare

Middleware for processing business login in redux application.

## Instllation

Using npm

```shell
npm install --save-dev @budarin/redux-business-logic-middleare
```

Using yarn

```shell
yarn add -D @budarin/redux-business-logic-middleare
```

## Using:

Let's implement a simple business rule for Todo: “when creating a todo, send the todo to the server and to the redux store”.

Let's describe the essence of Todo — its constants, actions, business rules and a redeser in accordance with the concept of [ducks](https://github.com/erikras/ducks-modular-redux).

`./ducks/todo.js`

```js
import { sendTodo } from 'src/services/api'
import { onAction } from'@budarin/redux-business-logic-middleare';

const SET_ERROR = 'TODO/SET_ERROR';
export const ADD_TODO = 'TODO/ADD_TODO';

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error
})

export const addTodo = ( todo ) => ({
    type: ADD_TODO,
    payload: todo 
});

// our business rule
export const addTodoMiddleware = async (store, next, action) => {
    // call the API method to send todo to the server
    try {
        await sendTodo(action.payload);
    } catch(error) {
        return store.dispatch(setError(error));
    }

     // otherwise, we pass the action to the next middleware
    return next(action);
}

// let's add the business rule
onAction(ADD_TODO, addTodoMiddleware)


export default const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            ...
        }
        case SET_ERROR {
            ...
        }
        default:
            return state;
    }
};
```

Add midleware to stores middlewares

```js
import todoReducer from '../ducks/todo.js'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { bussinesLogicMiddleware } from '@budarin/redux-business-logic-middleare';

const reducers = combineReducers(
    ...
    todoReducer,
    ...
);

const store = createStore(
    reducers, 
    initialState, 
    applyMiddleware(bussinesLogicMiddleware)
);
```

To remove bussines-rule from processing

```js
import { ADD_TODO } from '../ducks/todo.js'
import { offAction } from '@budarin/redux-business-logic-middleare';

offAction(ADD_TODO);
```
To remove all bussines-rules from processing

```js
import { removeAllbusinessRules } from '@budarin/redux-business-logic-middleare';

removeAllbusinessRules();
```
