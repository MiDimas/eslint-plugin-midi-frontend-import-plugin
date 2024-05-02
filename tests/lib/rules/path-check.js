/**
 * @fileoverview checking correct path for feature sliced design
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-check"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-check", rule, {
  valid: [
    {
      name: 'correct absolute path',
      filename: 'C:/User/Desktop/project/src/entities/Article',
      code: "import { NotificationCard } from 'entities/Notification/ui/NotificationCard/NotificationCard'",
    },
    {
      name: 'correct relative path',
      filename: 'C:/User/Desktop/project/src/entities/Article',
      code: "import { ArticleCard } from './ui/ArticleCard/ArticleCard'",
    },
    {
      name: 'correct absolute path with alias',
      filename: 'C:/User/Desktop/project/src/entities/Article',
      code: "import { NotificationCard } from '@/entities/Notification/ui/NotificationCard/NotificationCard'",
      options: [{
        aliasAbsolutePath: '@'
      }]
    },
  ],

  invalid: [
    {
      name: 'incorrect absolute path',
      filename: 'C:/User/Desktop/project/src/entities/Article',
      code: "import { ArticleCard } from 'entities/Article/ui/ArticleCard/ArticleCard'",
      errors: [{ message: "В рамках одного модуля все импорты должны быть относительными"}],
      output: "import { ArticleCard } from './Article/ui/ArticleCard/ArticleCard'"
    },
    {
      name: 'incorrect absolute path with alias',
      filename: 'C:/User/Desktop/project/src/entities/Article',
      code: "import { ArticleCard } from '@/entities/Article/ui/ArticleCard/ArticleCard'",
      errors: [{ message: "В рамках одного модуля все импорты должны быть относительными"}],
      options: [{
        aliasAbsolutePath: '@'
      }],
      output: "import { ArticleCard } from './Article/ui/ArticleCard/ArticleCard'"
    },
  ],
});
