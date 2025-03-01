---
repo: ferrislucas/promptr
url: 'https://github.com/ferrislucas/promptr'
homepage: ''
starredAt: '2023-04-07T21:48:01Z'
createdAt: '2023-03-24T02:38:38Z'
updatedAt: '2025-02-22T18:32:25Z'
language: JavaScript
license: MIT
branch: main
stars: 920
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:52.940Z'
description: >-
  Promptr is a CLI tool that applies plain language instructions to the
  filesystem. Instructions can utilize a liquidjs based templating system. Use
  cases include refactoring, code generation, and experimentation.
tags:
  - ai
  - chatgpt
  - cli
  - codegen
  - coding-assistant
  - command-line
  - gpt-4
  - gpt-4o
  - gpt4
  - gpt4o
  - javascript
  - openai
  - prompt-engineering
  - prompt-toolkit
  - prompt-tuning
---

# Promptr

Promptr is a CLI tool that lets you use plain English to instruct OpenAI LLM models to make changes to your codebase. Changes are applied directly to the files that you reference from your prompt.<br /><br />
## Usage

`promptr [options] -p "your instructions" <file1> <file2> <file3> ...`
<br />

I've found this to be a good workflow:
- Commit any changes, so you have a clean working area.
- Author your prompt in a file. The prompt should be specific clear instructions. 
- Make sure your prompt contains the relative paths of any files that are relevant to your instructions. 
- Use Promptr to execute your prompt. Provide the path to your prompt file using the `-p` option: 
`promptr -p my_prompt.txt` 

Promptr will apply the model's code directly to your files. Use your favorite git UI to inspect the results. 

<br /><br />

<br />
<br />

## Examples

The PR's below are good examples of what can be accomplished using Promptr. You can find links to the individual commits and the prompts that created them in the PR descriptions.
- https://github.com/ferrislucas/promptr/pull/38
- https://github.com/ferrislucas/promptr/pull/41
<br /><br />


## Templating 

Promptr supports templating using [liquidjs](https://liquidjs.com/), which allows users to incorporate templating commands within their prompt files. This feature enhances the flexibility and reusability of prompts, especially when working on larger projects with repetitive patterns or standards.

#### Using Includes

Projects can have one or more "includes"—reusable snippets of code or instructions—that can be included from a prompt file. These includes may contain project-specific standards, instructions, or code patterns, enabling users to maintain consistency across their codebase.

For example, you might have an include file named `_poject.liquid` with the following content:

```liquid
This project uses Node version 18.
Use yarn for dependency management.
Use import not require in Javascript.
Don't include `module.exports` at the bottom of Javascript classes.
Alphabetize method names and variable declarations.
```

In your prompt file, you can use the `render` function from liquidjs to include this include file in a prompt file that you're working with:

```liquid
{% render '_project.liquid' %}
// your prompt here
```

This approach allows for the development of reusable include files that can be shared across multiple projects or within different parts of the same project.

#### Example Use Cases

- **Project-Wide Coding Standards**: Create an include file with comments outlining coding standards, and include it in every new code file for the project.

- **Boilerplate Code**: Develop a set of boilerplate code snippets for different parts of the application (e.g., model definitions, API endpoints) and include them as needed.

- **Shared Instructions**: Maintain a set of instructions or guidelines for specific tasks (e.g., how to document functions) and include them in relevant prompt files.

By leveraging the templating feature, prompt engineers can significantly reduce redundancy and ensure consistency in prompt creation, leading to more efficient and standardized modifications to the codebase.

<br /><br />

## Options

| Option | Description |
| ------ | ----------- |
| `-p, --prompt <prompt>` | Specifies the prompt to use in non-interactive mode. A path or a url can also be specified - in this case the content at the specified path or url is used as the prompt. The prompt can leverage the liquidjs templating system. |
| `-m, --model <model>` | Optional flag to set the model, defaults to `gpt-4o`. Using the value "gpt3" will use the `gpt-3.5-turbo` model. |
| `-d, --dry-run` | Optional boolean flag that can be used to run the tool in dry-run mode where only the prompt that will be sent to the model is displayed. No changes are made to your filesystem when this option is used. |
| `-i, --interactive` | Optional boolean flag that enables interactive mode where the user can provide input interactively. If this flag is not set, the tool runs in non-interactive mode. |
| `-t, --template <templateName | templatePath | templateUrl>` | Optional string flag that specifies a built in template name, the absolute path to a template file, or a url for a template file that will be used to generate the output. The default is the  built in `refactor` template. The available built in templates are: `empty`, `refactor`, `swe`, and `test-first`. The prompt is interpolated with the template to form the payload sent to the model. |
| `-x` | Optional boolean flag. Promptr parses the model's response and applies the resulting operations to your file system when using the default template. You only need to pass the `-x` flag if you've created your own template, and you want Promptr to parse and apply the output in the same way that the built in "refactor" template output is parsed and applied to your file system. |
| `-o, --output-path <outputPath>` | Optional string flag that specifies the path to the output file. If this flag is not set, the output will be printed to stdout. |
| `-v, --verbose` | Optional boolean flag that enables verbose output, providing more detailed information during execution. |
| `-dac, --disable-auto-context` | Prevents files referenced in the prompt from being automatically included in the context sent to the model. |
| `--version` | Display the version and exit |

Additional parameters can specify the paths to files that will be included as context in the prompt. The parameters should be separated by a space.

<br />
<br />
## Requirements
- Node 18
- [API key from OpenAI](https://beta.openai.com/account/api-keys)
- [Billing setup in OpenAI](https://platform.openai.com/account/billing/overview)

<br />

## Installation

#### With yarn
```
yarn global add @ifnotnowwhen/promptr
```

#### With npm
```
npm install -g @ifnotnowwhen/promptr
```

#### With the release binaries
You can install Promptr by copying the binary for the current release to your path. Only MacOS is supported right now.

#### Set OpenAI API Key
An environment variable called `OPENAI_API_KEY` is expected to contain your OpenAI API secret key.

#### Build Binaries using PKG
```
npm run bundle
```
```
npm run build:<platform win|macos|linux>
```
```
npm run test-binary
```

## License

Promptr is released under the [MIT License](https://opensource.org/licenses/MIT).

