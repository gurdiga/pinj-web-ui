'use strict';

var glob = require('glob');

var assets = glob.sync('app/pages/**/images/**/*');
var pairs = assets.reduce(function(pairs, asset) {
  var destination = asset.replace('app/pages', '');
  pairs[destination] = asset;
  return pairs;
}, {});

/*
pairs['/common/js/firebase.js'] = nodeModule('firebase');
pairs['/common/js/q.js'] = nodeModule('q');

function nodeModule(name) {
  var path = 'node_modules/' + name + '/';
  var meta = require('../../' + path + 'package.json');
  return path + meta.main;
}
*/

if (require.main === module)
  for (var destination in pairs)
    console.log(destination, pairs[destination]);
else
  module.exports = pairs;
