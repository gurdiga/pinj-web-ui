glob = require 'glob'
path = require 'path'

templates = glob.sync 'src/web-ui/pages/**/template.jade'
pairs = templates.reduce (pairs, template) ->
  htmlFile = "#{path.basename(path.dirname(template))}.html"
  pairs[htmlFile] = template
  pairs
, {}

pairs['test.html'] = 'test/index.jade'

if require.main == module
  console.log htmlFile, template for htmlFile, template of pairs
else
  module.exports = pairs
