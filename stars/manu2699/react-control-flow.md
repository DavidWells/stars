---
repo: manu2699/react-control-flow
url: 'https://github.com/manu2699/react-control-flow'
homepage: ''
starredAt: '2023-03-14T20:45:13Z'
createdAt: '2023-03-02T17:03:55Z'
updatedAt: '2025-01-26T12:57:48Z'
language: TypeScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:54.439Z'
description: Control flow components for React
tags:
  - dx
  - flow
  - jsx
  - react
---

# Control Flow React

Control Flow React is a lightweight package that provides minimal control flow components for React. These components are inspired by [Solid.js](https://www.solidjs.com/tutorial/flow_show) are designed to help developers refactor code in a declarative format that is more cleaner and easier to read or review.

### Contents
- [Difference](#differences)
- [Installation](#installation)
- [Iteratives](#iteratives)
	- [For](#for)
- [Conditional](#conditionals)
	- [Show](#show)
	- [Switch](#switch)


### Differences
![Screenshot 2023-03-05 at 1 59 43 PM](https://user-images.githubusercontent.com/34669116/222950168-36be9d0b-6a30-4687-a1c4-5177e0034541.png)


## Installation

```sh
npm install control-flow-react
```

## Iteratives

### For

Iterates over an array provided in `each` prop and renders the `children` function.
If the array is empty or falsy, then the `fallBack` prop is rendered.

> Note: 'children' will be a function that receives in each iteration item and
> index <br> eg: `(item, index) => <div> {index} - {item </div>`

```jsx
import { For } from "control-flow-react";
let stats = [
	{ name: "Argentina", trophies: 3 },
	{ name: "France", trophies: 2 },
	{ name: "Brazil", trophies: 5 }
];
return (
	<For each={stats}>
		{(country, index) => (
			<div>
				{index + 1} - {country.name} - {country.trophies}
			</div>
		)}
	</For>
);
```

```tsx
interface iForProps {
	each: any[] | undefined | null;
	children: (item: any, index: number) => any;
	emptyState?: ReactNode | string | null;
}
const For: ({ each, children, emptyState }: iForProps) => ReactNode | null;
```

## Conditionals

### Show

Conditionally renders `children` or `fallBack` based on condition provided to
`when` prop.

```jsx
import { Show } from "control-flow-react";

let loggedIn = true;
return (
	<Show when={loggedIn} fallBack={<Button>LogIn</Button>}>
		<Button>Logout</Button>
	</Show>
);
```

```tsx
interface iShowProps {
    when: boolean | number | string | any | undefined;;
    children: ReactNode | string | null;
    fallBack?: ReactNode | string | null;
}
const Show: ({ when, children, fallBack }: iShowProps) => ReactNode | null;
```

### Switch

Renders first matching `<Case>` if its props _**value**_ or _**values**_ matches
with condition provided in _**when**_ prop to `<Switch>` component and if none of them
matches _**fallBack**_ will be rendered.

> Note: Pass an array to _***values***_ props in `<Case>` to match any one among
> them. <br> > `<Case>` should be direct child for `<Switch>`

```jsx
import { Switch, Case } from "control-flow-react";

let { status, err } = await fetch(url).catch();
return (
	<Switch when={status} fallBack={<div>Default Component</div>}>
		<Case value={"LoggedIn"}>
			<DashboardComponent />
		</Case>
		<Case value={"LoggedOut"}>
			<LoginComponent />
		</Case>
		{/* use values props for multiple match scenarios */}
		<Case values={["UserNotFound", "LoginError", "WrongPass"]}>
			<ErrorComponent err={err} />
		</Case>
	</Switch>
);
```

```tsx
type ConditionClause = boolean | number | string | any | undefined;
interface iSwitchProps {
	when: ConditionClause;
	children: ReactNode;
	fallBack: string | ReactNode | null;
}
const Switch: (props: iSwitchProps) => ReactNode | null;
interface iCaseProps {
	children: ReactNode;
	value: ConditionClause;
	values?: ConditionClause[];
}
const Case: ({ children }: iCaseProps) => ReactNode | null;
```
