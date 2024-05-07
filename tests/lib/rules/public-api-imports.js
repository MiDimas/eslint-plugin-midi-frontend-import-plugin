/**
 * @fileoverview The rule prohibits the use of components not from public API
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("public-api-imports", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      name: 'correct absolute path',
      code: "import {Component} from 'entities/Article'",
      filename: 'C:/User/Desktop/project/src/entities/Article',
    },
    {
      name: 'correct absolute path with alias',
      code: "import {Component} from '@/entities/Article'",
      options: [{
        aliasAbsolutePath: '@'
      }]
    },
    {
      name: 'relative path',
      code: "import {Component} from './Article'",
      options: [{
        aliasAbsolutePath: '@'
      }]
    },
    {
      name: 'correct import from testing public API',
      code: "import {Component} from '@/entities/Article/test'",
      filename: 'C:/User/Desktop/project/src/features/ArticleDetails/test.test.ts',
      options: [{
        aliasAbsolutePath: '@',
        testFilePatterns: ['**/*.test.ts', '**/*.test.tsx'],
        testPublicName: 'test'
      }]
    },
    {
      name: 'correct import from testing public API without alias',
      code: "import {Component} from 'entities/Article/test'",
      filename: 'C:/User/Desktop/project/src/features/ArticleDetails/test.test.ts',
      options: [{
        testFilePatterns: ['**/*.test.ts', '**/*.test.tsx'],
        testPublicName: 'test'
      }]
    }
  ],

  invalid: [
    {
      name: "incorrect absolute path",
      code: "import {Component} from 'entities/Article/ui/Components/Components';",
      errors: [{ message: "Импорт из внешних модулей должен осуществляться только через public API"}],
      output: "import {Component} from 'entities/Article';"
    },
    {
      name: "incorrect absolute path with alias",
      code: "import {Component} from '@/entities/Article/ui/Components/Components';",
      errors: [{ message: "Импорт из внешних модулей должен осуществляться только через public API"}],
      options: [{
        aliasAbsolutePath: '@'
      }],
      output: "import {Component} from '@/entities/Article';"
    },
    {
      name: "incorrect use testing public api",
      filename: 'C:/User/Desktop/project/src/entities/Article/ui/article.ts',
      code: "import {Component} from '@/entities/Article/testing';",
      errors: [{ message: "Импорт из testing public API может осуществляться только из тестовых файлов"}],
      options: [{
        aliasAbsolutePath: '@'
      }],
      output: "import {Component} from '@/entities/Article';"
    },
    {
      name: "incorrect import for test",
      filename: 'C:/User/Desktop/project/src/entities/Article/ui/article.test.ts',
      code: "import {Component} from '@/entities/Article/testing/test.ts';",
      errors: [{ message: "Импорт для тестов дополнительно может осуществляться только из тестового public API"}],
      options: [{
        aliasAbsolutePath: '@',
        testFilePatterns: ['**/*.test.ts', '**/*.test.tsx']
      }],
      output: "import {Component} from '@/entities/Article/testing';"
    }
  ],
});
