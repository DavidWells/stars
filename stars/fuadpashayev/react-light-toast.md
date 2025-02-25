---
repo: fuadpashayev/react-light-toast
url: 'https://github.com/fuadpashayev/react-light-toast'
homepage: null
starredAt: '2022-06-20T21:38:48Z'
createdAt: '2022-06-13T11:43:20Z'
updatedAt: '2024-03-09T20:06:43Z'
language: CSS
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.608Z'
description: Simple and lightweight toast package for React.js
tags: []
---

# React Light Toast
Simple and lightweight toast package for React.js
<br><br>

# Example

<img src="https://i.ibb.co/qsx913G/react-light-toast.png" width="900" style="border-radius:4px" />

<br><br>
# Installation

```
$ npm install react-light-toast
$ yarn add react-light-toast
```
<br><br>

# Usage
```jsx
  import React from 'react';

  import ToastContainer, { toast } from 'react-light-toast';
  
  function App(){
    const notify = () => toast.info('This is a toast!');

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
```

<br><br><br>
# Options
## ToastContainer options
```jsx
    <>
        <ToastContainer options={{ 
          reverse: true,
          position: 'bottom-right'
        }} /> 
    </>

    // reverse: reverse order of last toast (last toast adding to top)
    // positions: top-right, top-left, bottom-right, bottom-left, top-center, bottom-center // default: bottom-right
```
<br>

## Toast options
```js
    toast.info('This is a toast!', {
        autoClose: false, // disable auto close | default: true
        closeDuration: 3000, // close duration in ms | default: 3000
    });
```
<br>

## Toast types
```js
    toast.add('info', 'This is a info toast!');

    toast.info('This is a info toast!');
    toast.success('This is a success toast!');
    toast.error('This is a error toast!');
    toast.warning('This is a warning toast!');
```
<br><br><br>
