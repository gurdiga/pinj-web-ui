'use strict';

var glob = require('glob');
var path = require('path');

var entries = glob.sync('app/pages/**/index.js');
var pairs = entries.reduce(function(pairs, entry) {
  var bundle = '/'  + path.basename(path.dirname(entry)) + '.js';
  pairs[bundle] = './' + entry;
  return pairs;
}, {});

pairs['/test.js'] = './test/index.js';

if (require.main === module) {
  for (var bundle in pairs) {
    console.log(bundle, pairs[bundle]);
  }
} else {
  module.exports = pairs;
}
