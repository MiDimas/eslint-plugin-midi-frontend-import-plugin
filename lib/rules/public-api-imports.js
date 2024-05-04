/**
 * @fileoverview The rule prohibits the use of components not from public API
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const {isPathRelative} = require('../helpers/index')
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "The rule prohibits the use of components not from public API",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: {
      "error": "Импорт из внешних модулей должен осуществляться только через public API"
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [{
      type: 'object',
      properties: {
        aliasAbsolutePath: {
          type: 'string'
        }
      },
      additionalProperties: false
    }], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here
    const {
      options: [{
        aliasAbsolutePath = ""
      } = {}]
    } = context
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      ImportDeclaration(node) {
        if(node.source) {
          const importTo = node.source.value;
          const {result, toArray} = publicChecking(importTo, aliasAbsolutePath);
          if(result) {
            context.report({
              node,
              messageId: 'error',
              fix: fixer => {
                return fixer.replaceText(node.source, fixPath(toArray, aliasAbsolutePath));
              }
            })
          }
        }
      }
    };
  },
};
const checkingLayers = {
  entities: 'entities',
  features: 'features',
  pages: 'pages',
  widgets: 'widgets',
}
function publicChecking(to, alias){
  if(isPathRelative(to)){
    return {result: false, toArray: []}
  }

  let hasSrc = false

  if(to.includes("src")){
    to = to.split("src")[1];
    hasSrc = true;
  }
  else if(alias && to.includes(alias+'/')) {
    to = to.split(alias)[1];
    hasSrc = true;
  }

  const toArray = to.split('/');

  if(hasSrc){
    toArray.shift();
  }
  const toLayer = toArray[0] || '';
  const toSlice = toArray[1] || '';
  if(!toLayer || !toSlice || !(toLayer in checkingLayers)) {
    return {result: false, toArray: []};
  }

  if(toArray.length > 2) {
    return {result: true, toArray };
  }
  return {result: false, toArray: []}
}

function fixPath ( to= [], aliasAbsolutePath='') {
  to.splice(2);
  if(aliasAbsolutePath) {
    return `'${aliasAbsolutePath}/${to.join("/")}'`
  }
  return `'${to.join("/")}'`
}
