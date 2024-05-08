# The rule prohibits the use of components not from public API (`midi-plugin-import/public-api-imports`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->


## Rule Details

This rule aims to eliminate imports from the internals of modules,
in order to maintain the encapsulation of modules.

Examples of **incorrect** code for this rule:

```js
// without alias
import {Component} from 'entities/Article/ui/Components/Component';

// with alias
import {Component} from '@/entities/Article/ui/Components/Component';

```

Examples of **correct** code for this rule:

```js
// without alias
import {Component} from 'entities/Article';
// with alias
import {Component} from '@/entities/Article';


```

### Options

#### aliasAbsolutePath
This option adds the alias and has a type: string.

#### testFilePatterns
This option adds patterns for the test file, 
which will use imports from the testing public API.  
Has a type: array of strings
```js
{
    testFilePatterns: ['**/*.test.ts', '**/*.test.tsx']
}
```

#### testPublicName

This option changes name of the testing public API.  
Default name: 'testing'  
Has a type: string
```js 
    {
        testPublicName: 'test'
    }
    
    // from the test file, it will be correct
    import { Component } from "entities/Article/test";
```

## When Not To Use It

When you don't use module architecture.
