# eslint-plugin-midi-plugin-import

the plugin for fix paths of imports 

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

If you use an absolute path alias, you need to include the "aliasAbsolutePath" parameter and the alias name.

```json
{
    "rules": {
        "midi-plugin-import/{rule-name}": [2, {"aliasAbsolutePath": "@"}]
    }
}
```

## Rules

The rule for checking inside modules for relative imports
[path-check](./docs/rules/path-check.md);

The rule for checking imports from the public API
[public-api-imports](./docs/rules/public-api-imports.md);