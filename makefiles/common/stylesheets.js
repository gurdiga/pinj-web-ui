'use strict';

var glob = require('glob');

var stylesheets = glob.sync('app/pages/**/css/**/*').map(function(filepath) {
  return filepath.replace('app/pages', '').replace('scss', 'css');
});

if (require.main === module)
  stylesheets.forEach(function(stylesheet) {
    console.log(stylesheet);
  });
else
  module.exports = stylesheets;
