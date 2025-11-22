---
repo: Dimava/yamlscript
url: 'https://github.com/Dimava/yamlscript'
homepage: null
starredAt: '2025-11-10T18:46:27Z'
createdAt: '2025-11-09T22:57:37Z'
updatedAt: '2025-11-10T18:46:28Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-11-22T22:30:54.875Z'
description: >-
  Enable TypeScript language server features for TypeScript code embedded in
  YAML files
tags: []
---

# YAMLScript - TypeScript in YAML Files

Enable TypeScript language server features (error checking, type checking, IntelliSense) for TypeScript code embedded in YAML files - similar to how it works in Markdown files!

## Features

- ✅ **Type Checking**: Get TypeScript errors directly in your YAML files
- ✅ **IntelliSense**: Auto-completion and hover information for TypeScript code
- ✅ **Diagnostics**: See TypeScript errors, warnings, and suggestions inline
- ✅ **Automatic Detection**: Automatically detects TypeScript code blocks in YAML files
- ✅ **Real-time Updates**: Diagnostics update as you type

## How It Works

The extension uses **Virtual Documents** to extract TypeScript code from YAML files and connect it to the TypeScript language server. This is the same approach used by VS Code for Markdown files.

When you open a YAML file:
1. The extension scans for TypeScript code blocks
2. Each code block is extracted and registered as a virtual `.ts` document
3. The TypeScript language server analyzes the virtual documents
4. Diagnostics (errors, warnings) are mapped back to the original YAML file
5. You see TypeScript errors directly in your YAML file!

## Usage

Simply write TypeScript code in your YAML files using multiline string blocks. The extension will automatically detect and analyze TypeScript code in values with keys like:

- `code`, `script`, `handler`, `transform`, etc.
- Any multiline string that looks like TypeScript

### Example YAML File

```yaml
name: My Configuration

# TypeScript code with type checking
handler:
  code: |
    interface User {
      id: number;
      name: string;
      email: string;
    }
    
    const user: User = {
      id: 1,
      name: "John",
      // ERROR: Missing 'email' property
    };

# Function with generics
utils:
  script: |
    function processData<T>(data: T[]): T[] {
      return data.filter(item => item !== null);
    }
    
    // ERROR: Type '"invalid"' is not assignable
    type Status = "active" | "inactive";
    const status: Status = "invalid";
```

## Supported Patterns

The extension detects TypeScript code in several ways:

1. **Explicit Markers**: Use comments to mark TypeScript blocks
   ```yaml
   # typescript:
   code: |
     const x: number = 1;
   ```

2. **Common Keys**: Keys containing `code`, `script`, `handler`, `transform`, etc.
   ```yaml
   script: |
     function hello() { }
   ```

3. **Heuristic Detection**: Automatically detects TypeScript patterns
   - `const`, `let`, `var`, `function`, `class`, `interface`, `type`
   - Type annotations (`: string`, `: number`, etc.)
   - Arrow functions (`=>`)
   - Imports/exports
   - Generics (`<T>`)

## Requirements

- VS Code 1.105.0 or higher
- TypeScript installed in your workspace or globally

## Extension Commands

- `YAMLScript: Hello World` - Test command to verify the extension is active

## Known Limitations

- Line/column mappings may be slightly off for deeply indented code blocks
- Some advanced TypeScript features may not work perfectly in all contexts
- The extension works best with isolated code blocks (not split across multiple YAML values)

## Comparison with Markdown

This extension brings the same TypeScript integration that Markdown files have to YAML files:

| Feature | Markdown Code Blocks | YAML with YAMLScript |
|---------|---------------------|----------------------|
| TypeScript Errors | ✅ | ✅ |
| Type Checking | ✅ | ✅ |
| IntelliSense | ✅ | ✅ |
| Real-time Updates | ✅ | ✅ |
| Diagnostics | ✅ | ✅ |

## Development

To work on this extension:

```bash
# Install dependencies
pnpm install

# Compile and watch for changes
pnpm run watch

# Run the extension in debug mode
# Press F5 in VS Code
```

## How to Test

1. Open the extension folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. Open the `example.yaml` file
4. You should see TypeScript errors highlighted in the YAML file!

## Release Notes

### 0.0.1

Initial release:
- Virtual document provider for TypeScript code in YAML
- Automatic code block detection
- TypeScript diagnostics mapped to YAML source
- Support for multiple code blocks per file

---

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub!

**Enjoy coding with TypeScript in YAML! 🚀**
