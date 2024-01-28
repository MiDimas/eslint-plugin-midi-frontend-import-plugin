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

const ruleTester = new RuleTester();
ruleTester.run("path-check", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "sdfss",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
