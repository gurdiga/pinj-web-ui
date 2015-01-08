'use strict';

var glob = require('glob');
var path = require('path');

var pairs = {};

glob.sync('app/pages/**/index.js')
.forEach(function(entry) {
  var bundle = '/'  + path.basename(path.dirname(entry)) + '.js';
  pairs[bundle] = './' + entry;
});

glob.sync('test/**/*.js')
.filter(function(entry) {
  return entry !== 'test/helpers.js';
})
.forEach(function(entry) {
  pairs['/' + entry] = './' + entry;
});

if (require.main === module) {
  for (var bundle in pairs) {
    console.log(bundle, pairs[bundle]);
  }
} else {
  module.exports = pairs;
}
