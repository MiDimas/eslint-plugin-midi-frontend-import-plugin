/**
 * @fileoverview restriction on importing overlying layers into underlying ones
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      name: "entities in entities",
      code: "import { ArticleCard } from 'entities/User/ui/UserCard/UserCard'",
      filename: 'C:/User/Desktop/project/src/entities/Article',
    },
    {
      name: "outside modules",
      code: "import { useEffect } from 'react'",
      filename: 'C:/User/Desktop/project/src/entities/Article',
    },
  ],

  invalid: [
    {
      name: "features in entities",
      code: "import { ArticleCard } from 'features/News/ui/ArticleCard/ArticleCard'",
      filename: 'C:/User/Desktop/project/src/entities/Article',
      errors: [{ message: "Слой может импортировать только нижележащие слои"}],
    },
    {
      name: "entities in shared",
      code: "import { UserCard } from 'entities/User/ui/UserCard/UserCard'",
      filename: 'C:/User/Desktop/project/src/shared/input',
      errors: [{ message: "Слой может импортировать только нижележащие слои"}],
    },
    {
      name: "widget in features with alias",
      code: "import { ArticleViewer } from '@/widgets/ArticleViewer/ui/ArticleViewer/ArticleViewer'",
      filename: 'C:/User/Desktop/project/src/features/Article',
      errors: [{ message: "Слой может импортировать только нижележащие слои"}],
      options: [{
        aliasAbsolutePath: '@'
      }]
    },
  ],
});
