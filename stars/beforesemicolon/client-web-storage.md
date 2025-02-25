---
repo: beforesemicolon/client-web-storage
url: 'https://github.com/beforesemicolon/client-web-storage'
homepage: ''
starredAt: '2022-06-21T17:42:45Z'
createdAt: '2022-05-05T00:35:49Z'
updatedAt: '2025-02-14T05:32:43Z'
language: TypeScript
license: MIT
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.979Z'
description: Powerful Web Application Data Storage and State Management Solution.
tags:
  - clientdata
  - indexeddb
  - inmemory-db
  - javascript
  - localstorage
  - memorystorage
  - state-management
  - storage
  - websql
  - webstorage
---

# Client Web Storage
Powerful Web Application Data Storage and State Management Solution.

[![npm](https://img.shields.io/npm/v/client-web-storage)](https://www.npmjs.com/package/client-web-storage)

- Same simple API for [IndexedDB](), [LocalStorage](), [WebSQL](), and in-memory data storage;
- Event driven and asynchronous;
- Automatic data validation done at the store level - ***Guarantees that all data fields are of the right type and exists with configurable automatic defaults;***
- No actions or reducers setup needed - ***The easiest store to configure ever***;
- Easy setup for Client-Server data synchronization using [interceptors]();
- **NOT UI framework specific!** Works with any UI Framework (React, Angular, VueJs, etc) - ***Take your storage setup with you when you migrate to a different framework and eliminate the need to learn a new state management solution for your app.***
- Easy to maintain and perform all data logic and fetching away from your components - ***Keep data concerns away from UI side of your app;***
- Highly and easily configurable;
- Easy to tap into any store events to perform side effect logic;

## Quick Example

```ts
// todo.store.ts

import {ClientStore} from "client-web-storage";

interface ToDo {
    name: string;
    description: string;
    complete: boolean;
}

// create a store providing the name and schema object
// with default values or javasctipt types
const todoStore = new ClientStore<ToDo>("todo", {
    $name: String,
    description: "No Description",
    complete: false
});
```

Works with any web library or framework. Here is an example using React.

```ts
// app.tsx

import {useClientStore} from "client-web-storage/helpers/use-client-store";
import {Todo} from "./stores/todo.store";
import FlatList from "flatlist-react";

const App = () => {
    const todos = useClientStore<Todo>("todo");
		
    if(todos.processing) {
        return <Spinner />
    }
    
    if(todos.error) {
        return <p className="error">{error.message}</p>
    }
	
    const handleCreatItem = async () => {
        await todos.createItem({
            // only name is required (marked with $), the store will auto fill the other fields with defaults
            name: "Go to Gym" 
        });
    }
    
    return (
        <>
            <button type="button" onClick={handleCreatItem}>create todo</button>
            <FlatList list={todos.items} renderItem={renderTodo}/>
        </>
    )
}
```

## Installation

### In Node Projects:

```bash
npm install client-web-storage
```

```js
import {Schema, ClientStore} from "client-web-storage";
```

### In the Browser

```html
<!-- use the latest version -->
<script src="https://unpkg.com/client-web-storage/client-web-storage.min.js"></script>

<!-- use a specific version -->
<script src="https://unpkg.com/client-web-storage@1.7.5/client-web-storage.min.js"></script>
```

```html
<script>
  const {Schema, ClientStore} = window.CWS;
</script>
```

## Documentation

[Documentation](https://github.com/beforesemicolon/client-web-storage/blob/main/documentation/docs.md)

#### Application Examples
- [React](https://github.com/beforesemicolon/client-web-storage-project-examples/tree/main/react);
- [Angular](https://github.com/beforesemicolon/client-web-storage-project-examples/tree/main/angular);

[-- Check them All ---](https://github.com/beforesemicolon/client-web-storage-project-examples)

#### API References
- **[ClientStore](https://github.com/beforesemicolon/client-web-storage/blob/main/documentation/api-references/ClientStore.md)**
- **[Schema](https://github.com/beforesemicolon/client-web-storage/blob/main/documentation/api-references/Schema.md)**
- **[SchemaValue](https://github.com/beforesemicolon/client-web-storage/blob/main/documentation/api-references/SchemaValue.md)**
