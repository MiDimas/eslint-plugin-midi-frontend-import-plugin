/**
 * @fileoverview restriction on importing overlying layers into underlying ones
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "restriction on importing overlying layers into underlying ones",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: {
      'notAllow': "Слой может импортировать только нижележащие слои"
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [{
      type:'object',
      properties: {
        aliasAbsolutePath: {
          type:'string'
        },
        ignorePatterns: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
      },
      additionalProperties: false
    }], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here
    const {
      options: [{
        aliasAbsolutePath = "",
        testFilePatterns = [],
      } = {}]
    } = context

    let filename = context.filename;
    if(!filename) {
      filename = context.getFilename();
    }
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
    };
  },
};
