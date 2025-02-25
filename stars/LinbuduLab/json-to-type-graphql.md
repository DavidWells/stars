---
repo: LinbuduLab/json-to-type-graphql
url: 'https://github.com/LinbuduLab/json-to-type-graphql'
homepage: ''
starredAt: '2021-12-01T06:01:03Z'
createdAt: '2021-08-26T07:50:25Z'
updatedAt: '2023-02-23T12:15:55Z'
language: TypeScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:32.819Z'
description: Generate TypeGraphQL class definition from JSON/Remote API/JSON File.
tags:
  - generator
  - graphql
  - json
  - type-graphql
---

# json-type-graphql

Generate TypeGraphQL class definition from JSON/Remote API/JSON File.

## Start

```bash
npm i json-type-graphql --save
yarn add json-type-graphql --save
pnpm i json-type-graphql --save
```

## Current Feature

This project is still under heavy development, the documentation is far from ready, but basic features are already supported:

- Support `nested object type`(like: `{ foo: { bar: { baz:{} } } }`) and `array entry json`(like: `[{},{}]`) type generation.
- Normal generator order as `P-C1-C11-C12-C2-C21-C3-C31`.
- Customizable processing flow: reader / preprocessor / postprocessor / writer
- ...

## Example

> Run `yarn demo` to explore!

JSON:

```json
{
  "booleanField": true,
  "numberField": 200,
  "stringField": "success",
  "primitiveArrayField": [1, 2, 3, 4, 5],
  "mixedField": [
    1,
    2,
    {
      "a": "1111111"
    }
  ],
  "emptyArrayField": [],
  "nestedField": {
    "booleanField": true,
    "numberField": 200,
    "stringField": "success",
    "primitiveArrayField": [1, 2, 3, 4, 5],
    "mixedFieldrs": [1, 2]
  }
}
```

```typescript
import path from "path";
import fs from "fs-extra";
import transformer from "json-type-garphql";

(async () => {
  await transformer({
    // Provide json file path
    reader: { path: path.join(__dirname, "./demo.json") },
    // Customize parser behaviour
    parser: {
      forceNonNullable: false,
    },
    // Customize generator behaviour
    generator: { entryClassName: "Root", sort: true },
    // Check can generated TypeGraphQL class be used normally
    checker: {
      disable: false,
    },
    // Write generated file!
    writter: {
      outputPath: path.join(__dirname, "./generated.ts"),
    },
  });
})();
```

> More options will be introduced below.

generated:

```typescript
import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
export class MixedField {
  @Field()
  a!: string;
}

@ObjectType()
export class EmptyArrayField {}

@ObjectType()
export class NestedField {
  @Field({ nullable: true })
  booleanField?: boolean;

  @Field((type) => Int, { nullable: true })
  numberField?: number;

  @Field({ nullable: true })
  stringField?: string;

  @Field((type) => [Int], { nullable: true })
  primitiveArrayField?: number[];

  @Field((type) => [Int], { nullable: true })
  mixedFieldrs?: number[];
}

@ObjectType()
export class Root {
  @Field({ nullable: true })
  booleanField?: boolean;

  @Field((type) => Int, { nullable: true })
  numberField?: number;

  @Field({ nullable: true })
  stringField?: string;

  @Field((type) => [Int], { nullable: true })
  primitiveArrayField?: number[];

  @Field((type) => [MixedField], { nullable: true })
  mixedField?: MixedField[];

  @Field((type) => [EmptyArrayField], { nullable: true })
  emptyArrayField?: EmptyArrayField[];

  @Field((type) => NestedField, { nullable: true })
  nestedField?: NestedField;
}
```

## Programmatic Usage

```typescript
import {
  reader,
  parser,
  preprocessor,
  generator,
  writter,
} from "json-type-graphql";

export default async function handler(options: Options): Promise<void> {
  // read from data source you want
  // you can also use custom reader
  const content = await reader(options.reader);

  // make some custom processing
  const preprocessed = preprocessor(content, normalizedPreprocessorOptions);

  // parse content
  const parsedInfo = parser(preprocessed, normalizedParserOptions);

  fs.ensureFileSync(normalizedWritterOptions.outputPath);

  const source = new Project().addSourceFileAtPath(
    normalizedWritterOptions.outputPath
  );

  // generate AST and result!
  generator(source, parsedInfo, normalizedGeneratorOptions);

  // write!
  writter(normalizedWritterOptions);
}
```

## Options

### Reader

**Reader** is responsible for reading data from different sources including `JSON File` / `URL Request` / `Raw JavaScript Object`, you must provide one of `reader.path` / `reader.url` / `reader.raw` options.

#### Reader.Options

- `path`(`string`): **Absoulte** JSON file path.
- `url`(`string`) & `options`(`Got Options`): Using [got](https://www.npmjs.com/package/got) for data fetching: `got(url, options)`.
- `raw`(`object` | `array`): Vanilla JavaScript Object / Array.

After content acquisition got completed, the content will be passed to next handler called **preprocessor**.

### Preprocessor

Preprocessor will perform some extra pre-processing works in the incoming content:

- **Recursively delete** object field which value is kind of **nested array** like `[[]]`, this is not supported yet which may cause unexpected behaviours or errors.
- Ensure array contains either **primitive type values** or **object type values**, by default,**only obejct values will be preserved** when the array
  contains both kinds of members(You can control this behaviour by `preprocessor.preserveObjectOnlyInArray`).

#### Preprocessor.Options

- `preserveObjectOnlyInArray`(`boolean`): `default: true`
- `customPreprocessor`(`(raw: object | array) => object | array`): Use your own custom preprocessor, which accepts content from reader, and should return JavaScript Object / Array.

### Parser

**Parser** will transform the pre-processed content to specific object structure,
which will be consumed by `generator`.

> Array entry structure(like `[]`) and object entry structure(like `{}`) will be parsed differently.

#### Parser.Options

- `forceNonNullable`(`boolean`): Mark all field as non-nullale. `default: true`
- `forceNonNullableListItem`(`boolean`): Mark all list item as non-nullale. `default: false`
- `forceReturnType`(`boolean`): Generate return type for even `string` / `boolean` field like `@Field((type) => String)`. `default: false`
- `arrayEntryProp`(`string`): When parsing array-entry structure, use specified prop name like: `data: Data[]`. `default: 'data'`.
  For example, `[{ foo: 1 }]` will be parsed to:

  ```javascript
  class Data {
    foo: number;
  }

  class Root {
    data: Data[];
  }
  ```

### Generator

**Generator** will traverse the parsed info, perform corresponding AST operations to generate class definitions with TypeGraphQL decorators.

#### Generator.Options

- `entryClassName`(`string`): The top-level generated entry class name. `default: 'Root'`.
- `prefix`(`boolean` | `string`): Prefix for generated class name, you can set `prefix: true` to simply avoid repeated class specifier. `default: false`.
  By using parent class in child class name's prefix, like `RootChildSomeChildProp` is from:

  ```javascript
  class Root {
    child: RootChild;
  }

  class RootChild {
    someChildProp: RootChildSomeChildProp;
  }

  class RootChildSomeChildProp {}
  ```

- `suffix`(`boolean` | `string`): Suffix for generated class name, e.g. `RootType`, `Type` is the specified suffix.`default: false`.
- `publicProps`(`string[]`): Prop names included by it will be attatched with `public` keyword.
- `readonlyProps`(`string[]`): Prop names included by it will be attatched with `readonly` keyword.
- `sort`(`boolean`): Should sort generated class in normal order like `P-C1-C11-C12-C2-C21-C3-C31`. `default: true`.

### Postprocessor

**Postprocessor** is used to apply some post-process works on generated source (`TypeScript SourceFile`), you can use [ts-morph](https://ts-morph.com/) for simple and flexiable AST operations, which also powers the generator part indeed.

#### Postprocessor.Options

- `customPostprocessor`(`(source: SourceFile) => SourceFile`): Custom post-processor accepts the AST source file.

### Checker

**Checker** will use generated class definitions to create a tmp reoslver, invoking `TypeGraphQL.buildSchemaSync` method to check if generated file works correctly.

We're using `ts-node tmp-file.ts --compiler-options [options]` to perform the check under the hood.

#### Checker.Options

- `disable`(`boolean`): Disable checker. `default: true`
- `keep`(`boolean`): Keey generated tmp checker file. `default: false`
- `execaOptions`(`Execa Options`): Extra options passed to [execa](https://www.npmjs.com/package/execa).
- `executeOptions`(`Ts-node compile Options`): Extra options passed to ts-node `--compiler-options`, which keeps same with TypeSctipt CompilerOptions.

### Writer

**Writer** will format generated source file.

#### Writer.options

- `outputPath`(`string`): Output path. required.
- `format`(`boolean`): Should perform formatting by `Prettier`. `default: true`.
- `formatOptions`(`Prettier Options`): Options passed to `Prettier.format`.
