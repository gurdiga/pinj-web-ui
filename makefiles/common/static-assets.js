'use strict';

var glob = require('glob');

var assets = glob.sync('app/pages/**/images/**/*');
var pairs = assets.reduce(function(pairs, asset) {
  var destination = asset.replace('app/pages', '');
  pairs[destination] = asset;
  return pairs;
}, {});

if (require.main === module)
  for (var destination in pairs)
    console.log(destination, pairs[destination]);
else
  module.exports = pairs;
