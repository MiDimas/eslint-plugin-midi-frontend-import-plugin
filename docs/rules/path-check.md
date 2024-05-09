# Checking correct path for feature sliced design (`midi-plugin-import/path-check`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

[Back to main doc](../../README.md)

## Rule Details

This rule aims to eliminate absolute 
imports within the module

Examples of **incorrect** code for this rule:

```js

// in file /src/entities/Article (public API - file) without alias
import { ArticleCard } from 'entities/Article/ui/ArticleCard/ArticleCard'

//  in file /src/entities/Article (public API - file) with alias
import { ArticleCard } from '@/entities/Article/ui/ArticleCard/ArticleCard'

```

Examples of **correct** code for this rule:

```js

// in file /src/entities/Article (public API - file) without alias
import { ArticleCard } from './ui/ArticleCard/ArticleCard'

//  in file /src/entities/Article (public API - file) with alias
import { ArticleCard } from './ui/ArticleCard/ArticleCard'

```

### Options

#### aliasAbsolutePath
This option adds the alias and has a type: string.

```js
{
    aliasAbsolutePath: '@'
}
// This import will be correct if it's be absolute
import {Component} from "@/entities/Article";
```

## When Not To Use It

If you don't use FSD methodology.
