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

const ruleTester = new RuleTester();
ruleTester.run("public-api-imports", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import {Component} from 'entities/article/ui/Components/Components';",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
