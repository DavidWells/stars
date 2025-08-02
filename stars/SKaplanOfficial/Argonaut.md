---
repo: SKaplanOfficial/Argonaut
url: 'https://github.com/SKaplanOfficial/Argonaut'
homepage: ''
starredAt: '2025-07-16T00:20:32Z'
createdAt: '2023-09-11T03:04:44Z'
updatedAt: '2025-07-16T00:20:32Z'
language: Rich Text Format
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-02T22:32:28.376Z'
description: An AppleScript library for parsing and handling command-line arguments
tags:
  - applescript
  - applescript-library
  - arguments
  - command-line
  - script-library
---

# Argonaut v1.0.0

Argonaut is a script library for parsing command-line arguments to AppleScript/ASObjC scripts. The library provides handlers for specifying arguments and their requirements, parsing arguments at runtime, performing type checking, and running callbacks when specified conditions are met. Argonaut is a high-level framework for argument specification and handling that abstracts aways many of the finer implementation details so that you can focus on creating useful command-line scripts.

## Installation

Download and unzip Argonaut.zip from [https://github.com/SKaplanOfficial/Argonaut/releases/latest](https://github.com/SKaplanOfficial/Argonaut/releases/latest). Then, move or copy Argonaut.scptd into your _~/Library/Script Libraries_ directory. You'll then be able to use Argonaut in future scripts, and you can view the scripting dictionary in Script Editor or Script Debugger just as you would any other.

## Usage

To begin, include the library in a script using the following statement:

`use script "Argonaut" version "1.0"`

This will allow you to use terminology from Argonaut in the rest of the script.

The overall process in working with Argonaut is summarized as:

1. Add named arguments using the `add argument` command, specifying as much or as little additional information as you need.

2.	Run the `initialize argument parser` command, optionally providing a `parser configuration` record to customize how the parser behaves and add additional information to your script's help text.

3.	Define handlers to run when specific conditions are met, e.g. when all arguments are valid or when no arguments yield errors, and connect them to the parser using the `handle arguments` command.

4.	Run the script from the command-line using _osascript_, providing arguments that fit your specifications.

### Command List
	
- `add argument` - Add an argument to parse for and configure various aspects of it
- `argument names` - Gets the list of argument names
- `check arguments` - Validate all arguments
- `check for argument` - Validate the presence and value type of an individual argument
- `filter arguments` - Filter the validated list of arguments based on state, type, requirement setting, and/or value. 
- `handle arguments` - Run handlers conditionally, e.g. when all arguments are valid or when any argument is missing
- `initialize argument parser` - Prepare the parser, set up help text, and apply custom settings 
- `list arguments` - Gets the active configuration of all arguments

### Adding Arguments

Every argument has a unique name associated with it; all other properties are optional. Properties are interwoven such that using different values for the `type`, for example, influences how `validator` handlers are applied, and most properties have some impact on how the `help text` displays.

When running a script from the command-line, arguments are primarily specified by either their full flag (--name) or a shorthand flag (-x) if you define one. Shorthand flags are not automatically derived from the name as you might have multiple arguments beginning with the same letter.  Thus, you can specify a custom shorthand flag using `add argument "myArg" flag "x"`, which will register _-x_ as a valid alternate indicator. The value you want to pass in for myArg would come after _-x_, e.g.: `osascript example.scpt -x "value"`.

By default, arguments accept a single (non-list) value of any type. To enforce a specific data type on the argument's value, specify a type using `add argument "myArg" type [type]`. The type can be a standard AppleScript class, such as `integer` or `URL`, or it can be one of the Argonaut-specific types such as `ArgInteger`, `ArgPath`, or `ArgURLList`. Singular value types will look for a single value immediately following a flag, while list types will match every value up until the next flag occurs or the end of the line.

When users invoke the top-level _--help_ or _-h_ flag on the script, in addition to displaying the `global help text`, the `help text` for each argument will be displayed. Users can get more detail about specific arguments by passing "help" as the value, regardless of the argument's data type, which will print out the argument's `details`.

You can specify `dependencies` for an argument to require that other arguments are also provided whenever the argument is used. These can be specified as either a list of argument names or a list of `argument` records. Failing to supply each dependency argument will yield an error.

### Validation Handlers (Custom Validators)

Argonaut automatically handles value type validation for each of the built-in argument types, but, if you need to verify other kinds of inputs, you can create a custom handler and provide it as the `validator` parameter when creating a new argument. The handler must accept two parameters: 1) the name of the argument and 2) the string value. The handler must return a `record` with fields for the `validity` of the argument and the augmented `value`. The `validity` must be one of the `argument state` constants.

As an example, consider a script that displays an standard alert given a title, message, and type provided as arguments. Any arbitrary string of text will suffice for the title and message, so both can use the type `any` or `ArgAny` (the default). The alert type, however, has to map to one of the AppleScript alert type constants (critical/‌informational/‌warning). We can use a custom validation handler to address this as follows:

```applescript
use script "Argonaut" version "1.0"
use scripting additions

on isAlertType(theArg, value)
	set isValid to invalid
	set augmentedValue to missing value
	
	if value is "critical" then
		set isValid to valid
		set augmentedValue to critical
	else if value is "informational" then
		set isValid to valid
		set augmentedValue to informational
	else if value is "warning" then
		set isValid to valid
		set augmentedValue to warning
	end if
	return {validity:isValid, value:augmentedValue}
end isAlertType

on run argv
	add argument "title" help text "The title text of the alert." with required
	add argument "message" help text "The message text of the alert." without required
	add argument "type" help text "The alert type." validator isAlertType details "Must be one of: 'critical', 'informational', or 'warning'." without required
	initialize argument parser
	handle arguments argv
end run
```

In place of a handler, you can instead supply a script object which defines a `validate(theArg, value)` handler within it. The advantage to this is that you'll be able to access property local to your script. The script above is equivalent to:

```applescript
use script "Argonaut" version "1.0"
use scripting additions

property importantProperty : "important data"

script AlertTypeValidator
	on validate(theArg, value)
		log importantProperty
		...
	end validate
end script

on run argv
	...
	add argument "type" help text "The alert type." validator AlertTypeValidator details "Must be one of: 'critical', 'informational', or 'warning'." without required
	...
end run
```

### Action Handlers

Similar to validators, you can also supply a handler or script object to specify an action to run when parsing has completed for any given argument. The action runs regardless of whether the value is valid and regardless of whether the argument exists in the input; you will have to handle these conditions in your implementation however you see fit. Both the handler and script object variations must support three parameters: the argument itself, its status, and its value (correctly typed). In the script object, the handler must be named `runAction`. The example below showcases both variations.

```applescript
use script "Argonaut" version "1.0"

property importantProperty : false

script ActionRunner
	on runAction(theArg, status, value)
		log class of value
		log importantProperty -- Will work
	end runAction
end script

on runAction(theArg, status, value)
	log theArg
	log importantProperty -- Won't work property
end runAction

on run argv
	add argument "arg1" type ArgInteger action ActionRunner without required
	add argument "arg2" type ArgFlag action runAction without required
	initialize argument parser
	handle arguments argv
end run
```

### Handling Parsed Values

When you use the `handle arguments` command, you can supply handlers for several conditions at once. Each handler will be called with the list of arguments passing the condition alongside the summary record of all arguments and values. The value returned by the last handler run (the last one passed to the command) will be returned as the overall result of the command.

If you don't want to use the `handle arguments` command, you can call `check arguments` directly and then access arguments and their values with the `list arguments` command. You will have to filter arguments manually or using `filter arguments`. 

### Filtering Arguments

If you find yourself needing to filter arguments beyond the basics handled by `handle arguments`, you can use `filter arguments`. This command accepts several parameters for specifying the criteria to filter arguments by, and it accepts a `using custom filter` parameter for even more granular control.

All of the following are valid calls to filter arguments :

```applescript
filter arguments by state valid -- Gets all arguments passed to the script that have a valid value
```

```applescript
filter arguments by type ArgList -- Gets all arguments accepting any kind of list as a value
```

```applescript
filter arguments (list arguments) by type {ArgPath, ArgFlag} -- Gets arguments that are either flags or accept a path value
```

```applescript
filter arguments with required -- Gets all required arguments
```

```applescript
filter arguments without required -- Gets all optional arguments
```

```applescript
filter arguments with has value -- Gets all arguments that have some value specified (even if it is invalid)
```

```applescript
filter arguments using custom filter passesTest -- Gets arguments for which the passesTest handler returns true
```

```applescript
filter arguments using custom filter MyCustomFilter -- Gets arguments for which the passesTest handler of the MyCustomFilter script object returns true
```

```applescript
filter arguments by state valid by type ArgURL -- Gets all arguments whose value is a valid URL
```

```applescript
filter arguments by state excluded with value -- Gets all arguments that aren't directly specified but have a default value
```

### Other Notes

- Argonaut will attempt to convert argument values to their configured type before calling any custom handlers for validation, actions, or result handling. For example, file paths supplied as text strings will be converts to instances of AppleScript's `POSIX file` class.
- Arguments' status property has a missing value until there are validated either automatically by `handle arguments` or manually using `check arguments` or `check for argument`.
