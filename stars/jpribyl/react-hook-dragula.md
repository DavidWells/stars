---
repo: jpribyl/react-hook-dragula
url: 'https://github.com/jpribyl/react-hook-dragula'
homepage: null
starredAt: '2021-07-09T23:50:20Z'
createdAt: '2021-07-04T02:18:02Z'
updatedAt: '2023-12-04T07:34:52Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.288Z'
description: >-
  Provides named parameters and strong typing + declarative usage to dragula
  within React.
tags: []
---

# React Hook Dragula

[![npm version](https://badge.fury.io/js/react-hook-dragula.svg)](https://badge.fury.io/js/react-hook-dragula)

Lightweight, strongly typed package with almost no dependencies. It uses
Dragula and React Hooks to smoothly manage the DOM state. It also adds a
context store which allows you to pass the data back and forth between
`Dragula` and `React`.  take a look at the [example project](https://github.com/jpribyl/react-hook-dragula/tree/main/example) or the [live
demo](https://johnpribyl.com/react-hook-dragula/) of the example project.

![Example of usage](/demo.gif)

## Install
```
yarn add react-hook-dragula
```

## Usage

### Initializing

```jsx
// Typing for data which will be attached to dragula events. Yours will be different.
type Fruit = {
  itemId: number;
  itemName: string;
}

type DraggableStore = {
  fruit: Fruit;
  fruits: Fruit[];
  setFruits: Dispatch<SetStateAction<Fruit[]>>;
}

const {
  Dragula,
  DragulaContainer,
  Draggable,
  DragulaHandle,
  useDraggableStore,
  useInternalStore,
  useDrake,
} = initializeDragula<DraggableStore>();
```

### Basic dragging

```jsx
<Dragula>
  <DragulaContainer>
    <Draggable>
      You can move these elements between these two containers
    </Draggable>
  </DragulaContainer>

  <DragulaContainer>
    <Draggable>
      There's also the possibility of moving elements around in the
      same container, changing their position
    </Draggable>
  </DragulaContainer>
</Dragula>
```

### Customizing Dragula options

```jsx
<Dragula
  options={{ moves: ({ container }) => !!container?.children.length > 1 }}
  onDrop={() => console.log('dragula drop event!')}
>
  <DragulaContainer>
    <Draggable>
      You can move these elements between these two containers
    </Draggable>
    <Draggable>
      There's also the possibility of moving elements around in the
      same container, changing their position
    </Draggable>
    <Draggable>
      Anyting can be moved around. That includes images, links, or any other
      nested elements.
    </Draggable>
  </DragulaContainer>

  <DragulaContainer>
    <Draggable>
      This element can't be moved until a second one is added into it's container
    </Draggable>
  </DragulaContainer>
</Dragula>
```


### Attaching data to Dragula store

```jsx
const [fruits, setFruits] = useState<Fruit[]>([
  { itemId: 1, itemName: 'apples' },
  { itemId: 2, itemName: 'oranges' },
  { itemId: 3, itemName: 'tomatoes' },
]);

<Dragula
  onDrop={({ el, source }) => {
      setFruits([...source.children].map(
        ({ draggableStore: { fruit } }) => draggableStore,
      ))

      console.log('Dragual drop event for: ', el.draggableStore.fruit.itemName)
  }}
>
  <DragulaContainer>
    {fruits.map(fruit => (
      <Draggable
        key={fruit.id}
        draggableStore={{
          fruit,
          fruits,
          setFruits,
        }}
      >
        <div>{fruit.itemName} - id: {fruit.id}</div>
      </Draggable>
    ))}
  </DragulaContainer>
</Dragula>
```

### Using Drake and InternalStore
```jsx
<Dragula
  options={{ moves: ({ el }) => !!el?.internalStore.isMouseOverHandle }}
>
  <DragulaContainer>
    <Draggable>
      <DragulaHandle>You can only drag this item by clicking on me!</DragulaHandle>
      <div>You can move these elements between these two containers</div>
    </Draggable>
    <Draggable>
      This item doesn't have a handle.. so it can't be moved at all!
    </Draggable>
  </DragulaContainer>
</Dragula>
```


## API

### Extended typings
Each `<Draggable/>` node has a `draggableStore` and an `internalStore` object attached to it:
```tsx
type InternalStore = {
  isMouseOverHandle: boolean;
};

type DraggableStore<T> = T;

type ExtendedDrakeElement<T> = Element & {
  draggableStore: DraggableStore<T>;
  internalStore: InternalStore;
};

type ExtendedDrakeSource<T> = Element & { children: ExtendedDrakeElement<T>[] };
```
----

### Exported function
#### `initializeDragula` - - - returns `object` with entries:
```jsx
Dragula: (props: DragulaContainerProps<T>) => <Dragula<T> {...props} />
```
```jsx
DragulaContainer: (props: HTMLProps<HTMLDivElement>) => (<DragulaContainer {...props} />)
```
```jsx
Draggable: (props: DraggableProps<T>) => <Draggable<T> {...props} />
```
```jsx
DragulaHandle: (props: DragulaHandleProps) => <DragulaHandle {...props} />
```
```jsx
useDraggableStore: () => useDraggableStore<T>()
```
```jsx
useInternalStore: () => useInternalStore()
```
```jsx
useDrake: () => useDrake()
```

----

### Component props

#### For the following, we have typings:
```tsx
OnEventProps<T = typeof DraggableStore> {
  clone: ExtendedDrakeElement<T>,
  container: Element,
  el: ExtendedDrakeElement<T>,
  original: ExtendedDrakeElement<T>,
  sibling: ExtendedDrakeElement<T>,
  source: ExtendedDrakeSource<T>,
  target: ExtendedDrakeElement<T>,
  type: 'mirror' | 'copy',
}
```

----

```jsx
<Dragula
  options={{
    isContainer: ({ el }) => false,
    moves: ({ el, source, handle, sibling }) => true,
    accepts: ({ el, target, source, sibling }) => true,
    invalid: ({ el, handle }) => true,
    direction: "vertical",
    copy: false,
    copySortSource: false,
    revertOnSpill: false,
    removeOnSpill: false,
    mirrorContainer: document.body,
    ignoreInputTextSelection: true,
    slideFactorX: 0,
    slideFactorY: 0,
  }}
  onDrag={({ el, source }) => {}}
  onDragEnd={({ el }) => {}}
  onDrop={({ el, target, source, sibling }) => {}}
  onCancel={({ el, container, source }) => {}}
  onRemove={({ el, container, source }) => {}}
  onShadow={({ el, container, source }) => {}}
  onOver={({ el, container, source }) => {}}
  onOut={({ el, container, source }) => {}}
  onCloned={({ clone, original, type }) => {}}
  dependencyList={[]}
/>
```
See [Dragula configuration](https://github.com/bevacqua/dragula#usage) for more info

----

```jsx
<DragulaContainer {...props} />
```

- `HTMLProps<HTMLDivElement>` optional
  - This component has no special props
  - Anything passed to it will be forwarded to a `<div />` element

----

```jsx
<Draggable
  draggableStore={{}}
  {...props}
/>
```

- `draggableStore` Object, required
  - Type of store must match `<T>` from when you initialized `const { Draggable } = initializeDragula<T>()`

- `HTMLProps<HTMLDivElement>` optional
  - Anything else passed to it will be forwarded to a `<div />` element

----

```jsx
<DragulaHandle {...props} />
```

- `HTMLProps<HTMLDivElement>` optional
  - This component has no special props
  - Anything passed to it will be forwarded to a `<div />` element

----

### Custom Hooks
```ts
  useDraggableStore: () => typeof DraggableStore<T>
```

```ts
  useInternalStore: () => { isMouseOverHandle: boolean; }
```

```ts
  // If Drake type & arrow functions were generic, then it would be this:
  // useDrake: <T>() => Drake<ExtendedDrakeElement<T>>;
  // Since they're not generic, we wind up with:
  useDrake: () => ReturnType<ExtendedDragula<any>>;
```

## Acknowledgements
- Big thanks to all the work that Nicolás Bevacqua has done to build and maintain `Dragula` !
