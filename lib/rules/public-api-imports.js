/**
 * @fileoverview The rule prohibits the use of components not from public API
 * @author Dimass
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const {isPathRelative} = require('../helpers/index');
const micromatch = require('micromatch')
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
      "error": "Импорт из внешних модулей должен осуществляться только через public API",
      "notFromTest": "Импорт из testing public API может осуществляться только из тестовых файлов",
      "fromTestMoreThanMax": "Импорт для тестов дополнительно может осуществляться только из тестового public API"
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [{
      type: 'object',
      properties: {
        aliasAbsolutePath: {
          type: 'string'
        },
        testFilePatterns: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        testPublicName: {
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
        aliasAbsolutePath = "",
        testFilePatterns = [],
        testPublicName = 'testing'
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
      ImportDeclaration(node) {
        if(node.source) {
          const importTo = node.source.value;
          const {result, toArray, fromTest} = publicChecking(
              importTo,
              aliasAbsolutePath,
              filename,
              testFilePatterns,
              testPublicName
          );
          if(result) {
            if(fromTest===false){
              context.report({
                node,
                messageId: 'notFromTest',
                fix: fixer => {
                  return fixer.replaceText(node.source, fixPath(toArray, aliasAbsolutePath));
                }
              })
            }
            else if (fromTest){
              context.report({
                node,
                messageId: 'fromTestMoreThanMax',
                fix: fixer => {
                  return fixer.replaceText(node.source, fixPath(toArray, aliasAbsolutePath, 3));
                }
              })
            }
            else {
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
function publicChecking(to, alias,filename, testPatterns, testPublic){
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
  const isTestingPublicApi = toArray[2] && toArray[2] === testPublic;
  const isLessThanMax = toArray.length < 4;
  if(toArray.length > 2 && !isTestingPublicApi) {
    return {result: true, toArray };
  }
  if(isTestingPublicApi) {
    const isCurrentFileTesting = testPatterns.some(pattern => micromatch.isMatch(filename, pattern));
    if(!isCurrentFileTesting) {
      return {result: true, toArray, fromTest: false};
    }
    else if(!isLessThanMax) {
      return {result:true,  toArray, fromTest: true};
    }
  }
  return {result: false, toArray: []}
}

function fixPath ( to= [], aliasAbsolutePath='', count=2) {
  to.splice(count);
  if(aliasAbsolutePath) {
    return `'${aliasAbsolutePath}/${to.join("/")}'`
  }
  return `'${to.join("/")}'`
}
