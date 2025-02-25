---
repo: voiceflow/react-dismissable-layers
url: 'https://github.com/voiceflow/react-dismissable-layers'
homepage: null
starredAt: '2021-07-10T20:14:37Z'
createdAt: '2021-07-05T19:43:43Z'
updatedAt: '2024-09-03T10:59:10Z'
language: TypeScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.053Z'
description: React dismissable context and hook with layers (nesting) support
tags: []
---

<div align="center">
  <h1>
    <br/>
    react-dismissable-layers
    <br />
    <br />
  </h1>

  <sup>
    <a href="https://www.npmjs.com/package/react-dismissable-layers">
       <img src="https://img.shields.io/npm/v/react-dismissable-layers.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/react-dismissable-layers">
      <img src="https://img.shields.io/npm/dm/react-dismissable-layers.svg" alt="npm downloads" />
    </a>
    <a href="https://voiceflow.github.io/react-dismissable-layers/?path=/story/example-popper--multiple-nested">
      <img src="https://img.shields.io/badge/demos-🚀-lightblue.svg" alt="demos" />
    </a>
  </sup>

  <br />
  <br />

maintained by [@voiceflow](https://github.com/voiceflow)

> Context and hook to add support for nested, auto-dismissable layers. State can be globally controlled through context. Best used with [react-popper](https://github.com/popperjs/react-popper).

  <br />

  <pre>npm i <a href="https://www.npmjs.com/package/react-dismissable-layers">react-dismissable-layers</a></pre>

  <pre>yarn add <a href="https://www.npmjs.com/package/react-dismissable-layers">react-dismissable-layers</a></pre>
</div>
<br />

## Demo

Check out the [Storybook Demo](https://voiceflow.github.io/react-dismissable-layers/?path=/story/example-popper--multiple-nested) to see in action.

<img width="1097" alt="Screen Shot 2021-07-07 at 8 35 04 AM" src="./docs/preview.png">

## Quick Start

Add `<DismissableLayersGlobalProvider>` on a parent component.
Use the `useDismissable()` hook to associate different toggleable components.

```jsx
import { useDismissable } from 'react-dismissable-layers';

// open and close
const Component = () => {
  const [open, toggleOpen] = useDismissable(false);

  return (
    <div>
      <button onClick={toggleOpen}>Open Tooltip</button>
      {open && <Popper>Tooltip Content</Popper>}
    </div>
  );
};
```

```jsx
import { DismissableLayerContext } from 'react-dismissable-layers';

// close all dismissibles in context
const OtherComponent = () => {
  const dismissOverlay = React.useContext(DismissableLayerContext);

  const close = React.useCallback(() => {
    dismissOverlay.dismissAllGlobally();
  }, []);

  return <button onClick={close}>Close All</button>;
};
```

## API

- `DismissableLayersGlobalProvider` - global provider for Dismissable Layers, wrap the whole app to make sure the `useDismissable` hook works with layers.

  ```typescript
  interface DismissableLayersGlobalProviderProps {
    /**
     * optional prop, the HTML-node to listen close events, default is `document`
     */
    rootNode?: HTMLElement | Document;
  }

  const DismissableLayersGlobalProvider = React.FC<DismissableLayersGlobalProviderProps>;
  ```

<br/>

- `useDismissable` - a hook to toggle and dismiss poppers.

  ```typescript
  interface Options {
    /**
     * ref for the popper content, to not close on the content's [dismissEvent] action
     */
    ref?: RefObject<Element>;

    /**
     * callback which will be invoked when the popper is closed
     */
    onClose?: null | VoidFunction;

    /**
     * event on which popper will be closed, default is `'click'`
     */
    dismissEvent?: DismissEventType;

    /**
     * the popper will be closed just by the [dismissEvent] action, without any layers logic, default is `false`
     */
    disableLayers?: boolean;

    /**
     * do not close on default prevented events, default is `true`
     */
    skipDefaultPrevented?: boolean;
  }

  type Api = readonly [
    isOpened: boolean,

    /**
     * function to toggle popper
     */
    toggle: VoidFunction,

    /**
     * function to force close popper
     */
    close: VoidFunction
  ];

  const useDismissable = (defaultValue = false, options: Options = {}) => Api;
  ```

<br />

- `DismissableLayerContext` - a context to read a dissmissable layer, in most cases shouldn't be used in app layer.

  ```typescript
  interface DismissableLayerValue<T extends HTMLElement | Document = Document> {
    /**
     * for internal usage only
     */
    readonly _subscriber: Subscriber;

    /**
     * root node of the dismiss layer
     */
    readonly rootNode: T;

    /**
     * dismiss currently opened in the current layer
     */
    readonly dismiss: VoidFunction;

    /**
     * has handler on the current layer
     */
    readonly hasHandler: () => boolean;

    /**
     * add close handler to the current layer
     */
    readonly addHandler: (eventType: DismissEventType, handler: DismissEventHandler) => void;

    /**
     * remove close handler from the current layer
     */
    readonly removeHandler: (eventType: DismissEventType) => void;

    /**
     * dismiss all on all layers
     */
    readonly dismissAllGlobally: VoidFunction;

    /**
     * has subscriber on any layer
     */
    readonly hasHandlersGlobally: () => boolean;
  }

  const DismissableLayersGlobalProvider = React.FC<DismissableLayersGlobalProviderProps>;
  ```

<br />

- `DismissableLayerProvider` - provider for Dismissable Layer, wrap the popper content to make the nested poppers works as a nested ones.

  ```typescript
  interface DismissableLayerProviderProps {
    /**
     * optional prop, the HTML-node to listen close events, default is `document`
     */
    rootNode?: HTMLElement | Document;
  }

  const DismissableLayerProvider = React.FC<DismissableLayerProviderProps>;
  ```

<br/>
