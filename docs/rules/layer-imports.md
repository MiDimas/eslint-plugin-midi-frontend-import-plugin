# Restriction on importing overlying layers into underlying ones (`midi-plugin-import/layer-imports`)

<!-- end auto-generated rule header -->


## Rule Details

This rule aims to eliminate imports from the overlying layers

Examples of **incorrect** code for this rule:

```js
// from C:/User/Desktop/project/src/entities/Article
import { ArticleCard } from 'features/News/ui/ArticleCard/ArticleCard'

```

Examples of **correct** code for this rule:

```js
// from C:/User/Desktop/project/src/entities/Article
import { ArticleCard } from 'entities/User/ui/UserCard/UserCard'

```

### Options


#### aliasAbsolutePath
This option adds the alias and has a type: string.

```js
{
    aliasAbsolutePath: '@'
}
// from C:/User/Desktop/project/src/entities/Article
// This import will be correct
import {Component} from "@/entities/User";
```

#### ignorePatterns
This option adds the patterns to ignore checking and has a type: string[].

```js
{
    ignorePatterns: ["**.*.test.ts", "**.*.test.tsx"]
}
// from C:/User/Desktop/project/src/features/ArticleCard
// This import will be correct
import {Component} from "@/widgets/componentWidget/component.test.ts";
```

## When Not To Use It

If you didn't use Featured Slice Design  methodology 
