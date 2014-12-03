glob = require 'glob'
path = require 'path'

assets = glob.sync 'app/pages/**/images/**/*'
pairs = assets.reduce (pairs, asset) ->
  destination = asset.replace 'app/pages', ''
  pairs[destination] = asset
  pairs
, {}

if require.main == module
  console.log destination, source for destination, source of pairs
else
  module.exports = pairs
