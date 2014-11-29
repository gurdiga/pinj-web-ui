glob = require 'glob'
path = require 'path'

assets = glob.sync 'src/web-ui/pages/**/images/**/*'
pairs = assets.reduce (pairs, asset) ->
  destination = asset.replace 'src/web-ui/pages', ''
  pairs[destination] = asset
  pairs
, {}

if require.main == module
  console.log destination, source for destination, source of pairs
else
  module.exports = pairs
