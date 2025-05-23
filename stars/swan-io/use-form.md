---
repo: swan-io/use-form
url: 'https://github.com/swan-io/use-form'
homepage: 'https://swan-io.github.io/use-form'
starredAt: '2021-04-19T00:29:05Z'
createdAt: '2021-03-25T09:56:44Z'
updatedAt: '2025-02-13T12:10:46Z'
language: TypeScript
license: MIT
branch: main
stars: 208
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:48.941Z'
description: >-
  A simple, fast, and opinionated form library for React & React Native focusing
  on UX.
tags:
  - form
  - react
  - validation
---

# @swan-io/use-form

[![mit licence](https://img.shields.io/dub/l/vibe-d.svg?style=for-the-badge)](https://github.com/swan-io/use-form/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@swan-io/use-form?style=for-the-badge)](https://www.npmjs.org/package/@swan-io/use-form)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@swan-io/use-form?label=size&style=for-the-badge)](https://bundlephobia.com/result?p=@swan-io/use-form)

A simple, fast, and opinionated form library for React & React Native focusing on UX.<br>
👉 Take a look at [the demo website](https://swan-io.github.io/use-form).

## Setup

```bash
$ npm install --save @swan-io/use-form
# --- or ---
$ yarn add @swan-io/use-form
```

## Features

- Subscription-based field updates (avoid re-render the whole form on each keystroke 🔥)
- Validation strategies ✨
- Field sanitization
- Mounted-only fields validation
- Advanced focus handling
- Best-in-class TypeScript support
- Sync and async form submission

## Motivation

Why another React form library 🤔?<br>
Because, as silly as it seems, we couldn't find any existing library which fits our existing needs:

- We want validation strategies per field because we fell in love with them when we read the [re-formality](https://github.com/MinimaHQ/re-formality) documentation (which is unfortunately only available for [ReScript](https://rescript-lang.org/)).
- It should be able to handle huge forms without a single performance hiccup.
- Validation should be simple, reusable, and testable (aka just functions).
- It shouldn't even try to validate unmounted fields.
- It should have built-in focus management (to improve the keyboard flow of our React Native forms).

## Validation strategies ✨

The key of **good UX** is simple: validation should be executed **in continue**, feedback should be provided **when it makes sense**.

### Quick example: A credit card field 💳

Let's say we want to display a valid state icon (✔) when the input value is a valid credit card number but don't want to display an error until the user blurs the field (and lets the value in an invalid state).

#### Something like this:

![Valid credit card](docs/credit-card-valid.gif)
![Invalid credit card](docs/credit-card-error.gif)

How do we easily achieve such magic? With the `onSuccessOrBlur` strategy 🧙‍♂️<br>

```tsx
const {} = useForm({
  cardNumber: { initialValue: "", strategy: "onSuccessOrBlur" },
});
```

Of course, `onSuccessOrBlur` will not fit perfectly every use-case!<br>
That's precisely why every field config could declare its own `strategy`:

| Strategy          | When feedback will be available?                              |
| ----------------- | ------------------------------------------------------------- |
| `onChange`        | On first change (as the user types or update the value)       |
| `onSuccess`       | On first validation success                                   |
| `onBlur`          | On first field blur                                           |
| `onSuccessOrBlur` | On first validation success or first field blur **(default)** |
| `onSubmit`        | On form submit                                                |

#### Note that:

- The strategies will only be activated after the field value update / the form submission.
- Once the first feedback is given (the field is `valid` or should display an `error` message), the field switches to what we call _"talkative"_ state. After that, feedback will be updated on each value change until this field or the form is reset.

## API

⚠️ The API is described using TypeScript pseudocode.<br>These types are not exported by the library / are not even always valid.

### useForm

`useForm` takes one argument (a map of your fields configs) and returns a set of helpers (functions, components, and values) to manage your form state.

```tsx
import { useForm } from "@swan-io/use-form";

const {
  formStatus,
  Field,
  FieldsListener,
  getFieldValue,
  getFieldRef,
  setFieldValue,
  setFieldError,
  focusField,
  resetField,
  sanitizeField,
  validateField,
  listenFields,
  resetForm,
  submitForm,
} = useForm({
  // Keys are used as fields names
  fieldName: {
    initialValue: "",
    // Properties below are optional (those are the default values)
    strategy: "onSuccessOrBlur",
    isEqual: (value1, value2) => Object.is(value1, value2),
    sanitize: (value) => value,
    validate: (value, { focusField, getFieldValue }) => {},
  },
});
```

#### Field config

```tsx
type fieldConfig = {
  // The initial field value. It could be anything (string, number, boolean…)
  initialValue: Value;

  // The chosen strategy. See "validation strategies" paragraph
  strategy: Strategy;

  // Used to perform initial and current value comparaison
  isEqual: (value1: Value, value2: Value) => boolean;

  // Will be run on value before validation and submission. Useful from trimming whitespaces
  sanitize: (value: Value) => Value;

  // Used to perform field validation. It could return an error message (or nothing)
  validate: (value: Value) => ErrorMessage | void;
};
```

#### formStatus

```tsx
type formStatus =
  | "untouched" // no field has been updated
  | "editing"
  | "submitting"
  | "submitted";
```

#### `<Field />`

A component that exposes everything you need locally as a `children` render prop.

```tsx
<Field name="fieldName">
  {
    (props: {
      // A ref to pass to your element (only required for focus handling)
      ref: MutableRefObject;
      // The field value
      value: Value;
      // Is the field valid?
      valid: boolean;
      // The field is invalid: here its error message.
      error?: ErrorMessage;
      // The onBlur handler (required for onBlur and onSuccessOrBlur strategies)
      onBlur: () => void;
      // The onChange handler (required)
      onChange: (value: Value) => void;
    }) => /* … */
  }
</Field>
```

#### `<FieldsListener />`

A component that listens for fields states changes. It's useful when a part of your component needs to react to fields updates without triggering a full re-render.

```tsx
<FieldsListener names={["firstName", "lastName"]}>
  {
    (states: Record<"firstName" | "lastName", {
      // The field value
      value: Value;
      // Is the field valid?
      valid: boolean;
      // The field is invalid: here its error message.
      error?: ErrorMessage;
    }>) => /* … */
  }
</FieldsListener>
```

#### getFieldValue

By setting `sanitize: true`, you will enforce sanitization.

```tsx
type getFieldValue = (
  name: FieldName,
  options?: {
    sanitize?: boolean;
  },
) => Value;
```

#### getFieldRef

Return the field stable `ref`.

```tsx
type getFieldRef = <T>(name: FieldName) => MutableRefObject<T>;
```

#### setFieldValue

By setting `validate: true`, you will enforce validation. It has no effect if the field is already _talkative_.

```tsx
type setFieldValue = (
  name: FieldName,
  value: Value,
  options?: {
    validate?: boolean;
  },
) => void;
```

#### setFieldError

Will make the field _talkative_.

```tsx
type setFieldError = (name: FieldName, error?: ErrorMessage) => void;
```

#### focusField

Will only work if you forward the `Field` provided `ref` to your input.

```tsx
type focusField = (name: FieldName) => void;
```

#### resetField

Hide user feedback (the field is not _talkative_ anymore) and set value to `initialValue`.

```tsx
type resetField = (name: FieldName) => void;
```

#### sanitizeField

Sanitize the field value.

```tsx
type sanitizeField = (name: FieldName) => void;
```

#### validateField

Once you manually call validation, the field automatically switches to _talkative_ state.

```tsx
type validateField = (name: FieldName) => ErrorMessage | void;
```

#### listenFields

A function that listen for fields states changes. Useful when you want to apply side effects on values change.

```tsx
React.useEffect(() => {
  const removeListener = listenFields(
    ["firstName", "lastName"],
    (states: Record<"firstName" | "lastName", {
      // The field value
      value: Value;
      // Is the field valid?
      valid: boolean;
      // The field is invalid: here its error message.
      error?: ErrorMessage;
    }>) => /* … */
  );

  return () => {
    removeListener();
  }
}, []);
```

#### resetForm

Hide user feedback for all fields (they are not _talkative_ anymore). Reset values to their corresponding `initialValue` and `formStatus` to `untouched`.

```tsx
type resetForm = () => void;
```

#### submitForm

Submit your form. Each callback could return a `Promise` to keep `formStatus` in `submitting` state.

```tsx
type submitForm = (options?: {
  onSuccess?: (values: OptionRecord<Values>) => Future<unknown> | Promise<unknown> | void;
  onFailure?: (errors: Partial<Record<keyof Values, ErrorMessage>>) => void;
  // by default, it will try to focus the first errored field (which is a good practice)
  focusOnFirstError?: boolean;
}) => void;
```

### combineValidators

As it's a very common case to use several validation functions per field, we export a `combineValidators` helper function that allows you to chain sync validation functions: it will run them sequentially until an error is returned.

```tsx
import { combineValidators, useForm } from "@swan-io/use-form";

const validateRequired = (value: string) => {
  if (!value) {
    return "required";
  }
};

const validateEmail = (email: string) => {
  if (!/.+@.+\..{2,}/.test(email)) {
    return "invalid email";
  }
};

const MyAwesomeForm = () => {
  const { Field, submitForm } = useForm({
    emailAddress: {
      initialValue: "",
      // will run each validation function until an error is returned
      validate: combineValidators(
        isEmailRequired && validateRequired, // validation checks could be applied conditionally
        validateEmail,
      ),
    },
  });

  // …
};
```

### toOptionalValidator

Very often, we want to execute validation only if a value is not empty. By wrapping any validator (or combined validators) with `toOptionalValidator`, you can bypass the validation in such cases.

```tsx
import { toOptionalValidator, Validator } from "@swan-io/use-form";

// This validator will error if the string length is < 3 (even if it's an empty string)
const validator: Validator<string> = (value) => {
  if (value.length < 3) {
    return "Must be at least 3 characters";
  }
};

// This validator will error if value is not empty string and if the string length is < 3
const optionalValidator = toOptionalValidator(validator);
```

This function also accept a second param (required for non-string validators) to specify what is an empty value.

```tsx
import { toOptionalValidator, Validator } from "@swan-io/use-form";

const validator: Validator<number> = (value) => {
  if (value < 10) {
    return "Must pick at least 10 items";
  }
};

// This validator will also accept a value of 0, as we consider it "empty"
const optionalValidator = toOptionalValidator(validator, (value) => value === 0);
```

## Quickstart

```tsx
import { useForm } from "@swan-io/use-form";

const MyAwesomeForm = () => {
  const { Field, submitForm } = useForm({
    firstName: {
      initialValue: "",
      strategy: "onSuccessOrBlur",
      sanitize: (value) => value.trim(), // we trim value before validation and submission
      validate: (value) => {
        if (value === "") {
          return "First name is required";
        }
      },
    },
  });

  return (
    <form
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();

        submitForm({
          onSuccess: (values) => console.log("values", values), // all fields are valid
          onFailure: (errors) => console.log("errors", errors), // at least one field is invalid
        });
      }}
    >
      <Field name="firstName">
        {({ error, onBlur, onChange, valid, value }) => (
          <>
            <label htmlFor="firstName">First name</label>

            <input
              id="firstName"
              onBlur={onBlur}
              value={value}
              onChange={({ target }) => {
                onChange(target.value);
              }}
            />

            {valid && <span>Valid</span>}
            {error && <span>Invalid</span>}
          </>
        )}
      </Field>

      <button type="submit">Submit</button>
    </form>
  );
};
```

## More examples

A full set of examples is available on [the demo website](https://swan-io.github.io/use-form) or in the [`/website` directory](https://github.com/swan-io/use-form/tree/main/website) project. Just clone the repository, install its dependencies and start it!

## Acknowledgements

- [re-formality](https://github.com/MinimaHQ/re-formality) for the [validation strategies](https://github.com/MinimaHQ/re-formality/blob/master/docs/02-ValidationStrategies.md) idea.
- [react-hook-form](https://react-hook-form.com/) and [react-final-form](https://github.com/final-form/react-final-form) for their subscription pattern implementations.
