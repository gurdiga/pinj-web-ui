glob = require 'glob'
path = require 'path'

stylesheets = glob.sync('app/pages/**/css/**/*').map (filepath) ->
  filepath.replace('app/pages', '').replace('scss', 'css')

if require.main == module
  console.log stylesheet for stylesheet in stylesheets
else
  module.exports = stylesheets

