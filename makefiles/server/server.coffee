express = require 'express'
app = express()

browserify = require 'browserify-middleware'
browserifyOptions =
  transform: ['coffeeify']
  extensions: ['.js', '.json', '.coffee']
  minify: true

for bundle, entry of require '../common/bundle-entry-pairs'
  app.use bundle, browserify(entry, browserifyOptions)

jade = require 'jade'
app.set 'views', './'
app.set 'view engine', 'jade'
app.engine 'jade', jade.__express

serveTemplate = (template) ->
  (req, res) -> res.render(template)

pageTemplatePairs = require '../common/page-template-pairs'
pageTemplatePairs[''] = pageTemplatePairs['index.html']

for htmlFile, template of pageTemplatePairs
  app.get "/#{htmlFile}", serveTemplate(template)

for destination, source of require '../common/static-assets'
  app.get destination, (req, res) -> res.sendFile "#{process.cwd()}/#{source}"

sassMiddleware = require 'node-sass-middleware'
app.use sassMiddleware
  includePaths: './'
  src: './src/pages'
  dest: './build'
  outputStyle: 'compressed'

staticMiddleware = require 'express-static'
app.use staticMiddleware './build'

app.listen process.env.HTTP_PORT, ->
  console.log 'Listening on port', process.env.HTTP_PORT
