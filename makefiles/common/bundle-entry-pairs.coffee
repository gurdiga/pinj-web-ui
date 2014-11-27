glob = require 'glob'
path = require 'path'

entries = glob.sync 'src/web-ui/pages/**/index.coffee'
pairs = {}

module.exports = entries = entries.reduce (pairs, entry) ->
  bundle = "/#{path.basename(path.dirname(entry))}.js"
  pairs[bundle] = "./#{entry}"
  pairs
, pairs

pairs['/test.js'] = './test/index.coffee'

if require.main == module
  console.log bundle, entry for bundle, entry of pairs
