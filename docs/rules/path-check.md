# Checking correct path for feature sliced design (`midi-plugin-import/path-check`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->



## Rule Details

This rule aims to eliminate absolute 
imports within the module

Examples of **incorrect** code for this rule:

```js

// fill me in

```

Examples of **correct** code for this rule:

```js

// fill me in

```

### Options

#### #### aliasAbsolutePath
This option adds the alias and has a type: string.

```js
{
    aliasAbsolutePath: '@'
}
// This import will be correct
import {Component} from "@/entities/Article";
```

## When Not To Use It

If you don't use FSD methodology.
