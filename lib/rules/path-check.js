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
    fixable: 'code', // Or `code` or `whitespace`
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
          const {result, fromArray, toArray} = shouldBeRelative(fromFilename, importTo);

          if(result) {
            context.report({
              node,
              messageId: "Aaaaahhhh",
              fix: fixer => {
                return fixer.replaceText(node.source, fixPath(fromArray, toArray))
              }
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
  fromArray.shift();
  const fromLayer = fromArray[0];
  const fromSlice = fromArray[1];
  if(!fromLayer || !fromSlice || !layers[fromLayer]){
    return {result: false, fromArray: [], toArray: []};
  }

  // "./entities/Articles" | "/src/entities/Article"
  let hasSrc = false
  if(to.includes("src")){
    to = to.split("src")[1];
    hasSrc = true;
  }
  const relativeTo = isPathRelative(to);

  const toArray = to.split('/');
  if(hasSrc || relativeTo){
    toArray.shift();
  }
  const toLayer = toArray[0];
  const toSlice = toArray[1];
  if(!toLayer || !toSlice || !layers[toLayer]){
    return {result: false, fromArray: [], toArray: []};
  }
  if(relativeTo){
    return {result: fromSlice !== toSlice, fromArray, toArray};
  }
  else {
    if(toLayer === "shared" && (toSlice === "ui"  || toSlice === "config")) {
      return {result: false, fromArray: [], toArray: []};
    }
    return {
      result: fromSlice === toSlice && fromLayer === toLayer,
      fromArray, toArray
    };
  }
}

function fixPath(from=[], to=[]) {
  if(!from.length || !to.length){
    return "";
  }
  let result = "'";
  from.pop();
  let coincidence = 0;
  for (let i=0; i<from.length; i++){
    if(from[i] === to[i]){
      coincidence++;
    }
    else {
      break;
    }
  }
  if(coincidence){
    result += "../".repeat(from.length-coincidence);
  }
  if(coincidence===from.length) {
    result += "./";
  }
  to.splice(0, coincidence);
  return result + to.join('/')+ "'";
}