'use strict';

var glob = require('glob');
var path = require('path');

var templates = glob.sync('app/pages/**/template.jade');
var pairs = templates.reduce(function (pairs, template) {
  var htmlFile = path.basename(path.dirname(template)) + '.html';
  pairs[htmlFile] = template;
  return pairs;
}, {});

pairs['test.html'] = 'test/index.jade';

if (require.main === module) {
  for (var htmlFile in pairs)
    console.log(htmlFile, pairs[htmlFile]);
} else {
  module.exports = pairs;
}
