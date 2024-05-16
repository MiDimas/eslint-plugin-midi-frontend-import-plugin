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
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import { ArticleCard } from 'features/User/ui/ArticleCard/ArticleCard'",
      filename: 'C:/User/Desktop/project/src/entities/Article',
      errors: [{ message: "Слой может импортировать только нижележащие слои"}],
    },
  ],
});
