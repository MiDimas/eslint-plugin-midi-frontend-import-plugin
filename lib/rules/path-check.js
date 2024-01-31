/**
 * @fileoverview checking correct path for feature sliced design
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
      description: "checking correct path for feature sliced design",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: {
      "Aaaaahhhh": "Линтер ругается"
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

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
        const importTo = node.source.value;
        console.log(importTo)
        const fromFilename = context.filename;
        console.log(fromFilename)
        context.report({
          node,
          messageId: "Aaaaahhhh"
        });
      }
    };
  },
};
const layers = {
  entities: 'entities',
  features: 'entities',
  shared: 'entities',
  pages: 'entities',
  widgets: 'entities',
}
function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../');
}

function shouldBeRelative(from, to) {
  if(isPathRelative(to)) {
    return false;
  }
  // "./entities/Articles"
  const toArray = to.split('/');
  const toLayer = toArray[1];
  const toSlice = toArray[2];

  if(!toLayer || !toSlice || !layers[toLayer]){
    return false;
  }

  //C:\Projects\study\src\entities\Article
  const fromArray = from.split('/');
}

console.log(shouldBeRelative("C:\\Projects\\study\\src\\entities\\Article", "./entities/Articles"));