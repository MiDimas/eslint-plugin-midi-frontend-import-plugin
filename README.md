# eslint-plugin-midi-plugin-import

the plugin for fix paths of imports 

### [page on GitHub](https://github.com/MiDimas/eslint-plugin-midi-frontend-import-plugin)  

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-midi-plugin-import`:

```sh
npm install eslint-plugin-midi-plugin-import --save-dev
```

## Usage

Add `midi-plugin-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "midi-plugin-import"
    ]
}
```


Then configure the rules you want to use under the rules section.

This rule is necessary to check the use of relative paths inside slices in accordance with the FSD methodology.
(This rule has a fixer.) 
```json
{
    "rules": {
        "midi-plugin-import/path-check": 2
    }
}
```
This rule is necessary to control the production of absolute imports from the public API only.
(This rule has a fixer.) 
```json
{
    "rules": {
        "midi-plugin-import/public-api-imports": 2
    }
}
```

This rule is necessary to control the production of imports from the underlying layers.
(This rule doesn't have a fixer.) 
```json
{
    "rules": {
        "midi-plugin-import/layer-imports": 2
    }
}
```

If you use an absolute path alias, you need to include the "aliasAbsolutePath" parameter and the alias name.

```json
{
    "rules": {
        "midi-plugin-import/{rule-name}": [2, {"aliasAbsolutePath": "@"}]
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                   | Description                                                    | 🔧 |
| :----------------------------------------------------- | :------------------------------------------------------------- | :- |
| [layer-imports](https://github.com/MiDimas/eslint-plugin-midi-frontend-import-plugin/blob/main/docs/rules/layer-imports.md)           | restriction on importing overlying layers into underlying ones |    |
| [path-check](https://github.com/MiDimas/eslint-plugin-midi-frontend-import-plugin/blob/main/docs/rules/path-check.md)                 | checking correct path for feature sliced design                | 🔧 |
| [public-api-imports](https://github.com/MiDimas/eslint-plugin-midi-frontend-import-plugin/blob/main/docs/rules/public-api-imports.md) | The rule prohibits the use of components not from public API   | 🔧 |

<!-- end auto-generated rules list -->

