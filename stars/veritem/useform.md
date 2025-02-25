---
repo: veritem/useform
url: 'https://github.com/veritem/useform'
homepage: ''
starredAt: '2022-06-07T18:48:27Z'
createdAt: '2022-04-17T07:59:57Z'
updatedAt: '2022-08-17T12:01:05Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:44.340Z'
description: 'Tiny hook that make react forms easy '
tags: []
---

### useForm 

![npm](https://img.shields.io/npm/v/@veritem/useform)

Tiny hook to use form state in your component.

#### Usage

```ts
import useForm from '@veritem/useform';

export default function App() {
  const { handleChange, inputs, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
```

### License

[MIT](https://github.com/veritem/useform/blob/main/LICENSE) Licence &copy; 2022 - present [veritem](https://github.com/veritem)
