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
      "Aaaaahhhh": "В рамках одного модуля все импорты должны быть относительными"
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
        if(node.source){
          const importTo = node.source.value;

          let fromFilename = context.filename;
          if(!fromFilename) {
            fromFilename = context.getFilename();
          }

          if(shouldBeRelative(fromFilename, importTo)) {
            context.report({
              node,
              messageId: "Aaaaahhhh"
            });
          }
        }
      }
    };
  },
};
const layers = {
  entities: 'entities',
  features: 'features',
  shared: 'shared',
  pages: 'pages',
  widgets: 'widgets',
}
function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../');
}

function shouldBeRelative(from, to) {

  //C:\Projects\study\src\entities\Article
  const arrNorm = from.split('src')
  const projectFrom = arrNorm.length>1 ? arrNorm[1] : arrNorm[0];
  const fromArray = projectFrom && projectFrom.split(/\\|\//);
  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];
  if(!fromLayer || !fromSlice || !layers[fromLayer]){
    return false;
  }

  // "./entities/Articles" | "/src/entities/Article"
  let hasSrc = false
  if(to.includes("src")){
    to = to.split("src")[1];
    hasSrc = true;
  }
  const relativeTo = isPathRelative(to);

  const toArray = to.split('/');
  const toLayer = hasSrc || relativeTo ? toArray[1] : toArray[0];
  const toSlice = hasSrc || relativeTo ? toArray[2] : toArray[1];

  if(!toLayer || !toSlice || !layers[toLayer]){
    return false;
  }
  if(relativeTo){
    return fromSlice !== toSlice;
  }
  else {
    if(toLayer === "shared" && toSlice === "ui") {
      return false;
    }
    return fromSlice === toSlice && fromLayer === toLayer;
  }
}